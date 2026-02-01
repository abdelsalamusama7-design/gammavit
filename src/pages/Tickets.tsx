import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tickets = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState("25");

  const tickets = [
    { 
      id: 3, 
      title: "Low stock: abdelsalam test", 
      status: "Open",
      priority: "High",
      assigned: "Administrator",
      created: "Jan 1, 2026 8:54 PM"
    },
    { 
      id: 2, 
      title: "Low stock: abdelsalam test", 
      status: "Open",
      priority: "High",
      assigned: "Administrator",
      created: "Jan 1, 2026 8:54 PM"
    },
    { 
      id: 5, 
      title: isRTL ? "طلب شراء بلاستيك x" : "Plastic purchase request x", 
      status: "In_progress",
      priority: "Urgent",
      assigned: "Purchasing Officer",
      created: "Jan 13, 2026 1:46 PM"
    },
    { 
      id: 4, 
      title: isRTL ? "طلب شراء ب ا" : "Purchase request B A", 
      status: "Closed",
      priority: "Urgent",
      assigned: "Production manager",
      created: "Jan 7, 2026 2:56 PM"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-blue-500 hover:bg-blue-500 text-white">{isRTL ? "مفتوح" : "Open"}</Badge>;
      case "In_progress":
        return <Badge className="bg-gray-500 hover:bg-gray-500 text-white">{isRTL ? "قيد التنفيذ" : "In_progress"}</Badge>;
      case "Closed":
        return <Badge className="bg-gray-600 hover:bg-gray-600 text-white">{isRTL ? "مغلق" : "Closed"}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-orange-500 hover:bg-orange-500 text-white">{isRTL ? "عالي" : "High"}</Badge>;
      case "Urgent":
        return <Badge className="bg-red-500 hover:bg-red-500 text-white">{isRTL ? "عاجل" : "Urgent"}</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white">{isRTL ? "متوسط" : "Medium"}</Badge>;
      case "Low":
        return <Badge className="bg-green-500 hover:bg-green-500 text-white">{isRTL ? "منخفض" : "Low"}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {isRTL ? "التذاكر" : "Tickets"}
          </h1>
          <Button className="gap-2" onClick={() => navigate("/tickets/create")}>
            <Plus className="w-4 h-4" />
            {isRTL ? "تذكرة جديدة" : "New Ticket"}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
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
                <Input className="w-48" />
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>{isRTL ? "العنوان" : "Title"}</TableHead>
                    <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                    <TableHead>{isRTL ? "الأولوية" : "Priority"}</TableHead>
                    <TableHead>{isRTL ? "المكلف" : "Assigned"}</TableHead>
                    <TableHead>{isRTL ? "تاريخ الإنشاء" : "Created"}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell className="text-muted-foreground">{ticket.assigned}</TableCell>
                      <TableCell className="text-muted-foreground">{ticket.created}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {isRTL ? "فتح" : "Open"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground">
                {isRTL 
                  ? `عرض 1 إلى ${tickets.length} من ${tickets.length} سجل`
                  : `Showing 1 to ${tickets.length} of ${tickets.length} entries`
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
          </CardContent>
        </Card>
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

export default Tickets;
