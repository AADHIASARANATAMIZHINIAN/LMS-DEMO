"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Play, Loader2 } from "lucide-react";

export default function PracticePage() {
  const [code, setCode] = useState("print('Hello from Astra Sandbox!')");
  const [language, setLanguage] = useState("python");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    try {
      const res = await fetch("http://localhost:3001/api/execution/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, type: "practice" }),
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setOutput(data.output);
      }
    } catch (e) {
      setOutput("Error connecting to execution server.");
    }
    setRunning(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col -m-6 bg-[#1e1e1e] text-slate-300">
      <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-white">Sandbox Playground</h2>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xs text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
            <option value="java">Java 21</option>
            <option value="javascript">Node.js</option>
          </select>
        </div>
        <Button onClick={handleRun} loading={running} leftIcon={<Play size={14} fill="currentColor" />} className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
          Run Code
        </Button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="w-2/3 border-r border-slate-800 flex flex-col bg-[#1e1e1e]">
          <div className="bg-slate-900 text-xs text-slate-500 px-4 py-2 border-b border-slate-800 flex justify-between">
            <span>editor.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>
        {/* Terminal / Output */}
        <div className="w-1/3 bg-slate-950 flex flex-col">
          <div className="bg-slate-900 text-xs text-slate-500 px-4 py-2 border-b border-slate-800 flex justify-between">
            <span>Terminal Output</span>
            {running && <Loader2 size={14} className="animate-spin text-blue-500" />}
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap">
            {output ? (
              <span className={output.includes('Error') ? 'text-rose-400' : 'text-emerald-400 font-bold'}>{output}</span>
            ) : (
              <span className="text-slate-600">Waiting for execution...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
