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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddFactoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddFactoryDialog = ({ open, onOpenChange }: AddFactoryDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      toast.error(isRTL ? "يرجى إدخال اسم المصنع" : "Please enter factory name");
      return;
    }

    toast.success(isRTL ? "تم حفظ المصنع بنجاح" : "Factory saved successfully");
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setContact("");
    setPhone("");
    setWhatsapp("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isRTL ? "إضافة مصنع جديد" : "Add New Factory"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>{isRTL ? "اسم المصنع*" : "Factory Name*"}</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isRTL ? "أدخل اسم المصنع" : "Enter factory name"}
            />
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? "جهة الاتصال" : "Contact"}</Label>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={isRTL ? "أدخل اسم جهة الاتصال" : "Enter contact name"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isRTL ? "الهاتف" : "Phone"}</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={isRTL ? "أدخل رقم الهاتف" : "Enter phone number"}
              />
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "واتساب" : "WhatsApp"}</Label>
              <Input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder={isRTL ? "أدخل رقم الواتساب" : "Enter WhatsApp number"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? "ملاحظات" : "Notes"}</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isRTL ? "أدخل أي ملاحظات..." : "Enter any notes..."}
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="secondary" onClick={handleClose}>
            {isRTL ? "إغلاق" : "Close"}
          </Button>
          <Button onClick={handleSave}>
            {isRTL ? "حفظ المصنع" : "Save Factory"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFactoryDialog;
