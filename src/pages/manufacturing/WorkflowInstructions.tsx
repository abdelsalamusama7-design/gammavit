import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WorkflowInstructions = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1000px] mx-auto px-4 py-6 w-full">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigate("/manufacturing")}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          {isRTL ? "العودة إلى التصنيع" : "Back to Manufacturing"}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isRTL ? "دليل سير عمل التصنيع" : "Manufacturing Workflow Guide"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Introduction */}
            <p className="text-muted-foreground">
              {isRTL 
                ? "تشرح هذه الصفحة كيف يقوم وحدة التصنيع في Gamma-Vet بتنظيم الطلبات، وإنشاء التركيبات من كتالوج المنتجات الموجود، وإنتاج ملفات Excel/PDF التي ترافق العمل."
                : "This page explains how the GammaVet manufacturing module stages orders, generates formulas from your existing product catalog, and produces the Excel/PDF handoffs that travel with the work."
              }
            </p>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                {isRTL ? "1. ما تقوم بإعداده في \"إنشاء أمر تصنيع\"" : "1. What you set up in \"Create Manufacturing Order\""}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>
                  {isRTL 
                    ? <>اختر عميل/مورد. قائمة التركيبات مفلترة حسب ما لديهم بالفعل، أو يمكنك بناء تركيبة جديدة باختيار منتجات الكتالوج لكل مكون.</>
                    : <>Select a customer/provider. The list of formulas is filtered to the ones they already have, or you can build a new formula by picking catalog products for each component.</>
                  }
                </li>
                <li>
                  {isRTL 
                    ? "كل صف مكون يتطلب الآن اختيار منتج من الكتالوج حتى يبقى التتبع متسقاً مع المخزون."
                    : "Each component row now requires selecting a catalog product so traceability stays consistent with inventory."
                  }
                </li>
                <li>
                  {isRTL 
                    ? <>يمكنك تعيين الأولويات، حجم الدفعة، تاريخ الاستحقاق، والملاحظات؛ كل أمر يحصل على رقم فريد <span className="text-primary font-mono">MAN-yyyyMMdd-XXXXXX</span>.</>
                    : <>You can assign priorities, batch size, due date, and notes; every order gets a unique <span className="text-primary font-mono">MAN-yyyyMMdd-XXXXXX</span> number.</>
                  }
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                {isRTL ? "2. كيف يعمل سير العمل المكون من سبع مراحل" : "2. How the seven-stage workflow works"}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mr-4">
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "التوريد والمشتريات." : "Sourcing & Procurement."}</span>{" "}
                  {isRTL 
                    ? "تأكيد الموردين، طلب العينات، وإنشاء أوامر الشراء. توثيق مهل التسليم المتفق عليها."
                    : "Confirm suppliers, request samples, and create POs. Document approved lead times."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "الاستلام وفحص الجودة." : "Receipt & Quality Check."}</span>{" "}
                  {isRTL 
                    ? "استلام المواد، التحقق من الكميات، تسجيل فحوصات ضمان الجودة، وإطلاقها للإنتاج."
                    : "Receive materials, verify quantities, log QA inspections, and release them to production."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "التحضير والخلط." : "Preparation & Mixing."}</span>{" "}
                  {isRTL 
                    ? "خلط التركيبة، تسجيل النسب/درجات الحرارة، وتجهيز الخليط لضمان الجودة."
                    : "Blend the formula, record ratios/temperatures, and stage the blended mix for QA."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "التحقق من الجودة." : "Quality Validation."}</span>{" "}
                  {isRTL 
                    ? "تنفيذ اختبارات أثناء العملية، ضبط المعايير، والتحقق من الامتثال قبل التعبئة."
                    : "Execute in-process tests, adjust parameters, and verify compliance before packaging."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "التعبئة والتغليف." : "Packaging & Labeling."}</span>{" "}
                  {isRTL 
                    ? "تعبئة الدفعة، طباعة الملصقات، وتجهيزها حسب تعليمات التسليم."
                    : "Package the batch, print labels, and stage it per delivery instructions."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "تحضير الإرسال." : "Dispatch Prep."}</span>{" "}
                  {isRTL 
                    ? "تجهيز النقل، المستندات (الجمارك، الشهادات)، وتعليمات المناولة الخاصة."
                    : "Ready the transportation, documents (customs, certificates), and special handling instructions."
                  }
                </li>
                <li>
                  <span className="font-medium text-foreground">{isRTL ? "التسليم وتسليم العميل." : "Delivery & Client Handover."}</span>{" "}
                  {isRTL 
                    ? "إطلاق الشحنة، إرفاق ملاحظات التسليم النهائية، وتسجيل أي متابعة مطلوبة."
                    : "Release the shipment, attach final delivery notes, and capture any outstanding follow-up."
                  }
                </li>
              </ol>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                {isRTL ? "3. مستندات Excel / PDF" : "3. Excel / PDF handoff documents"}
              </h2>
              <p className="text-muted-foreground">
                {isRTL 
                  ? "في كل مرة يتم حفظ خطوة، يقوم النظام بكتابة:"
                  : "Every time a step is saved, the module writes:"
                }
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>
                  {isRTL 
                    ? <>ملف <span className="font-medium text-foreground">Excel (.xls)</span> يحتوي على لقطة من رقم الأمر، المورد، الأولوية، التعليمات، وجدول المكونات.</>
                    : <>An <span className="font-medium text-foreground">Excel-compatible (.xls)</span> snapshot containing the order number, provider, priority, instructions, and component table.</>
                  }
                </li>
                <li>
                  {isRTL 
                    ? <>ملف <span className="font-medium text-foreground">PDF</span> بنفس التفاصيل بالإضافة إلى تذكيرات خاصة بالخطوة للفريق التالي.</>
                    : <>A <span className="font-medium text-foreground">PDF</span> rendered via TCPDF with the same details plus the step-specific reminders for the next team.</>
                  }
                </li>
              </ul>
              <p className="text-sm text-primary">
                {isRTL 
                  ? <>الملفات مخزنة في <span className="font-mono">assets/uploads/manufacturing/{"{ORDER_NUMBER}"}/{"{STEP_KEY}"}/</span> ومرتبطة من صفحة تفاصيل الأمر. استخدم أزرار التحميل للحصول على أحدث الملفات.</>
                  : <>Files are stored under <span className="font-mono">assets/uploads/manufacturing/{"{ORDER_NUMBER}"}/{"{STEP_KEY}"}/</span> and linked from the order detail page. Use the download buttons to hand over the latest files.</>
                }
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                {isRTL ? "4. نصائح للمستخدمين" : "4. Tips for users"}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>
                  {isRTL 
                    ? "تقدم للأمام عبر الخطوات. الخطوة التالية ستظهر كـ \"معلقة\" حتى يتم إكمال الخطوة السابقة، مما يضمن المساءلة الخطية."
                    : "Work forwards through the steps. The next step will show as \"pending\" until the previous one is completed, ensuring linear accountability."
                  }
                </li>
                <li>
                  {isRTL 
                    ? "أرفق الملاحظات دائماً قبل النقر على \"حفظ الخطوة\". هذا النص يظهر في كلا المستندين ويبقي التسليم التالي مُعلماً."
                    : "Always attach notes before clicking \"Save step\". That text appears in both documents and keeps the next hand-off informed."
                  }
                </li>
                <li>
                  {isRTL 
                    ? "استخدم بطاقة \"الجدول الزمني لسير العمل\" في عرض الأمر لمعرفة الخطوة الحالية، عدد الملفات لكل خطوة، ووصف كل مرحلة."
                    : "Use the \"Workflow timeline\" card on the order view to see which step is current, how many files exist per step, and the descriptions of each phase."
                  }
                </li>
              </ul>
            </div>

            {/* Footer note */}
            <p className="text-sm text-muted-foreground border-t pt-4">
              {isRTL 
                ? <>هل تحتاج المزيد من السياق؟ ارجع إلى لوحة تحكم التصنيع وانقر على زر <span className="font-medium text-foreground">تعليمات سير العمل</span> لهذا الدليل، أو تواصل مع مسؤول العمليات.</>
                : <>Need more context? Go back to the manufacturing dashboard and click the <span className="font-medium text-foreground">Workflow instructions</span> button for this guide, or contact the operations lead.</>
              }
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WorkflowInstructions;
