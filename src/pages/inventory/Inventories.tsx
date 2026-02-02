import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeftRight, Eye, Pencil, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AddInventoryDialog from "@/components/inventories/AddInventoryDialog";

const Inventories = () => {
  const navigate = useNavigate();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);

  const inventories = [
    { id: 10, name: "DA | مخزن تالف | A4", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 6, name: "FP | مخزن منتج نهائي | A2", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 8, name: "PP | مخزن منتج اولي | B2", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 1, name: "RM | خامات خارجي", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 4, name: "RM | رئيسي | A1", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 7, name: "RM | مخزن معمل تصنيع بودر | C1", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 5, name: "RM | معمل تصنيع حقن | B1", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 9, name: "RP | مخزن مرتجعات | A3", location: isRTL ? "العاشر من رمضان" : "10th of Ramadan", status: "Active" },
    { id: 2, name: isRTL ? "السادات" : "Sadat", location: isRTL ? "مدينة السادات" : "Sadat City", status: "Active" },
  ];

  // Filter inventories based on search
  const filteredInventories = inventories.filter(inv => 
    searchQuery === "" || 
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEntries = filteredInventories.length;
  const startEntry = totalEntries > 0 ? 1 : 0;
  const endEntry = totalEntries;

  const handleView = (id: number) => {
    toast.info(isRTL ? `عرض المخزن رقم: ${id}` : `Viewing inventory ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    toast.info(isRTL ? `تعديل المخزن رقم: ${id}` : `Editing inventory ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    toast.error(isRTL ? `حذف المخزن رقم: ${id}` : `Deleting inventory ID: ${id}`);
  };

  const handleAddInventory = () => {
    setAddDialogOpen(true);
  };

  const handleTransferItems = () => {
    navigate("/inventories/transfer");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <AddInventoryDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            {isRTL ? "المخازن" : "Inventories"}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAddInventory}>
              <Plus className="w-4 h-4" />
              {isRTL ? "إضافة مخزن" : "Add Inventory"}
            </Button>
            <Button variant="secondary" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleTransferItems}>
              <ArrowLeftRight className="w-4 h-4" />
              {isRTL ? "تحويل العناصر" : "Transfer Items"}
            </Button>
          </div>
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
                  <TableHead>{isRTL ? "الرقم" : "ID"}</TableHead>
                  <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isRTL ? "الموقع" : "Location"}</TableHead>
                  <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {isRTL ? "لا توجد مخازن" : "No inventories found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventories.map((inventory) => (
                    <TableRow key={inventory.id}>
                      <TableCell>{inventory.id}</TableCell>
                      <TableCell className="font-medium">{inventory.name}</TableCell>
                      <TableCell>{inventory.location}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {isRTL ? "نشط" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(inventory.id)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="w-3 h-3" />
                            {isRTL ? "عرض" : "View"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(inventory.id)}
                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                          >
                            <Pencil className="w-3 h-3" />
                            {isRTL ? "تعديل" : "Edit"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(inventory.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                            {isRTL ? "حذف" : "Delete"}
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
    </div>
  );
};

export default Inventories;
