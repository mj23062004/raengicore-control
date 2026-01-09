import { cn } from "@/lib/utils";

interface TDSRecord {
  id: string;
  month: string;
  amount: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const tdsRecords: TDSRecord[] = [
  {
    id: "1",
    month: "Jan 2026",
    amount: "₹20,000",
    dueDate: "7 Feb",
    status: "pending",
  },
  {
    id: "2",
    month: "Dec 2025",
    amount: "₹18,500",
    dueDate: "7 Jan",
    status: "paid",
  },
  {
    id: "3",
    month: "Nov 2025",
    amount: "₹22,000",
    dueDate: "7 Dec",
    status: "paid",
  },
];

function StatusBadge({ status }: { status: TDSRecord["status"] }) {
  return (
    <span
      className={cn(
        "status-badge",
        status === "paid" && "status-paid",
        status === "pending" && "status-pending",
        status === "overdue" && "status-overdue"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "paid" && "bg-success",
          status === "pending" && "bg-warning",
          status === "overdue" && "bg-destructive"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function TDSTracker() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-base font-semibold text-foreground">TDS Tracker</h3>
        <p className="text-xs text-muted-foreground">Monthly TDS payment status</p>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>TDS Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tdsRecords.map((record) => (
              <tr key={record.id}>
                <td className="font-medium">{record.month}</td>
                <td className="font-mono text-primary">{record.amount}</td>
                <td className="font-mono text-muted-foreground">{record.dueDate}</td>
                <td>
                  <StatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
