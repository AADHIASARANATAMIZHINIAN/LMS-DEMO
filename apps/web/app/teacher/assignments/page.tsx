"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Code2, Clock, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Array Manipulation Lab", type: "Coding", due: "Tomorrow, 11:59 PM", submissions: 45, total: 120, status: "active" },
    { id: 2, title: "Recursion Challenges", type: "Theory + Coding", due: "In 3 days", submissions: 12, total: 120, status: "active" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Coding");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setAssignments([
      ...assignments,
      { id: Date.now(), title: newTitle, type: newType, due: "Next Week", submissions: 0, total: 120, status: "active" }
    ]);
    
    setNewTitle("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Assignments" description="Manage and grade student assignments." breadcrumb={[{ label: "Teacher" }, { label: "Assignments" }]} />
        <Button onClick={() => setIsAdding(true)} leftIcon={<Plus size={16} />}>Create Assignment</Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <Card padding="lg" className="border-emerald-200 bg-emerald-50/50 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900 font-serif">Create New Assignment</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
                  <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Binary Search Implementation" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
                  <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none bg-white">
                    <option>Coding</option>
                    <option>Quiz</option>
                    <option>Project</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <Button type="submit" className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 border-emerald-600">Publish</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <AnimatePresence>
          {assignments.map(a => (
            <motion.div key={a.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Card padding="lg" className="hover:border-slate-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">{a.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> Due {a.due}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium">{a.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">{a.submissions} / {a.total}</div>
                      <div className="text-xs text-slate-500">Submissions</div>
                    </div>
                    <Button variant="secondary" size="sm">Review</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
