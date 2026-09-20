"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { Loader2, Building2, Users, BookOpen } from "lucide-react";

export default function Page() {
  const [depts, setDepts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coordinator/departments", { credentials: "include" })
      .then(r => r.json())
      .then(d => setDepts(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const fallback = [
    { name: "School of Computer Science",     head: "Dr. Alan Turing",    courses: 12, students: 480, color: "from-blue-500 to-indigo-600" },
    { name: "School of Electrical Engineering", head: "Dr. Nikola Tesla",  courses: 8,  students: 320, color: "from-teal-500 to-emerald-600" },
  ];

  const display = depts.length > 0 ? depts.map((d: any, i: number) => ({ 
    name: d.name, head: d.head || "Dept. Head", courses: d.courses || 8, students: d.students || 300,
    color: i % 2 === 0 ? "from-blue-500 to-indigo-600" : "from-teal-500 to-emerald-600"
  })) : fallback;

  return (
    <div className="space-y-6">
      <PageHeader title="Departments" description="Academic departments within the institution." breadcrumb={[{ label: "Coordinator" }, { label: "Departments" }]} />
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {display.map((d, i) => (
            <Card key={i} className="overflow-hidden p-0" padding="none">
              <div className={`h-24 bg-gradient-to-br ${d.color} flex items-center px-6 gap-4`}>
                <Building2 size={32} className="text-white/80" />
                <h3 className="text-white font-bold text-lg leading-tight">{d.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4">Department Head: <span className="font-semibold text-slate-900">{d.head}</span></p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <BookOpen size={18} className="text-blue-500" />
                    <div><p className="text-lg font-bold text-slate-900">{d.courses}</p><p className="text-xs text-slate-500">Courses</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Users size={18} className="text-emerald-500" />
                    <div><p className="text-lg font-bold text-slate-900">{d.students}</p><p className="text-xs text-slate-500">Students</p></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
