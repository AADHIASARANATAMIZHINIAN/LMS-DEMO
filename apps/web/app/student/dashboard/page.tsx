"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Code2,
  AlertTriangle,
  Star,
  TrendingUp,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const metrics = [
  {
    label: "Problems Solved",
    value: "47",
    sub: "+3 this week",
    icon: Code2,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    label: "Avg Score",
    value: "84%",
    sub: "↑ 2% from last month",
    icon: BarChart3,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    label: "Streak",
    value: "12 days",
    sub: "Personal best 🔥",
    icon: Flame,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    border: "border-amber-100",
  },
  {
    label: "Class Rank",
    value: "14 / 120",
    sub: "Top 12%",
    icon: Trophy,
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
];

const recentSubmissions = [
  {
    problem: "Binary Search Tree Insertion",
    course: "CS102 – Data Structures",
    passed: true,
    score: "100/100",
    time: "48 ms",
    lang: "Python",
    submittedAt: "2 hours ago",
  },
  {
    problem: "Dijkstra's Shortest Path",
    course: "CS102 – Data Structures",
    passed: false,
    score: "60/100",
    time: "—",
    lang: "Python",
    submittedAt: "Yesterday, 4:15 PM",
  },
  {
    problem: "Linear Regression from Scratch",
    course: "CS301 – Machine Learning",
    passed: true,
    score: "92/100",
    time: "121 ms",
    lang: "Python",
    submittedAt: "2 days ago",
  },
];

const learningPath = [
  { title: "Variables & Data Types", done: true, module: "CS101" },
  { title: "Control Flow & Loops", done: true, module: "CS101" },
  { title: "Functions & Recursion", done: true, module: "CS101" },
  { title: "Arrays & Linked Lists", done: false, module: "CS102", current: true },
  { title: "Stacks & Queues", done: false, module: "CS102" },
  { title: "Trees & Graphs", done: false, module: "CS102" },
];

const deadlines = [
  {
    title: "CS102 Lab Assignment 4",
    due: "Tomorrow, 11:59 PM",
    urgency: "high",
    type: "Assignment",
  },
  {
    title: "CS301 Quiz – Regression",
    due: "Oct 5, 2:00 PM",
    urgency: "medium",
    type: "Quiz",
  },
  {
    title: "CS401 Case Study Report",
    due: "Oct 10, 11:59 PM",
    urgency: "medium",
    type: "Report",
  },
  {
    title: "CS101 Project Proposal",
    due: "Oct 18, 11:59 PM",
    urgency: "low",
    type: "Project",
  },
];

const urgencyStyles: Record<string, string> = {
  high: "bg-rose-50 border-rose-200 text-rose-700",
  medium: "bg-amber-50 border-amber-200 text-amber-700",
  low: "bg-blue-50 border-blue-200 text-blue-700",
};

const urgencyDot: Record<string, string> = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ pct }: { pct: number }) {
  const strokeDash = (pct / 100) * CIRCUMFERENCE;
  return (
    <svg width="140" height="140" className="rotate-[-90deg]">
      <circle cx="70" cy="70" r={RADIUS} strokeWidth="10" fill="none" className="stroke-white/20" />
      <motion.circle
        cx="70"
        cy="70"
        r={RADIUS}
        strokeWidth="10"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={{ strokeDashoffset: CIRCUMFERENCE - strokeDash }}
        transition={{ duration: 1.4, ease: "easeOut" as const, delay: 0.4 }}
      />
    </svg>
  );
}

export default function StudentDashboard() {
  return (
    <motion.div
      className="min-h-screen bg-slate-50 p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl"
      >
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-40 h-16 w-16 rounded-full bg-white/10" />

        <div className="relative flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Thursday, October 1 · Week 8 of 16</p>
            <h1 className="text-3xl font-bold tracking-tight">Good morning, Aditya 👋</h1>
            <p className="mt-2 text-blue-100 max-w-md">
              You're on a <span className="font-semibold text-white">12-day streak</span> — keep it up! You have{" "}
              <span className="font-semibold text-white">1 assignment due tomorrow</span>. Let's get it done.
            </p>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                <Zap size={14} className="text-amber-300" />
                12-Day Streak
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                <Star size={14} className="text-yellow-300" />
                Top 12% of Class
              </span>
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <ProgressRing pct={62} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">62%</span>
              <span className="text-xs text-blue-200">Course Complete</span>
            </div>
            <p className="mt-2 text-sm text-blue-200">Overall Progress</p>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.12)" }}
            className={"bg-white border " + m.border + " rounded-xl p-5 flex items-start gap-4 transition-shadow"}
          >
            <div className={"" + m.bg + " p-3 rounded-xl"}>
              <m.icon size={22} className={m.iconColor} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{m.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{m.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{m.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Submissions */}
          <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                <Code2 size={18} className="text-blue-600" />
                Recent Submissions
              </h2>
              <button className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentSubmissions.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={"shrink-0 w-8 h-8 rounded-full flex items-center justify-center " + (s.passed ? "bg-emerald-50" : "bg-rose-50")}>
                      {s.passed ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      ) : (
                        <XCircle size={18} className="text-rose-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">{s.problem}</p>
                      <p className="text-xs text-slate-500">{s.course} · {s.lang}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0 text-right">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.score}</p>
                      <p className="text-xs text-slate-400">{s.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} />
                      {s.time}
                    </div>
                    <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + (s.passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                      {s.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Path */}
          <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-600" />
                Learning Path
              </h2>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">3 / 6 complete</span>
            </div>
            <div className="p-6 space-y-3">
              {learningPath.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className={"flex items-center gap-4 p-3.5 rounded-xl border transition-all " + (step.current ? "bg-blue-50 border-blue-200 shadow-sm" : step.done ? "bg-emerald-50/40 border-emerald-100" : "bg-slate-50 border-slate-100")}
                >
                  <div className={"w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold " + (step.done ? "bg-emerald-500 text-white" : step.current ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500")}>
                    {step.done ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={"text-sm font-medium " + (step.done ? "text-slate-500 line-through" : step.current ? "text-blue-800" : "text-slate-700")}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-400">{step.module}</p>
                  </div>
                  {step.current && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full shrink-0">
                      In Progress
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Deadlines Sidebar */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl h-fit">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
            <Calendar size={18} className="text-rose-500" />
            <h2 className="font-semibold text-slate-900">Upcoming Deadlines</h2>
          </div>
          <div className="p-4 space-y-3">
            {deadlines.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={"rounded-xl border p-4 " + urgencyStyles[d.urgency]}
              >
                <div className="flex items-start gap-2">
                  <span className={"mt-1.5 w-2 h-2 rounded-full shrink-0 " + urgencyDot[d.urgency]} />
                  <div>
                    <p className="text-sm font-semibold">{d.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={11} />
                      <span className="text-xs font-medium">{d.due}</span>
                    </div>
                    <span className="mt-2 inline-block text-xs bg-white/60 px-2 py-0.5 rounded-full font-medium">
                      {d.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200">
              <AlertTriangle size={14} className="text-rose-600 shrink-0" />
              <p className="text-xs text-rose-700 font-medium">High-priority deadline due tomorrow!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
