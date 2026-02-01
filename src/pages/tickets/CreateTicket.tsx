import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CreateTicket = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const [assignedRole, setAssignedRole] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  // Fetch roles from database
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .order("display_name");
      if (error) throw error;
      return data;
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "العنوان مطلوب" : "Title is required",
        variant: "destructive",
      });
      return;
    }

    // TODO: Save ticket to database when tickets table is created
    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء التذكرة بنجاح" : "Ticket created successfully",
    });
    navigate("/tickets");
  };

  const handleCancel = () => {
    navigate("/tickets");
  };

  const priorities = [
    { value: "Urgent", labelEn: "Urgent", labelAr: "عاجل" },
    { value: "High", labelEn: "High", labelAr: "عالي" },
    { value: "Medium", labelEn: "Medium", labelAr: "متوسط" },
    { value: "Low", labelEn: "Low", labelAr: "منخفض" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {isRTL ? "إنشاء تذكرة" : "Create Ticket"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {isRTL ? "العنوان" : "Title"} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {isRTL ? "الوصف" : "Description"}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px]"
            />
          </div>

          {/* Attach Images */}
          <div className="space-y-2">
            <Label htmlFor="images">
              {isRTL ? "إرفاق صور" : "Attach Images"}
            </Label>
            <Input
              id="images"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.webp"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {isRTL 
                ? "JPEG, PNG, GIF, WEBP حتى 5 ميجابايت لكل ملف."
                : "JPEG, PNG, GIF, WEBP up to 5MB each."
              }
            </p>
          </div>

          {/* Priority, Assign to Role, Assign to User */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">
                {isRTL ? "الأولوية" : "Priority"}
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {isRTL ? p.labelAr : p.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assign to Role */}
            <div className="space-y-2">
              <Label htmlFor="assignedRole">
                {isRTL ? "تعيين إلى دور" : "Assign to Role"}
              </Label>
              <Select value={assignedRole} onValueChange={setAssignedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name || role.id}>
                      {isRTL ? role.display_name_ar : role.display_name} ({role.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assign to User (optional) */}
            <div className="space-y-2">
              <Label htmlFor="assignedUser">
                {isRTL ? "تعيين إلى مستخدم (اختياري)" : "Assign to User (optional)"}
              </Label>
              <Input
                id="assignedUser"
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                placeholder={isRTL ? "معرف المستخدم" : "User ID"}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="submit">
              {isRTL ? "إنشاء" : "Create"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-wrap justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 {t("common.factoryName")}. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <span>{isRTL ? "الإصدار" : "Version"} 1.0.0</span>
        </div>
      </footer>
    </div>
  );
};

export default CreateTicket;
