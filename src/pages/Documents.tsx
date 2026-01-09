import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Upload, Search, FileText, Download, Eye, Trash2, Receipt, FileCheck, Building, Landmark, FileSignature } from "lucide-react";

const folders = [
  { id: "gst", name: "GST", icon: Receipt, count: 24, color: "bg-blue-500/10 text-blue-500" },
  { id: "tds", name: "TDS", icon: FileCheck, count: 18, color: "bg-purple-500/10 text-purple-500" },
  { id: "llp", name: "LLP", icon: Building, count: 12, color: "bg-emerald-500/10 text-emerald-500" },
  { id: "bank", name: "Bank", icon: Landmark, count: 45, color: "bg-amber-500/10 text-amber-500" },
  { id: "contracts", name: "Contracts", icon: FileSignature, count: 8, color: "bg-pink-500/10 text-pink-500" },
  { id: "invoices", name: "Invoices", icon: FileText, count: 156, color: "bg-cyan-500/10 text-cyan-500" },
];

const recentDocuments = [
  { id: 1, name: "GST_Return_Jan_2026.pdf", folder: "GST", size: "2.4 MB", date: "2026-01-15" },
  { id: 2, name: "TDS_Challan_CHN001.pdf", folder: "TDS", size: "156 KB", date: "2026-01-10" },
  { id: 3, name: "Invoice_INV2026001.pdf", folder: "Invoices", size: "89 KB", date: "2026-01-08" },
  { id: 4, name: "Bank_Statement_Dec_2025.pdf", folder: "Bank", size: "1.2 MB", date: "2026-01-05" },
  { id: 5, name: "Contract_ABC_Builders.pdf", folder: "Contracts", size: "3.8 MB", date: "2026-01-03" },
];

export default function Documents() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Document Vault</h1>
            <p className="text-sm text-muted-foreground">Secure storage for all business documents</p>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>

        {/* Folders Grid */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Folders</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <Card
                  key={folder.id}
                  className="cursor-pointer border-border bg-card transition-all hover:border-primary/50 hover:bg-card/80"
                >
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl ${folder.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="font-medium text-foreground">{folder.name}</p>
                    <p className="text-sm text-muted-foreground">{folder.count} files</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Documents */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.folder} • {doc.size} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
