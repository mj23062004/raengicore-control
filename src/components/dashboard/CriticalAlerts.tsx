import { AlertTriangle, Clock, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "danger" | "warning";
  icon: typeof AlertTriangle;
  message: string;
  dueDate?: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "danger",
    icon: AlertTriangle,
    message: "GST Return due this month",
    dueDate: "10 Jan 2026",
  },
  {
    id: "2",
    type: "danger",
    icon: Clock,
    message: "TDS Payment pending",
    dueDate: "7 Jan 2026",
  },
  {
    id: "3",
    type: "warning",
    icon: FileWarning,
    message: "LLP Annual Return due",
    dueDate: "30 Jan 2026",
  },
];

export function CriticalAlerts() {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
        <AlertTriangle className="h-4 w-4" />
        CRITICAL ALERTS
      </h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
              alert.type === "danger"
                ? "bg-destructive/10 text-destructive"
                : "bg-warning/10 text-warning"
            )}
          >
            <div className="flex items-center gap-2">
              <alert.icon className="h-4 w-4" />
              <span className="font-medium">{alert.message}</span>
            </div>
            {alert.dueDate && (
              <span className="font-mono text-xs">{alert.dueDate}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
