import { useTranslation } from "react-i18next";
import { Plus, Search, User, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Users = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const users = [
    { id: 1, name: isRTL ? "محمد أحمد" : "Mohamed Ahmed", email: "mohamed@gamma-vet.com", role: "admin", status: "active" },
    { id: 2, name: isRTL ? "سارة علي" : "Sara Ali", email: "sara@gamma-vet.com", role: "sales", status: "active" },
    { id: 3, name: isRTL ? "أحمد محمود" : "Ahmed Mahmoud", email: "ahmed@gamma-vet.com", role: "warehouse", status: "active" },
    { id: 4, name: isRTL ? "فاطمة حسن" : "Fatma Hassan", email: "fatma@gamma-vet.com", role: "accountant", status: "inactive" },
  ];

  const getRoleBadge = (role: string) => {
    const labels: Record<string, string> = {
      admin: isRTL ? "مدير" : "Admin",
      sales: isRTL ? "مبيعات" : "Sales",
      warehouse: isRTL ? "مستودع" : "Warehouse",
      accountant: isRTL ? "محاسب" : "Accountant",
    };
    return <Badge variant="outline" className="gap-1"><Shield className="w-3 h-3" />{labels[role]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.users")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "مستخدم جديد" : "New User"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="relative max-w-md">
              <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
              <Input 
                placeholder={isRTL ? "بحث..." : "Search..."} 
                className={isRTL ? "pr-9" : "pl-9"}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isRTL ? "المستخدم" : "User"}</TableHead>
                  <TableHead>{isRTL ? "البريد" : "Email"}</TableHead>
                  <TableHead>{isRTL ? "الدور" : "Role"}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? (isRTL ? "نشط" : "Active") : (isRTL ? "غير نشط" : "Inactive")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Users;
