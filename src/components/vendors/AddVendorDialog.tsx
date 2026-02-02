import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddVendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddVendorDialog = ({ open, onOpenChange }: AddVendorDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Basic Info
  const [vendorName, setVendorName] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [email, setEmail] = useState("");
  const [taxNumber, setTaxNumber] = useState("");

  // Primary Contact
  const [contactName, setContactName] = useState("");
  const [position, setPosition] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Address
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  const resetForm = () => {
    setVendorName("");
    setVendorType("");
    setEmail("");
    setTaxNumber("");
    setContactName("");
    setPosition("");
    setContactEmail("");
    setContactPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setStateProvince("");
    setPostalCode("");
    setCountry("");
    setIsDefaultAddress(true);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSave = () => {
    // Validation
    if (!vendorName.trim()) {
      toast.error(isRTL ? "اسم المورد مطلوب" : "Vendor Name is required");
      return;
    }
    if (!vendorType) {
      toast.error(isRTL ? "نوع المورد مطلوب" : "Vendor Type is required");
      return;
    }
    if (!contactName.trim()) {
      toast.error(isRTL ? "اسم جهة الاتصال مطلوب" : "Contact Name is required");
      return;
    }
    if (!contactPhone.trim()) {
      toast.error(isRTL ? "هاتف جهة الاتصال مطلوب" : "Contact Phone is required");
      return;
    }
    if (!addressLine1.trim()) {
      toast.error(isRTL ? "العنوان مطلوب" : "Address Line 1 is required");
      return;
    }
    if (!country.trim()) {
      toast.error(isRTL ? "الدولة مطلوبة" : "Country is required");
      return;
    }

    // Save logic here
    toast.success(isRTL ? "تم حفظ المورد بنجاح" : "Vendor saved successfully");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{isRTL ? "إضافة مورد جديد" : "Add New Vendor"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basic" className="text-primary">
              {isRTL ? "المعلومات الأساسية" : "Basic Info"}
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-primary">
              {isRTL ? "جهة الاتصال" : "Primary Contact"}
            </TabsTrigger>
            <TabsTrigger value="address" className="text-primary">
              {isRTL ? "العنوان" : "Address"}
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "اسم المورد" : "Vendor Name"}*</Label>
                <Input
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "نوع المورد" : "Vendor Type"}*</Label>
                <Select value={vendorType} onValueChange={setVendorType}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? "-- اختر النوع --" : "-- Select Type --"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">{isRTL ? "مورد" : "Supplier"}</SelectItem>
                    <SelectItem value="service">{isRTL ? "خدمات" : "Service"}</SelectItem>
                    <SelectItem value="logistics">{isRTL ? "لوجستيات" : "Logistics"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "البريد الإلكتروني" : "Email"}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "الرقم الضريبي" : "Tax Number"}</Label>
              <Input
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                placeholder="0"
              />
            </div>
          </TabsContent>

          {/* Primary Contact Tab */}
          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "اسم جهة الاتصال" : "Contact Name"}*</Label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "المنصب" : "Position"}</Label>
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "البريد الإلكتروني" : "Contact Email"}</Label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "الهاتف" : "Contact Phone"}*</Label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "العنوان 1" : "Address Line 1"}*</Label>
                <Input
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "العنوان 2" : "Address Line 2"}</Label>
                <Input
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? "المدينة (اختياري)" : "City (optional)"}</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "المحافظة (اختياري)" : "State/Province (optional)"}</Label>
                <Input
                  value={stateProvince}
                  onChange={(e) => setStateProvince(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? "الرمز البريدي (اختياري)" : "Postal Code (optional)"}</Label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "الدولة" : "Country"}*</Label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="defaultAddress"
                checked={isDefaultAddress}
                onCheckedChange={(checked) => setIsDefaultAddress(checked as boolean)}
              />
              <Label htmlFor="defaultAddress" className="cursor-pointer">
                {isRTL ? "تعيين كعنوان افتراضي" : "Set as default address"}
              </Label>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={handleClose}>
            {isRTL ? "إغلاق" : "Close"}
          </Button>
          <Button onClick={handleSave}>
            {isRTL ? "حفظ المورد" : "Save Vendor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVendorDialog;
