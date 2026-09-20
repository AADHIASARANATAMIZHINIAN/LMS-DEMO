"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, CheckCircle2, FileText, Smartphone, Languages, RefreshCcw, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoordinatorReportsPage() {
  const [generationState, setGenerationState] = useState<"idle" | "generating" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const startGeneration = () => {
    setGenerationState("generating");
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerationState("complete");
          return 100;
        }
        return prev + 5; // Fast simulation
      });
    }, 150);
  };

  const reset = () => {
    setGenerationState("idle");
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <PageHeader 
        title="Automated Parent Reporting" 
        description="Generate and dispatch bilingual weekly progress reports directly to parent WhatsApp numbers."
        breadcrumb={[{ label: "Coordinator" }, { label: "Reports & Comms" }]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT PANEL: Control Center */}
        <div className="space-y-6">
          <Card padding="lg" className="border-blue-800/20 bg-blue-800/5">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Saturday Dispatch Engine</h3>
            <p className="text-sm text-slate-500 mb-6">
              This will aggregate coding performance, attendance, and exam scores for 120 students in II CSE A and II AIDS A.
            </p>

            {generationState === "idle" && (
              <Button size="lg" variant="primary" leftIcon={<Play size={18} />} onClick={startGeneration} className="w-full justify-center">
                Initialize Report Generation
              </Button>
            )}

            {generationState === "generating" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-800 font-semibold animate-pulse">Aggregating Data...</span>
                  <span className="text-slate-900 font-bold">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-800"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="text-xs text-slate-500 space-y-1 font-mono h-12 overflow-hidden">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{progress > 10 ? "> Connecting to LLM Translation Engine..." : "> Booting engine..."}</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{progress > 30 ? "> Generating EN/TA localized PDFs..." : ""}</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{progress > 70 ? "> Resolving parent WhatsApp contacts..." : ""}</motion.p>
                </div>
              </div>
            )}

            {generationState === "complete" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-600/10 p-4 rounded-xl border border-emerald-600/20">
                  <CheckCircle2 size={24} className="shrink-0" />
                  <div>
                    <h4 className="font-bold">Dispatch Complete</h4>
                    <p className="text-xs opacity-90">120 dual-language reports sent to WhatsApp.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={reset} leftIcon={<RefreshCcw size={14} />}>
                  Reset Demo
                </Button>
              </div>
            )}
          </Card>

          {/* Audit Logs */}
          <AnimatePresence>
            {generationState === "complete" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card padding="md" className="border-slate-200 bg-white">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Delivery Audit (Arun Kumar)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-rose-600/10 text-rose-600 flex items-center justify-center">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">Arun_Kumar_Progress_EN.pdf</p>
                          <p className="text-[10px] text-slate-500">English (Default)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">Generated</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-amber-600/10 text-amber-600 flex items-center justify-center">
                          <Languages size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">Arun_Kumar_Progress_TA.pdf</p>
                          <p className="text-[10px] text-slate-500">Tamil (Localized)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">Generated</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PANEL: WhatsApp Simulator */}
        <div className="flex justify-center items-start">
          <div className="w-[320px] h-[640px] bg-white rounded-[2.5rem] border-8 border-slate-200 overflow-hidden relative shadow-2xl flex flex-col">
            
            {/* Phone Header */}
            <div className="bg-slate-200 px-4 py-3 shrink-0 flex items-center gap-3 pt-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-blue-800 flex items-center justify-center text-white font-bold">
                AIT
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Astra Institute</p>
                <p className="text-slate-500 text-xs">Official LMS Account</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-slate-100 p-4 flex flex-col gap-3 overflow-y-auto" style={{ backgroundImage: "url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')", backgroundSize: "cover", backgroundBlendMode: "overlay" }}>
              
              <div className="flex justify-center mt-2">
                <span className="bg-slate-200 text-slate-500 text-[10px] px-3 py-1 rounded-lg">Today</span>
              </div>

              <AnimatePresence>
                {generationState === "complete" && (
                  <>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                      <div className="bg-[#005C4B] text-slate-800 p-2.5 rounded-lg rounded-tl-none text-sm max-w-[85%] shadow-sm">
                        <p className="mb-2"><strong>Astra Institute of Technology</strong></p>
                        <p className="mb-2">Hello Parent,</p>
                        <p className="mb-2">Here is the automated weekly coding progress report for <strong>Arun Kumar</strong> (II CSE A).</p>
                        <p className="mb-2 text-xs">This week's algorithmic focus was Arrays & Recursion.</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-300 text-[10px] text-slate-500">
                          <span>Auto-generated by AIT</span>
                          <span>10:30 AM</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
                      <div className="bg-[#005C4B] text-slate-800 p-2 rounded-lg text-sm w-[220px] shadow-sm flex items-center gap-3">
                        <div className="w-10 h-12 bg-rose-600/20 rounded flex flex-col items-center justify-center">
                          <FileText size={16} className="text-rose-600 mb-0.5" />
                          <span className="text-[8px] font-bold text-rose-600">PDF</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate text-sm font-semibold">Arun_Progress_EN.pdf</p>
                          <p className="text-xs text-slate-500">English • 1.2 MB</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}>
                      <div className="bg-[#005C4B] text-slate-800 p-2.5 rounded-lg rounded-bl-none text-sm max-w-[85%] shadow-sm mt-2">
                        <p className="mb-2 text-xs font-semibold">வணக்கம், அருண் குமார் (II CSE A) இன் இந்த வார முன்னேற்ற அறிக்கை கீழே இணைக்கப்பட்டுள்ளது.</p>
                        <div className="bg-slate-200/50 p-2 rounded mt-2 flex items-center gap-3">
                          <div className="w-10 h-12 bg-amber-600/20 rounded flex flex-col items-center justify-center">
                            <Languages size={16} className="text-amber-600 mb-0.5" />
                            <span className="text-[8px] font-bold text-amber-600">PDF</span>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-semibold">Arun_Progress_TA.pdf</p>
                            <p className="text-xs text-slate-500">Tamil • 1.4 MB</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end mt-1 text-[10px] text-slate-500">
                          <span>10:30 AM</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

            </div>

            {/* Input Mock */}
            <div className="bg-slate-200 px-4 py-3 shrink-0 flex items-center gap-3">
              <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center">
                <span className="text-slate-500 text-sm">Message</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
