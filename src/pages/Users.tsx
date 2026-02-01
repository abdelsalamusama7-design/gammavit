import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Shield, ArrowLeftRight, Search, Pencil, Trash2, Lock } from "lucide-react";
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

const Users = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [entriesPerPage, setEntriesPerPage] = useState("25");

  const users = [
    { 
      id: 1, 
      name: "Ebram Dawood", 
      username: "yromea", 
      email: "yromea@gmail.com", 
      role: "Admin",
      roleColor: "bg-blue-500",
      status: "Active",
      lastLogin: "Nov 28, 2025 6:53 PM"
    },
    { 
      id: 2, 
      name: "Eslam El-Gamal", 
      username: "eslam", 
      email: "eslam.gamal@gamma-vet.com", 
      role: "Admin",
      roleColor: "bg-blue-500",
      status: "Active",
      lastLogin: "Dec 13, 2025 12:15 AM"
    },
    { 
      id: 3, 
      name: "Omar Magdy", 
      username: "omar", 
      email: "omar.m.abdelrahman@live.com", 
      role: "Admin",
      roleColor: "bg-blue-500",
      status: "Active",
      lastLogin: "Feb 1, 2026 9:36 PM"
    },
    { 
      id: 4, 
      name: "Prod man test", 
      username: "Prodmantest", 
      email: "eee@eee.co", 
      role: "Prod-man",
      roleColor: "bg-gray-500",
      status: "Active",
      lastLogin: "Jan 26, 2026 8:02 PM"
    },
    { 
      id: 5, 
      name: "PurchasingOfficer", 
      username: "PurchOfficer", 
      email: "123123@fzxfdzf.co", 
      role: "Purchofficer",
      roleColor: "bg-amber-500",
      status: "Active",
      lastLogin: "Jan 12, 2026 8:59 PM"
    },
    { 
      id: 6, 
      name: "testx1", 
      username: "testx1", 
      email: "testx1@ithelpme.store", 
      role: "Admin",
      roleColor: "bg-blue-500",
      status: "Active",
      lastLogin: "Never"
    },
    { 
      id: 7, 
      name: "testx2", 
      username: "testx2", 
      email: "testx2@ithelpme.store", 
      role: "Admin",
      roleColor: "bg-blue-500",
      status: "Active",
      lastLogin: "Never"
    },
  ];

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
              <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
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
                <Input className="w-48" />
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-hidden">
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
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={`${user.roleColor} text-white hover:${user.roleColor}`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                          {user.status === "Active" ? (isRTL ? "نشط" : "Active") : (isRTL ? "غير نشط" : "Inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.lastLogin === "Never" ? (isRTL ? "أبداً" : "Never") : user.lastLogin}
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
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground">
                {isRTL 
                  ? `عرض 1 إلى ${users.length} من ${users.length} سجل`
                  : `Showing 1 to ${users.length} of ${users.length} entries`
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
    </div>
  );
};

export default Users;
