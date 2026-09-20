import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { LineChart, BarChart } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Institution Analytics" description="High-level metrics for all departments and programs." breadcrumb={[{ label: "Coordinator" }, { label: "Analytics" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2"><LineChart size={16} /> Enrollment Trends</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[40, 60, 45, 80, 75, 90, 100].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-blue-500 rounded-t transition-all" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-mono">
            <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span>
          </div>
        </Card>
        <Card padding="lg">
          <h3 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2"><BarChart size={16} /> Department Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Computer Science</span><span className="font-bold">92%</span></div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full w-[92%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Electrical Eng.</span><span className="font-bold">85%</span></div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full w-[85%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Mathematics</span><span className="font-bold">78%</span></div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-amber-500 rounded-full w-[78%]"></div></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
