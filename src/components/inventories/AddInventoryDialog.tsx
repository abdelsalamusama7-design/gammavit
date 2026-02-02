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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface AddInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddInventoryDialog = ({ open, onOpenChange }: AddInventoryDialogProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error(isRTL ? "اسم المخزن مطلوب" : "Inventory name is required");
      return;
    }
    toast.success(isRTL ? "تم إضافة المخزن بنجاح" : "Inventory added successfully");
    setFormData({ name: "", location: "", description: "", active: true });
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({ name: "", location: "", description: "", active: true });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isRTL ? "إضافة مخزن جديد" : "Add New Inventory"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{isRTL ? "اسم المخزن" : "Inventory Name"}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? "الموقع" : "Location"}</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? "الوصف" : "Description"}</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, active: checked as boolean })
              }
            />
            <Label htmlFor="active" className="cursor-pointer">
              {isRTL ? "نشط" : "Active"}
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              {isRTL ? "إغلاق" : "Close"}
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isRTL ? "حفظ المخزن" : "Save Inventory"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryDialog;
