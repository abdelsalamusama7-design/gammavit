import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Search, Eye, FileIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Manufacturing = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const [entriesPerPage, setEntriesPerPage] = useState("25");

  const orders = [
    { 
      id: "MAN-20260113-5G8LH5", 
      provider: isRTL ? "بروكسي" : "Proxy", 
      formula: isRTL ? "بليكس تركيز عالي" : "High Concentration Plex",
      priority: "Normal",
      status: "",
      nextStep: isRTL ? "التوريد والمشتريات" : "Sourcing & Procurement",
      progress: 0,
      totalSteps: 7,
      docs: 2
    },
    { 
      id: "MAN-20260112-80H0GA", 
      provider: isRTL ? "بروكسي" : "Proxy", 
      formula: "Test 1",
      priority: "Normal",
      status: "",
      nextStep: isRTL ? "الاستلام وفحص الجودة" : "Receipt & Quality Check",
      progress: 2,
      totalSteps: 7,
      docs: 6
    },
    { 
      id: "MAN-20260110-4KL2M8", 
      provider: isRTL ? "المصنع الرئيسي" : "Main Factory", 
      formula: isRTL ? "فيتامين مركز" : "Concentrated Vitamin",
      priority: "High",
      status: "in_progress",
      nextStep: isRTL ? "التحضير والخلط" : "Preparation & Mixing",
      progress: 4,
      totalSteps: 7,
      docs: 3
    },
  ];

  const getProgressPercentage = (progress: number, total: number) => {
    return (progress / total) * 100;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isRTL ? "التحكم في التصنيع" : "Manufacturing Control"}
          </h1>
          <p className="text-primary">
            {isRTL 
              ? "تتبع كل أمر تصنيع من الحصول على المواد حتى التحضير والتسليم، مع إنشاء ملفات Excel/PDF تلقائياً عند كل مرحلة انتقالية."
              : "Track every staged order from getting materials through preparation and delivery, with automatic Excel/PDF handoffs at each transition."
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button className="gap-2" onClick={() => navigate("/manufacturing/create")}>
            <Plus className="w-4 h-4" />
            {isRTL ? "أمر تصنيع جديد" : "New Manufacturing Order"}
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            {isRTL ? "تعليمات سير العمل" : "Workflow instructions"}
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="min-w-[200px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "تصفية حسب المورد" : "Filter by provider"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? "الكل" : "All"}</SelectItem>
                    <SelectItem value="proxy">{isRTL ? "بروكسي" : "Proxy"}</SelectItem>
                    <SelectItem value="main">{isRTL ? "المصنع الرئيسي" : "Main Factory"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="min-w-[200px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "كل الحالات" : "All statuses"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? "كل الحالات" : "All statuses"}</SelectItem>
                    <SelectItem value="pending">{isRTL ? "قيد الانتظار" : "Pending"}</SelectItem>
                    <SelectItem value="in_progress">{isRTL ? "قيد التنفيذ" : "In Progress"}</SelectItem>
                    <SelectItem value="completed">{isRTL ? "مكتمل" : "Completed"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
                  <Input 
                    placeholder={isRTL ? "بحث برقم الأمر أو التركيبة" : "Search by order number or formula"} 
                    className={isRTL ? "pr-9" : "pl-9"}
                  />
                </div>
              </div>
              <Button variant="outline">{isRTL ? "تطبيق" : "Apply"}</Button>
              <Button variant="outline">{isRTL ? "إعادة تعيين" : "Reset"}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{isRTL ? "عرض" : "Show"}</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">{isRTL ? "سجل" : "entries"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{isRTL ? "بحث:" : "Search:"}</span>
            <Input className="w-40" />
          </div>
        </div>

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>{isRTL ? "رقم الأمر" : "Order #"}</TableHead>
                  <TableHead>{isRTL ? "المورد" : "Provider"}</TableHead>
                  <TableHead>{isRTL ? "التركيبة" : "Formula"}</TableHead>
                  <TableHead>{isRTL ? "الأولوية" : "Priority"}</TableHead>
                  <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{isRTL ? "الخطوة التالية" : "Next Step"}</TableHead>
                  <TableHead>{isRTL ? "التقدم" : "Progress"}</TableHead>
                  <TableHead>{isRTL ? "المستندات" : "Docs"}</TableHead>
                  <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-primary">{order.id}</TableCell>
                    <TableCell>{order.provider}</TableCell>
                    <TableCell>{order.formula}</TableCell>
                    <TableCell>
                      <Badge variant={order.priority === "High" ? "destructive" : "secondary"}>
                        {order.priority === "High" ? (isRTL ? "عالي" : "High") : (isRTL ? "عادي" : "Normal")}
                      </Badge>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-muted-foreground">{order.nextStep}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 min-w-[100px]">
                        <span className="text-xs text-muted-foreground">
                          {order.progress}/{order.totalSteps} {isRTL ? "خطوات" : "steps"}
                        </span>
                        <Progress 
                          value={getProgressPercentage(order.progress, order.totalSteps)} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{order.docs}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                        {isRTL ? "عرض" : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
          <span className="text-muted-foreground">
            {isRTL 
              ? `عرض 1 إلى ${orders.length} من ${orders.length} سجل`
              : `Showing 1 to ${orders.length} of ${orders.length} entries`
            }
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>
              {isRTL ? "السابق" : "Previous"}
            </Button>
            <Button size="sm" className="min-w-[32px]">1</Button>
            <Button variant="outline" size="sm" disabled>
              {isRTL ? "التالي" : "Next"}
            </Button>
          </div>
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

export default Manufacturing;
