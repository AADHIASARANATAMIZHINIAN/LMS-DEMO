"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    { email: "student@astra.edu", role: "Student", color: "bg-blue-100 text-blue-700" },
    { email: "alan@astra.edu", role: "Teacher", color: "bg-emerald-100 text-emerald-700" },
    { email: "coord@astra.edu", role: "Coordinator", color: "bg-purple-100 text-purple-700" },
    { email: "owner@platform.io", role: "SysAdmin", color: "bg-slate-800 text-white" }
  ];

  return (
    <div className="min-h-screen flex bg-white text-slate-900 font-sans">
      
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
            <Terminal size={20} className="text-white" />
          </div>
          University LMS
        </div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Unlock the future of <br/>computer science education.
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              A deeply integrated sandbox and grading platform designed exclusively for modern universities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
              <p className="text-slate-500">Sign in to access your portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    disabled
                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-400"
                    placeholder="•••••••• (Any password works in demo)"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base rounded-xl" loading={loading}>
                Sign In <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>

            <div className="mt-12">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-x-0 h-px bg-slate-200" />
                <span className="relative bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Quick Access Demo</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map(acc => (
                  <button 
                    key={acc.email} 
                    onClick={() => setEmail(acc.email)}
                    className={`text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all group`}
                  >
                    <span className={`inline-block px-2 py-1 text-[10px] uppercase font-bold rounded mb-2 ${acc.color}`}>{acc.role}</span>
                    <p className="text-xs font-medium text-slate-900 group-hover:text-blue-600 truncate">{acc.email}</p>
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
