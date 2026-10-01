"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Clock,
  FileText,
  Award,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const metrics = [
  {
    label: "My Classes",
    value: "2",
    sub: "Active this semester",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    trend: "+1 vs last sem",
    trendUp: true,
  },
  {
    label: "Total Students",
    value: "77",
    sub: "Across all courses",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    trend: "+9 vs last sem",
    trendUp: true,
  },
  {
    label: "Pending Reviews",
    value: "14",
    sub: "Submissions awaiting grade",
    icon: ClipboardList,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    trend: "5 overdue",
    trendUp: false,
  },
  {
    label: "Avg Score",
    value: "78%",
    sub: "Weighted class average",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    trend: "+3% vs last week",
    trendUp: true,
  },
];

const activityData = [
  { day: "Mon", submissions: 12 },
  { day: "Tue", submissions: 18 },
  { day: "Wed", submissions: 8 },
  { day: "Thu", submissions: 21 },
  { day: "Fri", submissions: 15 },
];

const atRiskStudents = [
  {
    name: "Ravi Kumar",
    score: 41,
    issue: "Missed 3 assignments in a row",
    course: "CS102",
    avatar: "RK",
    avatarBg: "bg-rose-100 text-rose-700",
  },
  {
    name: "Priya Nair",
    score: 49,
    issue: "Consistently low test scores",
    course: "CS301",
    avatar: "PN",
    avatarBg: "bg-amber-100 text-amber-700",
  },
  {
    name: "Arjun Mehta",
    score: 53,
    issue: "No submission this week",
    course: "CS102",
    avatar: "AM",
    avatarBg: "bg-orange-100 text-orange-700",
  },
  {
    name: "Lakshmi Iyer",
    score: 57,
    issue: "Attendance below 60%",
    course: "CS301",
    avatar: "LI",
    avatarBg: "bg-purple-100 text-purple-700",
  },
];

const recentAssignments = [
  {
    title: "Binary Tree Inversion",
    course: "CS102",
    submitted: 28,
    total: 38,
    dueDate: "Sep 28, 2026",
    avgScore: 72,
    lang: "Python",
  },
  {
    title: "Sorting Algorithms Benchmark",
    course: "CS102",
    submitted: 35,
    total: 38,
    dueDate: "Sep 25, 2026",
    avgScore: 88,
    lang: "C++",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="text-sm font-bold text-blue-600">{payload[0].value} submissions</p>
      </div>
    );
  }
  return null;
};

export default function TeacherDashboard() {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title={`${greeting}, Dr. Sharma 👋`}
        description="Here's a snapshot of your classes, student activity, and items needing attention."
        breadcrumb={[{ label: "Teacher" }, { label: "Dashboard" }]}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<FileText size={14} />}>
              Grade Report
            </Button>
            <Button variant="primary" size="sm" leftIcon={<ClipboardList size={14} />}>
              New Assignment
            </Button>
          </div>
        }
      />

      {/* Metric Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {metrics.map((m) => (
          <motion.div key={m.label} variants={itemVariants}>
            <div className={`bg-white border ${m.border} rounded-xl p-5 h-full`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`${m.bg} ${m.color} p-2.5 rounded-lg`}>
                  <m.icon size={18} />
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    m.trendUp
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {m.trend}
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">{m.value}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{m.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{m.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                  <BarChart2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">This Week's Activity</h3>
                  <p className="text-xs text-slate-500">Daily submission counts across all courses</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                Sep 29 – Oct 3, 2026
              </span>
            </div>
            <div className="mt-5 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} barCategoryGap="35%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="submissions" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Total this week</p>
                <p className="text-lg font-bold text-slate-900">74</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Peak day</p>
                <p className="text-lg font-bold text-slate-900">Thu (21)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Daily avg</p>
                <p className="text-lg font-bold text-slate-900">14.8</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attention Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-rose-50 text-rose-600 p-2 rounded-lg">
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Attention Queue</h3>
                  <p className="text-xs text-slate-500">Students needing support</p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                {atRiskStudents.length} at risk
              </span>
            </div>
            <div className="space-y-3">
              {atRiskStudents.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.avatarBg}`}
                  >
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900 truncate">{s.name}</p>
                      <span className="text-xs font-bold text-rose-600 ml-2 shrink-0">{s.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{s.issue}</p>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                      {s.course}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-slate-600" rightIcon={<ChevronRight size={13} />}>
              View all students
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Recent Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                <Award size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Assignments</h3>
                <p className="text-xs text-slate-500">Latest graded and active assignments</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={13} />} className="text-slate-600">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentAssignments.map((a, i) => {
              const submittedPct = Math.round((a.submitted / a.total) * 100);
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1 }}
                  className="border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{a.title}</h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        {a.course}
                      </span>
                      <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                        {a.lang}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Users size={11} className="text-slate-400" />
                      {a.submitted}/{a.total} submitted
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      Due {a.dueDate}
                    </span>
                    <span className={`font-semibold ${a.avgScore >= 80 ? "text-emerald-600" : a.avgScore >= 60 ? "text-amber-600" : "text-rose-600"}`}>
                      Avg {a.avgScore}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">Submission rate</span>
                      <span className="text-[10px] font-bold text-slate-700">{submittedPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          submittedPct >= 80 ? "bg-emerald-500" : submittedPct >= 60 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${submittedPct}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
