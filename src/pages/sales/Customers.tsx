import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Building2, FileSpreadsheet, Eye, Pencil, Users, Wallet, Lock, MessageCircle, Trash2, Settings } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AddCustomerDialog from "@/components/customers/AddCustomerDialog";

const Customers = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(isRTL ? `تم اختيار الملف: ${file.name}` : `File selected: ${file.name}`);
      // Here you would process the CSV file
    }
    // Reset input to allow selecting the same file again
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
    }
  };

  const customers = [
    { id: 2, name: "Eslam 1", type: "Factory", factory: "GammaVet", email: "", phone: "01000000000", walletBalance: "0.00" },
    { id: 1, name: "omar Magdy", type: "Factory", factory: "Naturous", email: "omar.adapq32@dslapl.com", phone: "01554945448", walletBalance: "6,000.00" },
    { id: 8, name: isRTL ? "ابو الليف" : "Abo Elleif", type: "Factory", factory: "Naturous", email: "", phone: "01212123457", walletBalance: "0.00" },
    { id: 7, name: isRTL ? "ابو عدي" : "Abo Ady", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 6, name: isRTL ? "الشيخ مصطفي" : "El Sheikh Mostafa", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 4, name: isRTL ? "بروكسي" : "Proxy", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 21, name: isRTL ? "د.ابراهيم" : "Dr. Ibrahim", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 11, name: isRTL ? "د.احمد عنب" : "Dr. Ahmed Enab", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 16, name: isRTL ? "د.احمد ممدوح" : "Dr. Ahmed Mamdouh", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 26, name: isRTL ? "د.اسلام مبارك" : "Dr. Islam Mubarak", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 18, name: isRTL ? "د.حمادي" : "Dr. Hamady", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
    { id: 24, name: isRTL ? "د.طه" : "Dr. Taha", type: "Factory", factory: "N/A", email: "", phone: "", walletBalance: "0.00" },
  ];

  // Filter customers based on search
  const filteredCustomers = customers.filter(c => 
    searchQuery === "" || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const totalEntries = filteredCustomers.length;
  const startEntry = totalEntries > 0 ? 1 : 0;
  const endEntry = totalEntries;

  const handleAction = (action: string, customerId: number) => {
    toast.info(`${action} for customer ID: ${customerId}`);
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
              {isRTL ? "العملاء" : "Customers"}
            </span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Building2 className="w-4 h-4" />
              {isRTL ? "إدارة المصانع" : "Manage Factories"}
            </Button>
            <input
              type="file"
              ref={csvInputRef}
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="text-primary border-primary hover:bg-primary/10"
              onClick={() => csvInputRef.current?.click()}
            >
              <FileSpreadsheet className="w-4 h-4" />
              {isRTL ? "نموذج CSV" : "Sample CSV"}
            </Button>
            <Button onClick={() => setIsAddCustomerOpen(true)}>
              <Plus className="w-4 h-4" />
              {isRTL ? "إضافة عميل" : "Add Customer"}
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
                  <TableHead>{isRTL ? "الرقم" : "ID"}</TableHead>
                  <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                  <TableHead>{isRTL ? "المصنع" : "Factory"}</TableHead>
                  <TableHead>{isRTL ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead>{isRTL ? "الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isRTL ? "رصيد المحفظة" : "Wallet Balance"}</TableHead>
                  <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {isRTL ? "لا يوجد عملاء" : "No customers found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-primary">
                          {isRTL ? "مصنع" : "Factory"}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.factory}</TableCell>
                      <TableCell>{customer.email || "-"}</TableCell>
                      <TableCell>{customer.phone || "-"}</TableCell>
                      <TableCell>{customer.walletBalance}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                              {isRTL ? "الإجراءات" : "Actions"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={isRTL ? "start" : "end"}>
                            <DropdownMenuItem onClick={() => handleAction("View", customer.id)}>
                              <Eye className="w-4 h-4" />
                              {isRTL ? "عرض" : "View"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Edit", customer.id)}>
                              <Pencil className="w-4 h-4" />
                              {isRTL ? "تعديل" : "Edit"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Contacts", customer.id)}>
                              <Users className="w-4 h-4" />
                              {isRTL ? "جهات الاتصال" : "Contacts"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Wallet", customer.id)}>
                              <Wallet className="w-4 h-4" />
                              {isRTL ? "المحفظة" : "Wallet"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Portal Access", customer.id)}>
                              <Lock className="w-4 h-4" />
                              {isRTL ? "الوصول للبوابة" : "Portal Access"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("WhatsApp Portal Link", customer.id)}>
                              <MessageCircle className="w-4 h-4" />
                              {isRTL ? "رابط واتساب للبوابة" : "WhatsApp Portal Link"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleAction("Delete", customer.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                              {isRTL ? "حذف" : "Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      <AddCustomerDialog
        open={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
      />
    </div>
  );
};

export default Customers;
