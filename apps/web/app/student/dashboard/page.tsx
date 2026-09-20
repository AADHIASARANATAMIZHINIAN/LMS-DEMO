"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { BookOpen, Code2, ClipboardList, Award, ChevronRight, Clock, CheckCircle2, Circle, Lock } from "lucide-react";

const COURSE = {
  code: "CS101", name: "Introduction to Programming",
  progress: 45, nextLesson: "Lesson 5 — Loops and Iteration",
  completedModules: 5, totalModules: 12,
};

const LEARNING_PATH = [
  { id: 1, type: "lesson",    label: "Lesson 1 — Variables & Types",          done: true },
  { id: 2, type: "practice",  label: "Practice Set 1 — Variable Exercises",    done: true },
  { id: 3, type: "lesson",    label: "Lesson 2 — Control Flow",                done: true },
  { id: 4, type: "coding",    label: "Coding Problem — FizzBuzz",              done: true },
  { id: 5, type: "lesson",    label: "Lesson 3 — Functions",                   done: true },
  { id: 6, type: "lesson",    label: "Lesson 4 — Conditionals",                done: false, current: true },
  { id: 7, type: "practice",  label: "Practice Set 4 — Conditional Logic",     done: false },
  { id: 8, type: "lesson",    label: "Lesson 5 — Loops and Iteration",          done: false },
  { id: 9, type: "assessment",label: "Weekly Quiz 3",                           done: false, locked: true },
];

const UPCOMING = [
  { label: "Midterm Exam — CS101",          due: "Sep 25, 10:00 AM", urgency: "high" },
  { label: "Practice Set 4 — Due",           due: "Sep 22, 11:59 PM", urgency: "normal" },
  { label: "Weekly Quiz 3",                  due: "Sep 21, 5:00 PM",  urgency: "normal" },
];

const typeIcon: Record<string, React.ReactNode> = {
  lesson:     <BookOpen size={11} />,
  practice:   <ClipboardList size={11} />,
  coding:     <Code2 size={11} />,
  assessment: <Award size={11} />,
};

const typeColor: Record<string, string> = {
  lesson:     "#4C7DFF",
  practice:   "#58D6C5",
  coding:     "#F4B860",
  assessment: "#4CC98A",
};

export default function StudentDashboard() {
  const { user } = useAuth("STUDENT");
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const name = user?.email?.split("@")[0] ?? "Student";

  return (
    <div className="space-y-6">
      {/* Greeting header */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{greeting}</p>
        <h1 className="text-2xl font-bold text-slate-900 capitalize">{name}</h1>
        <p className="text-sm text-slate-500 mt-1">Continue from where you left off.</p>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Current Course"   value="CS101" icon={<BookOpen size={14} />}      accent="blue"    delay={0} sub="Intro to Programming" />
        <MetricCard label="Problems Solved"  value={12}    icon={<Code2 size={14} />}          accent="teal"    delay={0.04} />
        <MetricCard label="Avg Score"        value="74%"   icon={<Award size={14} />}          accent="success" delay={0.08} delta={{ value: 4 }} />
        <MetricCard label="Upcoming"         value={3}     icon={<ClipboardList size={14} />}  accent="warning" delay={0.12} sub="tasks due this week" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Learning path */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="px-5 py-3.5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{COURSE.code} Learning Path</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{COURSE.name}</p>
                </div>
                <span className="text-xs font-bold text-emerald-600">{COURSE.progress}%</span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-emerald-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${COURSE.progress}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">{COURSE.completedModules} of {COURSE.totalModules} modules complete</p>
            </div>

            {/* Path items */}
            <div className="divide-y divide-slate-200">
              {LEARNING_PATH.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                  className={[
                    "flex items-center gap-3 px-5 py-2.5 transition-colors duration-100",
                    item.current ? "bg-blue-800/6" : item.done ? "" : item.locked ? "opacity-40" : "hover:bg-slate-50 cursor-pointer",
                  ].join(" ")}
                >
                  {/* State icon */}
                  <div className="shrink-0">
                    {item.done ? (
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    ) : item.locked ? (
                      <Lock size={14} className="text-slate-500" />
                    ) : item.current ? (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-3.5 h-3.5 rounded-full border-2 border-blue-800 flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-800" />
                      </motion.div>
                    ) : (
                      <Circle size={14} className="text-slate-400" />
                    )}
                  </div>

                  {/* Type badge */}
                  <span
                    className="shrink-0 w-5 h-5 rounded flex items-center justify-center"
                    style={{ background: `${typeColor[item.type]}15`, color: typeColor[item.type] }}
                  >
                    {typeIcon[item.type]}
                  </span>

                  {/* Label */}
                  <span className={`text-xs flex-1 ${item.done ? "text-slate-500 line-through" : item.current ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                    {item.label}
                  </span>

                  {item.current && (
                    <span className="text-[10px] font-semibold text-blue-800 bg-blue-800/10 px-1.5 py-0.5 rounded shrink-0">Current</span>
                  )}
                  {!item.done && !item.locked && !item.current && (
                    <ChevronRight size={12} className="text-slate-400 shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming sidebar */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card padding="none">
            <div className="px-4 py-3.5 border-b border-slate-200">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Upcoming</p>
            </div>
            <div className="divide-y divide-slate-200">
              {UPCOMING.map((u, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${u.urgency === "high" ? "bg-rose-600" : "bg-slate-500"}`} />
                  <div>
                    <p className="text-xs font-medium text-slate-900">{u.label}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={9} /> {u.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Next action */}
          <Card padding="sm" className="border-blue-800/20">
            <p className="text-[10px] font-semibold text-blue-800 uppercase tracking-widest mb-2">Next Up</p>
            <p className="text-sm font-medium text-slate-900 mb-3">{COURSE.nextLesson}</p>
            <button className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors">
              Continue <ChevronRight size={13} />
            </button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
