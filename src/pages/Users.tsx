import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Shield, ArrowLeftRight, Pencil, Trash2, Lock, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import { format } from "date-fns";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  username: string | null;
  email: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

interface UserRole {
  user_id: string;
  role: string;
}

interface Role {
  name: string;
  display_name: string;
  display_name_ar: string;
  color: string;
}

const Users = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { toast } = useToast();
  
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "خطأ في جلب البيانات" : "Error fetching data",
      });
    } else {
      setProfiles(profilesData as Profile[]);
    }

    // Fetch user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id, role");
    
    if (!rolesError && rolesData) {
      setUserRoles(rolesData as UserRole[]);
    }

    // Fetch roles definitions
    const { data: roleDefsData, error: roleDefsError } = await supabase
      .from("roles")
      .select("*");
    
    if (!roleDefsError && roleDefsData) {
      setRoles(roleDefsData as Role[]);
    }

    setIsLoading(false);
  };

  const getUserRole = (userId: string) => {
    const userRole = userRoles.find((r) => r.user_id === userId);
    if (!userRole) return null;

    const roleDef = roles.find((r) => r.name === userRole.role);
    return roleDef || { name: userRole.role, display_name: userRole.role, display_name_ar: userRole.role, color: "bg-gray-500" };
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return isRTL ? "أبداً" : "Never";
    return format(new Date(dateStr), "MMM d, yyyy h:mm a");
  };

  const filteredProfiles = profiles.filter((profile) => {
    const query = searchQuery.toLowerCase();
    return (
      profile.full_name.toLowerCase().includes(query) ||
      profile.email.toLowerCase().includes(query) ||
      (profile.username?.toLowerCase().includes(query) ?? false)
    );
  });

  const paginatedProfiles = filteredProfiles.slice(0, parseInt(entriesPerPage));

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl">
              {isRTL ? "قائمة المستخدمين" : "Users List"}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Shield className="w-4 h-4" />
                {isRTL ? "الأدوار" : "Roles"}
              </Button>
              <Button variant="outline" className="gap-2">
                <ArrowLeftRight className="w-4 h-4" />
                {isRTL ? "نقل البيانات" : "Transfer Data"}
              </Button>
              <Button 
                className="gap-2 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="w-4 h-4" />
                {isRTL ? "إضافة مستخدم جديد" : "Add New User"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Table Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{isRTL ? "عرض" : "Show"}</span>
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">{isRTL ? "سجل" : "entries"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{isRTL ? "بحث:" : "Search:"}</span>
                <Input 
                  className="w-48" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>{isRTL ? "الاسم" : "NAME"}</TableHead>
                      <TableHead>{isRTL ? "اسم المستخدم" : "USERNAME"}</TableHead>
                      <TableHead>{isRTL ? "البريد الإلكتروني" : "EMAIL"}</TableHead>
                      <TableHead>{isRTL ? "الدور" : "ROLE"}</TableHead>
                      <TableHead>{isRTL ? "الحالة" : "STATUS"}</TableHead>
                      <TableHead>{isRTL ? "آخر تسجيل دخول" : "LAST LOGIN"}</TableHead>
                      <TableHead>{isRTL ? "الإجراءات" : "ACTIONS"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProfiles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {isRTL ? "لا يوجد مستخدمين" : "No users found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedProfiles.map((profile) => {
                        const role = getUserRole(profile.user_id);
                        return (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium">{profile.full_name}</TableCell>
                            <TableCell>{profile.username || "-"}</TableCell>
                            <TableCell>{profile.email}</TableCell>
                            <TableCell>
                              {role ? (
                                <Badge className={`${role.color} text-white`}>
                                  {isRTL ? role.display_name_ar : role.display_name}
                                </Badge>
                              ) : (
                                <Badge variant="outline">{isRTL ? "بدون دور" : "No role"}</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge className={profile.is_active ? "bg-emerald-500 text-white hover:bg-emerald-500" : "bg-red-500 text-white hover:bg-red-500"}>
                                {profile.is_active ? (isRTL ? "نشط" : "Active") : (isRTL ? "غير نشط" : "Inactive")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(profile.last_login)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 bg-red-100 hover:bg-red-200 text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 bg-amber-100 hover:bg-amber-200 text-amber-600"
                                >
                                  <Lock className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground">
                {isRTL 
                  ? `عرض 1 إلى ${paginatedProfiles.length} من ${filteredProfiles.length} سجل`
                  : `Showing 1 to ${paginatedProfiles.length} of ${filteredProfiles.length} entries`
                }
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  {isRTL ? "السابق" : "Previous"}
                </Button>
                <Button size="sm" className="min-w-[32px]">1</Button>
                <Button variant="outline" size="sm" disabled>
                  {isRTL ? "التالي" : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-wrap justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>{isRTL ? "الإصدار" : "Version"} 1.0.0</span>
        </div>
      </footer>

      {/* Create User Dialog */}
      <CreateUserDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onUserCreated={fetchData}
      />
    </div>
  );
};

export default Users;
