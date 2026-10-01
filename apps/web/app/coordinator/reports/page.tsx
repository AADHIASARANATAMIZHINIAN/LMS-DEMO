"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, Download, Calendar, Users, Send, CheckCircle2, 
  Smartphone, MessageCircle, FileDown, Loader2, Image as ImageIcon 
} from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"downloads" | "parents">("parents");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports & Communications" 
        description="Generate analytics reports and manage automated parent communications."
        breadcrumb={[{ label: "Coordinator" }, { label: "Reports" }]}
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("parents")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "parents" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Parent Dispatch (WhatsApp)
        </button>
        <button
          onClick={() => setActiveTab("downloads")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "downloads" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Internal Reports
        </button>
      </div>

      {activeTab === "parents" && <ParentCommunicationSimulator />}
      {activeTab === "downloads" && <InternalReports />}
    </div>
  );
}

// ── Parent Dispatch Simulator ──────────────────────────────────────────

const PARENT_CONTACTS = [
  { parentName: "Mrs. Sharma", studentName: "Arjun", phone: "+91 98765 43210" },
  { parentName: "Mr. Nair", studentName: "Priya", phone: "+91 98765 43211" },
  { parentName: "Mr. Menon", studentName: "Rahul", phone: "+91 98765 43212" },
];

function ParentCommunicationSimulator() {
  const [status, setStatus] = useState<"idle" | "generating" | "sending" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phoneMessages, setPhoneMessages] = useState<{type: "text" | "pdf" | "image", content: string, time: string}[]>([]);

  const startDispatch = () => {
    setStatus("generating");
    setLogs(["Initializing batch report generation..."]);
    setProgress(0);
    setMessagesSent(0);
    setPhoneMessages([]);

    setTimeout(() => {
      setProgress(20);
      setLogs(p => [...p, "Generating 120 personalized PDF Report Cards..."]);
    }, 1000);

    setTimeout(() => {
      setProgress(40);
      setLogs(p => [...p, "Generating 120 performance infographics..."]);
    }, 2500);

    setTimeout(() => {
      setProgress(60);
      setStatus("sending");
      setLogs(p => [...p, "Connecting to WhatsApp Business API..."]);
    }, 4000);

    // Simulate sending to phones
    setTimeout(() => {
      setPhoneMessages([{ type: "text", content: "Dear Mrs. Sharma, please find the mid-term academic report for Arjun. His performance has been excellent this semester. 🌟", time: "10:42 AM" }]);
      setMessagesSent(10);
      setProgress(75);
    }, 5500);

    setTimeout(() => {
      setPhoneMessages(p => [...p, { type: "pdf", content: "Arjun_Report_Card_Midterm.pdf", time: "10:42 AM" }]);
      setMessagesSent(45);
      setProgress(85);
    }, 6500);

    setTimeout(() => {
      setPhoneMessages(p => [...p, { type: "image", content: "Performance_Radar.png", time: "10:42 AM" }]);
      setMessagesSent(80);
      setProgress(95);
    }, 7500);

    setTimeout(() => {
      setMessagesSent(120);
      setProgress(100);
      setStatus("complete");
      setLogs(p => [...p, "Successfully dispatched 120 reports via WhatsApp."]);
    }, 9000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Control Panel */}
      <div className="space-y-6">
        <Card padding="lg" elevated>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">One-Click Parent Dispatch</h3>
              <p className="text-sm text-slate-500">Automated WhatsApp report delivery</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Target Batch</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg h-10 px-3 text-sm text-slate-900 outline-none focus:border-blue-500 transition-colors" disabled={status !== "idle"}>
                <option>Class of 2027 (All Students)</option>
                <option>Class of 2026 (All Students)</option>
                <option>Computer Science Dept Only</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Include Attachments</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked disabled={status !== "idle"} /> PDF Report Card</label>
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked disabled={status !== "idle"} /> Radar Chart Image</label>
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked disabled={status !== "idle"} /> Attendance Summary</label>
              </div>
            </div>
          </div>

          {status === "idle" ? (
            <Button className="w-full" size="lg" onClick={startDispatch} leftIcon={<Send size={18} />}>
              Generate & Send to 120 Parents
            </Button>
          ) : (
            <div className="space-y-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-700">
                  {status === "generating" ? "Generating Files..." : status === "sending" ? "Dispatching to WhatsApp..." : "Dispatch Complete!"}
                </span>
                <span className="font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full ${status === "complete" ? "bg-emerald-500" : "bg-blue-600"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                <span>{messagesSent} / 120 delivered</span>
                <span className="flex items-center gap-1">
                  {status === "complete" ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Loader2 size={14} className="animate-spin text-blue-500" />}
                  {status === "complete" ? "Done" : "In Progress"}
                </span>
              </div>
            </div>
          )}

          {/* Logs */}
          <div className="mt-6 bg-slate-900 rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1.5 shadow-inner">
            <div className="text-slate-500 mb-2">{"// System logs"}</div>
            {logs.map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
              </motion.div>
            ))}
            {status !== "idle" && status !== "complete" && (
              <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity }}>
                <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> _
              </motion.div>
            )}
          </div>
        </Card>
      </div>

      {/* Right: Phone Simulation */}
      <div className="flex justify-center items-center">
        <div className="relative w-[320px] h-[650px] bg-white rounded-[2.5rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col">
          {/* Phone Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-3xl w-1/2 mx-auto z-20" />
          
          {/* App Header (WhatsApp style) */}
          <div className="bg-[#075e54] text-white pt-10 pb-3 px-4 flex items-center gap-3 shadow-md z-10 relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
              <span className="font-bold text-sm">AIT</span>
            </div>
            <div>
              <h4 className="font-semibold text-[15px] leading-tight">University LMS</h4>
              <p className="text-[11px] text-white/80">Official School Account</p>
            </div>
          </div>

          {/* Chat Background */}
          <div className="flex-1 bg-[#efeae2] p-4 flex flex-col justify-end gap-3 relative overflow-hidden"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.95 }}
          >
            <div className="text-center mb-auto mt-2">
              <span className="bg-[#e1f3fb] text-[#54656f] text-[11px] px-3 py-1 rounded-lg shadow-sm">Today</span>
            </div>

            <AnimatePresence>
              {phoneMessages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20, originX: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white rounded-xl rounded-tl-none p-2 shadow-sm max-w-[85%] self-start relative"
                >
                  {msg.type === "text" && (
                    <p className="text-[#111b21] text-[13px] leading-snug">{msg.content}</p>
                  )}
                  {msg.type === "pdf" && (
                    <div className="flex items-center gap-2 bg-[#f0f2f5] p-2 rounded-lg mb-1">
                      <div className="p-2 bg-rose-100 text-rose-500 rounded"><FileDown size={20} /></div>
                      <div className="flex-1 truncate">
                        <p className="text-[#111b21] text-xs font-semibold truncate">{msg.content}</p>
                        <p className="text-[#667781] text-[10px]">2.1 MB • PDF</p>
                      </div>
                    </div>
                  )}
                  {msg.type === "image" && (
                    <div className="relative rounded-lg overflow-hidden mb-1 bg-slate-100 flex items-center justify-center h-32 border border-slate-200">
                      <ImageIcon className="text-slate-300 w-12 h-12" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">View</span>
                      </div>
                    </div>
                  )}
                  <span className="float-right text-[10px] text-[#667781] ml-3 mt-1">{msg.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Chat Input fake */}
          <div className="bg-[#f0f2f5] p-2 px-3 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center text-[#8696a0] text-sm">
              Type a message
            </div>
            <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white">
              <Smartphone size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Internal Reports ─────────────────────────────────────────────────────

const INTERNAL_REPORTS = [
  { title: "Term-End Grade Summary",         format: "PDF", size: "2.1 MB", date: "Sep 18, 2026",  category: "Academic" },
  { title: "Department Attendance Report",    format: "CSV", size: "450 KB", date: "Sep 15, 2026",  category: "Attendance" },
  { title: "Faculty Load Analysis",           format: "PDF", size: "980 KB", date: "Sep 10, 2026",  category: "HR" },
  { title: "Student Progress Tracker",        format: "CSV", size: "120 KB", date: "Sep 5, 2026",   category: "Academic" },
  { title: "Enrollment Statistics Q3 2026",   format: "PDF", size: "1.5 MB", date: "Aug 30, 2026",  category: "Admin" },
];

function InternalReports() {
  return (
    <div className="space-y-4">
      {INTERNAL_REPORTS.map((r, i) => (
        <Card key={i} className="flex items-center justify-between gap-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${r.format === "PDF" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">{r.title}</h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {r.date}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {r.category}</span>
                <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${r.format === "PDF" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>{r.format}</span>
                <span>{r.size}</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0">
            <Download size={18} />
          </button>
        </Card>
      ))}
    </div>
  );
}
