"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { BookOpen, User, Loader2 } from "lucide-react";

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("https://astra-lms-demo-api.loca.lt/api/student/courses", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } });
      if (res.ok) setCourses(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" description="Courses you are currently enrolled in." breadcrumb={[{ label: "Student" }, { label: "Courses" }]} />
      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
      ) : courses.length === 0 ? (
        <Card><div className="p-12 text-center text-slate-500">You are not enrolled in any courses.</div></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Card key={c.id} className="hover:border-blue-800/30 transition-colors group cursor-pointer flex flex-col h-full">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-800 mb-4">
                  <BookOpen size={18} />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{c.course?.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-1 mb-4">{c.course?.code} • {c.term}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-blue-800 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">0% Completed</p>
              </div>
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                <User size={14} className="text-slate-400" />
                <span className="text-xs text-slate-600">
                  {c.teacherAssignments?.[0]?.teacher ? `${c.teacherAssignments[0].teacher.firstName} ${c.teacherAssignments[0].teacher.lastName}` : "TBA"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
