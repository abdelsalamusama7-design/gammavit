import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
}

const Notifications = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const { toast } = useToast();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "خطأ في جلب الإشعارات" : "Error fetching notifications",
      });
    } else {
      setNotifications(data as Notification[]);
    }

    setIsLoading(false);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "خطأ في تحديث الإشعار" : "Error updating notification",
      });
    } else {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        )
      );
      toast({
        title: isRTL ? "تم" : "Done",
        description: isRTL ? "تم تحديد الإشعار كمقروء" : "Notification marked as read",
      });
    }
  };

  const handleCreateTicket = (notification: Notification) => {
    // Navigate to tickets page with notification info
    navigate("/tickets", { state: { fromNotification: notification } });
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d, yyyy h:mm a");
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "low_stock":
        return "bg-primary text-primary-foreground";
      case "order":
        return "bg-emerald-500 text-white";
      case "alert":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{isRTL ? "الإشعارات" : "Notifications"}</h1>
          <Button variant="default" onClick={() => navigate(-1)}>
            {isRTL ? "رجوع" : "Back"}
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {isRTL ? "لا يوجد إشعارات" : "No notifications"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>{isRTL ? "التاريخ" : "When"}</TableHead>
                    <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                    <TableHead>{isRTL ? "العنوان" : "Title"}</TableHead>
                    <TableHead>{isRTL ? "الرسالة" : "Message"}</TableHead>
                    <TableHead>{isRTL ? "الأهمية" : "Severity"}</TableHead>
                    <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow
                      key={notification.id}
                      className={!notification.is_read ? "bg-amber-50 dark:bg-amber-950/20" : ""}
                    >
                      <TableCell className="whitespace-nowrap">
                        {formatDate(notification.created_at)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadgeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell className="text-muted-foreground max-w-md">
                        {notification.message}
                      </TableCell>
                      <TableCell>{notification.severity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {!notification.is_read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              {isRTL ? "تحديد كمقروء" : "Mark read"}
                            </Button>
                          )}
                          {notification.type === "low_stock" && !notification.is_read && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => handleCreateTicket(notification)}
                            >
                              {isRTL ? "إنشاء تذكرة" : "Create Ticket"}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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

export default Notifications;
