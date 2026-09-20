"use client";
import { useState, useRef } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UploadCloud, FileSpreadsheet, AlertTriangle, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImportsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importState, setImportState] = useState<"idle" | "parsing" | "analyzing" | "blocked" | "requested">("idle");
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSimulateImport = () => {
    setImportState("parsing");
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setImportState("analyzing");
        setTimeout(() => setImportState("blocked"), 800);
      }
      setProgress(p);
    }, 200);
  };

  const handleRequestExpansion = () => {
    setImportState("requested");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Data Imports"
        description="Bulk import students, teachers, or courses via Excel/CSV."
        breadcrumb={[{ label: "System" }, { label: "Imports" }]}
      />

      <Card padding="none" className="overflow-hidden">
        <div className="p-6 md:p-8">
          
          <AnimatePresence mode="wait">
            {importState === "idle" && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-2 border-dashed border-slate-300 rounded-xl bg-white/[0.02] p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <div className="w-14 h-14 bg-blue-800/10 text-blue-800 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  {file ? file.name : "Click or drag file to upload"}
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                  Supports .csv and .xlsx formats. Download the <a href="#" className="text-blue-800 hover:underline">student template</a> to ensure columns match.
                </p>
                <Button 
                  variant="primary" 
                  onClick={(e) => { e.stopPropagation(); if(file) handleSimulateImport(); else fileInputRef.current?.click(); }}
                >
                  {file ? "Begin Import Validation" : "Select File"}
                </Button>
              </motion.div>
            )}

            {(importState === "parsing" || importState === "analyzing") && (
              <motion.div 
                key="parsing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 relative mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke="#4C7DFF" strokeWidth="8" 
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-200 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileSpreadsheet size={20} className="text-blue-800" />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {importState === "parsing" ? "Parsing Document..." : "Analyzing Data Constraints..."}
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  {importState === "parsing" 
                    ? `Reading ${file?.name || "data.xlsx"} rows and mapping columns...` 
                    : "Verifying tenant seat allocations and database constraints..."}
                </p>
              </motion.div>
            )}

            {importState === "blocked" && (
              <motion.div 
                key="blocked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-rose-600/20 bg-rose-600/5 rounded-xl p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 bg-rose-600/10 text-rose-600 rounded-full flex items-center justify-center">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rose-600 mb-2">Tenant License Limit Exceeded</h3>
                    <p className="text-sm text-slate-900 leading-relaxed mb-4">
                      The file <strong>{file?.name || "students_batch.xlsx"}</strong> contains <strong>620</strong> student records. 
                      Your current tenant license only has <strong>0 available seats</strong> out of your <strong>600 total provisioned seats</strong>.
                    </p>
                    <div className="bg-slate-50/50 border border-slate-200 rounded-lg p-4 mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Current Provisioned Seats:</span>
                        <span className="font-medium text-slate-900">600</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Students in Import File:</span>
                        <span className="font-medium text-slate-900">620</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                        <span className="text-rose-600 font-medium">Deficit:</span>
                        <span className="text-rose-600 font-bold">-20 Seats</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="danger" onClick={handleRequestExpansion}>
                        Request Seat Expansion (+50 Seats)
                      </Button>
                      <Button variant="ghost" onClick={() => { setImportState("idle"); setFile(null); }}>
                        Cancel Import
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {importState === "requested" && (
              <motion.div 
                key="requested"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-teal-600/10 text-teal-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Expansion Request Sent</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  The platform provider has been notified to expand your seat allocation. You will receive an email once the transaction is processed and the seats are available.
                </p>
                <div className="mt-8">
                  <Button variant="ghost" onClick={() => { setImportState("idle"); setFile(null); }}>
                    Return to Imports
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </Card>
      
      {/* Informational table underneath showing past imports */}
      <Card padding="none">
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Recent Imports</h3>
        </div>
        <div className="p-8 text-center text-sm text-slate-500">
          No past imports found for this tenant.
        </div>
      </Card>
    </div>
  );
}
