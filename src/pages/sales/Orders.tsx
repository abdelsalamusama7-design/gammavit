import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
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

const Orders = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const orders = [
    { id: "ORD-001", customer: isRTL ? "أحمد محمد" : "Ahmed Mohamed", date: "2024-01-15", amount: "12,500.00", status: "completed" },
    { id: "ORD-002", customer: isRTL ? "سارة علي" : "Sara Ali", date: "2024-01-14", amount: "8,200.00", status: "pending" },
    { id: "ORD-003", customer: isRTL ? "محمود حسن" : "Mahmoud Hassan", date: "2024-01-13", amount: "15,800.00", status: "new" },
    { id: "ORD-004", customer: isRTL ? "فاطمة أحمد" : "Fatma Ahmed", date: "2024-01-12", amount: "6,300.00", status: "completed" },
    { id: "ORD-005", customer: isRTL ? "خالد عمر" : "Khaled Omar", date: "2024-01-11", amount: "22,100.00", status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      pending: "secondary",
      new: "outline",
    };
    const labels: Record<string, string> = {
      completed: t("orders.completed"),
      pending: t("orders.pending"),
      new: t("orders.new"),
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.allOrders")}</h1>
          <Button onClick={() => navigate("/orders/create")}>
            <Plus className="w-4 h-4" />
            {t("nav.createOrder")}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
                <Input 
                  placeholder={isRTL ? "بحث..." : "Search..."} 
                  className={isRTL ? "pr-9" : "pl-9"}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4" />
                {isRTL ? "تصفية" : "Filter"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("orders.orderNumber")}</TableHead>
                  <TableHead>{t("orders.customer")}</TableHead>
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{t("orders.amount")}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
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

export default Orders;
