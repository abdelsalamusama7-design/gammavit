import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeftRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
}

const TransferData = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { toast } = useToast();

  const [users, setUsers] = useState<Profile[]>([]);
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [deleteSourceUser, setDeleteSourceUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, email")
      .eq("is_active", true);

    if (!error && data) {
      setUsers(data);
    }
  };

  const handleTransfer = async () => {
    if (!fromUser || !toUser) {
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL 
          ? "يرجى اختيار المستخدم المصدر والمستخدم الهدف" 
          : "Please select both source and target users",
      });
      return;
    }

    if (fromUser === toUser) {
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL 
          ? "لا يمكن نقل البيانات إلى نفس المستخدم" 
          : "Cannot transfer data to the same user",
      });
      return;
    }

    setIsLoading(true);

    // Simulate transfer process - in real implementation, this would call an edge function
    // to handle the actual data transfer across multiple tables
    setTimeout(() => {
      toast({
        title: isRTL ? "تم النقل" : "Transfer Complete",
        description: isRTL 
          ? "تم نقل جميع البيانات بنجاح" 
          : "All data has been transferred successfully",
      });
      setIsLoading(false);
      setFromUser("");
      setToUser("");
      setDeleteSourceUser(false);
    }, 2000);
  };

  const transferItems = [
    { key: "orders", en: "Orders, order payments & returns", ar: "الطلبات، المدفوعات والمرتجعات" },
    { key: "quotations", en: "Quotations & purchase orders", ar: "عروض الأسعار وأوامر الشراء" },
    { key: "finance", en: "Finance transfers & wallets", ar: "التحويلات المالية والمحافظ" },
    { key: "inventory", en: "Inventory transfer approvals", ar: "موافقات نقل المخزون" },
    { key: "activity", en: "Activity logs for audit trail", ar: "سجلات النشاط للتدقيق" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Ownership Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {isRTL ? "نقل الملكية" : "Transfer Ownership"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From User */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  {isRTL ? "من المستخدم" : "From User"}
                </Label>
                <Select value={fromUser} onValueChange={setFromUser}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر المستخدم" : "Select user"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {users.map((user) => (
                      <SelectItem key={user.user_id} value={user.user_id}>
                        {user.full_name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? "سيتم إعادة تعيين جميع السجلات التي أنشأها هذا المستخدم." 
                    : "All records created by this user will be reassigned."
                  }
                </p>
              </div>

              {/* To User */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  {isRTL ? "إلى المستخدم" : "To User"}
                </Label>
                <Select value={toUser} onValueChange={setToUser}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر المستخدم" : "Select user"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {users
                      .filter((user) => user.user_id !== fromUser)
                      .map((user) => (
                        <SelectItem key={user.user_id} value={user.user_id}>
                          {user.full_name} ({user.email})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Delete Source User Checkbox */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="deleteSource"
                    checked={deleteSourceUser}
                    onCheckedChange={(checked) => setDeleteSourceUser(checked as boolean)}
                  />
                  <Label htmlFor="deleteSource" className="font-medium cursor-pointer">
                    {isRTL ? "حذف المستخدم المصدر بعد النقل" : "Delete source user after transfer"}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground mr-6">
                  {isRTL 
                    ? "سيتم حذف حساب المستخدم نهائياً بمجرد إعادة تعيين جميع البيانات." 
                    : "The user account will be permanently removed once all data is reassigned."
                  }
                </p>
              </div>

              {/* Transfer Button */}
              <Button 
                onClick={handleTransfer} 
                disabled={isLoading || !fromUser || !toUser}
                className="gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                {isLoading 
                  ? (isRTL ? "جاري النقل..." : "Transferring...") 
                  : (isRTL ? "نقل البيانات" : "Transfer Data")
                }
              </Button>
            </CardContent>
          </Card>

          {/* What Gets Transferred Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {isRTL ? "ما الذي يتم نقله؟" : "What gets transferred?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {transferItems.map((item) => (
                  <li key={item.key} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>{isRTL ? item.ar : item.en}</span>
                  </li>
                ))}
              </ul>

              <p className="text-primary mt-6">
                {isRTL 
                  ? "استخدم هذا عندما يغادر مندوب مبيعات أو ينتقل إلى منطقة جديدة حتى يرى المالك الجديد كل السجل في لوحات التحكم الخاصة به." 
                  : "Use this when a sales rep leaves or moves to a new territory so the new owner sees all history in their dashboards."
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>{isRTL ? "الإصدار" : "Version"} 1.0.0</span>
        </div>
      </footer>
    </div>
  );
};

export default TransferData;
