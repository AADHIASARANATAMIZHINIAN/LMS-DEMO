"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Code2, Play, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function Page() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAssn, setActiveAssn] = useState<any>(null);
  
  // Editor State
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/student/assignments", { credentials: "include" });
      if (res.ok) setAssignments(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSelect = (a: any) => {
    setActiveAssn(a);
    setCode(a.language === 'python' ? 'def solve():\n    # Write your code here\n    pass' : '// Write your code here');
    setResult(null);
  };

  const handleRun = async () => {
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch(`/api/student/assignments/${activeAssn.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include"
      });
      if (res.ok) {
        setResult(await res.json());
        fetchAssignments(); // Refresh to update submission count/status
      }
    } catch (e) { console.error(e); }
    setRunning(false);
  };

  if (activeAssn) {
    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col -m-6 bg-slate-900 text-slate-300">
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveAssn(null)} className="text-slate-400 hover:text-white text-sm">← Back</button>
            <h2 className="font-bold text-white">{activeAssn.title}</h2>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-mono uppercase">{activeAssn.language}</span>
          </div>
          <Button onClick={handleRun} loading={running} leftIcon={<Play size={14} fill="currentColor" />} className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
            Run & Submit
          </Button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Problem */}
          <div className="w-1/3 border-r border-slate-800 p-6 overflow-y-auto bg-slate-900">
            <h3 className="text-lg font-bold text-white mb-4">Description</h3>
            <div className="prose prose-invert prose-sm">
              <p>{activeAssn.description}</p>
            </div>
            
            {result && (
              <div className="mt-8 border-t border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Execution Result</h3>
                <div className={`p-4 rounded-lg border ${result.status === 'COMPLETED' ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-rose-950/30 border-rose-900/50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {result.status === 'COMPLETED' ? <CheckCircle2 className="text-emerald-500" size={18} /> : <XCircle className="text-rose-500" size={18} />}
                    <span className={`font-bold ${result.status === 'COMPLETED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.status === 'COMPLETED' ? 'All Tests Passed' : 'Execution Failed'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">Score: {result.score} / 100 • Time: {result.executionMs}ms</div>
                  <div className="bg-black/50 p-3 rounded text-xs font-mono text-slate-300">
                    {result.outputLog}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Right Panel: Editor */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Coding Lab" description="Complete your programming assignments." breadcrumb={[{ label: "Student" }, { label: "Lab" }]} />
      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
      ) : assignments.length === 0 ? (
        <Card><div className="p-12 text-center text-slate-500">No pending assignments.</div></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map(a => (
            <Card key={a.id} className="hover:border-blue-800/30 transition-colors group cursor-pointer" onClick={() => handleSelect(a)}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{a.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{a.courseOffering.course.name}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-800"><Code2 size={18} /></div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-6">{a.description}</p>
              
              {a.submissions?.length > 0 ? (
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="font-semibold text-emerald-600">Submitted (Score: {a.submissions[0].score})</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-sm">
                  <span className="font-semibold text-amber-600">Pending Submission</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
