import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  secondaryValue?: string | number;
  icon: LucideIcon;
  variant: "sales" | "orders" | "info" | "warning" | "purple" | "white";
  className?: string;
}

const StatCard = ({
  title,
  subtitle,
  value,
  secondaryValue,
  icon: Icon,
  variant,
  className,
}: StatCardProps) => {
  const variantClasses = {
    sales: "stat-card stat-card-sales",
    orders: "stat-card stat-card-orders",
    info: "stat-card stat-card-info text-info-foreground",
    warning: "stat-card stat-card-warning text-warning-foreground",
    purple: "stat-card stat-card-purple",
    white: "stat-card stat-card-white",
  };

  const iconBgClasses = {
    sales: "bg-white/20",
    orders: "bg-white/20",
    info: "bg-black/10",
    warning: "bg-black/10",
    purple: "bg-white/20",
    white: "bg-muted",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90">{title}</p>
          {subtitle && <p className="text-xs opacity-75">{subtitle}</p>}
          <div className="mt-3">
            <p className="text-3xl font-bold">{value}</p>
            {secondaryValue && (
              <p className="text-lg font-semibold opacity-80 mt-1">/ {secondaryValue}</p>
            )}
          </div>
        </div>
        <div className={cn("p-3 rounded-xl", iconBgClasses[variant])}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
