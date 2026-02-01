import { useTranslation } from "react-i18next";
import { Plus, Search, Factory, Clock, CheckCircle } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const Manufacturing = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const orders = [
    { id: "MO-001", product: isRTL ? "منتج أ" : "Product A", quantity: 500, progress: 75, status: "inProgress", startDate: "2024-01-10" },
    { id: "MO-002", product: isRTL ? "منتج ب" : "Product B", quantity: 200, progress: 100, status: "completed", startDate: "2024-01-08" },
    { id: "MO-003", product: isRTL ? "منتج ج" : "Product C", quantity: 1000, progress: 30, status: "inProgress", startDate: "2024-01-14" },
    { id: "MO-004", product: isRTL ? "منتج د" : "Product D", quantity: 300, progress: 0, status: "planned", startDate: "2024-01-18" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline"; label: string; icon: React.ReactNode }> = {
      completed: { variant: "default", label: isRTL ? "مكتمل" : "Completed", icon: <CheckCircle className="w-3 h-3" /> },
      inProgress: { variant: "secondary", label: isRTL ? "قيد التنفيذ" : "In Progress", icon: <Clock className="w-3 h-3" /> },
      planned: { variant: "outline", label: isRTL ? "مخطط" : "Planned", icon: <Factory className="w-3 h-3" /> },
    };
    const { variant, label, icon } = config[status];
    return <Badge variant={variant} className="gap-1">{icon}{label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.manufacturing")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "أمر تصنيع جديد" : "New Manufacturing Order"}
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
                  <TableHead>{isRTL ? "المنتج" : "Product"}</TableHead>
                  <TableHead>{t("inventory.quantity")}</TableHead>
                  <TableHead>{isRTL ? "التقدم" : "Progress"}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                  <TableHead>{isRTL ? "تاريخ البدء" : "Start Date"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={order.progress} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground">{order.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.startDate}</TableCell>
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

export default Manufacturing;
