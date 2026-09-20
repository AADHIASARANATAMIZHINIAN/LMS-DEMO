"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Play, Send, TerminalSquare, X, CheckCircle2, XCircle, AlertTriangle, Maximize, Clock } from "lucide-react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";

const EXAM_PROBLEM = {
  id: "midterm-01",
  title: "Q1. Dynamic Array Merger",
  difficulty: "Hard",
  description: `
    <p class="text-sm text-slate-500 mb-4">Time Remaining: <strong class="text-slate-900">59:32</strong></p>
    <p class="text-sm text-slate-500 leading-relaxed mb-4">
      Write a function that merges two sorted arrays <code>arr1</code> and <code>arr2</code> into a single sorted array. 
      However, you must do this <strong>in-place</strong> without using any extra space.
    </p>
    <div class="bg-white p-4 rounded-lg border border-slate-200 mb-4 font-mono text-xs">
      <p class="text-slate-500 mb-1">Example 1:</p>
      <p class="text-slate-900">Input: arr1 = [1,3,5], arr2 = [2,4,6]</p>
      <p class="text-slate-900">Output: [1,2,3,4,5,6]</p>
    </div>
  `,
  templates: {
    cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& arr1, vector<int>& arr2) {\n        \n    }\n};`,
    python: `class Solution:\n    def merge(self, arr1: list[int], arr2: list[int]) -> None:\n        """\n        Do not return anything, modify arr1 in-place instead.\n        """\n        pass`,
    java: `class Solution {\n    public void merge(int[] arr1, int[] arr2) {\n        \n    }\n}`
  }
};

export default function SecureExamPage() {
  const router = useRouter();
  
  // IDE State
  const [language, setLanguage] = useState<"cpp" | "python" | "java">("python");
  const [code, setCode] = useState(EXAM_PROBLEM.templates.python);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Secure Exam State
  const [examStarted, setExamStarted] = useState(false);
  const [isViolation, setIsViolation] = useState(false);
  const [violationTimer, setViolationTimer] = useState(40);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Fullscreen & Tab Detection
  useEffect(() => {
    if (!examStarted || isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerViolation();
      }
    };

    const handleBlur = () => {
      triggerViolation();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [examStarted, isSubmitted]);

  // Violation Countdown Logic
  useEffect(() => {
    if (isViolation && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setViolationTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            forceSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isViolation, isSubmitted]);

  const triggerViolation = () => {
    if (!isViolation && !isSubmitted) {
      setIsViolation(true);
    }
  };

  const returnToExam = () => {
    setIsViolation(false);
    // Note: We don't reset the timer completely to punish repeated tab switching, 
    // or we can leave it as is. For demo, we just hide the overlay.
    // Must re-enter fullscreen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        alert("Must be in fullscreen to continue.");
        setIsViolation(true);
      });
    }
  };

  const startExam = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setExamStarted(true);
    } catch (err) {
      alert("Browser blocked fullscreen. Please try again.");
    }
  };

  const forceSubmit = () => {
    setIsSubmitted(true);
    setIsViolation(false);
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleLanguageChange = (lang: "cpp" | "python" | "java") => {
    setLanguage(lang);
    setCode(EXAM_PROBLEM.templates[lang]);
  };

  const executeCode = async (type: "run" | "submit") => {
    if (type === "submit") forceSubmit();
    
    setTerminalOpen(true);
    setExecuting(true);
    setResult(null);
    
    try {
      const res = await fetch("/api/execution/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problemId: EXAM_PROBLEM.id, type })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ status: "error", error: "Execution failed to connect to sandbox." });
    } finally {
      setExecuting(false);
    }
  };

  // PRE-EXAM STATE
  if (!examStarted && !isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-slate-50 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-rose-600/10 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
          <Maximize size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Secure Exam Environment</h1>
        <p className="text-slate-500 max-w-lg mb-8">
          This examination requires <strong>Fullscreen Mode</strong> and active window tracking. 
          Leaving the exam window, switching tabs, or exiting fullscreen will trigger a violation countdown.
        </p>
        <Button variant="primary" size="lg" onClick={startExam} leftIcon={<Play size={16} />}>
          Enter Fullscreen & Begin Exam
        </Button>
      </div>
    );
  }

  // POST-EXAM STATE
  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-slate-50 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Exam Submitted</h1>
        <p className="text-slate-500 max-w-lg mb-8">
          Your code has been securely saved and submitted to the evaluation engine.
        </p>
        <Button variant="ghost" onClick={() => router.push("/student/exams")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* VIOLATION OVERLAY (Demo Feature 11) */}
      <AnimatePresence>
        {isViolation && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-rose-600 flex flex-col items-center justify-center text-center p-6"
          >
            <AlertTriangle size={64} className="text-white mb-6 animate-pulse" />
            <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-widest">Security Violation Detected</h1>
            <p className="text-xl text-white/90 max-w-2xl mb-10 font-medium">
              You have left the secure exam environment. Return to the exam immediately or your session will be auto-submitted.
            </p>
            
            <div className="text-8xl font-black text-white mb-12 tabular-nums tracking-tighter">
              00:{violationTimer.toString().padStart(2, '0')}
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={returnToExam} 
              className="!bg-white !text-rose-600 hover:!bg-white/90 text-lg px-10 py-6"
            >
              Resume Exam
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-56px)] bg-slate-50 overflow-hidden">
        {/* LEFT: Problem Description */}
        <div className="w-1/3 min-w-[300px] border-r border-slate-200 flex flex-col bg-slate-50">
          <div className="shrink-0 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-900">{EXAM_PROBLEM.title}</h1>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest uppercase bg-rose-600/10 text-rose-600 border border-rose-600/20">
                Secure Assessment
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6" dangerouslySetInnerHTML={{ __html: EXAM_PROBLEM.description }} />
        </div>

        {/* RIGHT: Editor & Terminal */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Editor Toolbar */}
          <div className="shrink-0 h-12 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex gap-2">
              {(["cpp", "python", "java"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors uppercase tracking-widest ${
                    language === lang 
                      ? "bg-white text-slate-900 border border-slate-300" 
                      : "text-slate-500 hover:text-slate-500"
                  }`}
                >
                  {lang === "cpp" ? "C++" : lang}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Play size={13} />} onClick={() => executeCode("run")} disabled={executing}>
                Run Code
              </Button>
              <Button variant="danger" size="sm" leftIcon={<Send size={13} />} onClick={() => executeCode("submit")} disabled={executing}>
                Submit Exam
              </Button>
            </div>
          </div>

          {/* Editor Space */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={language === "cpp" ? "cpp" : language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                roundedSelection: false,
              }}
            />
          </div>

          {/* Terminal Drawer */}
          <AnimatePresence>
            {terminalOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 280, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-slate-50 flex flex-col z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="shrink-0 h-10 px-4 border-b border-slate-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    <TerminalSquare size={14} />
                    Execution Results
                  </div>
                  <button onClick={() => setTerminalOpen(false)} className="text-slate-500 hover:text-slate-900">
                    <X size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
                  {executing ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-500">
                      <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      <p className="uppercase tracking-widest text-[10px]">Compiling & Running...</p>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      {/* Summary Header */}
                      <div className={`p-3 rounded-lg border flex items-center gap-3 ${
                        result.status === "success" 
                          ? "bg-emerald-600/10 border-emerald-600/20 text-emerald-600" 
                          : "bg-rose-600/10 border-rose-600/20 text-rose-600"
                      }`}>
                        {result.status === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <div className="flex-1">
                          <p className="font-bold">{result.status === "success" ? "Accepted" : "Wrong Answer"}</p>
                          <p className="text-[10px] opacity-80 mt-0.5">{result.passed} / {result.total} Test Cases Passed</p>
                        </div>
                        <div className="text-right text-[10px] opacity-80">
                          <div>Runtime: {result.runtime || "0.0"}s</div>
                          <div>Memory: {result.memory || "0"}MB</div>
                        </div>
                      </div>
                      
                      {/* Test Cases */}
                      <div className="space-y-2">
                        {result.tests?.map((t: any, i: number) => (
                          <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-slate-900">Test Case {i + 1} {t.hidden ? "(Hidden)" : ""}</span>
                              <span className={t.passed ? "text-emerald-600" : "text-rose-600"}>
                                {t.passed ? "Passed" : "Failed"}
                              </span>
                            </div>
                            {!t.hidden && (
                              <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-slate-200">
                                <div>
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Input</p>
                                  <p className="text-slate-500">{t.input}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Expected</p>
                                  <p className="text-slate-500">{t.expected}</p>
                                </div>
                              </div>
                            )}
                            {!t.passed && !t.hidden && (
                              <div className="mt-2 pt-2 border-t border-rose-600/20 text-rose-600">
                                <p className="text-[10px] uppercase tracking-widest mb-1">Actual Output</p>
                                <p>{t.actual}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
