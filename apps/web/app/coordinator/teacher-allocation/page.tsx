"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  ChevronDown,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const teachers = [
  { name: "Dr. Ramesh Kumar", courses: 3 },
  { name: "Prof. Anitha Menon", courses: 2 },
  { name: "Dr. Suresh Pillai", courses: 2 },
  { name: "Prof. Lakshmi Nair", courses: 1 },
  { name: "Dr. Vijay Iyer", courses: 2 },
  { name: "Prof. Geeta Sharma", courses: 1 },
  { name: "Dr. Anil Bose", courses: 2 },
  { name: "Prof. Meena Prabhu", courses: 1 },
];

const initialCourses = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures & Algorithms",
    section: "Section A",
    enrolled: 58,
    teacher: "Dr. Ramesh Kumar",
    dept: "Computer Science",
  },
  {
    id: 2,
    code: "AI201",
    name: "Machine Learning Fundamentals",
    section: "Section B",
    enrolled: 44,
    teacher: "Prof. Anitha Menon",
    dept: "Artificial Intelligence",
  },
  {
    id: 3,
    code: "CS401",
    name: "Database Management Systems",
    section: "Section A",
    enrolled: 61,
    teacher: "Dr. Suresh Pillai",
    dept: "Computer Science",
  },
  {
    id: 4,
    code: "EC302",
    name: "Digital Signal Processing",
    section: "Section C",
    enrolled: 39,
    teacher: "Prof. Lakshmi Nair",
    dept: "Electronics & Comm.",
  },
];

const deptBadge: Record<string, string> = {
  "Computer Science": "bg-blue-50 text-blue-700",
  "Artificial Intelligence": "bg-indigo-50 text-indigo-700",
  "Electronics & Comm.": "bg-amber-50 text-amber-700",
};

const avatarColors = [
  "bg-blue-500", "bg-indigo-500", "bg-emerald-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500", "bg-pink-500",
];

function WorkloadBadge({ count }: { count: number }) {
  if (count <= 1) return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
      <CheckCircle2 className="w-3 h-3" /> Light ({count})
    </span>
  );
  if (count === 2) return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">
      <Info className="w-3 h-3" /> Moderate ({count})
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700">
      <AlertTriangle className="w-3 h-3" /> Heavy ({count})
    </span>
  );
}

export default function TeacherAllocationPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [saved, setSaved] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const getWorkload = (teacherName: string) =>
    teachers.find((t) => t.name === teacherName)?.courses ?? 1;

  const getInitial = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleAssign = (courseId: number, teacherName: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, teacher: teacherName } : c))
    );
    setOpenDropdown(null);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalEnrolled = courses.reduce((s, c) => s + c.enrolled, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6" onClick={() => setOpenDropdown(null)}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PageHeader title="Teacher Allocation" description="Assign teachers to courses and manage workload" />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setCourses(initialCourses)}>
            <RefreshCw className="w-4 h-4 mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            {saved ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            {saved ? "Saved!" : "Save Allocations"}
          </Button>
        </div>
      </div>

      {/* Summary Banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Teachers Available", value: teachers.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Total Students", value: totalEnrolled, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
            <div className={`${s.bg} p-3 rounded-lg`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Allocation Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Course Allocations</h2>
            <p className="text-sm text-slate-500 mt-0.5">Select teachers from the dropdown. Workload reflects total courses assigned this semester.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Course Code", "Course Name", "Section", "Department", "Enrolled", "Assigned Teacher", "Workload", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {courses.map((c, i) => {
                  const teacherIdx = teachers.findIndex((t) => t.name === c.teacher);
                  return (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{c.code}</span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">{c.name}</td>
                      <td className="px-5 py-4 text-slate-600 text-sm">{c.section}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${deptBadge[c.dept] ?? "bg-slate-100 text-slate-600"}`}>
                          {c.dept}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700">{c.enrolled}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`${avatarColors[teacherIdx >= 0 ? teacherIdx : 0]} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {getInitial(c.teacher)}
                          </div>
                          <span className="font-medium text-slate-800 whitespace-nowrap">{c.teacher}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <WorkloadBadge count={getWorkload(c.teacher)} />
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === c.id ? null : c.id)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blue-400 hover:text-blue-600 transition-colors bg-white"
                          >
                            Reassign <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          {openDropdown === c.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                            >
                              <div className="p-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 py-1.5 mb-1">Select Teacher</p>
                                {teachers.map((t, ti) => (
                                  <button
                                    key={t.name}
                                    onClick={() => handleAssign(c.id, t.name)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                                      c.teacher === t.name
                                        ? "bg-blue-50 text-blue-700 font-semibold"
                                        : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    <div className={`${avatarColors[ti % avatarColors.length]} w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                      {getInitial(t.name)}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium leading-tight">{t.name}</p>
                                      <p className="text-xs text-slate-400">{t.courses} course{t.courses !== 1 ? "s" : ""} assigned</p>
                                    </div>
                                    {c.teacher === t.name && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {saved
                ? "✅ Allocations saved successfully."
                : "Unsaved changes — click 'Save Allocations' to confirm."}
            </p>
            <Button size="sm" onClick={handleSave}>
              {saved ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
              {saved ? "Saved!" : "Save Allocations"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Teacher Workload Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Teacher Workload Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teachers.map((t, i) => (
              <div key={t.name} className="border border-slate-100 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <div className={`${avatarColors[i % avatarColors.length]} w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {getInitial(t.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{t.name.split(" ").slice(-1)[0]}, {t.name.split(" ")[0]}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.courses} course{t.courses !== 1 ? "s" : ""}</p>
                  <div className="mt-2 h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${t.courses >= 3 ? "bg-amber-500" : t.courses === 2 ? "bg-blue-500" : "bg-emerald-500"}`}
                      style={{ width: `${(t.courses / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
