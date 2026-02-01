import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
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

const StockMovement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const movements = [
    { id: 1, date: "2024-01-15", product: isRTL ? "منتج أ" : "Product A", type: "in", quantity: 100, reference: "PO-001" },
    { id: 2, date: "2024-01-15", product: isRTL ? "منتج ب" : "Product B", type: "out", quantity: 25, reference: "ORD-001" },
    { id: 3, date: "2024-01-14", product: isRTL ? "منتج ج" : "Product C", type: "in", quantity: 50, reference: "PO-002" },
    { id: 4, date: "2024-01-14", product: isRTL ? "منتج أ" : "Product A", type: "out", quantity: 30, reference: "ORD-002" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.stockMovement")}</h1>
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
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{isRTL ? "المنتج" : "Product"}</TableHead>
                  <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                  <TableHead>{t("inventory.quantity")}</TableHead>
                  <TableHead>{isRTL ? "المرجع" : "Reference"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell className="font-medium">{movement.product}</TableCell>
                    <TableCell>
                      {movement.type === "in" ? (
                        <Badge variant="default" className="gap-1">
                          <ArrowDownLeft className="w-3 h-3" />
                          {isRTL ? "وارد" : "In"}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          {isRTL ? "صادر" : "Out"}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.reference}</TableCell>
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

export default StockMovement;
