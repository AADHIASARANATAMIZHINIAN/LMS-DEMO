"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Users, Clock, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoordinatorClassesPage() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Data Structures & Algorithms", code: "CS201", teacher: "Dr. Anita Desai", students: 120 },
    { id: 2, name: "Database Management Systems", code: "CS202", teacher: "Prof. Rajesh Kumar", students: 115 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTeacher, setNewTeacher] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCode) return;

    setClasses([
      ...classes, 
      { id: Date.now(), name: newName, code: newCode.toUpperCase(), teacher: newTeacher || "Unassigned", students: 0 }
    ]);
    
    setNewName("");
    setNewCode("");
    setNewTeacher("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Class Management" description="Create and manage academic classes." breadcrumb={[{ label: "Coordinator" }, { label: "Classes" }]} />
        <Button onClick={() => setIsAdding(true)} leftIcon={<Plus size={16} />}>Create New Class</Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <Card padding="lg" className="border-blue-200 bg-blue-50/50 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900 font-serif">Create New Class</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class Code</label>
                  <input type="text" value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="e.g. CS301" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class Name</label>
                  <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Operating Systems" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
                </div>
                <div className="md:col-span-1">
                  <Button type="submit" className="w-full h-10">Create Class</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {classes.map(c => (
            <motion.div key={c.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Card padding="lg" className="h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded-md">{c.code}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-3 font-serif">{c.name}</h3>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-slate-600 flex items-center gap-2"><Clock size={16} className="text-slate-400" /> {c.teacher}</p>
                  <p className="text-sm text-slate-600 flex items-center gap-2"><Users size={16} className="text-slate-400" /> {c.students} Students Enrolled</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">Manage Students</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
