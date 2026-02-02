import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Product {
  id: string;
  sku: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  price: number;
}

interface SelectProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (product: Product) => void;
}

const SelectProductDialog = ({ open, onOpenChange, onSelect }: SelectProductDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchTerm, setSearchTerm] = useState("");

  // Mock products data
  const products: Product[] = [
    { id: "1", sku: "PRD000978", name: "Plastic Container", nameAr: "عبوة بلاستيك", category: "FM | Filling Materials", categoryAr: "خامات تعبئة", price: 25 },
    { id: "2", sku: "PRD001019", name: "mushroom", nameAr: "mushroom", category: "RM | Raw Materials", categoryAr: "خامات", price: 150 },
    { id: "3", sku: "PRD000457", name: "Activator", nameAr: "اكتيفيتور", category: "FP | Final Product", categoryAr: "منتج نهائي", price: 300 },
    { id: "4", sku: "PRD000458", name: "Activator Sticker 100ml", nameAr: "اكتيفيتور استيكر 100ملي", category: "PM | Packaging Materials", categoryAr: "خامات تغليف", price: 15 },
    { id: "5", sku: "PRD000969", name: "Abu Al-Lif Plastic", nameAr: "بلاستك ابو الليف", category: "FM | Filling Materials", categoryAr: "خامات تعبئة", price: 45 },
    { id: "6", sku: "PRD000081", name: "Growth Cure Jar", nameAr: "كيور growth جاما", category: "FP | Final Product", categoryAr: "منتج نهائي", price: 250 },
    { id: "7", sku: "PRD000079", name: "Foss Cure Jar", nameAr: "جاما فوس كيور", category: "FP | Final Product", categoryAr: "منتج نهائي", price: 280 },
    { id: "8", sku: "PRD000447", name: "Grand Seloz", nameAr: "جراند grand seloz", category: "FP | Final Product", categoryAr: "منتج نهائي", price: 320 },
    { id: "9", sku: "PRD000448", name: "Grand Seloz Sticker 1000ml", nameAr: "جراند grand seloz استيكر1000ملي", category: "PM | Packaging Materials", categoryAr: "خامات تغليف", price: 20 },
    { id: "10", sku: "PRD000993", name: "Diclorazio", nameAr: "ديكلارزيو", category: "RM | Raw Materials", categoryAr: "خامات", price: 180 },
    { id: "11", sku: "PRD000445", name: "Cocci Clazu Diclorazio", nameAr: "ديكلازيو cocci clazu", category: "FP | Final Product", categoryAr: "منتج نهائي", price: 350 },
    { id: "12", sku: "PRD000446", name: "Cocci Clazu Sticker 1000ml", nameAr: "ديكلازيو cocci clazu استيكر 1000ملي", category: "PM | Packaging Materials", categoryAr: "خامات تغليف", price: 22 },
    { id: "13", sku: "PRD001017", name: "Spinach", nameAr: "سبناره", category: "RM | Raw Materials", categoryAr: "خامات", price: 95 },
    { id: "14", sku: "PRD001076", name: "Sodium Silinate", nameAr: "صوديوم سيلينات", category: "RM | Raw Materials", categoryAr: "خامات", price: 120 },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.nameAr.includes(searchTerm) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (product: Product) => {
    onSelect(product);
    onOpenChange(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{isRTL ? "اختر منتج" : "Select Product"}</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isRTL ? "بحث بالاسم أو الكود..." : "Search by name or SKU..."}
            className={isRTL ? "pr-9" : "pl-9"}
          />
        </div>

        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">{isRTL ? "الكود" : "SKU"}</TableHead>
                <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                <TableHead>{isRTL ? "الفئة" : "Category"}</TableHead>
                <TableHead className="w-24">{isRTL ? "الإجراء" : "Action"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>{isRTL ? product.nameAr : product.name}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {isRTL 
                        ? `${product.category} | ${product.categoryAr}`
                        : `${product.category} | ${product.categoryAr}`
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleSelect(product)}>
                      {isRTL ? "اختر" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    {isRTL ? "لا توجد منتجات مطابقة" : "No matching products found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectProductDialog;
