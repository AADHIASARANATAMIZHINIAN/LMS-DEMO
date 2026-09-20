"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Activity, LayoutGrid } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tenants" description="Overview and management." breadcrumb={[{ label: "Portal" }, { label: "Tenants" }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} padding="lg" className="border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-blue-800/10 text-blue-800 flex items-center justify-center mb-4">
              <LayoutGrid size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Demo Module {i}</h3>
            <p className="text-xs text-slate-500">Seeded dummy data for the Tenants module presentation.</p>
          </Card>
        ))}
      </div>

      <Card padding="lg" className="border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <Activity size={18} className="text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
        </div>
        <div className="space-y-4 divide-y divide-slate-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pt-4 first:pt-0 flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-900">Action executed successfully</p>
                <p className="text-xs text-slate-500 mt-0.5">System generated log entry for demonstration.</p>
              </div>
              <span className="text-[10px] text-slate-500">2h ago</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
