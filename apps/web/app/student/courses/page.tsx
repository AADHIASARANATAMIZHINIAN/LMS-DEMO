"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Loader2, BookOpen, User, ChevronRight, Clock } from "lucide-react";

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/courses", { credentials: "include" })
      .then(r => r.json())
      .then(d => setCourses(Array.isArray(d) ? d : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" description="All enrolled courses for the current term." breadcrumb={[{ label: "Student" }, { label: "Courses" }]} />
      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={24} className="animate-spin text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c, i) => {
            const teacher = c.teacherAssignments?.[0]?.teacher;
            return (
              <Card key={i} className="group hover:border-blue-300 hover:shadow-md transition-all cursor-pointer" padding="none">
                {/* Header Banner */}
                <div className={`h-24 rounded-t-xl flex items-center justify-center ${
                  i % 3 === 0 ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
                  i % 3 === 1 ? "bg-gradient-to-br from-emerald-500 to-teal-600" :
                  "bg-gradient-to-br from-purple-500 to-violet-600"
                }`}>
                  <BookOpen size={32} className="text-white/80" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.course?.code}</span>
                      <h3 className="font-bold text-slate-900 text-base mt-0.5 group-hover:text-blue-600 transition-colors">{c.course?.name}</h3>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 mt-1 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <User size={12} />
                      {teacher ? `${teacher.firstName} ${teacher.lastName}` : "Unassigned"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {c.term}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
