"use client";

import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  BookOpen,
  Users,
  BarChart3,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const gradeRows = [
  {
    course: "Introduction to Programming",
    code: "CS101",
    credits: 3,
    assignments: 95,
    midterm: 88,
    final: 91,
    overall: 91,
    letter: "A",
    trend: "up",
    color: "bg-blue-500",
  },
  {
    course: "Data Structures",
    code: "CS102",
    credits: 4,
    assignments: 82,
    midterm: 79,
    final: 83,
    overall: 81,
    letter: "B+",
    trend: "up",
    color: "bg-violet-500",
  },
  {
    course: "Machine Learning",
    code: "CS301",
    credits: 4,
    assignments: 97,
    midterm: 93,
    final: 90,
    overall: 93,
    letter: "A",
    trend: "stable",
    color: "bg-emerald-500",
  },
  {
    course: "Operating Systems",
    code: "CS401",
    credits: 4,
    assignments: 80,
    midterm: 74,
    final: 77,
    overall: 77,
    letter: "B+",
    trend: "down",
    color: "bg-amber-500",
  },
];

const pieData = [
  { name: "A / A+", value: 2, color: "#10b981" },
  { name: "B+ / B", value: 2, color: "#6366f1" },
  { name: "C+ / C", value: 0, color: "#f59e0b" },
  { name: "D / F", value: 0, color: "#ef4444" },
];

const gpaTimeline = [
  { week: "Wk 1", GPA: 3.5 },
  { week: "Wk 2", GPA: 3.4 },
  { week: "Wk 3", GPA: 3.55 },
  { week: "Wk 4", GPA: 3.6 },
  { week: "Wk 5", GPA: 3.5 },
  { week: "Wk 6", GPA: 3.62 },
  { week: "Wk 7", GPA: 3.58 },
  { week: "Wk 8", GPA: 3.6 },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp size={15} className="text-emerald-500" />;
  if (trend === "down") return <TrendingDown size={15} className="text-rose-500" />;
  return <Minus size={15} className="text-slate-400" />;
}

function letterColor(letter: string) {
  if (letter.startsWith("A")) return "bg-emerald-100 text-emerald-800";
  if (letter.startsWith("B")) return "bg-blue-100 text-blue-800";
  if (letter.startsWith("C")) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

export default function StudentGradesPage() {
  return (
    <motion.div
      className="min-h-screen bg-slate-50 p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-slate-900">Grades & Performance</h1>
        <p className="text-slate-600 mt-1">Fall Semester 2026 · Academic transcript overview</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div className="grid grid-cols-2 xl:grid-cols-4 gap-4" variants={containerVariants}>
        {[
          {
            label: "Cumulative GPA",
            value: "3.6",
            sub: "Out of 4.0",
            Icon: BarChart3,
            bg: "bg-blue-50",
            iconColor: "text-blue-600",
            border: "border-blue-100",
          },
          {
            label: "Credits Enrolled",
            value: "15",
            sub: "This semester",
            Icon: BookOpen,
            bg: "bg-indigo-50",
            iconColor: "text-indigo-600",
            border: "border-indigo-100",
          },
          {
            label: "Class Rank",
            value: "14 / 120",
            sub: "Top 12%",
            Icon: Users,
            bg: "bg-violet-50",
            iconColor: "text-violet-600",
            border: "border-violet-100",
          },
          {
            label: "Dean's List",
            value: "Eligible",
            sub: "Honor Roll ★",
            Icon: Star,
            bg: "bg-amber-50",
            iconColor: "text-amber-500",
            border: "border-amber-100",
          },
        ].map((s) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className={"bg-white border " + s.border + " rounded-xl p-5 flex items-start gap-4"}
          >
            <div className={"" + s.bg + " p-3 rounded-xl shrink-0"}>
              <s.Icon size={20} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5 leading-tight">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Honor Roll Banner */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl px-6 py-4 shadow-lg shadow-amber-200"
      >
        <Award size={32} className="text-white shrink-0" />
        <div>
          <p className="font-bold text-white text-lg leading-tight">Honor Roll – Fall 2026</p>
          <p className="text-amber-100 text-sm">
            Congratulations, Aditya! Maintaining a GPA of 3.6+ places you on the Dean's List this semester.
          </p>
        </div>
      </motion.div>

      {/* Grade Breakdown Table */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Course Grade Breakdown</h2>
          <p className="text-sm text-slate-500 mt-0.5">Detailed scores across all enrolled courses</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Course", "Credits", "Assignments", "Midterm", "Final", "Overall", "Grade", "Trend"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gradeRows.map((row, i) => (
                <motion.tr
                  key={row.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{row.course}</p>
                    <p className="text-xs text-slate-400">{row.code}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">{row.credits}</td>
                  {[row.assignments, row.midterm, row.final].map((score, si) => (
                    <td key={si} className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-800 font-medium">{score}%</span>
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className={"h-full " + row.color + " rounded-full"}
                            initial={{ width: 0 }}
                            animate={{ width: score + "%" }}
                            transition={{ delay: 0.4 + si * 0.1, duration: 0.7, ease: "easeOut" as const }}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-900">{row.overall}%</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + letterColor(row.letter)}>
                      {row.letter}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <TrendIcon trend={row.trend} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-900 mb-1">Grade Distribution</h2>
          <p className="text-sm text-slate-500 mb-4">Breakdown of letter grades this semester</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 flex-1">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-slate-600 flex-1">{d.name}</span>
                  <span className="text-sm font-bold text-slate-900">{d.value}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                <p className="text-2xl font-bold text-slate-900">3.6</p>
                <p className="text-xs text-slate-500">Semester GPA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GPA Trend */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-900 mb-1">Semester GPA Trend</h2>
          <p className="text-sm text-slate-500 mb-4">Weekly GPA movement – Fall 2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={gpaTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis domain={[3.3, 4.0]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="GPA"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
