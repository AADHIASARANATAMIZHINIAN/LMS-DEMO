import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Server, Activity } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Background Jobs" description="Monitor system queues and background processing." breadcrumb={[{ label: "Owner" }, { label: "Jobs" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-2"><Server className="text-blue-500" size={20} /><h3 className="font-bold">Execution Workers</h3></div>
          <p className="text-sm text-slate-500">Currently processing code submission sandboxes.</p>
          <div className="mt-6 flex justify-between items-center text-xs font-mono"><span className="text-emerald-500">Online</span><span>Active Jobs: 14</span></div>
        </Card>
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-2"><Activity className="text-purple-500" size={20} /><h3 className="font-bold">Email Dispatcher</h3></div>
          <p className="text-sm text-slate-500">Handling automated welcome emails and reports.</p>
          <div className="mt-6 flex justify-between items-center text-xs font-mono"><span className="text-emerald-500">Online</span><span>Queue: Empty</span></div>
        </Card>
      </div>
    </div>
  );
}
