import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";
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

const Quotations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const quotations = [
    { id: "QT-001", customer: isRTL ? "شركة الفجر" : "Al-Fajr Co.", date: "2024-01-15", amount: "45,000.00", status: "open" },
    { id: "QT-002", customer: isRTL ? "مؤسسة النور" : "Al-Nour Est.", date: "2024-01-10", amount: "28,500.00", status: "accepted" },
    { id: "QT-003", customer: isRTL ? "شركة الأمل" : "Al-Amal Co.", date: "2024-01-08", amount: "62,000.00", status: "expired" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      open: "secondary",
      accepted: "default",
      expired: "destructive",
    };
    const labels: Record<string, string> = {
      open: isRTL ? "مفتوح" : "Open",
      accepted: isRTL ? "مقبول" : "Accepted",
      expired: isRTL ? "منتهي" : "Expired",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.quotations")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "عرض سعر جديد" : "New Quotation"}
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
                  <TableHead>{isRTL ? "رقم العرض" : "Quotation #"}</TableHead>
                  <TableHead>{t("orders.customer")}</TableHead>
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{t("orders.amount")}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.id}</TableCell>
                    <TableCell>{q.customer}</TableCell>
                    <TableCell>{q.date}</TableCell>
                    <TableCell>{q.amount} {t("common.currency")}</TableCell>
                    <TableCell>{getStatusBadge(q.status)}</TableCell>
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

export default Quotations;
