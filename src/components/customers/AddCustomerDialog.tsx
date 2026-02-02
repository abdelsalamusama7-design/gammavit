import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCustomers } from "@/contexts/CustomersContext";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCustomerDialog = ({ open, onOpenChange }: AddCustomerDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { addCustomer } = useCustomers();

  // Basic Info
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [factory, setFactory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [initialWalletBalance, setInitialWalletBalance] = useState("0");

  // Primary Contact
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Address
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Documents
  const [notes, setNotes] = useState("");

  const factories = [
    { id: "", name: isRTL ? "-- غير محدد --" : "-- Not Assigned --" },
    { id: "1", name: "GammaVet" },
    { id: "2", name: "Naturous" },
  ];

  const getFactoryName = (factoryId: string) => {
    const f = factories.find(f => f.id === factoryId);
    return f?.name || "N/A";
  };

  const handleSave = () => {
    if (!customerName.trim()) {
      toast.error(isRTL ? "يرجى إدخال اسم العميل" : "Please enter customer name");
      return;
    }
    if (!customerType) {
      toast.error(isRTL ? "يرجى اختيار نوع العميل" : "Please select customer type");
      return;
    }
    if (!phone.trim()) {
      toast.error(isRTL ? "يرجى إدخال رقم الهاتف" : "Please enter phone number");
      return;
    }

    // Add customer to context
    addCustomer({
      name: customerName,
      type: customerType === "factory" ? "Factory" : "Representative",
      factoryId: factory || "3",
      factoryName: getFactoryName(factory || "3"),
      email: email,
      phone: phone,
      walletBalance: initialWalletBalance || "0.00",
      contacts: contactName ? [contactName] : [customerName],
    });

    toast.success(isRTL ? "تم حفظ العميل بنجاح" : "Customer saved successfully");
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setCustomerName("");
    setCustomerType("");
    setFactory("");
    setEmail("");
    setPhone("");
    setTaxNumber("");
    setInitialWalletBalance("0");
    setContactName("");
    setContactPosition("");
    setContactEmail("");
    setContactPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isRTL ? "إضافة عميل جديد" : "Add New Customer"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">
              {isRTL ? "المعلومات الأساسية" : "Basic Info"}
            </TabsTrigger>
            <TabsTrigger value="contact">
              {isRTL ? "جهة الاتصال الرئيسية" : "Primary Contact"}
            </TabsTrigger>
            <TabsTrigger value="address">
              {isRTL ? "العنوان" : "Address"}
            </TabsTrigger>
            <TabsTrigger value="documents">
              {isRTL ? "المستندات" : "Documents"}
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "اسم العميل*" : "Customer Name*"}</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isRTL ? "أدخل اسم العميل" : "Enter customer name"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "نوع العميل*" : "Customer Type*"}</Label>
                <Select value={customerType} onValueChange={setCustomerType}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "-- اختر النوع --" : "-- Select Type --"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="representative">
                      {isRTL ? "مندوب" : "Representative"}
                    </SelectItem>
                    <SelectItem value="factory">
                      {isRTL ? "مصنع" : "Factory"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "المصنع" : "Factory"}</Label>
              <Select value={factory} onValueChange={setFactory}>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? "-- غير محدد --" : "-- Not Assigned --"} />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {factories.map((f) => (
                    <SelectItem key={f.id || "none"} value={f.id || "none"}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {isRTL ? "يتحكم في المصنع الذي يظهر على الفواتير." : "Controls which factory appears on invoices."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? "example@email.com" : "example@email.com"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "الهاتف*" : "Phone*"}</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isRTL ? "أدخل رقم الهاتف" : "Enter phone number"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "الرقم الضريبي" : "Tax Number"}</Label>
                <Input
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder={isRTL ? "أدخل الرقم الضريبي" : "Enter tax number"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "رصيد المحفظة الابتدائي" : "Initial Wallet Balance"}</Label>
                <Input
                  type="number"
                  min="0"
                  value={initialWalletBalance}
                  onChange={(e) => setInitialWalletBalance(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Primary Contact Tab */}
          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "اسم جهة الاتصال" : "Contact Name"}</Label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={isRTL ? "أدخل اسم جهة الاتصال" : "Enter contact name"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "المنصب" : "Position"}</Label>
                <Input
                  value={contactPosition}
                  onChange={(e) => setContactPosition(e.target.value)}
                  placeholder={isRTL ? "أدخل المنصب" : "Enter position"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={isRTL ? "example@email.com" : "example@email.com"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "الهاتف" : "Phone"}</Label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder={isRTL ? "أدخل رقم الهاتف" : "Enter phone number"}
                />
              </div>
            </div>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>{isRTL ? "العنوان - السطر 1" : "Address Line 1"}</Label>
              <Input
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder={isRTL ? "الشارع، رقم المبنى" : "Street, Building number"}
              />
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "العنوان - السطر 2" : "Address Line 2"}</Label>
              <Input
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder={isRTL ? "الشقة، الطابق (اختياري)" : "Apartment, Floor (optional)"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "المدينة" : "City"}</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={isRTL ? "أدخل المدينة" : "Enter city"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "المحافظة/الولاية" : "State/Province"}</Label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={isRTL ? "أدخل المحافظة" : "Enter state"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "الرمز البريدي" : "Postal Code"}</Label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder={isRTL ? "أدخل الرمز البريدي" : "Enter postal code"}
                />
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "الدولة" : "Country"}</Label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={isRTL ? "أدخل الدولة" : "Enter country"}
                />
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "صورة البطاقة الضريبية (PDF/صورة)" : "Tax Registration Scan (PDF/Image)"}</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  {isRTL ? "رفع اختياري؛ مرتبط بحقل الرقم الضريبي." : "Optional upload; links to the tax number field."}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? "صورة السجل التجاري" : "Commercial Registration Scan"}</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="cursor-pointer"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {isRTL 
                ? "يتم تخزين الملفات بشكل آمن تحت مستندات العميل للرجوع إليها لاحقاً."
                : "Files are stored securely under customer documents for later reference."
              }
            </p>
          </TabsContent>
        </Tabs>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="secondary" onClick={handleClose}>
            {isRTL ? "إغلاق" : "Close"}
          </Button>
          <Button onClick={handleSave}>
            {isRTL ? "حفظ العميل" : "Save Customer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;
