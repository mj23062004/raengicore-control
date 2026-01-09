import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, FileSpreadsheet, FileText, TrendingUp, Receipt, FileCheck, Calendar } from "lucide-react";

const reportTypes = [
  { 
    id: "monthly-expenses", 
    name: "Monthly Expenses Report", 
    description: "Detailed breakdown of all expenses by category and vendor",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-500"
  },
  { 
    id: "gst-summary", 
    name: "GST Summary Report", 
    description: "Input/Output GST reconciliation and liability",
    icon: Receipt,
    color: "bg-purple-500/10 text-purple-500"
  },
  { 
    id: "tds-summary", 
    name: "TDS Summary Report", 
    description: "TDS deductions, payments, and filing status",
    icon: FileCheck,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  { 
    id: "compliance-history", 
    name: "Compliance History", 
    description: "Complete history of all compliance filings and statuses",
    icon: Calendar,
    color: "bg-amber-500/10 text-amber-500"
  },
];

const recentReports = [
  { id: 1, name: "Monthly_Expenses_Dec_2025.pdf", type: "Monthly Expenses", date: "2026-01-05", size: "245 KB" },
  { id: 2, name: "GST_Summary_Q3_FY25-26.xlsx", type: "GST Summary", date: "2026-01-03", size: "89 KB" },
  { id: 3, name: "TDS_Summary_Q3_FY25-26.pdf", type: "TDS Summary", date: "2026-01-02", size: "156 KB" },
  { id: 4, name: "Monthly_Expenses_Nov_2025.pdf", type: "Monthly Expenses", date: "2025-12-05", size: "238 KB" },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-sm text-muted-foreground">Generate and download business reports</p>
          </div>
        </div>

        {/* Report Generator */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Generate Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Report Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((report) => (
                      <SelectItem key={report.id} value={report.id}>{report.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Period</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan-2026">January 2026</SelectItem>
                    <SelectItem value="dec-2025">December 2025</SelectItem>
                    <SelectItem value="q3-fy25-26">Q3 FY25-26</SelectItem>
                    <SelectItem value="fy25-26">FY 2025-26</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Format</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Available Reports</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.id}
                  className="cursor-pointer border-border bg-card transition-all hover:border-primary/50"
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${report.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Export
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Reports */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recently Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {report.name.endsWith(".xlsx") ? (
                        <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • {report.size} • {report.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
