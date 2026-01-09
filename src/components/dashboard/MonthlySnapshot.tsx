import { IndianRupee, TrendingUp, TrendingDown, Receipt, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: typeof IndianRupee;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "default" | "success" | "danger";
}

function StatCard({ title, value, icon: Icon, trend, trendValue, variant = "default" }: StatCardProps) {
  return (
    <div
      className={cn(
        "stat-card",
        variant === "success" && "stat-card-success",
        variant === "danger" && "stat-card-danger"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            variant === "success" && "bg-success/20 text-success",
            variant === "danger" && "bg-destructive/20 text-destructive",
            variant === "default" && "bg-primary/20 text-primary"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && trendValue && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 text-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive" />
          )}
          <span className={trend === "up" ? "text-success" : "text-destructive"}>
            {trendValue}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}

export function MonthlySnapshot() {
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Monthly Snapshot</h3>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {currentMonth}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Billing"
          value="₹10,00,000"
          icon={IndianRupee}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="GST on Sales"
          value="₹1,80,000"
          icon={Receipt}
          variant="default"
        />
        <StatCard
          title="TDS Expected"
          value="₹20,000"
          icon={Percent}
          variant="default"
        />
        <StatCard
          title="Total Expenses"
          value="₹6,00,000"
          icon={TrendingDown}
          trend="down"
          trendValue="-5%"
          variant="danger"
        />
        <StatCard
          title="Net Cash Flow"
          value="₹4,00,000"
          icon={TrendingUp}
          trend="up"
          trendValue="+18%"
          variant="success"
        />
      </div>
    </div>
  );
}
