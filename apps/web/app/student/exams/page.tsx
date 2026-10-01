"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Timer,
  ListChecks,
  ChevronRight,
  Layers,
  BrainCircuit,
  Cpu,
  BarChart3,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

const upcomingExams = [
  {
    type: "Midterm",
    course: "Data Structures",
    code: "CS102",
    instructor: "Dr. Michael Chen",
    date: "October 6, 2026",
    time: "10:00 AM – 12:00 PM",
    duration: "2 hours",
    room: "Hall B – Room 201",
    daysLeft: 5,
    urgency: "high",
    prepProgress: 65,
    topics: [
      "Linked Lists & Doubly Linked Lists",
      "Stacks & Queue Implementations",
      "Binary Search Trees",
      "AVL Tree Rotations",
      "Big-O Complexity Analysis",
    ],
    Icon: Layers,
    gradient: "from-violet-500 to-fuchsia-700",
    badgeBg: "bg-violet-100 text-violet-700",
    typeColor: "bg-rose-100 text-rose-700",
  },
  {
    type: "Quiz",
    course: "Machine Learning",
    code: "CS301",
    instructor: "Dr. Priya Sharma",
    date: "October 11, 2026",
    time: "2:00 PM – 3:00 PM",
    duration: "1 hour",
    room: "Online – Proctored",
    daysLeft: 10,
    urgency: "medium",
    prepProgress: 30,
    topics: [
      "Linear vs Logistic Regression",
      "Gradient Descent & Learning Rate",
      "Bias-Variance Tradeoff",
      "Feature Scaling & Normalization",
    ],
    Icon: BrainCircuit,
    gradient: "from-emerald-500 to-teal-700",
    badgeBg: "bg-emerald-100 text-emerald-700",
    typeColor: "bg-amber-100 text-amber-700",
  },
  {
    type: "Final Exam",
    course: "Operating Systems",
    code: "CS401",
    instructor: "Prof. James Okafor",
    date: "October 27, 2026",
    time: "3:00 PM – 6:00 PM",
    duration: "3 hours",
    room: "Main Auditorium",
    daysLeft: 26,
    urgency: "low",
    prepProgress: 10,
    topics: [
      "Process Scheduling Algorithms",
      "Virtual Memory & Paging",
      "Deadlock Detection & Prevention",
      "File System Structure",
      "I/O Management",
      "Semaphores & Mutex",
    ],
    Icon: Cpu,
    gradient: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-100 text-amber-700",
    typeColor: "bg-blue-100 text-blue-700",
  },
];

const pastExams = [
  {
    type: "Quiz 1",
    course: "Introduction to Programming",
    code: "CS101",
    date: "September 12, 2026",
    score: 92,
    maxScore: 100,
    duration: "1 hour",
    grade: "A",
    percentile: "Top 8%",
    barColor: "bg-blue-500",
    gradeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    type: "Midterm",
    course: "Introduction to Programming",
    code: "CS101",
    date: "September 28, 2026",
    score: 88,
    maxScore: 100,
    duration: "2 hours",
    grade: "A–",
    percentile: "Top 15%",
    barColor: "bg-blue-500",
    gradeColor: "bg-emerald-100 text-emerald-800",
  },
];

type UrgencyKey = "high" | "medium" | "low";

const urgencyConfig: Record<UrgencyKey, { label: string; border: string; bg: string; dot: string; textColor: string }> = {
  high: {
    label: "5 days left",
    border: "border-rose-200",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
    textColor: "text-rose-700",
  },
  medium: {
    label: "10 days left",
    border: "border-amber-200",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    textColor: "text-amber-700",
  },
  low: {
    label: "26 days left",
    border: "border-blue-200",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    textColor: "text-blue-700",
  },
};

function prepBarColor(pct: number) {
  if (pct >= 70) return "bg-emerald-500";
  if (pct >= 40) return "bg-amber-500";
  return "bg-rose-500";
}

export default function StudentExamsPage() {
  return (
    <motion.div
      className="min-h-screen bg-slate-50 p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-slate-900">Exams & Assessments</h1>
        <p className="text-slate-600 mt-1">Fall Semester 2026 · Track upcoming tests and review past results</p>
      </motion.div>

      {/* Alert Banner */}
      <motion.div
        variants={itemVariants}
        className="flex items-start gap-4 bg-rose-50 border border-rose-200 rounded-2xl px-6 py-4"
      >
        <AlertTriangle size={22} className="text-rose-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-rose-800">Midterm in 5 days</p>
          <p className="text-sm text-rose-700 mt-0.5">
            CS102 Data Structures Midterm is on <strong>October 6</strong>. Your preparation is at{" "}
            <strong>65%</strong> — aim to finish BST rotations and complexity review before the exam.
          </p>
        </div>
      </motion.div>

      {/* Summary Pills */}
      <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
        {[
          { label: "Upcoming Exams", value: "3", Icon: CalendarDays, bg: "bg-blue-50", color: "text-blue-700" },
          { label: "Past Exams", value: "2", Icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-700" },
          { label: "Avg Exam Score", value: "90%", Icon: BarChart3, bg: "bg-indigo-50", color: "text-indigo-700" },
          { label: "Next Exam In", value: "5 days", Icon: Timer, bg: "bg-rose-50", color: "text-rose-700" },
        ].map((p) => (
          <div
            key={p.label}
            className={"flex items-center gap-2.5 " + p.bg + " border border-slate-200 rounded-xl px-4 py-2.5"}
          >
            <p.Icon size={16} className={p.color} />
            <p className="text-sm text-slate-600">
              {p.label}: <span className={"font-bold " + p.color}>{p.value}</span>
            </p>
          </div>
        ))}
      </motion.div>

      {/* Upcoming Exams */}
      <div>
        <motion.h2 variants={itemVariants} className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-blue-600" />
          Upcoming Exams
        </motion.h2>
        <motion.div className="space-y-5" variants={containerVariants}>
          {upcomingExams.map((exam, i) => {
            const urg = urgencyConfig[exam.urgency as UrgencyKey];
            const Icon = exam.Icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.12)" }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left colored side */}
                  <div className={"bg-gradient-to-b " + exam.gradient + " p-6 flex flex-col items-center justify-center sm:w-36 gap-3 text-white"}>
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <Icon size={28} />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{exam.daysLeft}</p>
                      <p className="text-xs text-white/80">days left</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + exam.typeColor}>
                            {exam.type}
                          </span>
                          <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + exam.badgeBg}>
                            {exam.code}
                          </span>
                          <span className={"flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border " + urg.bg + " " + urg.border + " " + urg.textColor}>
                            <span className={"w-1.5 h-1.5 rounded-full " + urg.dot} />
                            {urg.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{exam.course}</h3>
                        <p className="text-sm text-slate-500">{exam.instructor}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                      {[
                        { Icon: CalendarDays, label: exam.date },
                        { Icon: Clock, label: exam.time },
                        { Icon: Timer, label: exam.duration },
                      ].map((m, mi) => (
                        <div key={mi} className="flex items-center gap-2 text-sm text-slate-600">
                          <m.Icon size={14} className="text-slate-400 shrink-0" />
                          {m.label}
                        </div>
                      ))}
                    </div>

                    {/* Topics */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <ListChecks size={13} />
                        Topics Covered
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exam.topics.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prep progress */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Preparation Progress
                        </p>
                        <span className={"text-xs font-bold " + (exam.prepProgress >= 70 ? "text-emerald-600" : exam.prepProgress >= 40 ? "text-amber-600" : "text-rose-600")}>
                          {exam.prepProgress}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={"h-full " + prepBarColor(exam.prepProgress) + " rounded-full"}
                          initial={{ width: 0 }}
                          animate={{ width: exam.prepProgress + "%" }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" as const }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Past Exams */}
      <div>
        <motion.h2 variants={itemVariants} className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600" />
          Past Exams
        </motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5" variants={containerVariants}>
          {pastExams.map((exam, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      {exam.type}
                    </span>
                    <span className="text-xs text-slate-400">{exam.code}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{exam.course}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{exam.date} · {exam.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{exam.score}</p>
                  <p className="text-xs text-slate-400">/ {exam.maxScore}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={"h-full " + exam.barColor + " rounded-full"}
                    initial={{ width: 0 }}
                    animate={{ width: exam.score + "%" }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" as const }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={"text-xs font-bold px-3 py-1 rounded-full " + exam.gradeColor}>
                    {exam.grade}
                  </span>
                  <span className="text-xs text-slate-500">{exam.percentile}</span>
                </div>
                <button className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                  Review <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
