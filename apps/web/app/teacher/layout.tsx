"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppShell, NavGroup } from "@/components/layout/AppShell";
import { LayoutDashboard, BookOpen, Users, ClipboardList, Code2, BarChart3, FileText, Loader2 } from "lucide-react";

const NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/teacher/dashboard", icon: <LayoutDashboard size={14} /> },
    ]
  },
  {
    group: "People",
    items: [
      { label: "My Classes", href: "/teacher/classes",  icon: <BookOpen size={14} /> },
      { label: "Students",   href: "/teacher/students", icon: <Users size={14} /> },
    ]
  },
  {
    group: "Assessment",
    items: [
      { label: "Assignments", href: "/teacher/assignments", icon: <ClipboardList size={14} /> },
      { label: "Code Review",  href: "/teacher/lab",        icon: <Code2 size={14} /> },
    ]
  },
  {
    group: "Intelligence",
    items: [
      { label: "Analytics", href: "/teacher/analytics", icon: <BarChart3 size={14} /> },
      { label: "Reports",   href: "/teacher/reports",   icon: <FileText size={14} /> },
    ]
  },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth("TEACHER");

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <AppShell
      user={{ email: user.email, tenantName: user.tenantName, role: "TEACHER" }}
      navGroups={NAV}
      logoLetter="T"
      portalLabel="Teacher"
      accentColor="#58D6C5"
      breadcrumbs={user.tenantName ? [user.tenantName.toUpperCase(), "TEACHER"] : ["TEACHER"]}
      onLogout={logout}
    >
      {children}
    </AppShell>
  );
}
