import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2 } from "lucide-react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Categories = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", parentCategory: "", description: "" });

  const categories = [
    { id: 29, name: "FM | Filling Materials | خامات تعبئه", parentCategory: "-", description: "-" },
    { id: 7, name: "FP | Final Product | منتج نهائي", parentCategory: "-", description: "منتج نهائي" },
    { id: 30, name: "null", parentCategory: "-", description: "-" },
    { id: 10, name: "PM | Packaging Materials | خامات تغليف", parentCategory: "-", description: "خامات تغليف" },
    { id: 9, name: "RM | Raw Materials | خامات", parentCategory: "-", description: "All Raw materials (Packaging materials, solvents, etc.)" },
    { id: 8, name: "Large Animals", parentCategory: "FP | Final Product | منتج نهائي", description: "-" },
    { id: 24, name: "v", parentCategory: "FP | Final Product | منتج نهائي", description: "-" },
  ];

  const parentCategories = categories.filter(c => c.parentCategory === "-").map(c => c.name);

  const filteredCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEdit = (id: number) => {
    toast({ title: isRTL ? "تعديل الفئة" : "Edit Category", description: `ID: ${id}` });
  };

  const handleDelete = (id: number) => {
    toast({ title: isRTL ? "حذف الفئة" : "Delete Category", description: `ID: ${id}`, variant: "destructive" });
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "اسم الفئة مطلوب" : "Category name is required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isRTL ? "تم الإضافة" : "Added",
      description: isRTL ? "تم إضافة الفئة بنجاح" : "Category added successfully",
    });
    setNewCategory({ name: "", parentCategory: "", description: "" });
    setAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{isRTL ? "الفئات" : "Categories"}</h1>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة فئة" : "Add Category"}
          </Button>
        </div>

        {/* Add Category Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent dir={isRTL ? "rtl" : "ltr"}>
            <DialogHeader>
              <DialogTitle>{isRTL ? "إضافة فئة جديدة" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">{isRTL ? "اسم الفئة" : "Category Name"}</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentCategory">{isRTL ? "الفئة الأم" : "Parent Category"}</Label>
                <Select 
                  value={newCategory.parentCategory} 
                  onValueChange={(val) => setNewCategory({ ...newCategory, parentCategory: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "-- لا يوجد أب --" : "-- No Parent --"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{isRTL ? "-- لا يوجد أب --" : "-- No Parent --"}</SelectItem>
                    {parentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{isRTL ? "الوصف" : "Description"}</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                {isRTL ? "إغلاق" : "Close"}
              </Button>
              <Button onClick={handleAddCategory}>
                {isRTL ? "حفظ الفئة" : "Save Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                    <TableHead>ID</TableHead>
                    <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                    <TableHead>{isRTL ? "الفئة الأم" : "Parent Category"}</TableHead>
                    <TableHead>{isRTL ? "الوصف" : "Description"}</TableHead>
                    <TableHead>{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.parentCategory}</TableCell>
                      <TableCell className="max-w-[300px]">{category.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-blue-500 text-blue-500 hover:bg-blue-50"
                            onClick={() => handleEdit(category.id)}
                          >
                            <Edit className="w-3 h-3" />
                            {isRTL ? "تعديل" : "Edit"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleDelete(category.id)}
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
                  ? `عرض 1 إلى ${filteredCategories.length} من ${filteredCategories.length} سجلات`
                  : `Showing 1 to ${filteredCategories.length} of ${filteredCategories.length} entries`}
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

export default Categories;
