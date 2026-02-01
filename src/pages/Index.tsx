import {
  TrendingUp,
  ClipboardList,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  FileText,
  Ticket,
  Bell,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/dashboard/StatCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import InventorySummary from "@/components/dashboard/InventorySummary";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Stats Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="إجمالي المبيعات"
            subtitle="الإجمالي / المدفوع"
            value="413,200.00"
            secondaryValue="255,200.00"
            icon={TrendingUp}
            variant="sales"
          />
          <StatCard
            title="إجمالي الطلبات"
            subtitle="جديد / قيد التنفيذ"
            value="3 / 2"
            icon={ClipboardList}
            variant="orders"
          />
          <StatCard
            title="طلبات اليوم"
            value="0"
            icon={ShoppingCart}
            variant="info"
          />
          <StatCard
            title="منتجات منخفضة المخزون"
            value="0"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Stats Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="الذمم المدينة"
            value="158,000.00"
            icon={DollarSign}
            variant="white"
          />
          <StatCard
            title="عروض الأسعار المفتوحة"
            value="1"
            icon={FileText}
            variant="white"
          />
          <StatCard
            title="التذاكر المفتوحة"
            value="3"
            icon={Ticket}
            variant="white"
          />
          <StatCard
            title="الإشعارات غير المقروءة"
            value="2"
            icon={Bell}
            variant="white"
          />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <div className="lg:col-span-1">
            <InventorySummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
