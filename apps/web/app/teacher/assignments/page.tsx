"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Code2, Users, Loader2, X } from "lucide-react";

export default function Page() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseOfferingId, setCourseOfferingId] = useState("");
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assnRes, clsRes] = await Promise.all([
        fetch("https://astra-lms-demo-api.loca.lt/api/teacher/assignments", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } }),
        fetch("https://astra-lms-demo-api.loca.lt/api/teacher/classes", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } })
      ]);
      if (assnRes.ok) setAssignments(await assnRes.json());
      if (clsRes.ok) setClasses(await clsRes.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await fetch("https://astra-lms-demo-api.loca.lt/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Bypass-Tunnel-Reminder": "true" },
        body: JSON.stringify({
          title, description, courseOfferingId, language, marks: 100,
          testCases: [
            { input: "2 3", expected: "5", isHidden: false },
            { input: "10 20", expected: "30", isHidden: true }
          ]
        }),
        credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      if (res.ok) {
        await fetchData();
        setIsAdding(false);
        setTitle(""); setDescription("");
      }
    } catch (e) { console.error(e); }
    setSubmitLoading(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Programming Assignments" description="Create and manage coding challenges for your classes." breadcrumb={[{ label: "Faculty" }, { label: "Assignments" }]} />
        <Button onClick={() => setIsAdding(true)} leftIcon={<Plus size={16} />}>Create Assignment</Button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/20 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card padding="lg" className="w-full max-w-xl bg-white shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 font-serif">Create Coding Assignment</h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Class</label>
                <select value={courseOfferingId} onChange={e => setCourseOfferingId(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none">
                  <option value="">Select a class...</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.course.name} - {c.class.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none">
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ 20</option>
                  <option value="java">Java 21</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 outline-none resize-none" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" loading={submitLoading}>Publish Assignment</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
      ) : assignments.length === 0 ? (
        <Card><div className="p-12 text-center text-slate-500">No assignments created yet.</div></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map(a => (
            <Card key={a.id} className="hover:border-blue-800/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{a.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{a.courseOffering.course.name} • {a.courseOffering.class.name}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-800"><Code2 size={18} /></div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-6">{a.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5"><Users size={14} /> {a._count.submissions} Submissions</div>
                <div className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-bold px-2 py-1 bg-slate-100 rounded">{a.language}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
