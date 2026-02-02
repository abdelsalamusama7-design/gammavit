import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const Quotations = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);

  const quotations = [
    { id: 1, customer: "omar Magdy", date: "Jan 12, 2026", expiry: "Feb 11, 2026", amount: "0.00", status: "sent", order: "N/A" },
    { id: 2, customer: isRTL ? "شركة الفجر" : "Al-Fajr Co.", date: "Jan 15, 2026", expiry: "Feb 14, 2026", amount: "45,000.00", status: "open", order: "N/A" },
    { id: 3, customer: isRTL ? "مؤسسة النور" : "Al-Nour Est.", date: "Jan 10, 2026", expiry: "Feb 09, 2026", amount: "28,500.00", status: "accepted", order: "ORD-001" },
    { id: 4, customer: isRTL ? "شركة الأمل" : "Al-Amal Co.", date: "Jan 08, 2026", expiry: "Feb 07, 2026", amount: "62,000.00", status: "expired", order: "N/A" },
  ];

  const customers = [
    { id: "all", name: isRTL ? "جميع العملاء" : "All Customers" },
    { id: "1", name: "omar Magdy" },
    { id: "2", name: isRTL ? "شركة الفجر" : "Al-Fajr Co." },
    { id: "3", name: isRTL ? "مؤسسة النور" : "Al-Nour Est." },
    { id: "4", name: isRTL ? "شركة الأمل" : "Al-Amal Co." },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      sent: "default",
      open: "secondary",
      accepted: "default",
      expired: "destructive",
    };
    const labels: Record<string, string> = {
      sent: isRTL ? "مرسل" : "Sent",
      open: isRTL ? "مفتوح" : "Open",
      accepted: isRTL ? "مقبول" : "Accepted",
      expired: isRTL ? "منتهي" : "Expired",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const handleFilter = () => {
    // Filter logic would go here
    console.log("Filtering with:", { statusFilter, customerFilter, fromDate, toDate });
  };

  const handleReset = () => {
    setStatusFilter("all");
    setCustomerFilter("all");
    setFromDate("");
    setToDate("");
    setSearchQuery("");
  };

  // Filter quotations based on search
  const filteredQuotations = quotations.filter(q => 
    searchQuery === "" || 
    q.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEntries = filteredQuotations.length;
  const startEntry = totalEntries > 0 ? 1 : 0;
  const endEntry = totalEntries;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">
          {isRTL ? "إدارة عروض الأسعار" : "Quotation Management"}
        </h1>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {isRTL ? "قائمة عروض الأسعار" : "Quotation List"}
              </CardTitle>
              <Button onClick={() => navigate("/quotations/create")}>
                {isRTL ? "عرض سعر جديد" : "New Quotation"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <Label>{isRTL ? "الحالة" : "Status"}</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "جميع الحالات" : "All Statuses"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? "جميع الحالات" : "All Statuses"}</SelectItem>
                    <SelectItem value="sent">{isRTL ? "مرسل" : "Sent"}</SelectItem>
                    <SelectItem value="open">{isRTL ? "مفتوح" : "Open"}</SelectItem>
                    <SelectItem value="accepted">{isRTL ? "مقبول" : "Accepted"}</SelectItem>
                    <SelectItem value="expired">{isRTL ? "منتهي" : "Expired"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label>{isRTL ? "العميل" : "Customer"}</Label>
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "جميع العملاء" : "All Customers"} />
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

              {/* From Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "من تاريخ" : "From Date"}</Label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </div>

              {/* To Date */}
              <div className="space-y-2">
                <Label>{isRTL ? "إلى تاريخ" : "To Date"}</Label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>

            {/* Filter & Reset Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleFilter}>
                {isRTL ? "تصفية" : "Filter"}
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                {isRTL ? "إعادة تعيين" : "Reset"}
              </Button>
            </div>

            {/* Entries per page and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">{isRTL ? "عرض" : "Show"}</span>
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
                <span className="text-sm">{isRTL ? "سجلات" : "entries"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">{isRTL ? "بحث:" : "Search:"}</Label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>{isRTL ? "العميل" : "Customer"}</TableHead>
                  <TableHead>{isRTL ? "التاريخ" : "Date"}</TableHead>
                  <TableHead>{isRTL ? "انتهاء الصلاحية" : "Expiry"}</TableHead>
                  <TableHead>{isRTL ? "المبلغ" : "Amount"}</TableHead>
                  <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{isRTL ? "الطلب" : "Order"}</TableHead>
                  <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {isRTL ? "لا توجد عروض أسعار" : "No quotations found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotations.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell>{q.id}</TableCell>
                      <TableCell>{q.customer}</TableCell>
                      <TableCell>{q.date}</TableCell>
                      <TableCell>{q.expiry}</TableCell>
                      <TableCell>{q.amount}</TableCell>
                      <TableCell>{getStatusBadge(q.status)}</TableCell>
                      <TableCell>{q.order}</TableCell>
                      <TableCell>
                        <Button variant="default" size="sm">
                          {isRTL ? "عرض" : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">
                {isRTL 
                  ? `عرض ${startEntry} إلى ${endEntry} من ${totalEntries} سجلات`
                  : `Showing ${startEntry} to ${endEntry} of ${totalEntries} entries`
                }
              </span>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  {isRTL ? "السابق" : "Previous"}
                </Button>
                <Button variant="default" size="sm" className="min-w-[32px]">
                  {currentPage}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={endEntry >= totalEntries}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  {isRTL ? "التالي" : "Next"}
                </Button>
              </div>
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

export default Quotations;
