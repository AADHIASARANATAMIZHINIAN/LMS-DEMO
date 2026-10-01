"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Award,
  BarChart2,
  Target,
  BookOpen,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const summaryCards = [
  { label: "Class Average", value: "78.4%", change: "+3.2%", up: true, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Completion Rate", value: "84%", change: "+7%", up: true, icon: CheckIcon, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "At-Risk Students", value: "4", change: "-2", up: true, icon: Activity, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  { label: "Top Score This Week", value: "97%", change: "Ananya S.", up: true, icon: Star, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
];

function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const weeklyPerformance = [
  { week: "Wk 1", CS102: 62, CS301: 58 },
  { week: "Wk 2", CS102: 67, CS301: 63 },
  { week: "Wk 3", CS102: 71, CS301: 65 },
  { week: "Wk 4", CS102: 69, CS301: 70 },
  { week: "Wk 5", CS102: 75, CS301: 74 },
  { week: "Wk 6", CS102: 79, CS301: 77 },
  { week: "Wk 7", CS102: 82, CS301: 80 },
];

const skillRadar = [
  { skill: "Algorithms", CS102: 78, CS301: 70 },
  { skill: "Data Structs", CS102: 82, CS301: 65 },
  { skill: "Debugging", CS102: 69, CS301: 72 },
  { skill: "Code Quality", CS102: 74, CS301: 80 },
  { skill: "Problem Solving", CS102: 85, CS301: 77 },
  { skill: "Optimization", CS102: 60, CS301: 75 },
];

const topPerformers = [
  { name: "Ananya Suresh", course: "CS102", score: 97, submissions: 12, avatar: "AS", bg: "bg-blue-100 text-blue-700", rank: 1 },
  { name: "Karthik Raj", course: "CS301", score: 94, submissions: 11, avatar: "KR", bg: "bg-indigo-100 text-indigo-700", rank: 2 },
  { name: "Meera Pillai", course: "CS102", score: 91, submissions: 12, avatar: "MP", bg: "bg-violet-100 text-violet-700", rank: 3 },
];

const difficultyData = [
  { assignment: "Binary Tree Inversion", course: "CS102", avgScore: 72, passRate: "74%", attempts: 38, difficulty: "Medium", trend: "down" },
  { assignment: "Sorting Algorithms Benchmark", course: "CS102", avgScore: 88, passRate: "92%", attempts: 38, difficulty: "Hard", trend: "up" },
  { assignment: "Linear Regression from Scratch", course: "CS301", avgScore: 65, passRate: "61%", attempts: 35, difficulty: "Hard", trend: "down" },
  { assignment: "Graph BFS & DFS", course: "CS102", avgScore: 80, passRate: "84%", attempts: 37, difficulty: "Medium", trend: "up" },
  { assignment: "K-Means Clustering", course: "CS301", avgScore: 70, passRate: "68%", attempts: 33, difficulty: "Hard", trend: "up" },
];

const LineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs font-bold text-slate-600 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-600 font-medium">{p.dataKey}:</span>
            <span className="font-bold text-slate-900">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TeacherAnalytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Analytics"
        description="Deep dive into student performance, skill gaps, and course trends."
        breadcrumb={[{ label: "Teacher" }, { label: "Analytics" }]}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<BarChart2 size={14} />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {summaryCards.map((c) => (
          <motion.div key={c.label} variants={itemVariants}>
            <div className={`bg-white border ${c.border} rounded-xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`${c.bg} ${c.color} p-2.5 rounded-lg`}>
                  <c.icon size={18} />
                </div>
                <span className={`flex items-center gap-0.5 text-[11px] font-bold ${c.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {c.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                  {c.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{c.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{c.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Class Performance Over Time</h3>
                <p className="text-xs text-slate-500 mt-0.5">7-week average score trend per course</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-600">
                  <div className="w-3 h-0.5 bg-blue-600 rounded" />CS102
                </span>
                <span className="flex items-center gap-1.5 text-indigo-500">
                  <div className="w-3 h-0.5 bg-indigo-500 rounded" />CS301
                </span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[50, 95]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    width={32}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<LineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="CS102"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="CS301"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">CS102 Growth</p>
                <p className="text-sm font-bold text-blue-600">+20 pts over 7 weeks</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">CS301 Growth</p>
                <p className="text-sm font-bold text-indigo-600">+22 pts over 7 weeks</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 h-full">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Skill Assessment Radar</h3>
              <p className="text-xs text-slate-500 mt-0.5">Avg skill scores across both courses</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                    tickCount={4}
                  />
                  <Radar name="CS102" dataKey="CS102" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="CS301" dataKey="CS301" stroke="#6366f1" fill="#6366f1" fillOpacity={0.12} strokeWidth={2} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 pt-3 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Weakest area</p>
              <p className="text-sm font-bold text-rose-600">Optimization (CS102: 60%)</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-amber-50 text-amber-600 p-2 rounded-lg">
              <Award size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Performers</h3>
              <p className="text-xs text-slate-500">Highest scoring students this semester</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className={`relative border rounded-xl p-4 flex items-center gap-3 overflow-hidden ${
                  i === 0 ? "border-amber-200 bg-amber-50/40" : "border-slate-200 bg-slate-50/50"
                }`}
              >
                {i === 0 && (
                  <div className="absolute top-2 right-2">
                    <Star size={14} className="text-amber-500 fill-amber-400" />
                  </div>
                )}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${s.bg}`}>
                    {s.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                    i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : "bg-orange-400"
                  }`}>
                    {s.rank}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.course} • {s.submissions} submissions</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.score}%` }} />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 shrink-0">{s.score}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Difficulty Analysis Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-slate-100">
            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
              <Target size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Assignment Difficulty Analysis</h3>
              <p className="text-xs text-slate-500">Performance breakdown per assignment</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Assignment</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Course</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Difficulty</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Avg Score</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Pass Rate</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Attempts</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {difficultyData.map((row, i) => (
                  <tr
                    key={row.assignment}
                    className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      i === difficultyData.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-slate-900">{row.assignment}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        {row.course}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        row.difficulty === "Hard"
                          ? "text-rose-600 bg-rose-50 border-rose-100"
                          : "text-amber-600 bg-amber-50 border-amber-100"
                      }`}>
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-bold ${
                        row.avgScore >= 80 ? "text-emerald-600" : row.avgScore >= 65 ? "text-amber-600" : "text-rose-600"
                      }`}>
                        {row.avgScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-slate-700">{row.passRate}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-slate-600">{row.attempts}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`flex items-center gap-1 text-xs font-bold ${
                        row.trend === "up" ? "text-emerald-600" : "text-rose-500"
                      }`}>
                        {row.trend === "up"
                          ? <ArrowUp size={13} />
                          : <ArrowDown size={13} />}
                        {row.trend === "up" ? "Improving" : "Declining"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
