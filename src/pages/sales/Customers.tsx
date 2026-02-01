import { useTranslation } from "react-i18next";
import { Plus, Search, Phone, Mail } from "lucide-react";
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

const Customers = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const customers = [
    { id: 1, name: isRTL ? "أحمد محمد" : "Ahmed Mohamed", phone: "+20 10 1234 5678", email: "ahmed@example.com", balance: "12,500.00" },
    { id: 2, name: isRTL ? "سارة علي" : "Sara Ali", phone: "+20 11 2345 6789", email: "sara@example.com", balance: "0.00" },
    { id: 3, name: isRTL ? "شركة الفجر" : "Al-Fajr Co.", phone: "+20 12 3456 7890", email: "info@alfajr.com", balance: "45,000.00" },
    { id: 4, name: isRTL ? "مؤسسة النور" : "Al-Nour Est.", phone: "+20 10 4567 8901", email: "contact@alnour.com", balance: "8,200.00" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.customers")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "عميل جديد" : "New Customer"}
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
                  <TableHead>{isRTL ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isRTL ? "الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isRTL ? "البريد" : "Email"}</TableHead>
                  <TableHead>{isRTL ? "الرصيد" : "Balance"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell>{customer.balance} {t("common.currency")}</TableCell>
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

export default Customers;
