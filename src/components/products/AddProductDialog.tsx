import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog = ({ open, onOpenChange }: AddProductDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    productType: "",
    category: "",
    subcategory: "",
    customer: "",
    unitPrice: "",
    costPrice: "",
    minStockLevel: "0",
    description: "",
  });
  const [productImage, setProductImage] = useState<File | null>(null);

  const productTypes = [
    { value: "final", label: isRTL ? "نهائي" : "Final" },
    { value: "material", label: isRTL ? "خام" : "Material" },
    { value: "primary", label: isRTL ? "أساسي" : "Primary" },
  ];

  const categories = [
    { value: "fp", label: "FP | Final Product | منتج نهائي" },
    { value: "rm", label: "RM | Raw Material | مادة خام" },
  ];

  const subcategories = [
    { value: "sub1", label: isRTL ? "فئة فرعية 1" : "Subcategory 1" },
    { value: "sub2", label: isRTL ? "فئة فرعية 2" : "Subcategory 2" },
  ];

  const customers = [
    { value: "customer1", label: "ابو عدي" },
    { value: "customer2", label: "د.احمد ممدوح" },
    { value: "customer3", label: "د.عصام عدلي" },
    { value: "customer4", label: "كيور" },
    { value: "customer5", label: "فيوتشر" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "اسم المنتج مطلوب" : "Product name is required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isRTL ? "تم الحفظ" : "Saved",
      description: isRTL ? "تم حفظ المنتج بنجاح" : "Product saved successfully",
    });
    
    // Reset form
    setFormData({
      name: "",
      sku: "",
      barcode: "",
      productType: "",
      category: "",
      subcategory: "",
      customer: "",
      unitPrice: "",
      costPrice: "",
      minStockLevel: "0",
      description: "",
    });
    setProductImage(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{isRTL ? "إضافة منتج جديد" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Row 1: Product Name & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{isRTL ? "اسم المنتج" : "Product Name"}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Barcode & Product Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">{isRTL ? "الباركود" : "Barcode"}</Label>
              <Input
                id="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productType">{isRTL ? "نوع المنتج" : "Product Type"}</Label>
              <Select value={formData.productType} onValueChange={(val) => handleInputChange("productType", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? "-- اختر النوع --" : "-- Select Type --"} />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{isRTL ? "الفئة" : "Category"}</Label>
              <Select value={formData.category} onValueChange={(val) => handleInputChange("category", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? "-- اختر الفئة --" : "-- Select Category --"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcategory">{isRTL ? "الفئة الفرعية" : "Subcategory"}</Label>
              <Select value={formData.subcategory} onValueChange={(val) => handleInputChange("subcategory", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? "-- اختر الفئة الفرعية --" : "-- Select Subcategory --"} />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub.value} value={sub.value}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Customer (full width) */}
          <div className="space-y-2">
            <Label htmlFor="customer">{isRTL ? "العميل" : "Customer"}</Label>
            <Select value={formData.customer} onValueChange={(val) => handleInputChange("customer", val)}>
              <SelectTrigger>
                <SelectValue placeholder={isRTL ? "-- اختر العميل --" : "-- Select Customer --"} />
              </SelectTrigger>
              <SelectContent>
                {customers.map((cust) => (
                  <SelectItem key={cust.value} value={cust.value}>
                    {cust.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 5: Unit Price & Cost Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitPrice">{isRTL ? "سعر الوحدة" : "Unit Price"}</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange("unitPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPrice">{isRTL ? "سعر التكلفة" : "Cost Price"}</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => handleInputChange("costPrice", e.target.value)}
              />
            </div>
          </div>

          {/* Row 6: Min Stock Level & Product Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStockLevel">{isRTL ? "الحد الأدنى للمخزون" : "Minimum Stock Level"}</Label>
              <Input
                id="minStockLevel"
                type="number"
                value={formData.minStockLevel}
                onChange={(e) => handleInputChange("minStockLevel", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productImage">{isRTL ? "صورة المنتج" : "Product Image"}</Label>
              <Input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Row 7: Description (full width) */}
          <div className="space-y-2">
            <Label htmlFor="description">{isRTL ? "الوصف" : "Description"}</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isRTL ? "إغلاق" : "Close"}
          </Button>
          <Button onClick={handleSave}>
            {isRTL ? "حفظ المنتج" : "Save Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
