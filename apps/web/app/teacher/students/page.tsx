"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Search } from "lucide-react";
import { useState } from "react";

const STUDENTS = [
  { name: "Alex Johnson", id: "AIT-001", class: "CS102 – Class II-B", score: 92, attendance: 95, status: "Excellent" },
  { name: "Sarah Connor", id: "AIT-002", class: "CS102 – Class II-B", score: 75, attendance: 88, status: "Good" },
  { name: "John Doe",     id: "AIT-003", class: "CS301 – Class III-A", score: 61, attendance: 72, status: "At Risk" },
  { name: "Priya Sharma", id: "AIT-004", class: "CS301 – Class III-A", score: 88, attendance: 93, status: "Good" },
  { name: "Wei Zhang",    id: "AIT-005", class: "CS102 – Class II-B", score: 45, attendance: 65, status: "At Risk" },
  { name: "Fatima Al-Sayed", id: "AIT-006", class: "CS301 – Class III-A", score: 97, attendance: 99, status: "Excellent" },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const filtered = STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));

  return (
    <div className="space-y-6">
      <PageHeader title="My Students" description="All students enrolled in your assigned classes." breadcrumb={[{ label: "Teacher" }, { label: "Students" }]} />
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="w-full h-10 pl-9 pr-4 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900" />
      </div>
      <Card padding="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Student", "ID", "Class", "Score", "Attendance", "Status"].map(h => (
                <th key={h} className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-xs">{s.name[0]}</div>
                    <span className="font-semibold text-slate-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.id}</td>
                <td className="px-6 py-4 text-slate-600">{s.class}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${s.score >= 85 ? "text-emerald-600" : s.score >= 65 ? "text-blue-600" : "text-rose-600"}`}>{s.score}%</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{s.attendance}%</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    s.status === "Excellent" ? "bg-emerald-100 text-emerald-700" :
                    s.status === "Good" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                  }`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
