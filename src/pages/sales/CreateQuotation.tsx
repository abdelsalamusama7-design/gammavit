import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import SelectProductDialog from "@/components/purchases/SelectProductDialog";

interface QuotationItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const CreateQuotation = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  // Set default expiry date to 30 days from now
  const today = new Date();
  const expiryDefault = new Date(today);
  expiryDefault.setDate(expiryDefault.getDate() + 30);

  const [quotationDate, setQuotationDate] = useState(today.toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(expiryDefault.toISOString().split('T')[0]);
  const [customer, setCustomer] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  // Mock customers data
  const customers = [
    { id: "1", name: isRTL ? "أحمد محمد" : "Ahmed Mohamed", contacts: ["Ahmed", "Mohamed"] },
    { id: "2", name: isRTL ? "سارة علي" : "Sara Ali", contacts: ["Sara", "Ali"] },
    { id: "3", name: isRTL ? "محمود حسن" : "Mahmoud Hassan", contacts: ["Mahmoud", "Hassan"] },
    { id: "4", name: "omar Magdy", contacts: ["Omar", "Magdy"] },
  ];

  const selectedCustomer = customers.find(c => c.id === customer);

  const handleSelectProduct = (product: { id: string; sku: string; name: string; nameAr: string; price: number }) => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: isRTL ? product.nameAr : product.name,
      productSku: product.sku,
      quantity: 1,
      unitPrice: product.price,
      total: product.price,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          total: quantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  const updateItemPrice = (id: string, unitPrice: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          unitPrice,
          total: item.quantity * unitPrice
        };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const handleCancel = () => {
    navigate("/quotations");
  };

  const handleSaveDraft = () => {
    toast.success(isRTL ? "تم حفظ المسودة بنجاح" : "Draft saved successfully");
  };

  const handleSubmit = () => {
    if (!customer) {
      toast.error(isRTL ? "يرجى اختيار العميل" : "Please select a customer");
      return;
    }
    toast.success(isRTL ? "تم إرسال عرض السعر بنجاح" : "Quotation submitted successfully");
    navigate("/quotations");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">
          {isRTL ? "إنشاء عرض سعر جديد" : "Create New Quotation"}
        </h1>

        {/* Quotation Information */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {isRTL ? "معلومات عرض السعر" : "Quotation Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Quotation Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "تاريخ عرض السعر" : "Quotation Date"}</Label>
                <Input
                  type="date"
                  value={quotationDate}
                  onChange={(e) => setQuotationDate(e.target.value)}
                />
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "تاريخ انتهاء الصلاحية" : "Expiry Date"}</Label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label>{isRTL ? "العميل" : "Customer"}</Label>
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر العميل" : "Select Customer"} />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Person */}
              <div className="space-y-2">
                <Label>{isRTL ? "جهة الاتصال" : "Contact Person"}</Label>
                <Select 
                  value={contactPerson} 
                  onValueChange={setContactPerson}
                  disabled={!customer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر العميل أولاً" : "Select Customer First"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCustomer?.contacts.map((contact) => (
                      <SelectItem key={contact} value={contact}>
                        {contact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>{isRTL ? "ملاحظات" : "Notes"}</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotation Items */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-primary text-lg">
                {isRTL ? "عناصر عرض السعر" : "Quotation Items"}
              </CardTitle>
              <Button onClick={() => setIsProductDialogOpen(true)} size="sm">
                {isRTL ? "إضافة عنصر" : "Add Item"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isRTL ? "المنتج" : "Product"}</TableHead>
                  <TableHead>{isRTL ? "الكمية" : "Quantity"}</TableHead>
                  <TableHead>{isRTL ? "سعر الوحدة" : "Unit Price"}</TableHead>
                  <TableHead>{isRTL ? "الإجمالي" : "Total"}</TableHead>
                  <TableHead>{isRTL ? "الإجراء" : "Action"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {isRTL ? "لا توجد عناصر. اضغط على 'إضافة عنصر' للبدء." : "No items. Click 'Add Item' to start."}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-xs text-muted-foreground block">{item.productSku}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItemPrice(item.id, parseFloat(e.target.value) || 0)}
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {/* Total Row */}
                <TableRow>
                  <TableCell colSpan={3} className={`text-${isRTL ? 'left' : 'right'} font-bold`}>
                    {isRTL ? "الإجمالي:" : "Total:"}
                  </TableCell>
                  <TableCell className="font-bold">{calculateTotal()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="destructive" onClick={handleCancel}>
            {isRTL ? "إلغاء" : "Cancel"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              {isRTL ? "حفظ كمسودة" : "Save Draft"}
            </Button>
            <Button onClick={handleSubmit}>
              {isRTL ? "إرسال عرض السعر" : "Submit Quotation"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>Version 1.0.0</span>
        </div>
      </main>

      <SelectProductDialog
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        onSelect={handleSelectProduct}
      />
    </div>
  );
};

export default CreateQuotation;
