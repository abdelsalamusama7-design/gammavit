import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  ShoppingBag,
  Factory,
  Users,
  Ticket,
  DollarSign,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { label: "لوحة التحكم", icon: LayoutDashboard, href: "/" },
  {
    label: "المبيعات",
    icon: ShoppingCart,
    submenu: [
      { label: "كل الطلبات", href: "/orders" },
      { label: "إنشاء طلب", href: "/orders/new", isAction: true },
      { label: "عروض الأسعار", href: "/quotations" },
      { label: "العملاء", href: "/customers" },
    ],
  },
  {
    label: "المخزون",
    icon: Package,
    submenu: [
      { label: "المنتجات", href: "/products" },
      { label: "المواد الخام", href: "/materials" },
      { label: "حركة المخزون", href: "/stock-movement" },
    ],
  },
  {
    label: "المنتجات",
    icon: Boxes,
    submenu: [
      { label: "قائمة المنتجات", href: "/products-list" },
      { label: "الفئات", href: "/categories" },
    ],
  },
  {
    label: "المشتريات",
    icon: ShoppingBag,
    submenu: [
      { label: "أوامر الشراء", href: "/purchase-orders" },
      { label: "الموردين", href: "/suppliers" },
    ],
  },
  { label: "التصنيع", icon: Factory, href: "/manufacturing" },
  { label: "المستخدمين", icon: Users, href: "/users" },
  { label: "التذاكر", icon: Ticket, href: "/tickets" },
  {
    label: "المالية",
    icon: DollarSign,
    submenu: [
      { label: "الحسابات", href: "/accounts" },
      { label: "المصروفات", href: "/expenses" },
      { label: "التقارير", href: "/reports" },
    ],
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sales to-primary flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">المصنع</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="nav-link gap-1">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[160px]">
                    {item.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.label} className="cursor-pointer">
                        {sub.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={item.label} variant="ghost" className="nav-link nav-link-active">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                2
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">م</span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">محمد أحمد</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
                <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start nav-link w-full"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
