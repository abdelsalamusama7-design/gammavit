import { useTranslation } from "react-i18next";
import { Plus, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Accounts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const accounts = [
    { id: 1, name: isRTL ? "الصندوق" : "Cash", type: isRTL ? "نقدي" : "Cash", balance: "45,000.00" },
    { id: 2, name: isRTL ? "البنك الأهلي" : "National Bank", type: isRTL ? "بنك" : "Bank", balance: "285,000.00" },
    { id: 3, name: isRTL ? "بنك الرياض" : "Riyadh Bank", type: isRTL ? "بنك" : "Bank", balance: "120,500.00" },
  ];

  const recentTransactions = [
    { id: 1, date: "2024-01-15", description: isRTL ? "تحصيل من عميل" : "Customer Payment", amount: "+12,500.00", type: "credit" },
    { id: 2, date: "2024-01-15", description: isRTL ? "دفع لمورد" : "Supplier Payment", amount: "-8,200.00", type: "debit" },
    { id: 3, date: "2024-01-14", description: isRTL ? "مبيعات نقدية" : "Cash Sales", amount: "+5,800.00", type: "credit" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.accounts")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "حساب جديد" : "New Account"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{account.balance} {t("common.currency")}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "آخر الحركات" : "Recent Transactions"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("orders.date")}</TableHead>
                  <TableHead>{isRTL ? "الوصف" : "Description"}</TableHead>
                  <TableHead>{t("orders.amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell className="font-medium">{tx.description}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "credit" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {tx.amount} {t("common.currency")}
                      </div>
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

export default Accounts;
