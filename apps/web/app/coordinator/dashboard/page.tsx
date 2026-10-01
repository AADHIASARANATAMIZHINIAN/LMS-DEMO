"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  TrendingUp,
  Bell,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  BarChart2,
  Plus,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const enrollmentData = [
  { month: "May", students: 920 },
  { month: "Jun", students: 975 },
  { month: "Jul", students: 1020 },
  { month: "Aug", students: 1045 },
  { month: "Sep", students: 1080 },
  { month: "Oct", students: 1100 },
];

const classPerformance = [
  { code: "CS301", name: "Data Structures & Algorithms", teacher: "Dr. Ramesh Kumar", enrolled: 58, avg: 82, pass: 94 },
  { code: "AI201", name: "Machine Learning Fundamentals", teacher: "Prof. Anitha Menon", enrolled: 44, avg: 79, pass: 88 },
  { code: "CS401", name: "Database Management Systems", teacher: "Dr. Suresh Pillai", enrolled: 61, avg: 76, pass: 91 },
  { code: "EC302", name: "Digital Signal Processing", teacher: "Prof. Lakshmi Nair", enrolled: 39, avg: 73, pass: 85 },
  { code: "CS501", name: "Cloud Computing", teacher: "Dr. Vijay Iyer", enrolled: 35, avg: 85, pass: 96 },
];

const quickActions = [
  { icon: Plus, label: "Enroll Student", color: "bg-blue-50 text-blue-600" },
  { icon: Users, label: "Assign Teacher", color: "bg-indigo-50 text-indigo-600" },
  { icon: BookOpen, label: "Create Course", color: "bg-emerald-50 text-emerald-600" },
  { icon: Download, label: "Export Report", color: "bg-amber-50 text-amber-600" },
];

const alerts = [
  { type: "warning", text: "7 students on academic probation need review", icon: AlertCircle, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { type: "info", text: "Mid-semester exams scheduled for Oct 15–20", icon: Bell, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { type: "success", text: "AI201 lab report submissions closed — grading pending", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
];

const stats = [
  { label: "Total Students", value: "1,100", icon: Users, color: "text-blue-600", bg: "bg-blue-50", delta: "+4.8%", trend: "up" },
  { label: "Teachers", value: "8", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50", delta: "+1", trend: "up" },
  { label: "Active Classes", value: "4", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", delta: "Stable", trend: "flat" },
  { label: "Departments", value: "2", icon: Building2, color: "text-amber-600", bg: "bg-amber-50", delta: "Stable", trend: "flat" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CoordinatorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <PageHeader
        title="Coordinator Dashboard"
        description="Academic Year 2024–25 · Semester I · AIT Bangalore"
      />

      {/* Stats Banner */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={itemVariants}>
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`${s.bg} p-3 rounded-lg`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
                <span className={`text-xs font-medium ${s.trend === "up" ? "text-emerald-600" : "text-slate-400"}`}>
                  {s.trend === "up" ? "↑ " : ""}{s.delta}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Enrollment Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="xl:col-span-2"
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Enrollment Trend</h2>
                <p className="text-sm text-slate-500">Monthly student count — May to Oct 2024</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                +19.6% growth
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={enrollmentData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[880, 1120]} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13 }}
                  formatter={(val: any) => [`${val} students`, "Enrolled"]}
                />
                <Area type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={2.5} fill="url(#enrollGrad)" dot={{ r: 4, fill: "#2563eb" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions + Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
                >
                  <div className={`${a.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                    <a.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center leading-tight">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Alerts & Notices</h2>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`flex gap-3 items-start p-3 rounded-lg border ${a.color}`}>
                  <a.icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="text-xs font-medium leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Class Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Class Performance Overview</h2>
              <p className="text-sm text-slate-500">Current semester active courses</p>
            </div>
            <Button variant="secondary" size="sm">
              <BarChart2 className="w-4 h-4 mr-1.5" /> Full Report
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Course Code", "Course Name", "Teacher", "Enrolled", "Avg Score", "Pass Rate", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {classPerformance.map((c, i) => (
                  <motion.tr
                    key={c.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{c.code}</span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">{c.name}</td>
                    <td className="px-5 py-4 text-slate-600">{c.teacher}</td>
                    <td className="px-5 py-4 text-slate-700 font-medium">{c.enrolled}</td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold ${c.avg >= 80 ? "text-emerald-600" : c.avg >= 75 ? "text-amber-600" : "text-rose-500"}`}>{c.avg}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${c.pass}%` }} />
                        </div>
                        <span className="text-slate-700 font-medium text-xs">{c.pass}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 5 of 5 courses</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all courses <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
