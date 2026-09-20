"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { PlayCircle, CheckCircle2, Lock } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Enrolled Courses" description="Access your curriculum, lessons, and practice materials." breadcrumb={[{ label: "Student" }, { label: "Courses" }]} />
      
      <div className="space-y-8">
        {[
          {
            name: "Introduction to Programming (C++)",
            code: "CS101",
            progress: 75,
            modules: [
              { title: "Variables and Data Types", status: "completed" },
              { title: "Control Structures", status: "completed" },
              { title: "Functions and Recursion", status: "current" },
              { title: "Pointers and Memory", status: "locked" }
            ]
          },
          {
            name: "Data Structures",
            code: "CS201",
            progress: 10,
            modules: [
              { title: "Arrays and Strings", status: "current" },
              { title: "Linked Lists", status: "locked" },
              { title: "Stacks and Queues", status: "locked" },
              { title: "Trees and Graphs", status: "locked" }
            ]
          }
        ].map(course => (
          <Card key={course.code} padding="none" className="overflow-hidden">
            <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-1">{course.code}</p>
                <h3 className="text-xl font-bold text-slate-900">{course.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">{course.progress}%</span>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {course.modules.map((m, i) => (
                <div key={i} className={`p-4 flex items-center justify-between transition-colors ${m.status === 'current' ? 'bg-blue-800/5' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    {m.status === 'completed' && <CheckCircle2 size={18} className="text-emerald-600" />}
                    {m.status === 'current' && <PlayCircle size={18} className="text-blue-800" />}
                    {m.status === 'locked' && <Lock size={18} className="text-slate-500" />}
                    <span className={`text-sm font-medium ${m.status === 'locked' ? 'text-slate-500' : 'text-slate-900'}`}>
                      Module {i + 1}: {m.title}
                    </span>
                  </div>
                  {m.status === 'current' && (
                    <button className="px-4 py-1.5 rounded-lg bg-blue-800 text-white text-xs font-bold">Resume</button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
