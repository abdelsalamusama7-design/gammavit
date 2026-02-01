import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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

interface Role {
  id: string;
  name: string;
  display_name: string;
  display_name_ar: string;
  color: string;
  created_at: string;
}

interface RoleWithStats extends Role {
  usersCount: number;
  permissionsCount: number;
}

const Roles = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { toast } = useToast();

  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState<RoleWithStats[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);

    // Fetch roles
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("*")
      .order("created_at", { ascending: true });

    if (rolesError) {
      console.error("Error fetching roles:", rolesError);
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "خطأ في جلب الأدوار" : "Error fetching roles",
      });
      setIsLoading(false);
      return;
    }

    // Fetch user counts per role
    const { data: userRolesData, error: userRolesError } = await supabase
      .from("user_roles")
      .select("role");

    if (userRolesError) {
      console.error("Error fetching user roles:", userRolesError);
    }

    // Count users per role
    const roleCounts: Record<string, number> = {};
    if (userRolesData) {
      userRolesData.forEach((ur) => {
        roleCounts[ur.role] = (roleCounts[ur.role] || 0) + 1;
      });
    }

    // Mock permissions count (since we don't have a permissions table yet)
    const permissionsCounts: Record<string, number> = {
      admin: 73,
      factory_sales: 2,
      mm: 11,
      prod_man: 24,
      purchofficer: 27,
      purchasing_officer: 1,
      representative_sales: 2,
    };

    const rolesWithStats: RoleWithStats[] = (rolesData || []).map((role) => ({
      ...role,
      usersCount: roleCounts[role.name] || 0,
      permissionsCount: permissionsCounts[role.name] || 0,
    }));

    setRoles(rolesWithStats);
    setIsLoading(false);
  };

  const filteredRoles = roles.filter((role) => {
    const query = searchQuery.toLowerCase();
    return (
      role.name.toLowerCase().includes(query) ||
      role.display_name.toLowerCase().includes(query) ||
      role.display_name_ar.toLowerCase().includes(query)
    );
  });

  const paginatedRoles = filteredRoles.slice(0, parseInt(entriesPerPage));

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl">
              {isRTL ? "الأدوار" : "Roles"}
            </CardTitle>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              {isRTL ? "دور جديد" : "New Role"}
            </Button>
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
                      <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                      <TableHead>{isRTL ? "المعرف" : "Slug"}</TableHead>
                      <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                      <TableHead>{isRTL ? "المستخدمين" : "Users"}</TableHead>
                      <TableHead>{isRTL ? "الصلاحيات" : "Permissions"}</TableHead>
                      <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRoles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          {isRTL ? "لا يوجد أدوار" : "No roles found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">
                            {isRTL ? role.display_name_ar : role.display_name}
                          </TableCell>
                          <TableCell className="text-primary font-mono">
                            {role.name}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                              {isRTL ? "نشط" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell>{role.usersCount}</TableCell>
                          <TableCell>{role.permissionsCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-primary border-primary hover:bg-primary/10"
                              >
                                <Pencil className="w-3 h-3" />
                                {isRTL ? "تعديل" : "Edit"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive border-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-3 h-3" />
                                {isRTL ? "حذف" : "Delete"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground">
                {isRTL
                  ? `عرض 1 إلى ${paginatedRoles.length} من ${filteredRoles.length} سجل`
                  : `Showing 1 to ${paginatedRoles.length} of ${filteredRoles.length} entries`}
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
    </div>
  );
};

export default Roles;
