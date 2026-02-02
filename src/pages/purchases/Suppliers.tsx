import { useTranslation } from "react-i18next";
import { Plus, Search, Phone, Mail, Building } from "lucide-react";
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

const Suppliers = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const suppliers = [
    { id: 1, name: isRTL ? "شركة المواد الأولية" : "Raw Materials Co.", phone: "+20 10 1112 2223", email: "info@rawmat.com", balance: "25,000.00" },
    { id: 2, name: isRTL ? "مصنع التغليف" : "Packaging Factory", phone: "+20 11 3334 4445", email: "sales@packfactory.com", balance: "8,500.00" },
    { id: 3, name: isRTL ? "موردين الكيماويات" : "Chemical Suppliers", phone: "+20 12 5556 6667", email: "orders@chemsup.com", balance: "42,000.00" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">{t("nav.suppliers")}</h1>
          <Button>
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة مورد" : "Add Vendor"}
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
                  <TableHead>{isRTL ? "المورد" : "Supplier"}</TableHead>
                  <TableHead>{isRTL ? "الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isRTL ? "البريد" : "Email"}</TableHead>
                  <TableHead>{isRTL ? "المستحقات" : "Balance Due"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{supplier.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {supplier.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {supplier.email}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.balance} {t("common.currency")}</TableCell>
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

export default Suppliers;
