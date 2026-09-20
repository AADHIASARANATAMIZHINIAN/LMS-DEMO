"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Plus, Loader2, UserCheck, AlertCircle } from "lucide-react";

export default function Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/coordinator/students", { credentials: "include" })
      .then(r => r.json())
      .then(d => setStudents(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    s.studentIdStr?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Student Management" description="All enrolled students at Astra Institute." breadcrumb={[{ label: "Coordinator" }, { label: "Students" }]} />
        <Button size="sm" leftIcon={<Plus size={14} />}>Add Student</Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or ID..." className="w-full h-10 pl-9 pr-4 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900" />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <UserCheck size={14} className="text-emerald-500" />
          <span><strong className="text-slate-900">{filtered.length}</strong> students</span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-blue-600" /></div>
      ) : (
        <Card padding="none">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Student", "ID", "Email", "Status"].map(h => (
                  <th key={h} className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                        {s.firstName?.[0]}{s.lastName?.[0]}
                      </div>
                      <span className="font-semibold text-slate-900">{s.firstName} {s.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.studentIdStr}</td>
                  <td className="px-6 py-4 text-slate-600">{s.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      s.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}>{s.status || "ACTIVE"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
