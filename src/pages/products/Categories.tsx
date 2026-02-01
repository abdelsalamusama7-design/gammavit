import { useTranslation } from "react-i18next";
import { Plus, Folder } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Categories = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const categories = [
    { id: 1, name: isRTL ? "الأدوية البيطرية" : "Veterinary Medicines", count: 45 },
    { id: 2, name: isRTL ? "المكملات الغذائية" : "Nutritional Supplements", count: 28 },
    { id: 3, name: isRTL ? "اللقاحات" : "Vaccines", count: 15 },
    { id: 4, name: isRTL ? "المطهرات" : "Disinfectants", count: 12 },
    { id: 5, name: isRTL ? "الأعلاف" : "Feed", count: 35 },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.categories")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "فئة جديدة" : "New Category"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.count} {isRTL ? "منتج" : "products"}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
