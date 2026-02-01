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
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  submenu?: { label: string; href: string; isAction?: boolean }[];
}

const navItems: NavItem[] = [
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
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">المصنع</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex flex-col items-center gap-1 h-14 px-3 text-white/90 hover:text-white hover:bg-white/10"
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="flex items-center gap-1 text-xs">
                        {item.label}
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[160px]">
                    {item.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.label} className="cursor-pointer">
                        {sub.isAction && <span className="ml-1">+</span>}
                        {sub.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  key={item.label} 
                  variant="ghost" 
                  className="flex flex-col items-center gap-1 h-14 px-3 text-white/90 hover:text-white hover:bg-white/10"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              )
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                2
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">م</span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">محمد أحمد</span>
                  <ChevronDown className="w-4 h-4" />
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
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start text-white hover:bg-white/10 w-full"
                >
                  <item.icon className="w-4 h-4 ml-2" />
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
