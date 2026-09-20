"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Search, Filter, MoreHorizontal, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentIdStr, setStudentIdStr] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coordinator/students", { credentials: "include" });
      if (res.ok) {
        setStudents(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await fetch("/api/coordinator/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, studentIdStr }),
        credentials: "include"
      });
      if (res.ok) {
        await fetchStudents();
        setIsAdding(false);
        setFirstName(""); setLastName(""); setEmail(""); setStudentIdStr("");
      } else {
        const body = await res.json();
        alert(body.message || "Failed to create student.");
      }
    } catch (e) {
      console.error(e);
    }
    setSubmitLoading(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Student Directory" description="Manage all enrolled students across programs." breadcrumb={[{ label: "Coordinator" }, { label: "Students" }]} />
        <Button onClick={() => setIsAdding(true)} leftIcon={<Plus size={16} />}>Add Student</Button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/20 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card padding="lg" className="w-full max-w-md bg-white shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 font-serif">Add New Student</h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID (Roll No)</label>
                <input type="text" value={studentIdStr} onChange={e => setStudentIdStr(e.target.value)} required placeholder="e.g. STU-2026-101" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none transition-all" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" loading={submitLoading}>Save Student</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Search students..." className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-800 focus:outline-none" />
          </div>
          <button className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors"><Filter size={14} /> Filters</button>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No students found. Click "Add Student" to create one.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Student Name</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Class / Batch</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-800 border border-blue-100 flex items-center justify-center font-bold text-xs">
                        {stu.firstName.charAt(0)}{stu.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{stu.firstName} {stu.lastName}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{stu.studentIdStr}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-[13px]">{stu.user?.email}</td>
                  <td className="px-6 py-4 text-slate-500 text-[13px]">{stu.class?.name || "Unassigned"}</td>
                  <td className="px-6 py-4">
                    {stu.user?.isActive ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-semibold">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-xs font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-800 transition-colors p-1"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
