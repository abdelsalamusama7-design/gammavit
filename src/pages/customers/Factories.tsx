import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AddFactoryDialog from "@/components/factories/AddFactoryDialog";

const Factories = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFactoryOpen, setIsAddFactoryOpen] = useState(false);

  const factories = [
    { id: 1, name: "AAAA", contact: "", phone: "", whatsapp: "", notes: "" },
    { id: 2, name: "Activita", contact: "N/A", phone: "011100000", whatsapp: "0111000000", notes: "3" },
    { id: 3, name: "GammaVet", contact: "N/A", phone: "010000000000", whatsapp: "010000000000", notes: "1" },
    { id: 4, name: "Naturous", contact: "N/A", phone: "011000000", whatsapp: "011000000", notes: "2" },
  ];

  // Filter factories based on search
  const filteredFactories = factories.filter(f => 
    searchQuery === "" || 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEntries = filteredFactories.length;
  const startEntry = totalEntries > 0 ? 1 : 0;
  const endEntry = totalEntries;

  const handleEdit = (id: number) => {
    toast.info(isRTL ? `تعديل المصنع رقم: ${id}` : `Editing factory ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    toast.error(isRTL ? `حذف المصنع رقم: ${id}` : `Deleting factory ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            {isRTL ? "المصانع" : "Factories"}
          </h1>
          <Button onClick={() => setIsAddFactoryOpen(true)}>
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة مصنع" : "Add Factory"}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Entries per page and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">{isRTL ? "عرض" : "Show"}</span>
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
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
                  <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isRTL ? "جهة الاتصال" : "Contact"}</TableHead>
                  <TableHead>{isRTL ? "الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isRTL ? "واتساب" : "WhatsApp"}</TableHead>
                  <TableHead>{isRTL ? "ملاحظات" : "Notes"}</TableHead>
                  <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFactories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      {isRTL ? "لا توجد مصانع" : "No factories found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFactories.map((factory) => (
                    <TableRow key={factory.id}>
                      <TableCell className="font-medium">{factory.name}</TableCell>
                      <TableCell>{factory.contact || "-"}</TableCell>
                      <TableCell>{factory.phone || "-"}</TableCell>
                      <TableCell>{factory.whatsapp || "-"}</TableCell>
                      <TableCell className="text-primary">{factory.notes || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(factory.id)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(factory.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <span className="text-sm text-primary">
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

      <AddFactoryDialog
        open={isAddFactoryOpen}
        onOpenChange={setIsAddFactoryOpen}
      />
    </div>
  );
};

export default Factories;
