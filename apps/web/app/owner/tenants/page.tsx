import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Managed Tenants" description="View all licensed institutions on the platform." breadcrumb={[{ label: "Owner" }, { label: "Tenants" }]} />
        <a href="/owner/tenants/new"><Button>Provision Tenant</Button></a>
      </div>
      <Card padding="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">Institution Name</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Domain</th>
              <th className="px-6 py-3 font-semibold text-slate-600">License Limit</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2"><Building2 size={16} className="text-blue-600" /> Astra Institute of Technology</td>
              <td className="px-6 py-4 font-mono text-xs">astra.edu</td>
              <td className="px-6 py-4">600 Students</td>
              <td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-1 text-xs rounded">ACTIVE</span></td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2"><Building2 size={16} className="text-indigo-600" /> Global Tech University</td>
              <td className="px-6 py-4 font-mono text-xs">globaltech.edu</td>
              <td className="px-6 py-4">1200 Students</td>
              <td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-1 text-xs rounded">ACTIVE</span></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
