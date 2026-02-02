import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { User, Shield, Clock, Activity, Mail, Calendar, Edit } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  module: string;
}

const Profile = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { user, profile, roles } = useAuth();
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Mock activity logs - in production, fetch from database
  useEffect(() => {
    const mockLogs: ActivityLog[] = [
      { id: "1", action: isRTL ? "تسجيل دخول" : "Login", description: isRTL ? "تسجيل دخول ناجح" : "Successful login", timestamp: new Date().toISOString(), module: "Auth" },
      { id: "2", action: isRTL ? "إضافة منتج" : "Add Product", description: isRTL ? "تمت إضافة منتج جديد PRD001" : "Added new product PRD001", timestamp: new Date(Date.now() - 3600000).toISOString(), module: "Products" },
      { id: "3", action: isRTL ? "تعديل فئة" : "Edit Category", description: isRTL ? "تم تعديل فئة المنتجات النهائية" : "Updated Final Products category", timestamp: new Date(Date.now() - 7200000).toISOString(), module: "Categories" },
      { id: "4", action: isRTL ? "حذف عنصر" : "Delete Item", description: isRTL ? "تم حذف مادة خام" : "Deleted raw material", timestamp: new Date(Date.now() - 86400000).toISOString(), module: "Materials" },
      { id: "5", action: isRTL ? "إنشاء طلب" : "Create Order", description: isRTL ? "تم إنشاء طلب بيع جديد" : "Created new sales order", timestamp: new Date(Date.now() - 172800000).toISOString(), module: "Sales" },
    ];
    setActivityLogs(mockLogs);
  }, [isRTL]);

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      admin: "bg-red-500",
      factory_sales: "bg-blue-500",
      mm: "bg-green-500",
      prod_man: "bg-purple-500",
      purchofficer: "bg-orange-500",
      purchasing_officer: "bg-orange-500",
      representative_sales: "bg-cyan-500",
    };
    
    const roleLabels: Record<string, { en: string; ar: string }> = {
      admin: { en: "Administrator", ar: "مدير النظام" },
      factory_sales: { en: "Factory Sales", ar: "مبيعات المصنع" },
      mm: { en: "Financial Manager", ar: "المدير المالي" },
      prod_man: { en: "Production Manager", ar: "مدير الإنتاج" },
      purchofficer: { en: "Purchasing Officer", ar: "مسؤول المشتريات" },
      purchasing_officer: { en: "Purchasing Officer", ar: "مسؤول المشتريات" },
      representative_sales: { en: "Sales Representative", ar: "مندوب مبيعات" },
    };

    return (
      <Badge className={`${roleColors[role] || "bg-gray-500"} text-white`}>
        {isRTL ? roleLabels[role]?.ar : roleLabels[role]?.en || role}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(isRTL ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{isRTL ? "الملف الشخصي" : "Profile"}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{profile?.full_name || "User"}</CardTitle>
              <p className="text-sm text-muted-foreground">@{profile?.username || user?.email?.split("@")[0]}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user?.email || profile?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {isRTL ? "تاريخ الإنشاء: " : "Joined: "}
                  {profile?.created_at ? formatDate(profile.created_at) : "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {isRTL ? "آخر تسجيل دخول: " : "Last Login: "}
                  {profile?.last_login ? formatDate(profile.last_login) : "-"}
                </span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4" />
                {isRTL ? "تعديل الملف الشخصي" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>

          {/* Roles & Permissions Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {isRTL ? "الصلاحيات والأدوار" : "Roles & Permissions"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">{isRTL ? "الأدوار المعينة" : "Assigned Roles"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {roles && roles.length > 0 ? (
                      roles.map((roleObj, index) => (
                        <span key={index}>{getRoleBadge(roleObj.role)}</span>
                      ))
                    ) : (
                      <Badge variant="secondary">{isRTL ? "مستخدم عادي" : "Regular User"}</Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">{isRTL ? "الصلاحيات" : "Permissions"}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: "products", en: "Manage Products", ar: "إدارة المنتجات" },
                      { key: "orders", en: "Manage Orders", ar: "إدارة الطلبات" },
                      { key: "inventory", en: "Manage Inventory", ar: "إدارة المخزون" },
                      { key: "users", en: "Manage Users", ar: "إدارة المستخدمين" },
                      { key: "reports", en: "View Reports", ar: "عرض التقارير" },
                      { key: "finance", en: "Finance Access", ar: "الوصول للمالية" },
                    ].map((perm) => {
                      const hasPermission = roles?.some(r => r.role === "admin") || 
                        (perm.key !== "users" && perm.key !== "finance");
                      return (
                        <div key={perm.key} className={`flex items-center gap-2 p-2 rounded-md ${hasPermission ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>
                          <div className={`w-2 h-2 rounded-full ${hasPermission ? "bg-green-500" : "bg-gray-300"}`} />
                          <span className="text-xs">{isRTL ? perm.ar : perm.en}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {isRTL ? "سجل النشاطات" : "Activity Log"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isRTL ? "الإجراء" : "Action"}</TableHead>
                  <TableHead>{isRTL ? "الوصف" : "Description"}</TableHead>
                  <TableHead>{isRTL ? "الوحدة" : "Module"}</TableHead>
                  <TableHead>{isRTL ? "التاريخ والوقت" : "Date & Time"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.module}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(log.timestamp)}
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

export default Profile;
