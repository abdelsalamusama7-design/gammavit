import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Upload, Search, Eye, Edit, Trash2, ImageIcon } from "lucide-react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";

const FinalProducts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [customerFilter, setCustomerFilter] = useState("all");

  const products = [
    { id: "PRD000363", name: "All mectin الامكتين", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "ابو عدي", unitPrice: "0.00", costPrice: "-" },
    { id: "PRD000712", name: "ovi plex اوفي بلكس", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "د.احمد ممدوح", unitPrice: "0.00", costPrice: "-" },
    { id: "PRD000895", name: "E-PLEX اي بليكس", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "د.عصام عدلي", unitPrice: "0.00", costPrice: "-" },
    { id: "PRD000001", name: "para end بارا اند", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "كيور", unitPrice: "0.00", costPrice: "-" },
    { id: "PRD000521", name: "fu zal فيوتشر زال", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "فيوتشر", unitPrice: "0.00", costPrice: "-" },
    { id: "PRD000411", name: "COTO ZAL كاتو زال", type: "Final", category: "FP | Final Product | منتج نهائي", subcategory: "null", customer: "ابو عدي", unitPrice: "0.00", costPrice: "-" },
  ];

  const customers = ["all", "ابو عدي", "د.احمد ممدوح", "د.عصام عدلي", "كيور", "فيوتشر"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCustomer = customerFilter === "all" || product.customer === customerFilter;
    return matchesSearch && matchesCustomer;
  });

  const handleView = (id: string) => {
    toast({ title: isRTL ? "عرض المنتج" : "View Product", description: id });
  };

  const handleEdit = (id: string) => {
    toast({ title: isRTL ? "تعديل المنتج" : "Edit Product", description: id });
  };

  const handleDelete = (id: string) => {
    toast({ title: isRTL ? "حذف المنتج" : "Delete Product", description: id, variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{isRTL ? "المنتجات النهائية" : "Final Products"}</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4" />
              {isRTL ? "رفع مجمع" : "Bulk Upload"}
            </Button>
            <Button>
              <Plus className="w-4 h-4" />
              {isRTL ? "إضافة منتج" : "Add Product"}
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">{isRTL ? "العميل" : "Customer"}</p>
          <div className="flex gap-2 items-center">
            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={isRTL ? "كل العملاء" : "All Customers"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? "كل العملاء" : "All Customers"}</SelectItem>
                {customers.slice(1).map((customer) => (
                  <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              {isRTL ? "فلتر" : "Filter"}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{isRTL ? "عرض" : "Show"}</span>
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">{isRTL ? "سجلات" : "entries"}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{isRTL ? "بحث:" : "Search:"}</span>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>{isRTL ? "الصورة" : "Image"}</TableHead>
                    <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                    <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                    <TableHead>{isRTL ? "الفئة" : "Category"}</TableHead>
                    <TableHead>{isRTL ? "الفئة الفرعية" : "Subcategory"}</TableHead>
                    <TableHead>{isRTL ? "العميل" : "Customer"}</TableHead>
                    <TableHead>{isRTL ? "سعر الوحدة" : "Unit Price"}</TableHead>
                    <TableHead>{isRTL ? "سعر التكلفة" : "Cost Price"}</TableHead>
                    <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center text-muted-foreground">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-xs">{isRTL ? "لا صورة" : "No image"}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary text-primary-foreground">
                          {product.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.subcategory}</TableCell>
                      <TableCell>{product.customer}</TableCell>
                      <TableCell>{product.unitPrice}</TableCell>
                      <TableCell>{product.costPrice}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-blue-500 text-blue-500 hover:bg-blue-50"
                            onClick={() => handleView(product.id)}
                          >
                            <Eye className="w-3 h-3" />
                            {isRTL ? "عرض" : "View"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="w-3 h-3" />
                            {isRTL ? "تعديل" : "Edit"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            {isRTL ? "حذف" : "Delete"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? `عرض 1 إلى ${filteredProducts.length} من ${filteredProducts.length} سجلات`
                  : `Showing 1 to ${filteredProducts.length} of ${filteredProducts.length} entries`}
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinalProducts;
