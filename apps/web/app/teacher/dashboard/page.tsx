"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { BookOpen, Users, ClipboardCheck, TrendingUp, ChevronRight, Code2, Clock } from "lucide-react";

const CLASSES = [
  { id: "1", code: "CS101-A", name: "Intro to Programming", students: 42, pending: 8, attendance: 89, avg: 74, last: "Today" },
  { id: "2", code: "CS102-B", name: "Data Structures",      students: 38, pending: 6, attendance: 92, avg: 81, last: "Yesterday" },
];

const STUDENTS_NEEDING_REVIEW = [
  { id: "1", name: "Alice Kumar",  class: "CS101-A", score: 41, issue: "Below threshold" },
  { id: "2", name: "Ram Prasad",   class: "CS101-A", score: 38, issue: "Missed 3 sessions" },
  { id: "3", name: "Anita Nair",   class: "CS102-B", score: 45, issue: "Low submission rate" },
];

export default function TeacherDashboard() {
  const { user } = useAuth("TEACHER");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Dashboard"
        description="Class overview and pending actions"
        breadcrumb={[{ label: "Teacher" }, { label: "Dashboard" }]}
        action={
          <Button variant="secondary" size="sm" leftIcon={<ClipboardCheck size={13} />}>
            New Assessment
          </Button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="My Classes"      value={2}   icon={<BookOpen size={14} />}      accent="teal"    delay={0} />
        <MetricCard label="Students"        value={80}  icon={<Users size={14} />}          accent="blue"    delay={0.04} />
        <MetricCard label="Pending Reviews" value={14}  icon={<ClipboardCheck size={14} />} accent="warning" delay={0.08} delta={{ value: 3, label: " new today" }} />
        <MetricCard label="Avg Class Score" value="77%" icon={<TrendingUp size={14} />}     accent="success" delay={0.12} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Class cards */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Assigned Classes</p>
          {CLASSES.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <Card hover padding="sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className="text-[10px] text-teal-600 bg-teal-600/10 px-1.5 py-0.5 rounded font-mono">{cls.code}</code>
                      {cls.pending > 0 && (
                        <span className="text-[10px] text-amber-600 bg-amber-600/10 border border-amber-600/20 px-1.5 py-0.5 rounded font-semibold">
                          {cls.pending} pending
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{cls.name}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> Last active {cls.last}
                    </p>
                  </div>
                  <Button variant="ghost" size="xs" rightIcon={<ChevronRight size={11} />}>
                    Open
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Students",   value: cls.students },
                    { label: "Attendance", value: `${cls.attendance}%` },
                    { label: "Avg Score",  value: `${cls.avg}%` },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                      <p className="text-base font-bold text-slate-900 tabular-nums">{s.value}</p>
                      <p className="text-[10px] text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Score bar */}
                <div className="mt-3">
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-teal-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${cls.avg}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Attention queue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <Card padding="none">
            <div className="px-4 py-3 border-b border-slate-200">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Attention Queue</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{STUDENTS_NEEDING_REVIEW.length} students flagged</p>
            </div>
            <div className="divide-y divide-slate-200">
              {STUDENTS_NEEDING_REVIEW.map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-rose-600/10 flex items-center justify-center shrink-0">
                    <span className="text-rose-600 text-[10px] font-bold">{s.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-900 truncate">{s.name}</p>
                    <p className="text-[10px] text-slate-500">{s.class} · {s.issue}</p>
                  </div>
                  <ChevronRight size={12} className="text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-200">
              <a href="/teacher/students" className="text-[11px] text-blue-800 hover:text-blue-900 transition-colors flex items-center gap-0.5">
                View all students <ChevronRight size={11} />
              </a>
            </div>
          </Card>

          {/* Recent code submissions */}
          <Card padding="sm" className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={12} className="text-teal-600" />
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Code Submissions</p>
            </div>
            <p className="text-xs text-slate-500 text-center py-4">
              Submissions appear once students begin solving problems.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
