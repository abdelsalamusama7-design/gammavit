import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trash2, Search } from "lucide-react";
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

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const CreatePurchaseOrder = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [vendor, setVendor] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [warehouseDestination, setWarehouseDestination] = useState("");
  const [notes, setNotes] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  // Mock vendors data
  const vendors = [
    { id: "1", name: isRTL ? "شركة المواد الأولية" : "Raw Materials Co.", contacts: ["Ahmed", "Mohamed"] },
    { id: "2", name: isRTL ? "مصنع التغليف" : "Packaging Factory", contacts: ["Sara", "Ali"] },
    { id: "3", name: "PharmaChem", contacts: ["Omar Magdy", "IT Help"] },
  ];

  const selectedVendor = vendors.find(v => v.id === vendor);

  const handleSelectProduct = (product: { id: string; sku: string; name: string; nameAr: string; price: number }) => {
    const newItem: OrderItem = {
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

  const handleSaveDraft = () => {
    toast.success(isRTL ? "تم حفظ المسودة بنجاح" : "Draft saved successfully");
  };

  const handleSubmit = () => {
    if (!vendor) {
      toast.error(isRTL ? "يرجى اختيار المورد" : "Please select a vendor");
      return;
    }
    toast.success(isRTL ? "تم إرسال أمر الشراء بنجاح" : "Purchase order submitted successfully");
    navigate("/purchase-orders");
  };

  const handleCancel = () => {
    navigate("/purchase-orders");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">
          {isRTL ? "إنشاء " : "Create "}
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
            {isRTL ? "أمر شراء" : "Purchase Order"}
          </span>
        </h1>

        {/* Purchase Order Information */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {isRTL ? "معلومات أمر الشراء" : "Purchase Order Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Order Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "تاريخ الطلب" : "Order Date"}</Label>
                <Input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>

              {/* Vendor */}
              <div className="space-y-2">
                <Label>{isRTL ? "المورد" : "Vendor"}</Label>
                <Select value={vendor} onValueChange={setVendor}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر المورد" : "Select Vendor"} />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <Label>{isRTL ? "جهة الاتصال" : "Contact Person"}</Label>
                <Select 
                  value={contactPerson} 
                  onValueChange={setContactPerson}
                  disabled={!vendor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر المورد أولاً" : "Select Vendor First"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedVendor?.contacts.map((contact) => (
                      <SelectItem key={contact} value={contact}>
                        {contact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Warehouse Destination */}
              <div className="space-y-2">
                <Label>{isRTL ? "مستودع الوجهة" : "Warehouse Destination"}</Label>
                <Input
                  value={warehouseDestination}
                  onChange={(e) => setWarehouseDestination(e.target.value)}
                  placeholder={isRTL ? "مثال: المستودع أ / رصيف 4" : "e.g. Warehouse A / Dock 4"}
                />
                <p className="text-xs text-primary">
                  {isRTL ? "أين سيتم توصيل أمر الشراء" : "Where this PO should be delivered."}
                </p>
              </div>
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
          </CardContent>
        </Card>

        {/* Purchase Order Items */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-primary text-lg">
                {isRTL ? "عناصر أمر الشراء" : "Purchase Order Items"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
                  <Input
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder={isRTL ? "بحث عن المنتجات..." : "Search products..."}
                    className={`w-64 ${isRTL ? "pr-9" : "pl-9"}`}
                  />
                </div>
                <Button onClick={() => setIsProductDialogOpen(true)} size="sm">
                  {isRTL ? "إضافة عنصر" : "Add Item"}
                </Button>
              </div>
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
              {isRTL ? "إرسال أمر الشراء" : "Submit PO"}
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

export default CreatePurchaseOrder;
