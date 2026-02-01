import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
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
  List,
  Plus,
  ArrowLeftRight,
  FileText,
  UserPlus,
  FolderOpen,
  ClipboardList,
  Truck,
  Wallet,
  Receipt,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface SubMenuItem {
  labelKey: string;
  href: string;
  icon?: LucideIcon;
  isAction?: boolean;
}

interface NavItem {
  labelKey: string;
  icon: LucideIcon;
  href?: string;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { labelKey: "nav.dashboard", icon: LayoutDashboard, href: "/" },
  {
    labelKey: "nav.sales",
    icon: ShoppingCart,
    submenu: [
      { labelKey: "nav.allOrders", href: "/orders", icon: List },
      { labelKey: "nav.createOrder", href: "/orders/new", icon: Plus, isAction: true },
      { labelKey: "nav.quotations", href: "/quotations", icon: FileText },
      { labelKey: "nav.customers", href: "/customers", icon: UserPlus },
    ],
  },
  {
    labelKey: "nav.inventory",
    icon: Package,
    submenu: [
      { labelKey: "nav.allInventories", href: "/products", icon: List },
      { labelKey: "nav.addInventory", href: "/products/new", icon: Plus, isAction: true },
      { labelKey: "nav.transferItems", href: "/stock-movement", icon: ArrowLeftRight },
    ],
  },
  {
    labelKey: "nav.products",
    icon: Boxes,
    submenu: [
      { labelKey: "nav.productsList", href: "/products-list", icon: List },
      { labelKey: "nav.categories", href: "/categories", icon: FolderOpen },
    ],
  },
  {
    labelKey: "nav.purchases",
    icon: ShoppingBag,
    submenu: [
      { labelKey: "nav.purchaseOrders", href: "/purchase-orders", icon: ClipboardList },
      { labelKey: "nav.suppliers", href: "/suppliers", icon: Truck },
    ],
  },
  { labelKey: "nav.manufacturing", icon: Factory, href: "/manufacturing" },
  { labelKey: "nav.users", icon: Users, href: "/users" },
  { labelKey: "nav.tickets", icon: Ticket, href: "/tickets" },
  {
    labelKey: "nav.finance",
    icon: DollarSign,
    submenu: [
      { labelKey: "nav.accounts", href: "/accounts", icon: Wallet },
      { labelKey: "nav.expenses", href: "/expenses", icon: Receipt },
      { labelKey: "nav.reports", href: "/reports", icon: BarChart3 },
    ],
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">{t("common.factoryName")}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.labelKey}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex flex-col items-center gap-1 h-14 px-3 text-white/90 hover:text-white hover:bg-white/10"
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="flex items-center gap-1 text-xs">
                        {t(item.labelKey)}
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[180px] bg-background border shadow-lg z-50">
                    {item.submenu.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <DropdownMenuItem key={sub.labelKey} asChild className="cursor-pointer gap-2">
                          <Link to={sub.href}>
                            {SubIcon && <SubIcon className="w-4 h-4 text-muted-foreground" />}
                            {t(sub.labelKey)}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  key={item.labelKey} 
                  variant="ghost" 
                  className={`flex flex-col items-center gap-1 h-14 px-3 text-white/90 hover:text-white hover:bg-white/10 ${location.pathname === item.href ? "bg-white/20" : ""}`}
                  asChild
                >
                  <Link to={item.href || "/"}>
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs">{t(item.labelKey)}</span>
                  </Link>
                </Button>
              )
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
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
                    <span className="text-sm font-medium text-white">
                      {isRTL ? "م" : "O"}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {isRTL ? "محمد أحمد" : "Omar Ahmed"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t("nav.profile")}</DropdownMenuItem>
                <DropdownMenuItem>{t("nav.settings")}</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">{t("nav.logout")}</DropdownMenuItem>
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
                  key={item.labelKey}
                  variant="ghost"
                  className="justify-start text-white hover:bg-white/10 w-full"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to={item.href || (item.submenu ? item.submenu[0].href : "/")}>
                    <item.icon className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t(item.labelKey)}
                  </Link>
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
