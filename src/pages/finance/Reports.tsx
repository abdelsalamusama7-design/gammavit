import { useTranslation } from "react-i18next";
import { FileText, Download, TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Reports = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const reports = [
    { 
      id: 1, 
      title: isRTL ? "تقرير المبيعات" : "Sales Report", 
      description: isRTL ? "تقرير مفصل عن المبيعات والإيرادات" : "Detailed sales and revenue report",
      icon: TrendingUp,
      color: "text-green-600"
    },
    { 
      id: 2, 
      title: isRTL ? "تقرير المصروفات" : "Expenses Report", 
      description: isRTL ? "تحليل المصروفات حسب الفئة" : "Expense analysis by category",
      icon: DollarSign,
      color: "text-red-600"
    },
    { 
      id: 3, 
      title: isRTL ? "تقرير المشتريات" : "Purchases Report", 
      description: isRTL ? "تقرير أوامر الشراء والموردين" : "Purchase orders and suppliers report",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    { 
      id: 4, 
      title: isRTL ? "تقرير المخزون" : "Inventory Report", 
      description: isRTL ? "حالة المخزون وحركة البضائع" : "Stock status and movement report",
      icon: Package,
      color: "text-orange-600"
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.reports")}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${report.color}`}>
                      <report.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4" />
                    {isRTL ? "عرض" : "View"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4" />
                    {isRTL ? "تحميل" : "Download"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reports;
