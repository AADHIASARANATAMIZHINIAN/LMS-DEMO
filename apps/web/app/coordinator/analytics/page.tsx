"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Users,
  BarChart2,
  Lightbulb,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const enrollmentTrend = [
  { month: "May", students: 920 },
  { month: "Jun", students: 975 },
  { month: "Jul", students: 1020 },
  { month: "Aug", students: 1045 },
  { month: "Sep", students: 1080 },
  { month: "Oct", students: 1100 },
];

const deptPassRates = [
  { dept: "CS", passRate: 91, failRate: 9 },
  { dept: "AI/ML", passRate: 87, failRate: 13 },
  { dept: "ECE", passRate: 83, failRate: 17 },
  { dept: "M.Tech CS", passRate: 95, failRate: 5 },
];

const monthlyScores = [
  { month: "May", cs: 78, ai: 74, ece: 71 },
  { month: "Jun", cs: 80, ai: 76, ece: 73 },
  { month: "Jul", cs: 79, ai: 78, ece: 74 },
  { month: "Aug", cs: 82, ai: 80, ece: 75 },
  { month: "Sep", cs: 84, ai: 81, ece: 77 },
  { month: "Oct", cs: 85, ai: 83, ece: 78 },
];

const statusDist = [
  { name: "Active", value: 85, color: "#10b981" },
  { name: "Probation", value: 10, color: "#f59e0b" },
  { name: "Inactive", value: 5, color: "#94a3b8" },
];

const insights = [
  {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "19.6% enrollment growth",
    desc: "Student count grew from 920 in May to 1,100 in Oct — the fastest growth in 3 years.",
  },
  {
    icon: Award,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "M.Tech CS leads pass rates",
    desc: "The M.Tech CS program maintains a 95% pass rate, reflecting highly motivated postgraduate cohorts.",
  },
  {
    icon: BarChart2,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    title: "CS avg score rising steadily",
    desc: "Computer Science monthly average increased 7 points from May to Oct, from 78% to 85%.",
  },
  {
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "10% of students on probation",
    desc: "110 students are on academic probation — recommended for targeted mentoring intervention this semester.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface TooltipPayload {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-800">{payload[0].name}</p>
        <p className="text-slate-600">{payload[0].value}% of students</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PageHeader title="Analytics & Insights" description="Academic Year 2024–25 · Semester I performance metrics" />
        <Button variant="secondary" size="sm">
          <BarChart2 className="w-4 h-4 mr-1.5" /> Export Report
        </Button>
      </div>

      {/* Key Insights */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {insights.map((ins) => (
          <motion.div key={ins.title} variants={itemVariants}>
            <div className="bg-white border border-slate-200 rounded-xl p-5 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`${ins.bg} p-2.5 rounded-lg`}>
                  <ins.icon className={`w-4 h-4 ${ins.color}`} />
                </div>
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{ins.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{ins.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1. Enrollment Trend AreaChart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-900">Enrollment Trend</h3>
              <p className="text-sm text-slate-500">Total students enrolled per month (May–Oct 2024)</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={enrollmentTrend} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrollGradA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[880, 1120]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v: any) => [`${v} students`, "Enrolled"]}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2.5} fill="url(#enrollGradA)" dot={{ r: 4, fill: "#6366f1" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 2. Department Pass Rates BarChart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-900">Department Pass Rates</h3>
              <p className="text-sm text-slate-500">Pass vs. fail distribution by department</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={deptPassRates} margin={{ top: 4, right: 12, left: -16, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dept" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v: any, n: any) => [`${v}%`, n === "passRate" ? "Pass" : "Fail"]}
                />
                <Legend formatter={(v) => (v === "passRate" ? "Pass Rate" : "Fail Rate")} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="passRate" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="failRate" fill="#fca5a5" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. Monthly Avg Scores LineChart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-900">Monthly Average Scores</h3>
              <p className="text-sm text-slate-500">Assessment performance by department (May–Oct 2024)</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyScores} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[65, 90]} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v: any, n: any) => [`${v}%`, n === "cs" ? "CS" : n === "ai" ? "AI/ML" : "ECE"]}
                />
                <Legend formatter={(v) => (v === "cs" ? "Computer Science" : v === "ai" ? "AI / ML" : "ECE")} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="cs" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="ai" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="ece" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 4. Student Status PieChart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-900">Student Status Distribution</h3>
              <p className="text-sm text-slate-500">Active, probation and inactive — current semester</p>
            </div>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie
                    data={statusDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusDist.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-4 flex-1">
                {statusDist.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">{s.name}</span>
                        <span className="text-sm font-bold text-slate-900">{s.value}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{Math.round(s.value * 11)} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
