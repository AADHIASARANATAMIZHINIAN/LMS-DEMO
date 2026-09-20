import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Institution Settings" description="Configure global academic rules." breadcrumb={[{ label: "Coordinator" }, { label: "Settings" }]} />
      <Card padding="lg" className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">Academic Year</label>
          <input type="text" defaultValue="2026-2027" className="w-full h-10 px-3 border border-slate-200 rounded focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">Current Term</label>
          <select className="w-full h-10 px-3 border border-slate-200 rounded focus:outline-none">
            <option>Fall 2026</option>
            <option>Spring 2027</option>
          </select>
        </div>
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </Card>
    </div>
  );
}
