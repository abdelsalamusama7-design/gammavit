import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormulaComponent {
  id: string;
  product: string;
  quantity: string;
  unit: string;
  notes: string;
}

const CreateOrder = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  // Form state
  const [provider, setProvider] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [dueDate, setDueDate] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [existingFormula, setExistingFormula] = useState("");
  
  // Formula builder state
  const [components, setComponents] = useState<FormulaComponent[]>([
    { id: "1", product: "", quantity: "", unit: "", notes: "" },
    { id: "2", product: "", quantity: "", unit: "", notes: "" },
  ]);
  const [formulaDescription, setFormulaDescription] = useState("");
  const [mixingInstructions, setMixingInstructions] = useState("");
  const [formulaName, setFormulaName] = useState("");

  const providers = [
    { value: "proxy", label: isRTL ? "بروكسي" : "Proxy" },
    { value: "main", label: isRTL ? "المصنع الرئيسي" : "Main Factory" },
  ];

  const products = [
    { value: "product1", label: isRTL ? "منتج 1" : "Product 1" },
    { value: "product2", label: isRTL ? "منتج 2" : "Product 2" },
    { value: "product3", label: isRTL ? "منتج 3" : "Product 3" },
  ];

  const addComponent = () => {
    setComponents([
      ...components,
      { id: Date.now().toString(), product: "", quantity: "", unit: "", notes: "" },
    ]);
  };

  const removeComponent = (id: string) => {
    if (components.length > 1) {
      setComponents(components.filter((c) => c.id !== id));
    }
  };

  const updateComponent = (id: string, field: keyof FormulaComponent, value: string) => {
    setComponents(
      components.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = () => {
    // TODO: Submit form data
    console.log({
      provider,
      priority,
      dueDate,
      batchSize,
      orderNotes,
      existingFormula,
      components,
      formulaDescription,
      mixingInstructions,
      formulaName,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isRTL ? "إنشاء أمر تصنيع" : "Create Manufacturing Order"}
          </h1>
          <p className="text-muted-foreground">
            {isRTL 
              ? "اختر تركيبة المورد، وحدد مراحل سير العمل المتعدد، وستُنشأ ملفات Excel/PDF تلقائياً لكل فريق في السلسلة."
              : "Choose a provider formula, stage the multi-phase manufacturing workflow, and automatically emit Excel/PDF handover files for every team in the chain."
            }
          </p>
        </div>

        {/* Back Button */}
        <Button 
          variant="outline" 
          className="gap-2 mb-6"
          onClick={() => navigate("/manufacturing")}
        >
          <ArrowLeft className="w-4 h-4" />
          {isRTL ? "العودة للوحة التصنيع" : "Back to manufacturing dashboard"}
        </Button>

        {/* Workflow Complexity Alert */}
        <Alert className="mb-6 bg-primary/10 border-primary/20">
          <AlertTitle className="text-primary font-semibold">
            {isRTL ? "تعقيد سير العمل:" : "Workflow complexity:"}
          </AlertTitle>
          <AlertDescription className="text-primary">
            {isRTL 
              ? "كل أمر يمر عبر: التوريد ← الاستلام ← التحضير ← الجودة ← التعبئة ← الإرسال ← التسليم. استخدم هذا النموذج لاختيار تركيبة من الكتالوج، وتسجيل المكونات لكل خطوة، واعتمد على ملفات Excel/PDF المُنشأة عند كل حفظ لإبلاغ الفرق اللاحقة."
              : "every order travels through sourcing → receipt → preparation → quality → packaging → dispatch → delivery. Use this form to select a catalog-based formula, capture components for each step, and rely on the Excel/PDF handoff generated at each save to inform the downstream teams."
            }
          </AlertDescription>
          <a href="#" className="text-primary underline text-sm mt-2 inline-block">
            {isRTL ? "اضغط هنا" : "Click here"} {isRTL ? "للدليل الكامل وأمثلة المستندات المُصدَّرة." : "for a full user guide and examples of the exported documents."}
          </a>
        </Alert>

        {/* Order Fundamentals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isRTL ? "أساسيات الأمر" : "Order Fundamentals"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <Label>{isRTL ? "المورد / العميل" : "Provider / Customer"}</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "اختر المورد" : "Select provider"} />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "الأولوية" : "Priority"}</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">{isRTL ? "عادي" : "Normal"}</SelectItem>
                    <SelectItem value="High">{isRTL ? "عالي" : "High"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "تاريخ الاستحقاق" : "Due date"}</Label>
                <Input 
                  type="date" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>{isRTL ? "حجم الدفعة" : "Batch size"}</Label>
                <Input 
                  placeholder={isRTL ? "إجمالي الوحدات المنتجة" : "Total units to produce"}
                  value={batchSize}
                  onChange={(e) => setBatchSize(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "ملاحظات الأمر" : "Order notes"}</Label>
                <Textarea 
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provider Formula & New Formula Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Provider Formula */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? "تركيبة المورد" : "Provider Formula"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {isRTL 
                  ? "كل مورد يحتفظ بتركيبات فريدة لطلباته. اختر واحدة لإعادة استخدام نسبها، أو ابنِ نسخة مخصصة باستخدام المُنشئ على اليمين."
                  : "Each provider maintains unique formulas for their orders. Pick one to reuse their ratios, or build a bespoke version using the builder on the right."
                }
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{isRTL ? "التركيبة الموجودة" : "Existing formula"}</Label>
                  <Select 
                    value={existingFormula} 
                    onValueChange={setExistingFormula}
                    disabled={!provider}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? "اختر المورد أولاً" : "Select provider first"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formula1">{isRTL ? "تركيبة 1" : "Formula 1"}</SelectItem>
                      <SelectItem value="formula2">{isRTL ? "تركيبة 2" : "Formula 2"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-muted-foreground text-sm">
                  {isRTL 
                    ? "اختر مورداً لمعاينة تركيباته هنا."
                    : "Select a provider to preview their formulas here."
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Formula Builder */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isRTL ? "منشئ التركيبة الجديدة (اختياري)" : "New formula builder (optional)"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {isRTL 
                  ? "حدد تركيبة مخصصة لهذا الأمر. يمكن إعادة استخدام المكونات لاحقاً بحفظ وتعيين التركيبة الناتجة."
                  : "Define a tailored formula for this order. Components can be reused later by saving and assigning the resulting formula."
                }
              </p>

              {/* Components Table */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-start font-medium">
                        {isRTL ? "المكون (المنتج)" : "Component (Product)"}
                      </th>
                      <th className="px-3 py-2 text-start font-medium">
                        {isRTL ? "الكمية / النسبة" : "Quantity / Ratio"}
                      </th>
                      <th className="px-3 py-2 text-start font-medium">
                        {isRTL ? "الوحدة" : "Unit"}
                      </th>
                      <th className="px-3 py-2 text-start font-medium">
                        {isRTL ? "ملاحظات" : "Notes"}
                      </th>
                      <th className="px-3 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component) => (
                      <tr key={component.id} className="border-t">
                        <td className="px-3 py-2">
                          <Select
                            value={component.product}
                            onValueChange={(v) => updateComponent(component.id, "product", v)}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder={isRTL ? "اختر منتج" : "Select product"} />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            className="h-9"
                            placeholder={isRTL ? "مثال: 5 كجم" : "e.g. 5 kg"}
                            value={component.quantity}
                            onChange={(e) => updateComponent(component.id, "quantity", e.target.value)}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            className="h-9"
                            placeholder={isRTL ? "وحدة" : "Unit"}
                            value={component.unit}
                            onChange={(e) => updateComponent(component.id, "unit", e.target.value)}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            className="h-9"
                            placeholder={isRTL ? "ملاحظات" : "Notes"}
                            value={component.notes}
                            onChange={(e) => updateComponent(component.id, "notes", e.target.value)}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeComponent(component.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button variant="outline" size="sm" className="gap-2 mb-6" onClick={addComponent}>
                <Plus className="w-4 h-4" />
                {isRTL ? "إضافة مكون" : "Add component"}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>{isRTL ? "وصف التركيبة" : "Formula description"}</Label>
                  <Textarea 
                    value={formulaDescription}
                    onChange={(e) => setFormulaDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isRTL ? "تعليمات الخلط" : "Mixing instructions"}</Label>
                  <Textarea 
                    value={mixingInstructions}
                    onChange={(e) => setMixingInstructions(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "اسم التركيبة" : "Formula name"}</Label>
                <Input
                  placeholder={isRTL ? "مثال: المورد س - خلطة جافة" : "E.g. Provider X - Dry Blend"}
                  value={formulaName}
                  onChange={(e) => setFormulaName(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button className="gap-2" onClick={handleSubmit}>
            <FileText className="w-4 h-4" />
            {isRTL ? "تسجيل أمر التصنيع" : "Stage manufacturing order"}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-wrap justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>{isRTL ? "الإصدار" : "Version"} 1.0.0</span>
        </div>
      </footer>
    </div>
  );
};

export default CreateOrder;
