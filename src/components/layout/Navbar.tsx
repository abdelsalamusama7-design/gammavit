import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Upload,
  PackageCheck,
  Layers,
  Lock,
  Landmark,
  UserCircle,
  CreditCard,
  LogOut,
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      { labelKey: "nav.createOrder", href: "/orders/create", icon: Plus, isAction: true },
      { labelKey: "nav.quotations", href: "/quotations", icon: FileText },
      { labelKey: "nav.customers", href: "/customers", icon: UserPlus },
    ],
  },
  {
    labelKey: "nav.inventory",
    icon: Package,
    submenu: [
      { labelKey: "nav.allInventories", href: "/inventories", icon: List },
      { labelKey: "nav.addInventory", href: "/products/new", icon: Plus, isAction: true },
      { labelKey: "nav.transferItems", href: "/stock-movement", icon: ArrowLeftRight },
    ],
  },
  {
    labelKey: "nav.products",
    icon: Boxes,
    submenu: [
      { labelKey: "nav.finalProducts", href: "/final-products", icon: PackageCheck },
      { labelKey: "nav.rawMaterials", href: "/materials", icon: Layers },
      { labelKey: "nav.allProducts", href: "/products-list", icon: List },
      { labelKey: "nav.addProduct", href: "/products/new", icon: Plus, isAction: true },
      { labelKey: "nav.bulkUpload", href: "/products/upload", icon: Upload },
      { labelKey: "nav.categories", href: "/categories", icon: FolderOpen },
    ],
  },
  {
    labelKey: "nav.purchases",
    icon: ShoppingBag,
    submenu: [
      { labelKey: "nav.purchaseOrders", href: "/purchase-orders", icon: List },
      { labelKey: "nav.createPO", href: "/purchase-orders/new", icon: Plus, isAction: true },
      { labelKey: "nav.vendors", href: "/suppliers", icon: Truck },
    ],
  },
  { labelKey: "nav.manufacturing", icon: Factory, href: "/manufacturing" },
  { labelKey: "nav.users", icon: Users, href: "/users" },
  { labelKey: "nav.tickets", icon: Ticket, href: "/tickets" },
  {
    labelKey: "nav.finance",
    icon: DollarSign,
    submenu: [
      { labelKey: "nav.customerWallets", href: "/customer-wallets", icon: Wallet },
      { labelKey: "nav.billsPayments", href: "/bills-payments", icon: Receipt },
      { labelKey: "nav.safes", href: "/safes", icon: Lock },
      { labelKey: "nav.bankAccounts", href: "/bank-accounts", icon: Landmark },
      { labelKey: "nav.personalAccounts", href: "/personal-accounts", icon: UserCircle },
      { labelKey: "nav.transfers", href: "/transfers", icon: ArrowLeftRight },
      { labelKey: "nav.poPayments", href: "/po-payments", icon: CreditCard },
      { labelKey: "nav.vendorWallets", href: "/vendor-wallets", icon: Wallet },
    ],
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user) return;
      
      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      
      if (!error && count !== null) {
        setUnreadCount(count);
      }
    };

    fetchUnreadCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("notifications-count")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: isRTL ? "تم تسجيل الخروج" : "Logged out",
        description: isRTL ? "تم تسجيل خروجك بنجاح" : "You have been logged out successfully",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "حدث خطأ أثناء تسجيل الخروج" : "An error occurred while logging out",
      });
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Factory className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-white hidden sm:block">{t("common.factoryName")}</span>
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
          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:bg-white/10 w-9 h-9 md:w-10 md:h-10"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-[10px] md:text-xs">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 md:gap-2 text-white hover:bg-white/10 px-2 md:px-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs md:text-sm font-medium text-white">
                      {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden lg:block text-sm font-medium">
                    {profile?.full_name || user?.email?.split("@")[0] || "User"}
                  </span>
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px] bg-background">
                <DropdownMenuItem className="py-3 cursor-pointer" onClick={() => navigate("/profile")}>
                  {t("nav.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">{t("nav.settings")}</DropdownMenuItem>
                <div className="sm:hidden px-2 py-2">
                  <LanguageSwitcher />
                </div>
                <DropdownMenuItem 
                  className="text-destructive py-3 gap-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 w-9 h-9 md:w-10 md:h-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden py-4 border-t border-white/20 animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto hide-scrollbar"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.labelKey}>
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="justify-between text-white hover:bg-white/10 w-full h-12 px-4"
                        >
                          <div className="flex items-center">
                            <item.icon className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                            {t(item.labelKey)}
                          </div>
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="start" 
                        className="w-[calc(100vw-2rem)] max-w-sm"
                        sideOffset={0}
                      >
                        {item.submenu.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <DropdownMenuItem 
                              key={sub.labelKey} 
                              asChild 
                              className="cursor-pointer gap-3 py-3"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Link to={sub.href}>
                                {SubIcon && <SubIcon className="w-5 h-5 text-muted-foreground" />}
                                {t(sub.labelKey)}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      variant="ghost"
                      className="justify-start text-white hover:bg-white/10 w-full h-12 px-4"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to={item.href || "/"}>
                        <item.icon className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                        {t(item.labelKey)}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
