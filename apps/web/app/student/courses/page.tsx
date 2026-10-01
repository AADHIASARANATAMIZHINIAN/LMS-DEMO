"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  Award,
  Clock,
  ChevronRight,
  BarChart2,
  Code2,
  Cpu,
  BrainCircuit,
  Layers,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const courses = [
  {
    code: "CS101",
    title: "Introduction to Programming",
    subtitle: "Foundations of Computer Science",
    instructor: "Prof. Sarah Johnson",
    credits: 3,
    schedule: "Mon, Wed · 9:00 – 10:30 AM",
    progress: 78,
    grade: "A–",
    enrolled: 92,
    totalModules: 12,
    doneModules: 9,
    nextTopic: "Recursion & Problem Solving",
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    badgeBg: "bg-blue-100 text-blue-700",
    barColor: "bg-blue-500",
    Icon: Code2,
    tags: ["Python", "Algorithms", "OOP"],
  },
  {
    code: "CS102",
    title: "Data Structures",
    subtitle: "Advanced Algorithmic Thinking",
    instructor: "Dr. Michael Chen",
    credits: 4,
    schedule: "Tue, Thu · 11:00 AM – 12:30 PM",
    progress: 45,
    grade: "B+",
    enrolled: 78,
    totalModules: 14,
    doneModules: 6,
    nextTopic: "Binary Trees & BST",
    gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
    badgeBg: "bg-violet-100 text-violet-700",
    barColor: "bg-violet-500",
    Icon: Layers,
    tags: ["C++", "Trees", "Graphs"],
  },
  {
    code: "CS301",
    title: "Machine Learning",
    subtitle: "Statistical Learning & Neural Networks",
    instructor: "Dr. Priya Sharma",
    credits: 4,
    schedule: "Mon, Wed, Fri · 2:00 – 3:00 PM",
    progress: 20,
    grade: "A",
    enrolled: 54,
    totalModules: 16,
    doneModules: 3,
    nextTopic: "Logistic Regression",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    badgeBg: "bg-emerald-100 text-emerald-700",
    barColor: "bg-emerald-500",
    Icon: BrainCircuit,
    tags: ["Python", "NumPy", "PyTorch"],
  },
  {
    code: "CS401",
    title: "Operating Systems",
    subtitle: "Kernel, Memory & Concurrency",
    instructor: "Prof. James Okafor",
    credits: 4,
    schedule: "Tue, Thu · 3:00 – 4:30 PM",
    progress: 60,
    grade: "B+",
    enrolled: 66,
    totalModules: 13,
    doneModules: 8,
    nextTopic: "Virtual Memory & Paging",
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    badgeBg: "bg-amber-100 text-amber-700",
    barColor: "bg-amber-500",
    Icon: Cpu,
    tags: ["C", "Linux", "POSIX"],
  },
];

export default function StudentCoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
        <p className="text-slate-600 mt-1">Fall Semester 2026 · 4 enrolled courses · 15 credit hours</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {[
          { label: "Total Credits", value: "15", Icon: Award, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Avg Progress", value: "51%", Icon: BarChart2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Current GPA", value: "3.6", Icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Courses", value: "4", Icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <div className={"" + s.bg + " p-2.5 rounded-lg"}>
              <s.Icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Course Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => {
          const Icon = course.Icon;
          return (
            <motion.div
              key={course.code}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.18)" }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow cursor-pointer group"
            >
              {/* Gradient Header */}
              <div className={"relative bg-gradient-to-br " + course.gradient + " p-6 text-white"}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full bg-white/10 translate-y-10" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold bg-white/25 px-3 py-1 rounded-full tracking-wide">
                        {course.code}
                      </span>
                      <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{course.credits} credits</span>
                    </div>
                    <h2 className="text-xl font-bold leading-snug">{course.title}</h2>
                    <p className="text-sm text-white/75 mt-1">{course.subtitle}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Icon size={24} />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-white/80 mb-1.5">
                    <span>{course.doneModules} / {course.totalModules} modules completed</span>
                    <span className="font-bold text-white">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/25 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: course.progress + "%" }}
                      transition={{ duration: 1, ease: "easeOut" as const, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((t) => (
                    <span key={t} className={"text-xs font-semibold px-2.5 py-1 rounded-full " + course.badgeBg}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User size={14} className="text-slate-400 shrink-0" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={14} className="text-slate-400 shrink-0" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <BookOpen size={14} className="text-slate-400 shrink-0" />
                    <span>Next: <span className="font-medium text-slate-800">{course.nextTopic}</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Grade</p>
                      <p className="text-lg font-bold text-slate-900">{course.grade}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Students</p>
                      <p className="text-lg font-bold text-slate-900">{course.enrolled}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Open Course
                    <ChevronRight size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
