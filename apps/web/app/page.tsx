"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Users, Building2, ChevronRight, Zap, Trophy, BarChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
              <Terminal size={18} className="text-white" />
            </div>
            Astra LMS
          </div>
          <Link href="/login">
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
              Access Demo Platform
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-widest mb-8">
            <Zap size={14} /> The Next-Generation Code Academy
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Automate Programming Education at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Scale</span>.
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A fully integrated, multi-tenant Learning Management System engineered specifically for university computer science departments.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-slate-200 gap-2">
                Launch Live Demo <ChevronRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Mockup / Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" as const }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
          <div className="rounded-2xl border border-white/10 bg-[#0f1115] overflow-hidden shadow-2xl">
            <div className="h-10 bg-[#16191f] border-b border-white/5 flex items-center gap-2 px-4">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500" /><div className="w-3 h-3 rounded-full bg-amber-500" /><div className="w-3 h-3 rounded-full bg-emerald-500" /></div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="h-8 w-64 bg-white/10 rounded" />
                <div className="h-32 w-full bg-white/5 rounded" />
              </div>
              <div className="bg-[#1e2128] rounded-xl border border-white/5 p-4 font-mono text-sm text-emerald-400">
                <span className="text-slate-500">{"// Execution Log"}</span><br/><br/>
                $ docker run astra/sandbox:python<br/>
                {">"} Compiling target...<br/>
                {">"} Running test suites...<br/>
                <span className="text-blue-400">✓ Test Case 1 passed (12ms)</span><br/>
                <span className="text-blue-400">✓ Test Case 2 passed (08ms)</span><br/><br/>
                Status: <span className="text-emerald-400 font-bold">COMPLETED</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto">
          {[
            { icon: Code2, title: "Zero-Setup Sandboxes", desc: "Browser-based Python, C++, and Java execution environments powered by secure containers.", color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: BarChart, title: "Actionable Analytics", desc: "Deep insights into student performance, graduation paths, and departmental success rates.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { icon: Building2, title: "Multi-Tenant Architecture", desc: "Scale across hundreds of university campuses, each with isolated data and coordinators.", color: "text-purple-400", bg: "bg-purple-400/10" }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.bg} ${f.color}`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
