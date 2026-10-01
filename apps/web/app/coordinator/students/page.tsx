"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  ChevronUp,
  ChevronDown,
  Users,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  UserX,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const students = [
  {
    id: "AIT-001", name: "Arjun Sharma", email: "arjun.sharma@ait.edu.in",
    department: "Computer Science", batch: "2023–2027", gpa: 8.9, status: "Active", avatar: "AS",
  },
  {
    id: "AIT-002", name: "Priya Nair", email: "priya.nair@ait.edu.in",
    department: "Artificial Intelligence", batch: "2023–2027", gpa: 9.2, status: "Active", avatar: "PN",
  },
  {
    id: "AIT-003", name: "Rahul Menon", email: "rahul.menon@ait.edu.in",
    department: "Computer Science", batch: "2023–2027", gpa: 6.4, status: "Probation", avatar: "RM",
  },
  {
    id: "AIT-004", name: "Kavya Reddy", email: "kavya.reddy@ait.edu.in",
    department: "Electronics & Comm.", batch: "2023–2027", gpa: 8.1, status: "Active", avatar: "KR",
  },
  {
    id: "AIT-005", name: "Mohammed Iqbal", email: "m.iqbal@ait.edu.in",
    department: "Artificial Intelligence", batch: "2023–2027", gpa: 7.7, status: "Active", avatar: "MI",
  },
  {
    id: "AIT-006", name: "Deepa Krishnan", email: "deepa.krishnan@ait.edu.in",
    department: "Computer Science", batch: "2023–2027", gpa: 5.8, status: "Inactive", avatar: "DK",
  },
  {
    id: "AIT-007", name: "Arun Patel", email: "arun.patel@ait.edu.in",
    department: "Electronics & Comm.", batch: "2023–2027", gpa: 8.6, status: "Active", avatar: "AP",
  },
  {
    id: "AIT-008", name: "Sneha Iyer", email: "sneha.iyer@ait.edu.in",
    department: "Computer Science", batch: "2023–2027", gpa: 9.5, status: "Active", avatar: "SI",
  },
];

const deptColors: Record<string, string> = {
  "Computer Science": "bg-blue-50 text-blue-700",
  "Artificial Intelligence": "bg-indigo-50 text-indigo-700",
  "Electronics & Comm.": "bg-amber-50 text-amber-700",
};

const avatarColors = [
  "bg-blue-500", "bg-indigo-500", "bg-emerald-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500", "bg-pink-500",
];

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
  Active: { label: "Active", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  Probation: { label: "Probation", icon: AlertTriangle, cls: "bg-amber-50 text-amber-700 border-amber-200" },
  Inactive: { label: "Inactive", icon: UserX, cls: "bg-slate-100 text-slate-500 border-slate-200" },
};

const summaryCards = [
  { label: "Total Students", value: 8, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active", value: 6, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Probation", value: 1, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Inactive", value: 1, icon: UserX, color: "text-slate-500", bg: "bg-slate-100" },
];

type SortKey = "name" | "gpa" | "id";
type SortDir = "asc" | "desc";

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDept, setFilterDept] = useState("All");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = students
    .filter((s) => {
      const q = query.toLowerCase();
      const matchQ = s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchStatus = filterStatus === "All" || s.status === filterStatus;
      const matchDept = filterDept === "All" || s.department === filterDept;
      return matchQ && matchStatus && matchDept;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name") return dir * a.name.localeCompare(b.name);
      if (sortKey === "gpa") return dir * (a.gpa - b.gpa);
      return dir * a.id.localeCompare(b.id);
    });

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === "asc" ? <ChevronUp className="w-3 h-3 inline ml-1 text-blue-600" /> : <ChevronDown className="w-3 h-3 inline ml-1 text-blue-600" />
    ) : (
      <ChevronUp className="w-3 h-3 inline ml-1 text-slate-300" />
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <PageHeader title="Student Management" description="B.Tech & M.Tech enrolled students — Batch 2023–2027" />

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {summaryCards.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className={`${c.bg} p-3 rounded-lg`}>
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{c.value}</p>
                <p className="text-sm text-slate-500">{c.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, ID or email…"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All</option>
                <option>Active</option>
                <option>Probation</option>
                <option>Inactive</option>
              </select>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="text-sm text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All</option>
                <option>Computer Science</option>
                <option>Artificial Intelligence</option>
                <option>Electronics & Comm.</option>
              </select>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-1.5" /> Export CSV
              </Button>
              <Button size="sm">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Add Student
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none" onClick={() => toggleSort("id")}>
                    Student ID <SortIcon k="id" />
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none" onClick={() => toggleSort("name")}>
                    Student <SortIcon k="name" />
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Batch</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none" onClick={() => toggleSort("gpa")}>
                    GPA <SortIcon k="gpa" />
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s, i) => {
                  const sc = statusConfig[s.status];
                  return (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{s.id}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`${avatarColors[i % avatarColors.length]} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {s.avatar}
                          </div>
                          <span className="font-semibold text-slate-800">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="text-xs">{s.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${deptColors[s.department] ?? "bg-slate-100 text-slate-600"}`}>
                          {s.department}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-xs font-medium">{s.batch}</td>
                      <td className="px-5 py-4">
                        <span className={`font-bold text-base ${s.gpa >= 8.5 ? "text-emerald-600" : s.gpa >= 7 ? "text-blue-600" : s.gpa >= 6 ? "text-amber-600" : "text-rose-500"}`}>
                          {s.gpa.toFixed(1)}
                        </span>
                        <span className="text-slate-400 text-xs"> /10</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 border text-xs font-semibold px-2.5 py-1 rounded-full ${sc.cls}`}>
                          <sc.icon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-400 text-sm">
                      No students match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing {filtered.length} of {students.length} students</p>
            <div className="flex gap-1">
              {[1].map((p) => (
                <button key={p} className="w-8 h-8 rounded text-sm font-medium bg-blue-600 text-white">{p}</button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
