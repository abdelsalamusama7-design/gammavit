import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  key: string;
  label: string;
  labelAr: string;
}

interface PermissionCategory {
  name: string;
  nameAr: string;
  permissions: Permission[];
}

const permissionCategories: PermissionCategory[] = [
  {
    name: "Customers",
    nameAr: "العملاء",
    permissions: [
      { key: "customers.addresses.manage", label: "Customers - Addresses manage", labelAr: "العملاء - إدارة العناوين" },
      { key: "customers.contacts.manage", label: "Customers - Contacts manage", labelAr: "العملاء - إدارة جهات الاتصال" },
      { key: "customers.create", label: "Customers - Create", labelAr: "العملاء - إنشاء" },
      { key: "customers.orders.create", label: "Customers - Create order", labelAr: "العملاء - إنشاء طلب" },
      { key: "customers.delete", label: "Customers - Delete", labelAr: "العملاء - حذف" },
      { key: "customers.edit", label: "Customers - Edit", labelAr: "العملاء - تعديل" },
      { key: "customers.orders.view", label: "Customers - Orders view", labelAr: "العملاء - عرض الطلبات" },
      { key: "customers.view", label: "Customers - View", labelAr: "العملاء - عرض" },
      { key: "customers.details.view", label: "Customers - View details", labelAr: "العملاء - عرض التفاصيل" },
      { key: "customers.wallet", label: "Customers - Wallet", labelAr: "العملاء - المحفظة" },
      { key: "customers.whatsapp_portal", label: "Customers - WhatsApp portal", labelAr: "العملاء - بوابة واتساب" },
    ],
  },
  {
    name: "Finance",
    nameAr: "المالية",
    permissions: [
      { key: "finance.bank_accounts.create", label: "Finance - Bank account create", labelAr: "المالية - إنشاء حساب بنكي" },
      { key: "finance.customer_payment.process", label: "Finance - Customer payment", labelAr: "المالية - دفع العميل" },
      { key: "finance.customer_wallet.view", label: "Finance - Customer wallet view", labelAr: "المالية - عرض محفظة العميل" },
      { key: "finance.personal_accounts.create", label: "Finance - Personal account create", labelAr: "المالية - إنشاء حساب شخصي" },
      { key: "finance.po_payment.process", label: "Finance - PO payment", labelAr: "المالية - دفع أمر الشراء" },
      { key: "finance.safes.create", label: "Finance - Safes create", labelAr: "المالية - إنشاء خزنة" },
      { key: "finance.transfers.create", label: "Finance - Transfers create", labelAr: "المالية - إنشاء تحويل" },
      { key: "finance.vendor_wallet.view", label: "Finance - Vendor wallet view", labelAr: "المالية - عرض محفظة المورد" },
    ],
  },
  {
    name: "Inventories",
    nameAr: "المخازن",
    permissions: [
      { key: "inventories.create", label: "Inventories - Create", labelAr: "المخازن - إنشاء" },
      { key: "inventories.delete", label: "Inventories - Delete", labelAr: "المخازن - حذف" },
      { key: "inventories.edit", label: "Inventories - Edit", labelAr: "المخازن - تعديل" },
      { key: "inventories.low_stock.view", label: "Inventories - Low stock view", labelAr: "المخازن - عرض المخزون المنخفض" },
      { key: "inventories.print", label: "Inventories - Print", labelAr: "المخازن - طباعة" },
      { key: "inventories.transfer", label: "Inventories - Transfer items", labelAr: "المخازن - نقل العناصر" },
      { key: "inventories.view", label: "Inventories - View", labelAr: "المخازن - عرض" },
      { key: "inventories.products.add", label: "Inventory Products - Add product", labelAr: "منتجات المخازن - إضافة منتج" },
    ],
  },
  {
    name: "Notifications",
    nameAr: "الإشعارات",
    permissions: [
      { key: "notifications.manage", label: "Notifications - Manage", labelAr: "الإشعارات - إدارة" },
      { key: "notifications.view", label: "Notifications - View", labelAr: "الإشعارات - عرض" },
    ],
  },
  {
    name: "Products",
    nameAr: "المنتجات",
    permissions: [
      { key: "products.bulk_upload", label: "Products - Bulk upload", labelAr: "المنتجات - رفع جماعي" },
      { key: "products.create", label: "Products - Create", labelAr: "المنتجات - إنشاء" },
      { key: "products.delete", label: "Products - Delete", labelAr: "المنتجات - حذف" },
      { key: "products.edit", label: "Products - Edit", labelAr: "المنتجات - تعديل" },
      { key: "products.edit_min_stock", label: "Products - Edit min stock", labelAr: "المنتجات - تعديل الحد الأدنى" },
      { key: "products.final_cost.view", label: "Products - Final cost view", labelAr: "المنتجات - عرض التكلفة النهائية" },
      { key: "products.final_price.view", label: "Products - Final price view", labelAr: "المنتجات - عرض السعر النهائي" },
      { key: "products.material_cost.view", label: "Products - Raw material cost view", labelAr: "المنتجات - عرض تكلفة المواد الخام" },
      { key: "products.material_price.view", label: "Products - Raw material price view", labelAr: "المنتجات - عرض سعر المواد الخام" },
      { key: "products.view", label: "Products - View", labelAr: "المنتجات - عرض" },
    ],
  },
  {
    name: "Purchases",
    nameAr: "المشتريات",
    permissions: [
      { key: "purchases.create", label: "PO - Create new", labelAr: "أمر الشراء - إنشاء جديد" },
      { key: "purchases.payments.process", label: "PO - Payments process", labelAr: "أمر الشراء - معالجة الدفع" },
      { key: "purchases.receive", label: "PO - Receive items", labelAr: "أمر الشراء - استلام العناصر" },
      { key: "purchases.view", label: "PO - View", labelAr: "أمر الشراء - عرض" },
      { key: "purchases.view_all", label: "PO - View all", labelAr: "أمر الشراء - عرض الكل" },
      { key: "purchases.view_recent", label: "PO - View recent", labelAr: "أمر الشراء - عرض الأخيرة" },
      { key: "purchases.update_status", label: "Update Purchase Order Status", labelAr: "تحديث حالة أمر الشراء" },
    ],
  },
  {
    name: "Sales",
    nameAr: "المبيعات",
    permissions: [
      { key: "sales.dashboard.orders_pending", label: "Dashboard - Orders pending", labelAr: "لوحة التحكم - الطلبات المعلقة" },
      { key: "sales.dashboard.overall_orders", label: "Dashboard - Overall orders", labelAr: "لوحة التحكم - إجمالي الطلبات" },
      { key: "sales.dashboard.recent_orders", label: "Dashboard - Recent orders", labelAr: "لوحة التحكم - الطلبات الأخيرة" },
      { key: "sales.dashboard.this_month", label: "Dashboard - This month orders", labelAr: "لوحة التحكم - طلبات هذا الشهر" },
      { key: "sales.dashboard.view", label: "Dashboard - View", labelAr: "لوحة التحكم - عرض" },
      { key: "sales.invoice.contact_phone.view", label: "Invoice - Contact phone view", labelAr: "الفاتورة - عرض هاتف الاتصال" },
      { key: "sales.orders.returns.add", label: "Orders - Add return", labelAr: "الطلبات - إضافة مرتجع" },
      { key: "sales.orders.create", label: "Orders - Create new", labelAr: "الطلبات - إنشاء جديد" },
      { key: "sales.orders.discount.edit", label: "Orders - Edit discount", labelAr: "الطلبات - تعديل الخصم" },
      { key: "sales.orders.shipping.edit", label: "Orders - Edit shipping", labelAr: "الطلبات - تعديل الشحن" },
      { key: "sales.orders.print_invoice", label: "Orders - Print invoice", labelAr: "الطلبات - طباعة الفاتورة" },
      { key: "sales.orders.status.update", label: "Orders - Update status", labelAr: "الطلبات - تحديث الحالة" },
      { key: "sales.orders.view_all", label: "Orders - View all", labelAr: "الطلبات - عرض الكل" },
      { key: "sales.orders.view", label: "Orders - View order", labelAr: "الطلبات - عرض الطلب" },
      { key: "sales.orders.payments.history", label: "Orders - View payment history", labelAr: "الطلبات - عرض سجل الدفع" },
      { key: "sales.orders.update_status", label: "Update Order Status", labelAr: "تحديث حالة الطلب" },
    ],
  },
  {
    name: "Tickets",
    nameAr: "التذاكر",
    permissions: [
      { key: "tickets.create", label: "Tickets - Create", labelAr: "التذاكر - إنشاء" },
      { key: "tickets.manage", label: "Tickets - Manage", labelAr: "التذاكر - إدارة" },
      { key: "tickets.view", label: "Tickets - View", labelAr: "التذاكر - عرض" },
      { key: "tickets.update_status", label: "Update Ticket Status", labelAr: "تحديث حالة التذكرة" },
    ],
  },
  {
    name: "Users",
    nameAr: "المستخدمين",
    permissions: [
      { key: "users.manage", label: "Users - Manage", labelAr: "المستخدمين - إدارة" },
    ],
  },
  {
    name: "Vendors",
    nameAr: "الموردين",
    permissions: [
      { key: "vendors.contact", label: "Vendors - Contact", labelAr: "الموردين - اتصال" },
      { key: "vendors.create", label: "Vendors - Create", labelAr: "الموردين - إنشاء" },
      { key: "vendors.delete", label: "Vendors - Delete", labelAr: "الموردين - حذف" },
      { key: "vendors.edit", label: "Vendors - Edit", labelAr: "الموردين - تعديل" },
      { key: "vendors.view", label: "Vendors - View", labelAr: "الموردين - عرض" },
      { key: "vendors.details.view", label: "Vendors - View details", labelAr: "الموردين - عرض التفاصيل" },
      { key: "vendors.wallet", label: "Vendors - Wallet", labelAr: "الموردين - المحفظة" },
      { key: "vendors.whatsapp_portal", label: "Vendors - WhatsApp portal", labelAr: "الموردين - بوابة واتساب" },
    ],
  },
];

const CreateRole = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());

  const allPermissionKeys = permissionCategories.flatMap((cat) => cat.permissions.map((p) => p.key));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPermissions(new Set(allPermissionKeys));
    } else {
      setSelectedPermissions(new Set());
    }
  };

  const handleCategorySelectAll = (category: PermissionCategory, checked: boolean) => {
    const newSelected = new Set(selectedPermissions);
    category.permissions.forEach((p) => {
      if (checked) {
        newSelected.add(p.key);
      } else {
        newSelected.delete(p.key);
      }
    });
    setSelectedPermissions(newSelected);
  };

  const handlePermissionToggle = (key: string, checked: boolean) => {
    const newSelected = new Set(selectedPermissions);
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    setSelectedPermissions(newSelected);
  };

  const isCategoryAllSelected = (category: PermissionCategory) => {
    return category.permissions.every((p) => selectedPermissions.has(p.key));
  };

  const isAllSelected = allPermissionKeys.every((key) => selectedPermissions.has(key));

  const handleSubmit = () => {
    if (!name.trim() || !slug.trim()) {
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
      });
      return;
    }

    // TODO: Save role to database
    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء الدور بنجاح" : "Role created successfully",
    });
    navigate("/users/roles");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-6 w-full">
        <h1 className="text-2xl font-bold mb-6">{isRTL ? "إنشاء دور" : "Create Role"}</h1>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Name and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {isRTL ? "الاسم" : "Name"} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRTL ? "أدخل اسم الدور" : "Enter role name"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  {isRTL ? "المعرف" : "Slug"} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder={isRTL ? "أدخل المعرف" : "Enter slug"}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{isRTL ? "الوصف" : "Description"}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isRTL ? "أدخل الوصف" : "Enter description"}
                rows={4}
              />
            </div>

            {/* Active Switch */}
            <div className="flex items-center gap-3">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <Label>{isRTL ? "نشط" : "Active"}</Label>
            </div>

            <Separator />

            {/* Permissions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(checked === true)}
                />
                <Label htmlFor="select-all" className="font-medium cursor-pointer">
                  {isRTL ? "تحديد كل الصلاحيات" : "Select All Permissions"}
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {isRTL ? category.nameAr : category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${category.name}-all`}
                          checked={isCategoryAllSelected(category)}
                          onCheckedChange={(checked) =>
                            handleCategorySelectAll(category, checked === true)
                          }
                        />
                        <Label htmlFor={`${category.name}-all`} className="text-sm cursor-pointer">
                          {isRTL ? "الكل" : "All"}
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {category.permissions.map((permission) => (
                        <div key={permission.key} className="flex items-center gap-2">
                          <Checkbox
                            id={permission.key}
                            checked={selectedPermissions.has(permission.key)}
                            onCheckedChange={(checked) =>
                              handlePermissionToggle(permission.key, checked === true)
                            }
                          />
                          <Label
                            htmlFor={permission.key}
                            className="text-sm cursor-pointer text-muted-foreground"
                          >
                            <span className="text-primary font-mono">{permission.key}</span>
                            {" — "}
                            {isRTL ? permission.labelAr : permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                {isRTL ? "إنشاء" : "Create"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/users/roles")}
              >
                {isRTL ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </CardContent>
        </Card>
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

export default CreateRole;
