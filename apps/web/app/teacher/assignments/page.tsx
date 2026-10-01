"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Code2,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  Search,
  Filter,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const ASSIGNMENTS = [
  {
    id: 1,
    title: "Binary Tree Inversion",
    description: "Implement an algorithm to invert a binary tree in-place. Analyze time and space complexity.",
    course: "CS102",
    lang: "Python",
    submitted: 28,
    total: 38,
    avgScore: 72,
    dueDate: "Sep 28, 2026",
    difficulty: "Medium",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-100",
    status: "Active",
    points: 100,
  },
  {
    id: 2,
    title: "Sorting Algorithms Benchmark",
    description: "Implement QuickSort, MergeSort, and HeapSort. Benchmark on 10k random integers and compare performance.",
    course: "CS102",
    lang: "C++",
    submitted: 35,
    total: 38,
    avgScore: 88,
    dueDate: "Sep 25, 2026",
    difficulty: "Hard",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-100",
    status: "Closed",
    points: 150,
  },
  {
    id: 3,
    title: "Linear Regression from Scratch",
    description: "Build a linear regression model using only NumPy. Implement gradient descent, MSE loss, and visualize the fit.",
    course: "CS301",
    lang: "Python",
    submitted: 15,
    total: 35,
    avgScore: 65,
    dueDate: "Oct 5, 2026",
    difficulty: "Hard",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-100",
    status: "Active",
    points: 120,
  },
];

const COURSES = ["CS102 – Data Structures", "CS301 – Machine Learning"];
const LANGUAGES = ["Python", "C++", "Java", "JavaScript", "Go", "Rust"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const langColor: Record<string, string> = {
  Python: "text-blue-700 bg-blue-50 border-blue-100",
  "C++": "text-violet-700 bg-violet-50 border-violet-100",
  Java: "text-orange-700 bg-orange-50 border-orange-100",
  JavaScript: "text-yellow-700 bg-yellow-50 border-yellow-100",
  Go: "text-cyan-700 bg-cyan-50 border-cyan-100",
  Rust: "text-red-700 bg-red-50 border-red-100",
};

const statusColor: Record<string, string> = {
  Active: "text-emerald-700 bg-emerald-50 border-emerald-100",
  Closed: "text-slate-600 bg-slate-100 border-slate-200",
  Draft: "text-amber-700 bg-amber-50 border-amber-100",
};

export default function TeacherAssignments() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [form, setForm] = useState({
    title: "",
    course: COURSES[0],
    language: LANGUAGES[0],
    difficulty: DIFFICULTIES[1],
    dueDate: "",
    points: "100",
    description: "",
  });

  const filtered = ASSIGNMENTS.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchCourse = filterCourse === "All" || a.course === filterCourse.split(" ")[0];
    return matchSearch && matchCourse;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Assignments"
        description="Create, manage, and review coding assignments for your courses."
        breadcrumb={[{ label: "Teacher" }, { label: "Assignments" }]}
        action={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => setShowModal(true)}
          >
            Create Assignment
          </Button>
        }
      />

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Assignments", value: "3", icon: FileCode2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active", value: "2", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg Submission Rate", value: "73%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <div className={`${s.bg} ${s.color} p-2.5 rounded-lg`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full h-9 pl-9 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-slate-400" />
          {["All", "CS102", "CS301"].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCourse(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                filterCourse === c
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4"
      >
        {filtered.map((a) => {
          const pct = Math.round((a.submitted / a.total) * 100);
          return (
            <motion.div
              key={a.id}
              variants={itemVariants}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor[a.status]}`}>
                      {a.status}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border text-blue-700 bg-blue-50 border-blue-100">
                      {a.course}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${langColor[a.lang] ?? "text-slate-600 bg-slate-100 border-slate-200"}`}>
                      {a.lang}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${a.difficultyColor}`}>
                      {a.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{a.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{a.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ChevronRight size={13} />}
                  className="shrink-0 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Review
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Submissions</p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <Users size={13} className="text-slate-400" />
                    {a.submitted} / {a.total}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Avg Score</p>
                  <p className={`text-sm font-bold ${a.avgScore >= 80 ? "text-emerald-600" : a.avgScore >= 65 ? "text-amber-600" : "text-rose-600"}`}>
                    {a.avgScore}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Due Date</p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <Clock size={13} className="text-slate-400" />
                    {a.dueDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Points</p>
                  <p className="text-sm font-bold text-indigo-600">{a.points} pts</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Submission Progress</span>
                  <span className="text-[11px] font-bold text-slate-700">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
                    className={`h-full rounded-full ${
                      pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Create Assignment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Create Assignment</h2>
                    <p className="text-xs text-slate-500">Fill in the details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assignment Title</label>
                  <input
                    className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                    placeholder="e.g. Dijkstra's Shortest Path"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Course</label>
                    <select
                      className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                    >
                      {COURSES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Language</label>
                    <select
                      className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                      value={form.language}
                      onChange={(e) => setForm({ ...form, language: e.target.value })}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Difficulty</label>
                    <select
                      className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                      value={form.difficulty}
                      onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    >
                      {DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Points</label>
                    <input
                      type="number"
                      className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                      value={form.points}
                      onChange={(e) => setForm({ ...form, points: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    className="w-full h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description / Problem Statement</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-colors resize-none"
                    placeholder="Describe the assignment objectives and requirements..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
                <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Save as Draft</Button>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />} onClick={() => setShowModal(false)}>
                    Publish Assignment
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
