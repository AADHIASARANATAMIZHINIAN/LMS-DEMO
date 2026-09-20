"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Loader2, BookOpen, Users, BarChart2, TrendingUp, Clock } from "lucide-react";

export default function Page() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teacher/classes", { credentials: "include" })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "35", sub: "students in CS102" },
    { label: "42", sub: "students in CS301" },
    { label: "89%", sub: "avg attendance" },
    { label: "77%", sub: "avg score" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="My Classes" description="Manage your assigned course sections." breadcrumb={[{ label: "Teacher" }, { label: "Classes" }]} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} padding="lg" className="text-center">
            <p className="text-2xl font-extrabold text-slate-900">{s.label}</p>
            <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((c, i) => (
            <Card key={i} className="group hover:border-blue-300 hover:shadow-md transition-all cursor-pointer" padding="none">
              <div className={`h-3 rounded-t-xl ${i % 2 === 0 ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"}`} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{c.course?.code} · {c.term}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">{c.course?.name}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{c.class?.name}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${i % 2 === 0 ? "bg-blue-50 text-blue-600" : "bg-teal-50 text-teal-600"}`}>
                    <BookOpen size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col items-center">
                    <Users size={14} className="text-slate-400 mb-1" />
                    <span className="text-sm font-bold text-slate-900">{i === 0 ? 35 : 42}</span>
                    <span className="text-[10px] text-slate-500">Students</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BarChart2 size={14} className="text-slate-400 mb-1" />
                    <span className="text-sm font-bold text-slate-900">{i === 0 ? "81%" : "74%"}</span>
                    <span className="text-[10px] text-slate-500">Avg Score</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp size={14} className="text-slate-400 mb-1" />
                    <span className="text-sm font-bold text-slate-900">{i === 0 ? "92%" : "86%"}</span>
                    <span className="text-[10px] text-slate-500">Attendance</span>
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
