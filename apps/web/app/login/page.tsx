"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

const DEMO = {
  student:     { email: "student@astra.edu", password: "password123", domain: "astra.edu" },
  teacher:     { email: "alan@astra.edu", password: "password123", domain: "astra.edu" },
  coordinator: { email: "coord@astra.edu",   password: "password123", domain: "astra.edu" },
  owner:       { email: "owner@platform.io", password: "password123", domain: "platform.io" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [domain, setDomain] = useState("");
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const fillDemo = (role: keyof typeof DEMO) => { 
    setEmail(DEMO[role].email); 
    setPass(DEMO[role].password); 
    setDomain(DEMO[role].domain); 
    setError(""); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordString: pass, domain }),
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Invalid credentials. Please try again.");
      }
      
      const me = await fetch("http://localhost:3001/api/auth/me", { credentials: "include" }).then(r => r.json());
      
      if (me.roles.includes("PLATFORM_OWNER")) router.push("/owner/dashboard");
      else if (me.roles.includes("COORDINATOR")) router.push("/coordinator/dashboard");
      else if (me.roles.includes("TEACHER")) router.push("/teacher/dashboard");
      else router.push("/student/dashboard");
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT: Branding & Aesthetic */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-slate-50 p-12 border-r border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center text-white text-lg font-bold font-serif shadow-sm">
              U
            </div>
            <span className="text-slate-900 text-2xl font-bold font-serif tracking-tight">University LMS</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-slate-900 font-serif leading-tight mb-6">
              The next generation of academic excellence.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A unified platform seamlessly connecting students, faculty, and administration through an elegant digital campus experience.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} University Solutions Inc.
        </div>
      </div>

      {/* RIGHT: Unified Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-white text-sm font-bold font-serif shadow-sm">U</div>
            <span className="text-slate-900 text-xl font-bold font-serif tracking-tight">University LMS</span>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Sign in to your account</h2>
            <p className="text-slate-500 text-sm">Enter your institutional credentials to access your portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Institution Domain</label>
              <input
                type="text" required placeholder="e.g. tech.edu"
                value={domain} onChange={(e) => setDomain(e.target.value)}
                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email" required placeholder="name@institution.edu"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"} required placeholder="••••••••"
                  value={pass} onChange={(e) => setPass(e.target.value)}
                  className="w-full h-11 px-4 pr-10 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all shadow-sm"
                />
                <button
                  type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm mt-4">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit" disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 shadow-sm shadow-blue-800/20 transition-all duration-200 disabled:opacity-50 mt-2"
            >
              {loading ? "Authenticating..." : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Elegant Demo Data Injectors */}
          <div className="mt-12">
            <p className="text-xs text-center text-slate-400 font-medium uppercase tracking-widest mb-4">Quick Sign-In</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => fillDemo("student")} className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                Student
              </button>
              <button onClick={() => fillDemo("teacher")} className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                Teacher
              </button>
              <button onClick={() => fillDemo("coordinator")} className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                Coordinator
              </button>
              <button onClick={() => fillDemo("owner")} className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                Provider
              </button>
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
