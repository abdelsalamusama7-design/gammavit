import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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

const PurchaseOrders = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const orders = [
    { id: "PO-001", supplier: isRTL ? "شركة المواد الأولية" : "Raw Materials Co.", date: "2024-01-15", amount: "25,000.00", status: "received" },
    { id: "PO-002", supplier: isRTL ? "مصنع التغليف" : "Packaging Factory", date: "2024-01-12", amount: "8,500.00", status: "pending" },
    { id: "PO-003", supplier: isRTL ? "موردين الكيماويات" : "Chemical Suppliers", date: "2024-01-10", amount: "42,000.00", status: "ordered" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      received: "default",
      pending: "secondary",
      ordered: "outline",
    };
    const labels: Record<string, string> = {
      received: isRTL ? "تم الاستلام" : "Received",
      pending: isRTL ? "قيد الانتظار" : "Pending",
      ordered: isRTL ? "تم الطلب" : "Ordered",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.purchaseOrders")}</h1>
          <Button onClick={() => navigate("/purchase-orders/create")}>
            <Plus className="w-4 h-4" />
            {isRTL ? "أمر شراء جديد" : "New Purchase Order"}
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
                  <TableHead>{isRTL ? "رقم الأمر" : "Order #"}</TableHead>
                  <TableHead>{isRTL ? "المورد" : "Supplier"}</TableHead>
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{t("orders.amount")}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount} {t("common.currency")}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
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

export default PurchaseOrders;
