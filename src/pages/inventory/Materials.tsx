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

const Materials = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const materials = [
    { id: "MAT-001", name: isRTL ? "مادة خام أ" : "Raw Material A", unit: isRTL ? "كجم" : "KG", quantity: 500, minStock: 100, status: "ok" },
    { id: "MAT-002", name: isRTL ? "مادة خام ب" : "Raw Material B", unit: isRTL ? "لتر" : "L", quantity: 50, minStock: 100, status: "low" },
    { id: "MAT-003", name: isRTL ? "مادة خام ج" : "Raw Material C", unit: isRTL ? "قطعة" : "PCS", quantity: 1200, minStock: 200, status: "ok" },
  ];

  const getStatusBadge = (status: string) => {
    return status === "ok" ? 
      <Badge variant="default">{isRTL ? "جيد" : "OK"}</Badge> : 
      <Badge variant="destructive">{isRTL ? "منخفض" : "Low"}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.materials")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "مادة جديدة" : "New Material"}
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
                  <TableHead>{isRTL ? "المادة" : "Material"}</TableHead>
                  <TableHead>{isRTL ? "الوحدة" : "Unit"}</TableHead>
                  <TableHead>{t("inventory.quantity")}</TableHead>
                  <TableHead>{isRTL ? "الحد الأدنى" : "Min Stock"}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.unit}</TableCell>
                    <TableCell>{material.quantity}</TableCell>
                    <TableCell>{material.minStock}</TableCell>
                    <TableCell>{getStatusBadge(material.status)}</TableCell>
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

export default Materials;
