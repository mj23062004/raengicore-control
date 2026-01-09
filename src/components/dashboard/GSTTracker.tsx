import { cn } from "@/lib/utils";

interface GSTRecord {
  id: string;
  month: string;
  sales: string;
  gst: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const gstRecords: GSTRecord[] = [
  {
    id: "1",
    month: "Jan 2026",
    sales: "₹10,00,000",
    gst: "₹1,80,000",
    dueDate: "10 Feb",
    status: "pending",
  },
  {
    id: "2",
    month: "Dec 2025",
    sales: "₹8,50,000",
    gst: "₹1,53,000",
    dueDate: "10 Jan",
    status: "paid",
  },
  {
    id: "3",
    month: "Nov 2025",
    sales: "₹9,20,000",
    gst: "₹1,65,600",
    dueDate: "10 Dec",
    status: "paid",
  },
];

function StatusBadge({ status }: { status: GSTRecord["status"] }) {
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

export function GSTTracker() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-base font-semibold text-foreground">GST Tracker</h3>
        <p className="text-xs text-muted-foreground">Monthly GST returns status</p>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales</th>
              <th>GST</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {gstRecords.map((record) => (
              <tr key={record.id}>
                <td className="font-medium">{record.month}</td>
                <td className="font-mono">{record.sales}</td>
                <td className="font-mono text-primary">{record.gst}</td>
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
