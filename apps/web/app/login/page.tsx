"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, Loader2, ArrowRight, Code2, Database, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const me = await fetch("/api/auth/me").then(r => r.json());
        if (me.roles.includes("STUDENT")) router.push("/student/dashboard");
        else if (me.roles.includes("TEACHER")) router.push("/teacher/dashboard");
        else if (me.roles.includes("COORDINATOR")) router.push("/coordinator/dashboard");
        else if (me.roles.includes("PLATFORM_OWNER")) router.push("/owner/dashboard");
      } else {
        alert("Invalid email. Use student@astra.edu, alan@astra.edu, coord@astra.edu, or owner@platform.io");
      }
    } catch (e) {
      console.error(e);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: "student@astra.edu", role: "Student", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { email: "alan@astra.edu", role: "Teacher", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { email: "coord@astra.edu", role: "Coordinator", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { email: "owner@platform.io", role: "SysAdmin", color: "bg-slate-500/10 text-slate-300 border-slate-500/20" }
  ];

  return (
    <div className="min-h-screen flex bg-[#050810] text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Left Side - Animated 3D Visuals */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden flex-col justify-between p-12 lg:p-20 border-r border-white/5 bg-slate-950/40 backdrop-blur-3xl z-10">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white relative z-20">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal size={20} className="text-white" />
          </div>
          University LMS
        </div>

        {/* 3D Floating Scene */}
        <div className="flex-1 relative flex items-center justify-center perspective-[1000px]">
          <motion.div 
            className="relative w-full max-w-lg aspect-square preserve-3d"
            animate={{ rotateX: -mousePos.y, rotateY: mousePos.x }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {/* Center Core */}
            <motion.div 
              className="absolute inset-1/4 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_100px_rgba(37,99,235,0.2)]"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-16 h-16 text-blue-400 opacity-50" />
            </motion.div>

            {/* Floating Element 1 - Code Block */}
            <motion.div 
              className="absolute top-10 right-10 w-64 bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -15, 0], opacity: 1, z: 50 }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 } }}
            >
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="font-mono text-xs space-y-1.5">
                <p><span className="text-blue-400">class</span> <span className="text-amber-300">NeuralNet</span>:</p>
                <p className="pl-4"><span className="text-blue-400">def</span> <span className="text-emerald-400">__init__</span>(self):</p>
                <p className="pl-8 text-slate-500">self.layers = []</p>
                <p className="pl-8 text-slate-500">self.compile()</p>
              </div>
            </motion.div>

            {/* Floating Element 2 - Stats Card */}
            <motion.div 
              className="absolute bottom-20 left-4 w-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: [0, 20, 0], opacity: 1, z: 80 }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 1, delay: 0.2 } }}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-3">
                <Database className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 font-medium mb-1">Total Submissions</p>
              <p className="text-2xl font-bold text-white">2.4M+</p>
            </motion.div>

            {/* Floating Element 3 - Success Badge */}
            <motion.div 
              className="absolute -bottom-4 right-24 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, z: 120 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">SYSTEM ONLINE</span>
            </motion.div>

          </motion.div>
        </div>

        {/* Copy */}
        <div className="relative z-20 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight"
          >
            The Operating System for Modern University Education
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Browser-based code execution, automated grading, and deep analytics built specifically for computer science departments.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative z-10 bg-slate-950">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" as const }}>
            
            <div className="lg:hidden flex items-center gap-2.5 font-bold text-xl tracking-tight text-white mb-12 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
                <Terminal size={20} className="text-white" />
              </div>
              University LMS
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome back</h2>
              <p className="text-slate-400">Sign in to your university portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 outline-none transition-all text-white placeholder-slate-500"
                    placeholder="student@astra.edu"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    disabled
                    className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none text-slate-500 cursor-not-allowed"
                    placeholder="•••••••• (Any password works)"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 text-base font-semibold rounded-xl bg-white text-black hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5 disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-12">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-x-0 h-px bg-white/10" />
                <span className="relative bg-slate-950 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Quick Access Demo Roles
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map(acc => (
                  <button 
                    key={acc.email} 
                    type="button"
                    onClick={() => setEmail(acc.email)}
                    className="text-left p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group"
                  >
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded border mb-2 ${acc.color}`}>
                      {acc.role}
                    </span>
                    <p className="text-xs font-medium text-slate-300 group-hover:text-white truncate">{acc.email}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
