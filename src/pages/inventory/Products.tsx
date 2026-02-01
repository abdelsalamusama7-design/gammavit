import { useTranslation } from "react-i18next";
import { Plus, Search, Package } from "lucide-react";
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

const Products = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const products = [
    { id: "PRD-001", name: isRTL ? "منتج أ" : "Product A", sku: "SKU-001", quantity: 150, price: "250.00", status: "inStock" },
    { id: "PRD-002", name: isRTL ? "منتج ب" : "Product B", sku: "SKU-002", quantity: 5, price: "180.00", status: "lowStock" },
    { id: "PRD-003", name: isRTL ? "منتج ج" : "Product C", sku: "SKU-003", quantity: 0, price: "320.00", status: "outOfStock" },
    { id: "PRD-004", name: isRTL ? "منتج د" : "Product D", sku: "SKU-004", quantity: 85, price: "450.00", status: "inStock" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      inStock: "default",
      lowStock: "secondary",
      outOfStock: "destructive",
    };
    const labels: Record<string, string> = {
      inStock: isRTL ? "متوفر" : "In Stock",
      lowStock: isRTL ? "مخزون منخفض" : "Low Stock",
      outOfStock: isRTL ? "نفذ" : "Out of Stock",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.productsList")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "منتج جديد" : "New Product"}
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
                  <TableHead>{isRTL ? "المنتج" : "Product"}</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>{t("inventory.quantity")}</TableHead>
                  <TableHead>{isRTL ? "السعر" : "Price"}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price} {t("common.currency")}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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

export default Products;
