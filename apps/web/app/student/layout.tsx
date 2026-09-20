"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppShell, NavGroup } from "@/components/layout/AppShell";
import { LayoutDashboard, BookOpen, TerminalSquare, ClipboardList, GraduationCap, Loader2 } from "lucide-react";

const NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard size={14} /> },
    ]
  },
  {
    group: "Academic",
    items: [
      { label: "My Courses", href: "/student/courses", icon: <BookOpen size={14} /> },
    ]
  },
  {
    group: "Assessment",
    items: [
      { label: "Code Lab",  href: "/student/lab",   icon: <TerminalSquare size={14} /> },
      { label: "Exams",     href: "/student/exams", icon: <ClipboardList size={14} /> },
    ]
  },
  {
    group: "Progress",
    items: [
      { label: "Grades", href: "/student/grades", icon: <GraduationCap size={14} /> },
    ]
  },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth("STUDENT");
  const pathname = require("next/navigation").usePathname();

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  const isIde = pathname.includes("/student/lab") || pathname.match(/\/student\/exams\/.+/);

  return (
    <AppShell
      user={{ email: user.email, tenantName: user.tenantName, role: "STUDENT" }}
      navGroups={NAV}
      logoLetter="S"
      portalLabel="Student"
      accentColor="#4CC98A"
      breadcrumbs={user.tenantName ? [user.tenantName.toUpperCase(), "STUDENT"] : ["STUDENT"]}
      onLogout={logout}
      variant={isIde ? "ide" : "default"}
    >
      {children}
    </AppShell>
  );
}
