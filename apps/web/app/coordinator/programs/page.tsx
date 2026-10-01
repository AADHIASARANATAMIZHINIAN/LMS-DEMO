"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Users, Clock, BookOpen, ChevronRight, BarChart } from "lucide-react";

export default function ProgramsPage() {
  const programs = [
    { name: "B.Tech Computer Science", dept: "School of Computer Science", duration: "4 Years", credits: 160, enrolled: 480, completion: 78 },
    { name: "B.Tech Artificial Intelligence", dept: "School of Computer Science", duration: "4 Years", credits: 165, enrolled: 320, completion: 65 },
    { name: "M.Tech Computer Science", dept: "School of Computer Science", duration: "2 Years", credits: 80, enrolled: 120, completion: 92 },
    { name: "B.Tech Electronics & Comm", dept: "School of Electrical Engineering", duration: "4 Years", credits: 160, enrolled: 280, completion: 81 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Degree Programs" 
        description="Manage academic programs and curriculum structures."
        breadcrumb={[{ label: "Coordinator" }, { label: "Programs" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ease: "easeOut" as const }}
          >
            <Card hover elevated className="overflow-hidden p-0 flex flex-col h-full border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{prog.name}</h3>
                  <div className="text-blue-100 text-sm">{prog.dept}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10 shrink-0">
                  <GraduationCap size={20} className="text-white" />
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <Clock size={16} className="text-slate-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Duration</div>
                    <div className="text-sm font-bold text-slate-900">{prog.duration}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <BookOpen size={16} className="text-slate-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Credits</div>
                    <div className="text-sm font-bold text-slate-900">{prog.credits}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <Users size={16} className="text-slate-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Enrolled</div>
                    <div className="text-sm font-bold text-slate-900">{prog.enrolled}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-700">Avg. Completion Rate</span>
                    <span className="font-bold text-slate-900">{prog.completion}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${prog.completion}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 mt-auto">
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View Curriculum <ChevronRight size={16} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
