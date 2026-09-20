import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Users } from "lucide-react";

export default function Page() {
  const batches = [
    { name: "Batch 2023 - 2027", students: 120, status: "Active" },
    { name: "Batch 2022 - 2026", students: 105, status: "Active" },
    { name: "Batch 2021 - 2025", students: 98, status: "Graduating" }
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Academic Batches" description="Manage student cohorts and graduation cycles." breadcrumb={[{ label: "Coordinator" }, { label: "Batches" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {batches.map((b, i) => (
          <Card key={i} className="hover:border-blue-300 transition-colors">
            <h3 className="font-bold text-slate-900">{b.name}</h3>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><Users size={14} /> {b.students} Enrolled</span>
              <span className={`px-2 py-1 text-xs rounded-full ${b.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{b.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
