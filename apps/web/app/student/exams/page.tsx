"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lock, Clock, CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExamsListPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader 
        title="Examinations" 
        description="View and access your scheduled assessments."
        breadcrumb={[{ label: "Assessment" }, { label: "Exams" }]} 
      />
      
      <div className="grid gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card padding="lg" className="border-emerald-600/20 bg-emerald-600/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Lock size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600/10 text-rose-600 uppercase tracking-wider">
                      Proctored
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-800/10 text-blue-800 uppercase tracking-wider">
                      CS101
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Midterm Examination</h3>
                  <p className="text-sm text-slate-500 max-w-lg">
                    Data Structures & Algorithms. This is a secure exam. Navigating away from the exam window will result in an automatic failure after 40 seconds.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} /> Today</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> 60 mins</span>
                </div>
                <Link href="/student/exams/midterm">
                  <Button variant="primary" rightIcon={<ChevronRight size={14} />}>
                    Enter Secure Exam
                  </Button>
                </Link>
              </div>

            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card padding="lg" className="opacity-60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 text-slate-500 flex items-center justify-center shrink-0">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Final Examination</h3>
                  <p className="text-sm text-slate-500">CS202: Advanced Computing. Scheduled for next month.</p>
                </div>
              </div>
              <Button variant="ghost" disabled>Not Available</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
