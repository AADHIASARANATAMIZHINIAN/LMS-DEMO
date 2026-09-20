"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Filter,
  ChevronRight,
  UserCircle2,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STUDENTS = [
  {
    id: "S1001",
    name: "Arun Kumar",
    email: "arun@tech.edu",
    score: 72,
    trend: "down",
    avatar: "A",
  },
  {
    id: "S1002",
    name: "Priya Sharma",
    email: "priya@tech.edu",
    score: 94,
    trend: "up",
    avatar: "P",
  },
  {
    id: "S1003",
    name: "Rahul Verma",
    email: "rahul@tech.edu",
    score: 88,
    trend: "up",
    avatar: "R",
  },
  {
    id: "S1004",
    name: "Kavya Singh",
    email: "kavya@tech.edu",
    score: 65,
    trend: "down",
    avatar: "K",
  },
];

const ARUN_DATA = {
  strong: [
    { topic: "Arrays & Strings", score: 95 },
    { topic: "Loops & Iteration", score: 92 },
    { topic: "Hash Maps", score: 88 },
  ],
  weak: [
    { topic: "Recursion", score: 42, color: "#FF5C70" },
    { topic: "Dynamic Programming", score: 51, color: "#F4B860" },
  ],
};

export default function TeacherStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(
    "S1001",
  );
  const [interventionSent, setInterventionSent] = useState(false);

  const handleAssignPractice = () => {
    setInterventionSent(true);
    setTimeout(() => {
      setInterventionSent(false);
      // In a real app we'd mark this in DB
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col max-w-7xl mx-auto">
      <PageHeader
        title="Student Roster"
        description="Monitor student progress and assign targeted interventions."
        breadcrumb={[{ label: "Teacher" }, { label: "Students" }]}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        {/* LEFT PANEL: Student List */}
        <div className="col-span-1 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden relative">
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-800/50"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest px-1">
              <span>CS101 (Section A)</span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                <Filter size={12} /> Filter
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {STUDENTS.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full text-left p-4 flex items-center justify-between border-b border-slate-200 transition-colors ${
                  selectedStudent === student.id
                    ? "bg-blue-800/10 border-l-2 border-l-blue-800"
                    : "hover:bg-white/[0.02] border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      selectedStudent === student.id
                        ? "bg-blue-800/20 text-blue-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {student.avatar}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${selectedStudent === student.id ? "text-slate-900" : "text-slate-500"}`}
                    >
                      {student.name}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      {student.id}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs font-bold ${student.score < 75 ? "text-rose-600" : "text-emerald-600"}`}
                  >
                    {student.score}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Analytics & Intervention */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-y-auto">
          {selectedStudent === "S1001" ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-blue-800/20 text-blue-800 flex items-center justify-center text-2xl font-bold">
                    A
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Arun Kumar
                    </h2>
                    <p className="text-slate-500">arun@tech.edu • ID: S1001</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                    Overall Grade
                  </p>
                  <p className="text-3xl font-black text-rose-600">72%</p>
                </div>
              </div>

              {/* Analytics Section (Demo Feature 13) */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-blue-800" />
                  Topic Mastery Profile
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-300 pb-2">
                      Strong Topics
                    </p>
                    {ARUN_DATA.strong.map((topic) => (
                      <div key={topic.topic}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-900">{topic.topic}</span>
                          <span className="text-emerald-600 font-bold">
                            {topic.score}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${topic.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 relative">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-300 pb-2">
                      Weak Topics (At Risk)
                    </p>
                    {ARUN_DATA.weak.map((topic) => (
                      <div key={topic.topic}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-900">{topic.topic}</span>
                          <span
                            style={{ color: topic.color }}
                            className="font-bold"
                          >
                            {topic.score}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${topic.score}%`,
                              backgroundColor: topic.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Intervention Action (Demo Feature 14) */}
                    <div className="mt-8 p-4 rounded-xl border border-rose-600/20 bg-rose-600/5">
                      <div className="flex gap-3 mb-3">
                        <AlertTriangle
                          size={16}
                          className="text-rose-600 shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-sm font-semibold text-rose-600 mb-1">
                            Algorithmic Deficiency Detected
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Arun is struggling significantly with{" "}
                            <strong>Recursion</strong>. The platform recommends
                            assigning a targeted practice module before the
                            upcoming midterm.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Send size={14} />}
                          onClick={handleAssignPractice}
                          disabled={interventionSent}
                        >
                          {interventionSent
                            ? "Assigned!"
                            : "Assign Remedial Practice: Recursion"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <UserCircle2 size={48} className="mb-4 opacity-20" />
              <p>Select a student to view their analytics profile.</p>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification (Demo Feature 14) */}
      <AnimatePresence>
        {interventionSent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-[0_10px_40px_rgba(76,201,138,0.3)] flex items-center gap-3 font-medium"
          >
            <CheckCircle2 size={20} />
            Recursion Practice assigned to Arun
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
