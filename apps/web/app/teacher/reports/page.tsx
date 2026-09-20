import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Download, FileText } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Export Reports" description="Generate CSV and PDF academic reports." breadcrumb={[{ label: "Teacher" }, { label: "Reports" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Midterm Grade Roster", format: "CSV", size: "12 KB" },
          { title: "Plagiarism Detection Summary", format: "PDF", size: "1.4 MB" },
          { title: "Attendance & Participation", format: "CSV", size: "45 KB" }
        ].map((r, i) => (
          <Card key={i} className="flex justify-between items-center hover:border-blue-300 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded text-slate-500"><FileText size={20} /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{r.format} • {r.size}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 p-2"><Download size={18} /></button>
          </Card>
        ))}
      </div>
    </div>
  );
}
