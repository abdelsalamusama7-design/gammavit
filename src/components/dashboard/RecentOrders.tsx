import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ordersData = [
  {
    id: "ORD-20260124-5A1E5A",
    customerEn: "Ahmed Mohamed",
    customerAr: "أحمد محمد",
    dateEn: "Jan 24, 2026",
    dateAr: "24 يناير 2026",
    amount: "100,200.00",
    status: "new",
  },
  {
    id: "ORD-20260112-2I3D84",
    customerEn: "Omar Magdy",
    customerAr: "عمر مجدي",
    dateEn: "Jan 12, 2026",
    dateAr: "12 يناير 2026",
    amount: "51,500.00",
    status: "new",
  },
  {
    id: "ORD-20260108-7K2M91",
    customerEn: "Sara Ahmed",
    customerAr: "سارة أحمد",
    dateEn: "Jan 08, 2026",
    dateAr: "08 يناير 2026",
    amount: "75,800.00",
    status: "pending",
  },
  {
    id: "ORD-20260105-3N8P45",
    customerEn: "Mohamed Ali",
    customerAr: "محمد علي",
    dateEn: "Jan 05, 2026",
    dateAr: "05 يناير 2026",
    amount: "32,150.00",
    status: "completed",
  },
  {
    id: "ORD-20260102-9Q4R67",
    customerEn: "Fatma Hassan",
    customerAr: "فاطمة حسن",
    dateEn: "Jan 02, 2026",
    dateAr: "02 يناير 2026",
    amount: "88,900.00",
    status: "completed",
  },
];

const RecentOrders = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const getStatusBadge = (status: string) => {
    const statusText = t(`orders.${status}`);
    switch (status) {
      case "new":
        return <Badge className="status-badge status-new">{statusText}</Badge>;
      case "pending":
        return <Badge className="status-badge status-pending">{statusText}</Badge>;
      case "completed":
        return <Badge className="status-badge status-completed">{statusText}</Badge>;
      default:
        return <Badge variant="secondary">{statusText}</Badge>;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t("orders.recentOrders")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={isRTL ? "text-right" : "text-left"}>{t("orders.orderNumber")}</TableHead>
                <TableHead className={isRTL ? "text-right" : "text-left"}>{t("orders.customer")}</TableHead>
                <TableHead className={isRTL ? "text-right" : "text-left"}>{t("orders.date")}</TableHead>
                <TableHead className={isRTL ? "text-right" : "text-left"}>{t("orders.amount")}</TableHead>
                <TableHead className={isRTL ? "text-right" : "text-left"}>{t("orders.status")}</TableHead>
                <TableHead className={isRTL ? "text-right" : "text-left"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>{isRTL ? order.customerAr : order.customerEn}</TableCell>
                  <TableCell className="text-muted-foreground">{isRTL ? order.dateAr : order.dateEn}</TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      {t("orders.viewAll").split(" ")[0]}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
