"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Play, Send, ChevronRight, CheckCircle2, XCircle, TerminalSquare, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PROBLEM = {
  id: "find-max",
  title: "Find Maximum Element",
  difficulty: "Easy",
  description: `
    <p class="mb-3 text-sm text-slate-500">Given an array of integers, write a function that returns the maximum element in the array.</p>
    <p class="mb-3 text-sm text-slate-500">You must return the value, do not print it.</p>
    
    <div class="mb-4">
      <h3 class="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-2">Example 1</h3>
      <div class="p-3 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-500">
        <div class="mb-1"><span class="text-teal-600">Input:</span> [1, 5, 3, 9, 2]</div>
        <div><span class="text-teal-600">Output:</span> 9</div>
      </div>
    </div>
    
    <div>
      <h3 class="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-2">Example 2</h3>
      <div class="p-3 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-500">
        <div class="mb-1"><span class="text-teal-600">Input:</span> [-5, -2, -9]</div>
        <div><span class="text-teal-600">Output:</span> -2</div>
      </div>
    </div>
  `,
  templates: {
    cpp: "int findMaximum(int arr[], int n) {\n  // Write your code here\n  return 0;\n}",
    python: "def find_maximum(arr):\n    # Write your code here\n    pass",
    java: "class Solution {\n    public int findMaximum(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n}",
  }
};

export default function StudentLab() {
  const [language, setLanguage] = useState<"cpp" | "python" | "java">("cpp");
  const [code, setCode] = useState(PROBLEM.templates["cpp"]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleLanguageChange = (lang: "cpp" | "python" | "java") => {
    setLanguage(lang);
    setCode(PROBLEM.templates[lang]);
  };

  const executeCode = async (type: "run" | "submit") => {
    setTerminalOpen(true);
    setExecuting(true);
    setResult(null);
    
    try {
      const res = await fetch("http://localhost:3001/api/execution/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problemId: PROBLEM.id, type })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ status: "error", error: "Execution failed to connect to sandbox." });
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-slate-50">
      {/* LEFT: Problem Description */}
      <div className="w-1/3 min-w-[300px] border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="shrink-0 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{PROBLEM.title}</h1>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest uppercase bg-emerald-600/10 text-emerald-600 border border-emerald-600/20">
              {PROBLEM.difficulty}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6" dangerouslySetInnerHTML={{ __html: PROBLEM.description }} />
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
            <Button variant="primary" size="sm" leftIcon={<Send size={13} />} onClick={() => executeCode("submit")} disabled={executing}>
              Submit
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
  );
}
