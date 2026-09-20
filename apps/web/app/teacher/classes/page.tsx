"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Users, Clock, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Classes" description="Overview of the classes assigned to you." breadcrumb={[{ label: "Teacher" }, { label: "Classes" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Data Structures & Algorithms", code: "CS201", time: "Mon/Wed 10:00 AM", students: 60, progress: 45 },
          { name: "Database Management Systems", code: "CS202", time: "Tue/Thu 1:00 PM", students: 58, progress: 30 },
          { name: "Object Oriented Programming", code: "CS105", time: "Fri 9:00 AM", students: 62, progress: 60 }
        ].map(c => (
          <Card key={c.code} padding="lg" className="hover:border-slate-300 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-blue-800 bg-blue-800/10 px-2 py-1 rounded-md inline-block mb-2">{c.code}</p>
                <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={14} /> {c.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users size={14} /> {c.students} Enrolled
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Syllabus Progress</span>
                <span>{c.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                <div className="h-full bg-blue-800" style={{ width: `${c.progress}%` }} />
              </div>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-blue-800 group-hover:text-blue-700 transition-colors">
              Manage Class <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
