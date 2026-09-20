"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Users, GraduationCap, BookOpen, Building2, AlertTriangle, ChevronRight } from "lucide-react";

const MOCK_CLASSES = [
  { id: "1", name: "CS101 — Intro to Programming", section: "A", students: 42, teacher: "Bob Teacher", attendance: 89, avgScore: 74, status: "active" },
  { id: "2", name: "CS102 — Data Structures",       section: "B", students: 38, teacher: "Bob Teacher", attendance: 92, avgScore: 81, status: "active" },
  { id: "3", name: "CS103 — Algorithms",             section: "C", students: 35, teacher: "—",           attendance: 0,  avgScore: 0,  status: "warning" },
];

const ALERTS = [
  { type: "warning", msg: "CS103 has no teacher assigned for Fall 2026" },
  { type: "warning", msg: "42 student records pending import validation" },
  { type: "danger",  msg: "3 students below 50% average — flagged for review" },
];

interface Stats { departments: number; students: number; teachers: number; classes: number; }

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/coordinator/stats", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => setStats(d ?? { departments: 2, students: 80, teachers: 3, classes: 3 }))
      .catch(() => setStats({ departments: 2, students: 80, teachers: 3, classes: 3 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institution Dashboard"
        description="Academic operations overview"
        breadcrumb={[{ label: "Coordinator" }, { label: "Dashboard" }]}
        action={
          <Button variant="primary" size="sm" leftIcon={<Users size={13} />}>
            Import Students
          </Button>
        }
      />

      {/* ── Metric band ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)
        ) : (
          <>
            <MetricCard label="Students"    value={stats!.students}    icon={<Users size={14} />}          accent="blue"    delay={0} />
            <MetricCard label="Teachers"    value={stats!.teachers}    icon={<GraduationCap size={14} />}  accent="teal"    delay={0.04} />
            <MetricCard label="Classes"     value={stats!.classes}     icon={<BookOpen size={14} />}       accent="success" delay={0.08} />
            <MetricCard label="Departments" value={stats!.departments} icon={<Building2 size={14} />}      accent="warning" delay={0.12} />
          </>
        )}
      </div>

      {/* ── Alerts + Seat usage ──────────────────────── */}
      {ALERTS.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2">
          {ALERTS.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs border flex-1 ${
                a.type === "danger"
                  ? "bg-rose-600/6 border-rose-600/20 text-rose-600"
                  : "bg-amber-600/6 border-amber-600/20 text-amber-600"
              }`}
            >
              <AlertTriangle size={12} className="shrink-0 mt-0.5" />
              {a.msg}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Class performance table ─────────────────── */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.18 }}
        >
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Class Performance</h3>
              <a href="/coordinator/classes" className="text-[11px] text-blue-800 hover:text-blue-900 transition-colors flex items-center gap-0.5">
                All classes <ChevronRight size={11} />
              </a>
            </div>
            <DataTable
              columns={[
                {
                  key: "name", header: "Class",
                  render: (r) => (
                    <div>
                      <p className="text-sm font-medium text-slate-900">{r.name}</p>
                      <p className="text-[11px] text-slate-500">Section {r.section}</p>
                    </div>
                  )
                },
                { key: "students",   header: "Students",    render: (r) => <span className="tabular-nums">{r.students}</span> },
                {
                  key: "teacher", header: "Teacher",
                  render: (r) => r.teacher === "—"
                    ? <span className="text-amber-600 text-xs">Unassigned</span>
                    : <span className="text-slate-500 text-xs">{r.teacher}</span>
                },
                {
                  key: "attendance", header: "Attendance",
                  render: (r) => r.attendance
                    ? <span className={`tabular-nums text-xs ${r.attendance >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{r.attendance}%</span>
                    : <span className="text-slate-500">—</span>
                },
                {
                  key: "avgScore", header: "Avg Score",
                  render: (r) => r.avgScore
                    ? <span className={`tabular-nums text-xs ${r.avgScore >= 70 ? "text-emerald-600" : r.avgScore >= 50 ? "text-amber-600" : "text-rose-600"}`}>{r.avgScore}%</span>
                    : <span className="text-slate-500">—</span>
                },
                { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} label={r.status} /> },
              ]}
              data={MOCK_CLASSES}
              keyField="id"
              compact
            />
          </Card>
        </motion.div>

        {/* ── Sidebar panels ──────────────────────────── */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.22 }}
        >
          {/* Seat utilisation */}
          <Card padding="sm">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Seat Utilisation</p>
            <div className="space-y-3">
              {[
                { label: "Students", used: 80, total: 600, color: "#4C7DFF" },
                { label: "Teachers", used: 3,  total: 30,  color: "#58D6C5" },
                { label: "Coords",   used: 1,  total: 3,   color: "#4CC98A" },
              ].map((s) => {
                const pct = Math.round((s.used / s.total) * 100);
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="text-slate-500 tabular-nums">{s.used}/{s.total} <span className="text-slate-900 font-semibold">{pct}%</span></span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick actions */}
          <Card padding="sm">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Quick Actions</p>
            <div className="space-y-1">
              {[
                { label: "Import students",      href: "/coordinator/imports" },
                { label: "Assign teacher",       href: "/coordinator/teacher-allocation" },
                { label: "View analytics",       href: "/coordinator/analytics" },
                { label: "Generate report",      href: "/coordinator/reports" },
              ].map((a) => (
                <a
                  key={a.href} href={a.href}
                  className="flex items-center justify-between group px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors text-[12px] text-slate-500 hover:text-slate-900"
                >
                  {a.label}
                  <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 text-blue-800 transition-opacity" />
                </a>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
