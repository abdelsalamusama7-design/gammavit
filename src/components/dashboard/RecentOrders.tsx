import { Eye } from "lucide-react";
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

const orders = [
  {
    id: "ORD-20260124-5A1E5A",
    customer: "أحمد محمد",
    date: "24 يناير 2026",
    amount: "100,200.00",
    status: "جديد",
  },
  {
    id: "ORD-20260112-2I3D84",
    customer: "عمر مجدي",
    date: "12 يناير 2026",
    amount: "51,500.00",
    status: "جديد",
  },
  {
    id: "ORD-20260108-7K2M91",
    customer: "سارة أحمد",
    date: "08 يناير 2026",
    amount: "75,800.00",
    status: "قيد التنفيذ",
  },
  {
    id: "ORD-20260105-3N8P45",
    customer: "محمد علي",
    date: "05 يناير 2026",
    amount: "32,150.00",
    status: "مكتمل",
  },
  {
    id: "ORD-20260102-9Q4R67",
    customer: "فاطمة حسن",
    date: "02 يناير 2026",
    amount: "88,900.00",
    status: "مكتمل",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "جديد":
      return <Badge className="status-badge status-new">{status}</Badge>;
    case "قيد التنفيذ":
      return <Badge className="status-badge status-pending">{status}</Badge>;
    case "مكتمل":
      return <Badge className="status-badge status-completed">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const RecentOrders = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">الطلبات الأخيرة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      عرض
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
