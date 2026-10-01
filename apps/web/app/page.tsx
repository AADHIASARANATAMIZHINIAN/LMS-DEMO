"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Zap,
  BarChart3,
  Shield,
  Globe,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
  Play,
  BookOpen,
  Cpu,
  Lock,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────── */

const features = [
  {
    icon: Code2,
    title: "Browser-Native Code Execution",
    description:
      "Students write and run Python, Java, C++, and JavaScript directly in the browser. Isolated sandboxes, real-time output, and zero setup required.",
    tag: "Core",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    wide: true,
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Track student progression, submission patterns, and cohort performance with live dashboards.",
    tag: "Insights",
    color: "from-indigo-500/10 to-indigo-600/5",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    wide: false,
  },
  {
    icon: Zap,
    title: "Auto-Grading Engine",
    description:
      "Test-case-driven auto-grading with partial credit, timing constraints, and plagiarism detection.",
    tag: "Grading",
    color: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
    wide: false,
  },
  {
    icon: Globe,
    title: "Multi-Tenant Architecture",
    description:
      "Provision isolated portals for each institution. SSO, custom domains, branded experiences per university.",
    tag: "Platform",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    wide: false,
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, role-based access control, audit logs, and end-to-end encrypted submissions.",
    tag: "Security",
    color: "from-rose-500/10 to-rose-600/5",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
    wide: false,
  },
  {
    icon: BookOpen,
    title: "Curriculum Builder",
    description:
      "Drag-and-drop course builder. Import from GitHub, structure modules, and publish in minutes.",
    tag: "Content",
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    wide: true,
  },
];

const stats = [
  { value: "50+", label: "Universities" },
  { value: "125,000+", label: "Students" },
  { value: "2M+", label: "Code Submissions" },
  { value: "99.97%", label: "Uptime" },
];

const quotes = [
  {
    quote:
      "We replaced three separate tools with University LMS. Our faculty saved 8 hours per week on manual grading alone.",
    name: "Dr. Priya Nair",
    role: "Head of CS, Astra Institute of Technology",
    rating: 5,
    initial: "P",
    color: "from-blue-600 to-indigo-700",
  },
  {
    quote:
      "The isolated code execution sandboxes are a game-changer. Students get instant feedback and instructors get detailed analytics.",
    name: "Prof. James Okafor",
    role: "Dean of Engineering, Global Tech University",
    rating: 5,
    initial: "J",
    color: "from-emerald-600 to-teal-700",
  },
  {
    quote:
      "Onboarding 1,200 students took under an hour with the bulk enrollment tool. The support team was exceptional.",
    name: "Ms. Kavitha Rajan",
    role: "Academic Coordinator, Nexus College of Technology",
    rating: 5,
    initial: "K",
    color: "from-violet-600 to-purple-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Component ─────────────────────────────────── */

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-[#050810] min-h-screen text-white overflow-x-hidden">

      {/* ── Animated background mesh ─────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            animation: "pulse 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.05]"
          style={{
            background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Sticky Nav ───────────────────────────────── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-[#050810]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">University LMS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Institutions", "Docs"].map((item) => (
            <a key={item} href="#" className="text-slate-400 text-sm hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-slate-400 text-sm hover:text-white transition-colors hidden sm:block">
            Sign in
          </a>
          <button onClick={() => window.location.href = "/login"}
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
            className="text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Access Platform
          </button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative z-10 min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full"
          >
            <Zap className="w-3 h-3" />
            Now supporting 50+ universities worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
          >
            The Operating System{" "}
            <span
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)",
              }}
            >
              for Modern
              <br />
              University Education
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            A complete learning management platform purpose-built for computer science education.
            Browser-based code execution, auto-grading, deep analytics — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <button onClick={() => window.location.href = "/login"}
              style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
              className="text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-blue-900/40"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => window.location.href = "/login"} className="text-slate-300 font-medium text-base px-7 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </motion.div>

          {/* Hero code preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 w-full max-w-2xl bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 text-slate-500 text-xs font-mono">assignment_01.py</span>
            </div>
            <div className="p-5 text-left font-mono text-sm text-slate-300 leading-relaxed">
              <span className="text-blue-400">def</span>{" "}
              <span className="text-amber-300">fibonacci</span>
              <span className="text-slate-400">(n: int) -{">"} list[int]:</span>
              <br />
              {"    "}<span className="text-slate-500"># Implement Fibonacci sequence up to n terms</span>
              <br />
              {"    "}seq = [<span className="text-emerald-400">0</span>, <span className="text-emerald-400">1</span>]
              <br />
              {"    "}<span className="text-blue-400">for</span> _ <span className="text-blue-400">in</span>{" "}
              <span className="text-amber-300">range</span>(n - <span className="text-emerald-400">2</span>):
              <br />
              {"        "}seq.<span className="text-amber-300">append</span>(seq[<span className="text-emerald-400">-1</span>] + seq[<span className="text-emerald-400">-2</span>])
              <br />
              {"    "}<span className="text-blue-400">return</span> seq
              <br />
              <br />
              <span className="text-emerald-400">✓</span>{" "}
              <span className="text-slate-400">Test passed: fibonacci(8) == [0, 1, 1, 2, 3, 5, 8, 13]</span>
              <br />
              <span className="text-emerald-400">✓</span>{" "}
              <span className="text-slate-400">All 6 test cases passed — Score: <span className="text-emerald-300 font-semibold">100/100</span></span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Animated Stats Bar ────────────────────────── */}
      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="flex flex-col items-center gap-1">
              <span
                className="text-4xl md:text-5xl font-bold"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundImage: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
                }}
              >
                {stat.value}
              </span>
              <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Feature Bento Grid ───────────────────────── */}
      <section className="relative z-10 py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 border border-blue-500/20 bg-blue-500/10 px-3 py-1 rounded-full">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Everything your university needs,{" "}
            <span className="text-slate-400">nothing it doesn't</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl border p-6 overflow-hidden bg-gradient-to-br ${feature.color} ${feature.border} ${feature.wide ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] shrink-0">
                    <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{feature.tag}</span>
                    <h3 className="text-white font-semibold text-base mt-1 mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Social Proof ─────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-full">
            Trusted by Educators
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Loved by university coordinators worldwide
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {quotes.map((q) => (
            <motion.div
              key={q.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: q.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{q.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${q.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {q.initial}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{q.name}</p>
                  <p className="text-slate-500 text-xs">{q.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="relative z-10 py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Gradient blob */}
          <div
            className="absolute inset-0 -z-10 rounded-3xl opacity-20 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #3b82f6 0%, #6366f1 50%, transparent 80%)" }}
          />

          <div
            className="rounded-3xl border border-white/10 p-12 md:p-16"
            style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(79,70,229,0.08) 100%)" }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-6 border border-blue-500/20 bg-blue-500/10 px-3 py-1 rounded-full">
              <Zap className="w-3 h-3" /> Ready to transform your campus?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Start your institution's journey today
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 50+ universities already using University LMS to deliver world-class computer science education at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.location.href = "/login"}
                style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                className="text-white font-semibold text-base px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-blue-900/50"
              >
                Request a Demo <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => window.location.href = "/login"} className="text-slate-300 font-medium text-base px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
                Explore Features <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {["No credit card required", "14-day free trial", "Dedicated onboarding"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-base">University LMS</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The operating system for modern university education. Built for CS departments that demand more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
                { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
                { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
              ].map((col) => (
                <div key={col.heading}>
                  <h4 className="text-white font-semibold text-sm mb-3">{col.heading}</h4>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-slate-500 text-sm hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 University LMS. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
