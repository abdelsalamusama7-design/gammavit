import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const inventoryItems = [
  {
    nameEn: "External Materials | RM",
    nameAr: "خامات خارجي | RM",
    items: 3,
    stock: 850,
    status: "good",
  },
  {
    nameEn: "El Sadat",
    nameAr: "السادات",
    items: 0,
    stock: 0,
    status: "empty",
  },
  {
    nameEn: "Main | A1 | RM",
    nameAr: "رئيسي | A1 | RM",
    items: 1,
    stock: 8000,
    status: "good",
  },
  {
    nameEn: "Cairo Warehouse",
    nameAr: "مستودع القاهرة",
    items: 5,
    stock: 2500,
    status: "good",
  },
  {
    nameEn: "Alexandria Warehouse",
    nameAr: "مستودع الإسكندرية",
    items: 2,
    stock: 150,
    status: "low",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-orders text-orders-foreground";
    case "low":
      return "bg-warning text-warning-foreground";
    case "empty":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const InventorySummary = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t("inventory.summary")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {inventoryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-sm">{isRTL ? item.nameAr : item.nameEn}</span>
              <Badge
                className={cn(
                  "inventory-badge min-w-[100px] justify-center",
                  getStatusColor(item.status)
                )}
              >
                {item.items} {isRTL ? "عناصر" : "items"} ({item.stock.toLocaleString()})
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventorySummary;
