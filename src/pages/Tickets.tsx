import { useTranslation } from "react-i18next";
import { Plus, Search, MessageCircle } from "lucide-react";
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

const Tickets = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const tickets = [
    { id: "TKT-001", subject: isRTL ? "مشكلة في الطلب" : "Order Issue", customer: isRTL ? "أحمد محمد" : "Ahmed Mohamed", priority: "high", status: "open", date: "2024-01-15" },
    { id: "TKT-002", subject: isRTL ? "استفسار عن المنتج" : "Product Inquiry", customer: isRTL ? "سارة علي" : "Sara Ali", priority: "medium", status: "inProgress", date: "2024-01-14" },
    { id: "TKT-003", subject: isRTL ? "طلب إرجاع" : "Return Request", customer: isRTL ? "محمود حسن" : "Mahmoud Hassan", priority: "low", status: "closed", date: "2024-01-13" },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "destructive" | "secondary" | "outline"> = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    };
    const labels: Record<string, string> = {
      high: isRTL ? "عالي" : "High",
      medium: isRTL ? "متوسط" : "Medium",
      low: isRTL ? "منخفض" : "Low",
    };
    return <Badge variant={variants[priority]}>{labels[priority]}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      open: "destructive" as "default",
      inProgress: "secondary",
      closed: "outline",
    };
    const labels: Record<string, string> = {
      open: isRTL ? "مفتوح" : "Open",
      inProgress: isRTL ? "قيد المعالجة" : "In Progress",
      closed: isRTL ? "مغلق" : "Closed",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.tickets")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "تذكرة جديدة" : "New Ticket"}
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
                  <TableHead>{isRTL ? "رقم التذكرة" : "Ticket #"}</TableHead>
                  <TableHead>{isRTL ? "الموضوع" : "Subject"}</TableHead>
                  <TableHead>{t("orders.customer")}</TableHead>
                  <TableHead>{isRTL ? "الأولوية" : "Priority"}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                  <TableHead>{t("orders.date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        {ticket.subject}
                      </div>
                    </TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
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

export default Tickets;
