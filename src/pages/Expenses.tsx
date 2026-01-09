import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Upload, IndianRupee, TrendingUp, Receipt } from "lucide-react";
import { useState } from "react";

const categories = [
  "Diesel",
  "Labour",
  "Machine Repair",
  "Travel",
  "Office",
  "Site",
  "Miscellaneous",
];

const paymentModes = ["Cash", "Bank", "UPI"];

// Placeholder data
const expenses = [
  { id: 1, date: "2026-01-05", category: "Diesel", vendor: "HP Petrol Pump", amount: 45000, mode: "Bank", gstIncluded: true, gstAmount: 6890 },
  { id: 2, date: "2026-01-08", category: "Labour", vendor: "Site Workers", amount: 120000, mode: "Cash", gstIncluded: false, gstAmount: 0 },
  { id: 3, date: "2026-01-12", category: "Machine Repair", vendor: "Tata Motors", amount: 35000, mode: "UPI", gstIncluded: true, gstAmount: 5339 },
];

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const [gstIncluded, setGstIncluded] = useState(false);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalGST = expenses.reduce((sum, e) => sum + e.gstAmount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Expense Management</h1>
            <p className="text-sm text-muted-foreground">Track and manage all business expenses</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-foreground">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Receipt className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Input GST Credit</p>
                <p className="text-2xl font-bold text-foreground">₹{totalGST.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">{expenses.length} entries</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        {showForm && (
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vendor Name</Label>
                  <Input placeholder="Enter vendor name" />
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentModes.map((mode) => (
                        <SelectItem key={mode} value={mode.toLowerCase()}>{mode}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch checked={gstIncluded} onCheckedChange={setGstIncluded} />
                    <Label>GST Included</Label>
                  </div>
                </div>
                {gstIncluded && (
                  <div className="space-y-2">
                    <Label>GST Amount (₹)</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                )}
                <div className="space-y-2 md:col-span-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes..." />
                </div>
                <div className="space-y-2">
                  <Label>Bill Upload</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-end gap-2 md:col-span-3">
                  <Button type="submit">Save Expense</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Expenses Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">GST</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.vendor}</TableCell>
                    <TableCell className="text-right font-medium">₹{expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{expense.mode}</TableCell>
                    <TableCell className="text-right">
                      {expense.gstIncluded ? `₹${expense.gstAmount.toLocaleString()}` : "-"}
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
