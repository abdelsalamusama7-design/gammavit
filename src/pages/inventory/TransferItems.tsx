import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface TransferItem {
  id: number;
  product: string;
  available: number;
  quantity: number;
}

const TransferItems = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const [fromInventory, setFromInventory] = useState("");
  const [toInventory, setToInventory] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<TransferItem[]>([]);

  const inventories = [
    { id: "1", name: "RM | خامات خارجي" },
    { id: "2", name: isRTL ? "السادات" : "Sadat" },
    { id: "4", name: "RM | رئيسي | A1" },
    { id: "5", name: "RM | معمل تصنيع حقن | B1" },
    { id: "6", name: "FP | مخزن منتج نهائي | A2" },
    { id: "7", name: "RM | مخزن معمل تصنيع بودر | C1" },
    { id: "8", name: "PP | مخزن منتج اولي | B2" },
    { id: "9", name: "RP | مخزن مرتجعات | A3" },
    { id: "10", name: "DA | مخزن تالف | A4" },
  ];

  const handleAddItem = () => {
    const newItem: TransferItem = {
      id: Date.now(),
      product: "",
      available: 0,
      quantity: 0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: keyof TransferItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    if (!fromInventory || !toInventory) {
      toast.error(isRTL ? "يرجى اختيار المخزن المصدر والوجهة" : "Please select source and destination inventories");
      return;
    }
    if (fromInventory === toInventory) {
      toast.error(isRTL ? "لا يمكن التحويل لنفس المخزن" : "Cannot transfer to the same inventory");
      return;
    }
    if (items.length === 0) {
      toast.error(isRTL ? "يرجى إضافة عنصر واحد على الأقل" : "Please add at least one item");
      return;
    }
    toast.success(isRTL ? "تم تقديم طلب التحويل بنجاح" : "Transfer request submitted successfully");
    navigate("/inventories");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            <span className="bg-primary text-primary-foreground px-2 py-1">
              {isRTL ? "تحويل العناصر" : "Transfer Items"}
            </span>{" "}
            {isRTL ? "بين المخازن" : "Between Inventories"}
          </h1>
          <Button 
            variant="default"
            onClick={() => navigate("/inventories")}
          >
            {isRTL ? "العودة للمخازن" : "Back to Inventories"}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* From/To Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>{isRTL ? "من المخزن" : "From Inventory"}</Label>
                <Select value={fromInventory} onValueChange={setFromInventory}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "-- اختر المخزن المصدر --" : "-- Select Source Inventory --"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {inventories.map(inv => (
                      <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "إلى المخزن" : "To Inventory"}</Label>
                <Select value={toInventory} onValueChange={setToInventory}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "-- اختر المخزن الوجهة --" : "-- Select Destination Inventory --"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {inventories.map(inv => (
                      <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>{isRTL ? "ملاحظات" : "Notes"}</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Items Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isRTL ? "المنتج" : "Product"}</TableHead>
                  <TableHead>{isRTL ? "المتاح" : "Available"}</TableHead>
                  <TableHead>{isRTL ? "الكمية" : "Quantity"}</TableHead>
                  <TableHead>{isRTL ? "الإجراء" : "Action"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Button 
                        size="sm" 
                        onClick={handleAddItem}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                        {isRTL ? "إضافة عنصر" : "Add Item"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.product}
                            onChange={(e) => handleItemChange(item.id, "product", e.target.value)}
                            placeholder={isRTL ? "اسم المنتج" : "Product name"}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.available}
                            onChange={(e) => handleItemChange(item.id, "available", parseInt(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button 
                          size="sm" 
                          onClick={handleAddItem}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                          {isRTL ? "إضافة عنصر" : "Add Item"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRTL ? "تقديم التحويل" : "Submit Transfer"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>Version 1.0.0</span>
        </div>
      </main>
    </div>
  );
};

export default TransferItems;
