import { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  isFreeSample: boolean;
}

const CreateSalesOrder = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  // Generate Order ID
  const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [customer, setCustomer] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [factory, setFactory] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  // Discount & Shipping State
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountType, setDiscountType] = useState("no_discount");
  const [discountCash, setDiscountCash] = useState(0);
  const [discountedProducts, setDiscountedProducts] = useState(0);
  const [shippingCost, setShippingCost] = useState("no_shipping");
  const [shippingAmount, setShippingAmount] = useState(0);

  // Mock customers data
  const customers = [
    { id: "1", name: isRTL ? "أحمد محمد" : "Ahmed Mohamed", contacts: ["Ahmed", "Mohamed"] },
    { id: "2", name: isRTL ? "سارة علي" : "Sara Ali", contacts: ["Sara", "Ali"] },
    { id: "3", name: isRTL ? "محمود حسن" : "Mahmoud Hassan", contacts: ["Mahmoud", "Hassan"] },
  ];

  // Mock factories data
  const factories = [
    { id: "1", name: isRTL ? "المصنع الرئيسي" : "Main Factory" },
    { id: "2", name: isRTL ? "المصنع الفرعي" : "Sub Factory" },
  ];

  const selectedCustomer = customers.find(c => c.id === customer);

  const handleSelectProduct = (product: { id: string; sku: string; name: string; nameAr: string; price: number }) => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: isRTL ? product.nameAr : product.name,
      productSku: product.sku,
      quantity: 1,
      unitPrice: product.price,
      total: product.price,
      isFreeSample: false,
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
          total: item.isFreeSample ? 0 : quantity * item.unitPrice
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
          total: item.isFreeSample ? 0 : item.quantity * unitPrice
        };
      }
      return item;
    }));
  };

  const toggleFreeSample = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newIsFreeSample = !item.isFreeSample;
        return {
          ...item,
          isFreeSample: newIsFreeSample,
          total: newIsFreeSample ? 0 : item.quantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  // Financial calculations
  const financialSummary = useMemo(() => {
    const itemsSubtotal = items.reduce((sum, item) => sum + (item.isFreeSample ? 0 : item.total), 0);
    const freeSamplesCount = items.filter(item => item.isFreeSample).length;
    
    let discountAmount = 0;
    if (discountType === "percentage") {
      discountAmount = (itemsSubtotal * discountPercent) / 100;
    } else if (discountType === "cash") {
      discountAmount = discountCash;
    } else if (discountType === "products") {
      discountAmount = discountedProducts;
    }

    const shippingCostValue = shippingCost === "manual" ? shippingAmount : 0;
    const orderTotal = itemsSubtotal - discountAmount + shippingCostValue;

    return {
      itemsSubtotal,
      discountAmount,
      shippingCost: shippingCostValue,
      freeSamplesCount,
      orderTotal: Math.max(0, orderTotal),
    };
  }, [items, discountType, discountPercent, discountCash, discountedProducts, shippingCost, shippingAmount]);

  const handleCancel = () => {
    navigate("/orders");
  };

  const handleCreateOrder = () => {
    if (!customer) {
      toast.error(isRTL ? "يرجى اختيار العميل" : "Please select a customer");
      return;
    }
    if (items.length === 0) {
      toast.error(isRTL ? "يرجى إضافة منتج واحد على الأقل" : "Please add at least one product");
      return;
    }
    toast.success(isRTL ? "تم إنشاء الطلب بنجاح" : "Order created successfully");
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">
          {isRTL ? "إنشاء طلب جديد" : "Create New Order"}
        </h1>

        {/* Order Information */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {isRTL ? "معلومات الطلب" : "Order Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Order ID */}
              <div className="space-y-2">
                <Label>{isRTL ? "رقم الطلب" : "Order ID"}</Label>
                <Input value={orderId} disabled className="bg-muted" />
              </div>

              {/* Order Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "تاريخ الطلب" : "Order Date"}</Label>
                <Input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Factory */}
              <div className="space-y-2">
                <Label>{isRTL ? "المصنع" : "Factory"}</Label>
                <Select value={factory} onValueChange={setFactory}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر العميل" : "Select customer"} />
                  </SelectTrigger>
                  <SelectContent>
                    {factories.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name}
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

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-primary text-lg">
                {isRTL ? "عناصر الطلب" : "Order Items"}
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
                  <TableHead>{isRTL ? "عينة مجانية؟" : "Free Sample?"}</TableHead>
                  <TableHead>{isRTL ? "الإجراء" : "Action"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
                        <Checkbox
                          checked={item.isFreeSample}
                          onCheckedChange={() => toggleFreeSample(item.id)}
                        />
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Discounts & Shipping */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {isRTL ? "الخصومات والشحن" : "Discounts & Shipping"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Discount % */}
              <div className="space-y-2">
                <Label>{isRTL ? "نسبة الخصم %" : "Discount %"}</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  disabled={discountType !== "percentage"}
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <Label>{isRTL ? "نوع الخصم" : "Discount Type"}</Label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_discount">{isRTL ? "بدون خصم" : "No Discount"}</SelectItem>
                    <SelectItem value="percentage">{isRTL ? "نسبة مئوية" : "Percentage"}</SelectItem>
                    <SelectItem value="cash">{isRTL ? "نقدي" : "Cash"}</SelectItem>
                    <SelectItem value="products">{isRTL ? "منتجات" : "Products"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount (Cash) */}
              <div className="space-y-2">
                <Label>{isRTL ? "الخصم (نقدي)" : "Discount (Cash)"}</Label>
                <Input
                  type="number"
                  min="0"
                  value={discountCash}
                  onChange={(e) => setDiscountCash(parseFloat(e.target.value) || 0)}
                  disabled={discountType !== "cash"}
                />
              </div>

              {/* Discounted Products */}
              <div className="space-y-2">
                <Label>{isRTL ? "منتجات مخصومة" : "Discounted Products"}</Label>
                <Input
                  type="number"
                  min="0"
                  value={discountedProducts}
                  onChange={(e) => setDiscountedProducts(parseFloat(e.target.value) || 0)}
                  disabled={discountType !== "products"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Cost */}
              <div className="space-y-2">
                <Label>{isRTL ? "تكلفة الشحن" : "Shipping Cost"}</Label>
                <Select value={shippingCost} onValueChange={setShippingCost}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_shipping">{isRTL ? "لا يوجد (لا يوجد)" : "No Shipping (لا يوجد)"}</SelectItem>
                    <SelectItem value="manual">{isRTL ? "يدوي" : "Manual"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Shipping Amount */}
              <div className="space-y-2">
                <Label>{isRTL ? "مبلغ الشحن" : "Shipping Amount"}</Label>
                <Input
                  type="number"
                  min="0"
                  value={shippingAmount}
                  onChange={(e) => setShippingAmount(parseFloat(e.target.value) || 0)}
                  disabled={shippingCost !== "manual"}
                />
                <p className="text-xs text-muted-foreground">
                  {isRTL ? "متاح فقط عند اختيار الشحن اليدوي." : "Enabled only when shipping is manual."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {isRTL ? "الملخص المالي" : "Financial Summary"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-primary">{isRTL ? "إجمالي العناصر" : "Items Subtotal"}</p>
                <p className="text-lg font-semibold">{financialSummary.itemsSubtotal.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-primary">{isRTL ? "مبلغ الخصم" : "Discount Amount"}</p>
                <p className="text-lg font-semibold">{financialSummary.discountAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-primary">{isRTL ? "تكلفة الشحن" : "Shipping Cost"}</p>
                <p className="text-lg font-semibold">{financialSummary.shippingCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-primary">{isRTL ? "عينات مجانية" : "Free Samples"}</p>
                <p className="text-lg font-semibold">{financialSummary.freeSamplesCount}</p>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <p className="text-primary font-medium">{isRTL ? "إجمالي الطلب" : "Order Total"}</p>
              <p className="text-2xl font-bold">{financialSummary.orderTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="destructive" onClick={handleCancel}>
            {isRTL ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleCreateOrder}>
            {isRTL ? "إنشاء الطلب" : "Create Order"}
          </Button>
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

export default CreateSalesOrder;
