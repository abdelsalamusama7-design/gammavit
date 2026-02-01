import { useTranslation } from "react-i18next";
import { Plus, Search, Receipt } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Expenses = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const expenses = [
    { id: "EXP-001", category: isRTL ? "رواتب" : "Salaries", description: isRTL ? "رواتب شهر يناير" : "January Salaries", amount: "85,000.00", date: "2024-01-15", status: "paid" },
    { id: "EXP-002", category: isRTL ? "إيجار" : "Rent", description: isRTL ? "إيجار المصنع" : "Factory Rent", amount: "25,000.00", date: "2024-01-01", status: "paid" },
    { id: "EXP-003", category: isRTL ? "مرافق" : "Utilities", description: isRTL ? "فاتورة الكهرباء" : "Electricity Bill", amount: "8,500.00", date: "2024-01-10", status: "pending" },
    { id: "EXP-004", category: isRTL ? "صيانة" : "Maintenance", description: isRTL ? "صيانة المعدات" : "Equipment Maintenance", amount: "3,200.00", date: "2024-01-12", status: "paid" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.expenses")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "مصروف جديد" : "New Expense"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="relative max-w-md">
              <Search className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`} />
              <Input 
                placeholder={isRTL ? "بحث..." : "Search..."} 
                className={isRTL ? "pr-9" : "pl-9"}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isRTL ? "الرقم" : "ID"}</TableHead>
                  <TableHead>{isRTL ? "التصنيف" : "Category"}</TableHead>
                  <TableHead>{isRTL ? "الوصف" : "Description"}</TableHead>
                  <TableHead>{t("orders.amount")}</TableHead>
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{t("orders.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        {expense.category}
                      </div>
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount} {t("common.currency")}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <Badge variant={expense.status === "paid" ? "default" : "secondary"}>
                        {expense.status === "paid" ? (isRTL ? "مدفوع" : "Paid") : (isRTL ? "معلق" : "Pending")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Expenses;
