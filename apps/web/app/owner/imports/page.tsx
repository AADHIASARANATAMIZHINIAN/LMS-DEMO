import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { UploadCloud, FileType } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Bulk Data Import" description="Upload CSV files to provision global tenant data." breadcrumb={[{ label: "Owner" }, { label: "Imports" }]} />
      <Card padding="lg" className="border-dashed border-2 text-center py-16">
        <div className="flex justify-center mb-4"><div className="p-4 bg-blue-50 text-blue-600 rounded-full"><UploadCloud size={32} /></div></div>
        <h3 className="font-bold text-slate-900 text-lg mb-2">Drag and drop CSV files here</h3>
        <p className="text-sm text-slate-500 mb-6">Support for bulk tenants, administrators, and global curriculum templates.</p>
        <Button>Browse Files</Button>
      </Card>
      <h3 className="font-semibold text-slate-900 mt-8 mb-4">Recent Import Logs</h3>
      <div className="space-y-3">
        <Card className="flex items-center gap-4 text-sm"><FileType className="text-emerald-500" size={16} /> <span>astra_curriculum_v2.csv</span><span className="ml-auto text-xs text-slate-400">2h ago</span></Card>
        <Card className="flex items-center gap-4 text-sm"><FileType className="text-emerald-500" size={16} /> <span>platform_admins.csv</span><span className="ml-auto text-xs text-slate-400">1d ago</span></Card>
      </div>
    </div>
  );
}
