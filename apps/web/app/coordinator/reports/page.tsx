"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Download, Calendar, Users } from "lucide-react";

const REPORTS = [
  { title: "Term-End Grade Summary",         format: "PDF", size: "2.1 MB", date: "Sep 18, 2026",  category: "Academic" },
  { title: "Department Attendance Report",    format: "CSV", size: "450 KB", date: "Sep 15, 2026",  category: "Attendance" },
  { title: "Faculty Load Analysis",           format: "PDF", size: "980 KB", date: "Sep 10, 2026",  category: "HR" },
  { title: "Student Progress Tracker",        format: "CSV", size: "120 KB", date: "Sep 5, 2026",   category: "Academic" },
  { title: "Enrollment Statistics Q3 2026",   format: "PDF", size: "1.5 MB", date: "Aug 30, 2026",  category: "Admin" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Download and schedule institution-wide reports." breadcrumb={[{ label: "Coordinator" }, { label: "Reports" }]} action={<Button size="sm">Schedule Report</Button>} />
      <div className="space-y-3">
        {REPORTS.map((r, i) => (
          <Card key={i} className="flex items-center justify-between gap-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${r.format === "PDF" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{r.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {r.date}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {r.category}</span>
                  <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${r.format === "PDF" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>{r.format}</span>
                  <span>{r.size}</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0">
              <Download size={18} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
