"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Users, BookOpen, GraduationCap, BarChart3, Upload, Settings, ArrowRight } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  role: "COORDINATOR" | "TEACHER" | "STUDENT" | "PLATFORM_OWNER";
}

export function CommandPalette({ role }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allCommands: CommandItem[] = [
    // Shared
    { id: "dashboard",  label: "Go to Dashboard",        icon: <Hash size={14} />, action: () => router.push(`/${role.toLowerCase()}/dashboard`) },
    // Coordinator
    ...(role === "COORDINATOR" ? [
      { id: "depts",    label: "Departments",             description: "Manage academic departments",    icon: <GraduationCap size={14} />, action: () => router.push("/coordinator/departments") },
      { id: "import",   label: "Import Students",         description: "Bulk student provisioning",      icon: <Upload size={14} />,        action: () => router.push("/coordinator/imports"),    keywords: ["csv", "bulk", "upload"] },
      { id: "analytics",label: "Analytics",               description: "Institution performance",        icon: <BarChart3 size={14} />,     action: () => router.push("/coordinator/analytics") },
      { id: "teachers", label: "Teacher Allocation",      description: "Assign teachers to classes",     icon: <Users size={14} />,         action: () => router.push("/coordinator/teacher-allocation") },
      { id: "settings", label: "Settings",                description: "Institution settings",           icon: <Settings size={14} />,      action: () => router.push("/coordinator/settings") },
    ] : []),
    // Teacher
    ...(role === "TEACHER" ? [
      { id: "classes",   label: "My Classes",             description: "View assigned classes",          icon: <BookOpen size={14} />,      action: () => router.push("/teacher/classes") },
      { id: "students",  label: "Students",               description: "Student management",             icon: <Users size={14} />,         action: () => router.push("/teacher/students") },
      { id: "analytics", label: "Analytics",              description: "Class performance",              icon: <BarChart3 size={14} />,     action: () => router.push("/teacher/analytics") },
    ] : []),
    // Student
    ...(role === "STUDENT" ? [
      { id: "courses",   label: "My Courses",             description: "View enrolled courses",          icon: <BookOpen size={14} />,      action: () => router.push("/student/courses") },
      { id: "lab",       label: "Code Lab",               description: "Open coding environment",        icon: <Hash size={14} />,          action: () => router.push("/student/lab"),            keywords: ["code", "editor", "coding"] },
      { id: "grades",    label: "Grades",                 description: "View academic grades",           icon: <GraduationCap size={14} />, action: () => router.push("/student/grades") },
    ] : []),
  ];

  const filtered = query.trim()
    ? allCommands.filter((c) => {
        const q = query.toLowerCase();
        return c.label.toLowerCase().includes(q)
          || c.description?.toLowerCase().includes(q)
          || c.keywords?.some((k) => k.includes(q));
      })
    : allCommands;

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const execute = useCallback((item: CommandItem) => {
    item.action();
    setOpen(false);
    setQuery("");
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
  };

  return (
    <>
      {/* Trigger hint in topbar — shown by parent */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="palette"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed left-1/2 top-[15vh] z-50 w-full max-w-xl -translate-x-1/2 bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-label="Command palette"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
                <Search size={16} className="text-slate-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={handleKey}
                  placeholder="Search commands, pages, students..."
                  className="flex-1 bg-transparent text-slate-900 text-sm placeholder-slate-400 focus:outline-none"
                />
                <kbd className="text-[10px] text-slate-500 bg-white/5 border border-slate-300 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-10">No commands match "{query}"</p>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => execute(item)}
                      onMouseEnter={() => setSelected(i)}
                      className={[
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100",
                        i === selected ? "bg-blue-800/15 text-slate-900" : "text-slate-500 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <span className={`shrink-0 ${i === selected ? "text-blue-800" : "text-slate-500"}`}>{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${i === selected ? "text-slate-900" : ""}`}>{item.label}</p>
                        {item.description && <p className="text-xs text-slate-500 truncate">{item.description}</p>}
                      </div>
                      {i === selected && <ArrowRight size={14} className="text-blue-800 shrink-0" />}
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-slate-200 flex items-center gap-4 text-[10px] text-slate-500">
                <span><kbd className="font-mono bg-white/5 border border-slate-300 px-1 rounded">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono bg-white/5 border border-slate-300 px-1 rounded">↵</kbd> open</span>
                <span><kbd className="font-mono bg-white/5 border border-slate-300 px-1 rounded">Esc</kbd> close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
