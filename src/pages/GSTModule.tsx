import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Receipt, ArrowUpRight, ArrowDownLeft, Calculator } from "lucide-react";

// Placeholder data
const gstRecords = [
  { month: "January 2026", sales: 1000000, outputGST: 180000, inputGST: 45000, payable: 135000, dueDate: "10 Feb 2026", status: "pending" },
  { month: "December 2025", sales: 850000, outputGST: 153000, inputGST: 38000, payable: 115000, dueDate: "10 Jan 2026", status: "paid" },
  { month: "November 2025", sales: 920000, outputGST: 165600, inputGST: 42000, payable: 123600, dueDate: "10 Dec 2025", status: "paid" },
];

const getStatusBadge = (status: string, dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const isOverdue = status === "pending" && today > due;

  if (status === "paid") {
    return <Badge className="bg-success/20 text-success">Paid</Badge>;
  }
  if (isOverdue) {
    return <Badge className="bg-destructive/20 text-destructive">Overdue</Badge>;
  }
  return <Badge className="bg-warning/20 text-warning">Pending</Badge>;
};

export default function GSTModule() {
  const currentMonth = gstRecords[0];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">GST Module</h1>
            <p className="text-sm text-muted-foreground">Track GST returns, input/output tax, and payments</p>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Challan
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sales This Month</p>
                <p className="text-2xl font-bold text-foreground">₹{currentMonth.sales.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <ArrowUpRight className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Output GST</p>
                <p className="text-2xl font-bold text-foreground">₹{currentMonth.outputGST.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <ArrowDownLeft className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Input GST</p>
                <p className="text-2xl font-bold text-foreground">₹{currentMonth.inputGST.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Calculator className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payable GST</p>
                <p className="text-2xl font-bold text-foreground">₹{currentMonth.payable.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GST Records Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>GST Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Output GST</TableHead>
                  <TableHead className="text-right">Input GST</TableHead>
                  <TableHead className="text-right">Payable</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gstRecords.map((record) => (
                  <TableRow key={record.month}>
                    <TableCell className="font-medium">{record.month}</TableCell>
                    <TableCell className="text-right">₹{record.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">₹{record.outputGST.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-success">₹{record.inputGST.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">₹{record.payable.toLocaleString()}</TableCell>
                    <TableCell>{record.dueDate}</TableCell>
                    <TableCell>{getStatusBadge(record.status, record.dueDate)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
