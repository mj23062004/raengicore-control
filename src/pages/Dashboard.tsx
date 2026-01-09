import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CriticalAlerts } from "@/components/dashboard/CriticalAlerts";
import { MonthlySnapshot } from "@/components/dashboard/MonthlySnapshot";
import { GSTTracker } from "@/components/dashboard/GSTTracker";
import { TDSTracker } from "@/components/dashboard/TDSTracker";
import { ExpenseAnalytics } from "@/components/dashboard/ExpenseAnalytics";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Critical Alerts - First thing owner sees */}
        <CriticalAlerts />

        {/* Monthly Business Snapshot */}
        <MonthlySnapshot />

        {/* Trackers Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <GSTTracker />
          <TDSTracker />
        </div>

        {/* Expense Analytics */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Expense Analytics</h3>
          <ExpenseAnalytics />
        </div>
      </div>
    </DashboardLayout>
  );
}
