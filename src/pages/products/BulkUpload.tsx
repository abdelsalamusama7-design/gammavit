import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const BulkUpload = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى اختيار ملف CSV" : "Please select a CSV file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isRTL ? "جاري المعالجة" : "Processing",
      description: isRTL ? "جاري رفع ومعالجة الملف..." : "Uploading and processing file...",
    });
  };

  const handleDownloadSample = () => {
    // Create sample CSV content
    const csvContent = `name,sku,type,category_id,unit_price,barcode,subcategory_id,customer_id,cost_price,min_stock_level,description
Product A,SKU001,final,1,100.00,123456789,1,1,80.00,10,Sample product description
Product B,SKU002,material,2,50.00,987654321,2,2,40.00,20,Another sample product`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_products.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{isRTL ? "رفع المنتجات بالجملة" : "Bulk Product Upload"}</h1>
          <Button onClick={() => navigate("/final-products")}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {isRTL ? "العودة للمنتجات" : "Back to Products"}
          </Button>
        </div>

        {/* Instructions Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-primary">
              {isRTL ? "تعليمات ملف CSV" : "CSV File Instructions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isRTL
                ? "ارفع ملف CSV يحتوي على بيانات المنتجات. يجب أن يتضمن الملف الأعمدة التالية:"
                : "Upload a CSV file with product data. The file must include the following columns:"}
            </p>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <span className="font-semibold">name</span> - {isRTL ? "اسم المنتج (مطلوب)" : "Product name (required)"}
              </li>
              <li>
                <span className="font-semibold">sku</span> - {isRTL ? "رمز SKU فريد (مطلوب)" : "Unique SKU (required)"}
              </li>
              <li>
                <span className="font-semibold">type</span> - {isRTL ? "نوع المنتج (primary, final, material) (مطلوب)" : "Product type (primary, final, material) (required)"}
              </li>
              <li>
                <span className="font-semibold">category_id</span> - {isRTL ? "معرف الفئة الرئيسية (مطلوب)" : "ID of main category (required)"}
              </li>
              <li>
                <span className="font-semibold">unit_price</span> - {isRTL ? "سعر البيع (مطلوب)" : "Selling price (required)"}
              </li>
            </ul>

            <p className="text-sm text-muted-foreground">
              {isRTL ? "الأعمدة الاختيارية:" : "Optional columns:"}{" "}
              <span className="font-medium">barcode, subcategory_id, customer_id, cost_price, min_stock_level, description</span>
            </p>

            <Separator />

            <div>
              <button
                onClick={handleDownloadSample}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                {isRTL ? "تحميل ملف CSV نموذجي للمرجعية" : "Download sample CSV file for reference."}
              </button>
            </div>

            <Separator />

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="csv-file">{isRTL ? "ملف CSV" : "CSV File"}</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            <Button onClick={handleUpload} className="mt-4">
              <Upload className="w-4 h-4" />
              {isRTL ? "رفع ومعالجة" : "Upload and Process"}
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 {isRTL ? "نظام المخازن. جميع الحقوق محفوظة." : "Inventory System. All rights reserved."}</p>
          <p>{isRTL ? "الإصدار 1.0.0" : "Version 1.0.0"}</p>
        </div>
      </footer>
    </div>
  );
};

export default BulkUpload;
