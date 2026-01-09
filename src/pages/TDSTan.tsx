import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileCheck, Building, Users } from "lucide-react";
import { useState } from "react";

// Placeholder data
const tdsRecords = [
  { id: 1, party: "ABC Contractors", type: "Contractor", section: "194C", amountPaid: 500000, tdsDeducted: 10000, month: "January 2026", dueDate: "7 Feb 2026", challan: "CHN001", filed: false },
  { id: 2, party: "XYZ Consultants", type: "Professional", section: "194J", amountPaid: 200000, tdsDeducted: 20000, month: "January 2026", dueDate: "7 Feb 2026", challan: "", filed: false },
  { id: 3, party: "PQR Engineers", type: "Contractor", section: "194C", amountPaid: 350000, tdsDeducted: 7000, month: "December 2025", dueDate: "7 Jan 2026", challan: "CHN002", filed: true },
];

const getStatusBadge = (filed: boolean, dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const isOverdue = !filed && today > due;

  if (filed) {
    return <Badge className="bg-success/20 text-success">Filed</Badge>;
  }
  if (isOverdue) {
    return <Badge className="bg-destructive/20 text-destructive">Overdue</Badge>;
  }
  return <Badge className="bg-warning/20 text-warning">Pending</Badge>;
};

export default function TDSTan() {
  const [showForm, setShowForm] = useState(false);

  const totalTDS = tdsRecords.reduce((sum, r) => sum + r.tdsDeducted, 0);
  const pendingTDS = tdsRecords.filter(r => !r.filed).reduce((sum, r) => sum + r.tdsDeducted, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">TDS / TAN Module</h1>
            <p className="text-sm text-muted-foreground">Manage TDS deductions, challans, and returns</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add TDS Entry
          </Button>
        </div>

        {/* TAN Info */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-4">
            <FileCheck className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">TAN Number</p>
              <p className="text-lg font-bold text-foreground">DELR00000A</p>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total TDS Deducted</p>
                <p className="text-2xl font-bold text-foreground">₹{totalTDS.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Building className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payment</p>
                <p className="text-2xl font-bold text-foreground">₹{pendingTDS.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold text-foreground">{tdsRecords.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add TDS Form */}
        {showForm && (
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Add TDS Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Party Name</Label>
                  <Input placeholder="Enter party name" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="194C">194C (Contractor)</SelectItem>
                      <SelectItem value="194J">194J (Professional)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount Paid (₹)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>TDS Deducted (₹)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Month</Label>
                  <Input type="month" />
                </div>
                <div className="space-y-2">
                  <Label>Challan Number</Label>
                  <Input placeholder="Enter challan number" />
                </div>
                <div className="flex items-end gap-2 md:col-span-2">
                  <Button type="submit">Save Entry</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* TDS Records Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>TDS Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead className="text-right">Amount Paid</TableHead>
                  <TableHead className="text-right">TDS</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tdsRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.party}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.section}</TableCell>
                    <TableCell className="text-right">₹{record.amountPaid.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">₹{record.tdsDeducted.toLocaleString()}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>{record.dueDate}</TableCell>
                    <TableCell>{getStatusBadge(record.filed, record.dueDate)}</TableCell>
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
