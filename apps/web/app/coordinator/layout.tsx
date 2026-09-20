"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppShell, NavGroup } from "@/components/layout/AppShell";
import {
  LayoutDashboard, Building2, GraduationCap, Users, BookOpen,
  UserSquare2, ClipboardList, FileBarChart, Upload, Settings,
  ClipboardCheck, BarChart3, Loader2
} from "lucide-react";

const NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard",  href: "/coordinator/dashboard", icon: <LayoutDashboard size={14} /> },
    ]
  },
  {
    group: "Academic",
    items: [
      { label: "Departments", href: "/coordinator/departments",       icon: <Building2 size={14} /> },
      { label: "Programs",    href: "/coordinator/programs",          icon: <GraduationCap size={14} /> },
      { label: "Batches",     href: "/coordinator/batches",           icon: <BookOpen size={14} /> },
    ]
  },
  {
    group: "People",
    items: [
      { label: "Classes",   href: "/coordinator/classes",            icon: <ClipboardList size={14} /> },
      { label: "Teachers",  href: "/coordinator/teacher-allocation", icon: <UserSquare2 size={14} /> },
      { label: "Students",  href: "/coordinator/students",           icon: <Users size={14} /> },
    ]
  },
  {
    group: "Intelligence",
    items: [
      { label: "Analytics", href: "/coordinator/analytics", icon: <BarChart3 size={14} /> },
      { label: "Reports",   href: "/coordinator/reports",   icon: <FileBarChart size={14} /> },
    ]
  },
  {
    group: "System",
    items: [
      { label: "Imports",  href: "/coordinator/imports",  icon: <Upload size={14} /> },
      { label: "Settings", href: "/coordinator/settings", icon: <Settings size={14} /> },
    ]
  },
];

export default function CoordinatorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth("COORDINATOR");

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-blue-800" />
      </div>
    );
  }

  return (
    <AppShell
      user={{ email: user.email, tenantName: user.tenantName, role: "COORDINATOR" }}
      navGroups={NAV}
      logoLetter="C"
      portalLabel="Coordinator"
      accentColor="#4C7DFF"
      breadcrumbs={user.tenantName ? [user.tenantName.toUpperCase()] : ["COORDINATOR"]}
      onLogout={logout}
    >
      {children}
    </AppShell>
  );
}
