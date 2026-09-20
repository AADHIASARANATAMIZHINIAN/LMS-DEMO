"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Users, BookOpen, TrendingUp } from "lucide-react";

const CLASSES = [
  { code: "CS101-A", name: "Introduction to Programming", section: "II-B", students: 42, teacher: "Alan Turing", attendance: 89, avg: 74 },
  { code: "CS102-B", name: "Data Structures",             section: "II-B", students: 38, teacher: "Alan Turing", attendance: 92, avg: 81 },
  { code: "CS301-A", name: "Machine Learning",            section: "III-A", students: 35, teacher: "Grace Hopper", attendance: 88, avg: 79 },
  { code: "CS401-A", name: "Operating Systems",           section: "IV-B", students: 40, teacher: "Ada Lovelace", attendance: 85, avg: 72 },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="All Classes" description="All active classes across every department this term." breadcrumb={[{ label: "Coordinator" }, { label: "Classes" }]} />
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Class Code", "Course Name", "Section", "Teacher", "Students", "Attendance", "Avg Score"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CLASSES.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs font-bold text-indigo-700 bg-indigo-50/50">{c.code}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-slate-400" />
                      <span className="font-semibold text-slate-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">Class {c.section}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-[10px]">{c.teacher[0]}</div>
                      <span className="text-slate-700">{c.teacher}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-slate-700"><Users size={12} />{c.students}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-bold ${c.attendance >= 88 ? "text-emerald-600" : "text-amber-600"}`}>{c.attendance}%</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-20">
                        <div className={`h-full rounded-full ${c.avg >= 80 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${c.avg}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${c.avg >= 80 ? "text-emerald-600" : "text-amber-600"}`}>{c.avg}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
