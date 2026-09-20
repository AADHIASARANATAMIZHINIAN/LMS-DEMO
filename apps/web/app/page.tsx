"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Building2, ChevronRight, Zap, BarChart } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background glow blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-white/[0.06] bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Terminal size={16} className="text-white" />
            </div>
            University LMS
          </div>
          <Link href="/login">
            <button className="text-sm font-semibold bg-white text-slate-900 px-5 py-2.5 rounded-full hover:bg-blue-50 transition-all shadow-sm">
              Access Platform
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={13} /> Next-Generation Academic Platform
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.08] text-white">
              The Complete LMS for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                University CS Departments
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              A fully integrated, multi-tenant Learning Management System with live code execution sandboxes, automated grading, and deep analytics — built for modern universities.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              {/* Plain button to avoid variant text-color conflict */}
              <button className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-full bg-white text-slate-900 hover:bg-blue-50 transition-all shadow-lg shadow-white/10">
                Launch Live Demo <ChevronRight size={18} />
              </button>
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              See features ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Floating UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" as const }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-white/10 bg-[#0d1017] overflow-hidden shadow-2xl shadow-black/50">
            <div className="h-10 bg-[#161b22] border-b border-white/5 flex items-center gap-2 px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-slate-600 ml-2 font-mono">university-lms — student/lab</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Sidebar mock */}
              <div className="hidden md:flex md:col-span-1 flex-col gap-3">
                {["Dashboard", "Courses", "Code Lab", "Practice", "Grades"].map((item, i) => (
                  <div key={item} className={`px-3 py-2 rounded-lg text-xs font-medium ${i === 2 ? "bg-blue-600/20 text-blue-400" : "text-slate-600 hover:text-slate-400"}`}>{item}</div>
                ))}
              </div>
              {/* Main content mock */}
              <div className="md:col-span-4 space-y-4">
                <div className="h-6 w-48 bg-white/5 rounded-md" />
                <div className="grid grid-cols-3 gap-3">
                  {["92% Avg Score", "14 Problems", "Rank 14/120"].map(label => (
                    <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                      <div className="text-[10px] text-slate-600 mb-1">{label.split(" ").slice(1).join(" ")}</div>
                      <div className="text-sm font-bold text-slate-300">{label.split(" ")[0]}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#1e2535] rounded-xl p-4 font-mono text-xs border border-white/[0.06]">
                  <div className="text-slate-500 mb-2">{"// Binary Tree Inversion — Python 3"}</div>
                  <div className="text-blue-400">{"def invert_tree(root):"}</div>
                  <div className="text-slate-400 pl-4">{"if not root: return None"}</div>
                  <div className="text-slate-400 pl-4">{"root.left, root.right = invert_tree(root.right), invert_tree(root.left)"}</div>
                  <div className="text-slate-400 pl-4">{"return root"}</div>
                  <div className="mt-3 text-emerald-400 font-bold">{"✓ All 6 test cases passed (420ms)"}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto">
          {[
            { icon: Code2,     title: "Live Code Sandboxes",    desc: "Browser-based Python, C++, and Java execution — no installs, no setup, instant feedback per test case.", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
            { icon: BarChart,  title: "Actionable Analytics",   desc: "Real-time performance tracking, skill radar charts, and department enrollment trends for coordinators.", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
            { icon: Building2, title: "Multi-Tenant Platform",  desc: "Scale across unlimited universities. Each institution gets isolated data, custom roles, and its own coordinator.", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${f.color}`}>
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to explore?</h2>
          <p className="text-slate-400 mb-8">Log in as a student, teacher, coordinator, or admin and walk through the entire platform.</p>
          <Link href="/login">
            <button className="inline-flex items-center gap-2 h-12 px-7 font-bold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 transition-all shadow-lg shadow-blue-500/25">
              Enter the Demo <ChevronRight size={16} />
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] text-center py-8 text-xs text-slate-600">
        University LMS · Built for Academic Excellence
      </footer>
    </div>
  );
}
