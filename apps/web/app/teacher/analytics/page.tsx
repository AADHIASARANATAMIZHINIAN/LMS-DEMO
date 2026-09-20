import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { BarChart3, Users, Clock } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Class Analytics" description="Performance insights across your assigned classes." breadcrumb={[{ label: "Teacher" }, { label: "Analytics" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg">
          <div className="flex justify-between items-start mb-4">
            <div><h3 className="font-bold text-slate-900">Average Score</h3><p className="text-3xl font-light mt-2">78%</p></div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded"><BarChart3 size={20} /></div>
          </div>
          <div className="h-2 bg-slate-100 rounded overflow-hidden"><div className="h-full bg-blue-500 w-[78%]"></div></div>
        </Card>
        <Card padding="lg">
          <div className="flex justify-between items-start mb-4">
            <div><h3 className="font-bold text-slate-900">Submission Rate</h3><p className="text-3xl font-light mt-2">92%</p></div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded"><Users size={20} /></div>
          </div>
          <div className="h-2 bg-slate-100 rounded overflow-hidden"><div className="h-full bg-emerald-500 w-[92%]"></div></div>
        </Card>
        <Card padding="lg">
          <div className="flex justify-between items-start mb-4">
            <div><h3 className="font-bold text-slate-900">Avg. Time Spent</h3><p className="text-3xl font-light mt-2">1.2h</p></div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded"><Clock size={20} /></div>
          </div>
          <div className="h-2 bg-slate-100 rounded overflow-hidden"><div className="h-full bg-purple-500 w-[40%]"></div></div>
        </Card>
      </div>
      <Card padding="lg">
        <h3 className="font-bold text-slate-900 mb-4">Struggling Topics</h3>
        <div className="space-y-3">
          {["Dynamic Programming", "Graph Traversal", "Pointers in C++"].map(t => (
            <div key={t} className="flex justify-between p-3 border border-slate-100 rounded hover:bg-slate-50">
              <span className="text-sm font-medium">{t}</span>
              <span className="text-xs text-rose-500 font-semibold bg-rose-50 px-2 py-1 rounded">High Failure Rate</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
