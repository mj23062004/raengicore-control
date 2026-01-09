import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, CheckCircle2, Clock, FileText, Upload } from "lucide-react";

// Placeholder data
const complianceItems = [
  { id: 1, title: "GST Return - GSTR-3B", type: "GST", dueDate: "10 Feb 2026", status: "pending", notes: "January 2026 return" },
  { id: 2, title: "TDS Payment", type: "TDS", dueDate: "7 Feb 2026", status: "pending", notes: "January 2026 TDS" },
  { id: 3, title: "GST Return - GSTR-1", type: "GST", dueDate: "11 Feb 2026", status: "pending", notes: "January 2026 outward supplies" },
  { id: 4, title: "TDS Return - 26Q", type: "TDS", dueDate: "31 Jan 2026", status: "completed", notes: "Q3 FY25-26" },
  { id: 5, title: "LLP Annual Return - Form 11", type: "LLP", dueDate: "30 May 2026", status: "upcoming", notes: "FY 2025-26" },
  { id: 6, title: "LLP Statement of Account - Form 8", type: "LLP", dueDate: "30 Oct 2026", status: "upcoming", notes: "FY 2025-26" },
  { id: 7, title: "GST Annual Return - GSTR-9", type: "GST", dueDate: "31 Dec 2026", status: "upcoming", notes: "FY 2025-26" },
];

const getStatusConfig = (status: string, dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = status === "pending" && daysUntilDue < 0;
  const isDueSoon = status === "pending" && daysUntilDue >= 0 && daysUntilDue <= 7;

  if (status === "completed") {
    return { badge: <Badge className="bg-success/20 text-success">Completed</Badge>, icon: CheckCircle2, color: "text-success" };
  }
  if (isOverdue) {
    return { badge: <Badge className="bg-destructive/20 text-destructive">Overdue</Badge>, icon: AlertTriangle, color: "text-destructive" };
  }
  if (isDueSoon) {
    return { badge: <Badge className="bg-warning/20 text-warning">Due Soon</Badge>, icon: Clock, color: "text-warning" };
  }
  if (status === "upcoming") {
    return { badge: <Badge className="bg-muted text-muted-foreground">Upcoming</Badge>, icon: Calendar, color: "text-muted-foreground" };
  }
  return { badge: <Badge className="bg-primary/20 text-primary">Pending</Badge>, icon: Clock, color: "text-primary" };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "GST": return "bg-blue-500/10 text-blue-500";
    case "TDS": return "bg-purple-500/10 text-purple-500";
    case "LLP": return "bg-emerald-500/10 text-emerald-500";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Compliance() {
  const pendingCount = complianceItems.filter(i => i.status === "pending").length;
  const completedCount = complianceItems.filter(i => i.status === "completed").length;
  const upcomingCount = complianceItems.filter(i => i.status === "upcoming").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Compliance Calendar</h1>
            <p className="text-sm text-muted-foreground">Track GST, TDS, and LLP compliance deadlines</p>
          </div>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Add Reminder
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-success/20 bg-success/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-foreground">{upcomingCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Items */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Compliance Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceItems.map((item) => {
              const statusConfig = getStatusConfig(item.status, item.dueDate);
              const StatusIcon = statusConfig.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-4">
                    <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{item.dueDate}</p>
                      {statusConfig.badge}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
