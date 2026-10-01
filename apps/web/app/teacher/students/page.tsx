"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Mail,
  BookOpen,
  Activity,
  ArrowUpDown,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const STUDENTS = [
  {
    id: 1,
    name: "Ananya Suresh",
    email: "ananya.s@university.edu",
    avatar: "AS",
    avatarBg: "bg-blue-100 text-blue-700",
    course: "CS102",
    score: 97,
    attendance: 98,
    submissions: 12,
    totalAssignments: 12,
    sparkline: [72, 78, 82, 88, 91, 95, 97],
    status: "Excellent",
    joined: "Jul 12, 2026",
  },
  {
    id: 2,
    name: "Karthik Raj",
    email: "karthik.r@university.edu",
    avatar: "KR",
    avatarBg: "bg-indigo-100 text-indigo-700",
    course: "CS301",
    score: 94,
    attendance: 95,
    submissions: 11,
    totalAssignments: 12,
    sparkline: [68, 72, 79, 82, 87, 91, 94],
    status: "Excellent",
    joined: "Jul 12, 2026",
  },
  {
    id: 3,
    name: "Meera Pillai",
    email: "meera.p@university.edu",
    avatar: "MP",
    avatarBg: "bg-violet-100 text-violet-700",
    course: "CS102",
    score: 91,
    attendance: 92,
    submissions: 12,
    totalAssignments: 12,
    sparkline: [65, 70, 74, 79, 84, 88, 91],
    status: "Excellent",
    joined: "Jul 14, 2026",
  },
  {
    id: 4,
    name: "Vikram Shetty",
    email: "vikram.sh@university.edu",
    avatar: "VS",
    avatarBg: "bg-teal-100 text-teal-700",
    course: "CS301",
    score: 82,
    attendance: 88,
    submissions: 10,
    totalAssignments: 12,
    sparkline: [60, 64, 68, 72, 76, 79, 82],
    status: "Good",
    joined: "Jul 12, 2026",
  },
  {
    id: 5,
    name: "Sneha Rao",
    email: "sneha.r@university.edu",
    avatar: "SR",
    avatarBg: "bg-pink-100 text-pink-700",
    course: "CS102",
    score: 76,
    attendance: 85,
    submissions: 10,
    totalAssignments: 12,
    sparkline: [55, 60, 65, 68, 70, 73, 76],
    status: "Good",
    joined: "Jul 15, 2026",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    email: "arjun.m@university.edu",
    avatar: "AM",
    avatarBg: "bg-orange-100 text-orange-700",
    course: "CS102",
    score: 53,
    attendance: 71,
    submissions: 7,
    totalAssignments: 12,
    sparkline: [55, 58, 55, 52, 50, 51, 53],
    status: "At Risk",
    joined: "Jul 12, 2026",
  },
  {
    id: 7,
    name: "Priya Nair",
    email: "priya.n@university.edu",
    avatar: "PN",
    avatarBg: "bg-amber-100 text-amber-700",
    course: "CS301",
    score: 49,
    attendance: 76,
    submissions: 8,
    totalAssignments: 12,
    sparkline: [52, 50, 48, 50, 46, 47, 49],
    status: "At Risk",
    joined: "Jul 14, 2026",
  },
  {
    id: 8,
    name: "Ravi Kumar",
    email: "ravi.k@university.edu",
    avatar: "RK",
    avatarBg: "bg-rose-100 text-rose-700",
    course: "CS102",
    score: 41,
    attendance: 58,
    submissions: 5,
    totalAssignments: 12,
    sparkline: [48, 45, 43, 42, 40, 40, 41],
    status: "At Risk",
    joined: "Jul 13, 2026",
  },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  Excellent: { label: "Excellent", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  Good: { label: "Good", cls: "text-blue-700 bg-blue-50 border-blue-200" },
  "At Risk": { label: "At Risk", cls: "text-rose-700 bg-rose-50 border-rose-200" },
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} className="inline-block">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={parseFloat(pts[pts.length - 1].split(",")[0])}
        cy={parseFloat(pts[pts.length - 1].split(",")[1])}
        r="3"
        fill={color}
      />
    </svg>
  );
}

export default function TeacherStudents() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");

  const filtered = STUDENTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || s.status === filterStatus;
    const matchCourse = filterCourse === "All" || s.course === filterCourse;
    return matchSearch && matchStatus && matchCourse;
  });

  const totalStudents = STUDENTS.length;
  const excellent = STUDENTS.filter((s) => s.status === "Excellent").length;
  const good = STUDENTS.filter((s) => s.status === "Good").length;
  const atRisk = STUDENTS.filter((s) => s.status === "At Risk").length;
  const avgScore = Math.round(STUDENTS.reduce((a, b) => a + b.score, 0) / STUDENTS.length);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Student Roster"
        description="Monitor performance, attendance, and engagement across all enrolled students."
        breadcrumb={[{ label: "Teacher" }, { label: "Students" }]}
        action={
          <Button variant="secondary" size="sm" leftIcon={<Mail size={14} />}>
            Message All
          </Button>
        }
      />

      {/* Stats Summary Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Total Students", value: totalStudents, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Excellent", value: excellent, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "At Risk", value: atRisk, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
          { label: "Class Avg Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
        ].map((s) => (
          <motion.div key={s.label} variants={rowVariants}>
            <div className={`bg-white border ${s.border} rounded-xl p-4 flex items-center gap-3`}>
              <div className={`${s.bg} ${s.color} p-2 rounded-lg shrink-0`}>
                <s.icon size={16} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full h-9 pl-9 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-slate-400" />
          {["All", "Excellent", "Good", "At Risk"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                filterStatus === s
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {s}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-200" />
          {["All", "CS102", "CS301"].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCourse(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                filterCourse === c
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {[
                  { label: "Student", icon: true },
                  { label: "Course" },
                  { label: "Score Trend" },
                  { label: "Score", sort: true },
                  { label: "Submission Rate" },
                  { label: "Attendance", sort: true },
                  { label: "Status" },
                  { label: "" },
                ].map((h) => (
                  <th
                    key={h.label}
                    className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1">
                      {h.label}
                      {h.sort && <ArrowUpDown size={10} className="text-slate-400" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
              {filtered.map((s, i) => {
                const subRate = Math.round((s.submissions / s.totalAssignments) * 100);
                const isLast = i === filtered.length - 1;
                const sparkColor =
                  s.status === "Excellent"
                    ? "#10b981"
                    : s.status === "Good"
                    ? "#2563eb"
                    : "#f43f5e";

                return (
                  <motion.tr
                    key={s.id}
                    variants={rowVariants}
                    className={`${!isLast ? "border-b border-slate-100" : ""} hover:bg-slate-50/60 transition-colors group`}
                  >
                    {/* Student */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.avatarBg}`}>
                          {s.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">{s.name}</p>
                          <p className="text-xs text-slate-500">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        {s.course}
                      </span>
                    </td>

                    {/* Sparkline */}
                    <td className="px-4 py-3.5">
                      <Sparkline data={s.sparkline} color={sparkColor} />
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-sm font-bold ${
                          s.score >= 80
                            ? "text-emerald-600"
                            : s.score >= 65
                            ? "text-blue-600"
                            : "text-rose-600"
                        }`}
                      >
                        {s.score}%
                      </span>
                    </td>

                    {/* Submission Rate */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              subRate >= 80 ? "bg-emerald-500" : subRate >= 60 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${subRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                          {s.submissions}/{s.totalAssignments}
                        </span>
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-sm font-semibold ${
                          s.attendance >= 85 ? "text-emerald-600" : s.attendance >= 70 ? "text-amber-600" : "text-rose-600"
                        }`}
                      >
                        {s.attendance}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusConfig[s.status].cls}`}
                      >
                        {statusConfig[s.status].label}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500"
                        leftIcon={<Mail size={12} />}
                      >
                        Contact
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No students match your search</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting the filters above</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-700 font-bold">{filtered.length}</span> of{" "}
            <span className="text-slate-700 font-bold">{totalStudents}</span> students
          </p>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors disabled:opacity-40">
              Previous
            </button>
            <button className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
