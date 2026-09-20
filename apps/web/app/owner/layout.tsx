"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppShell, NavGroup } from "@/components/layout/AppShell";
import { LayoutDashboard, Building2, Users, Settings, Activity, Upload, Loader2 } from "lucide-react";

const navGroups: NavGroup[] = [
  {
    group: "Platform",
    items: [
      { label: "Dashboard", href: "/owner/dashboard", icon: <LayoutDashboard size={16} /> },
      { label: "Tenants", href: "/owner/tenants", icon: <Building2 size={16} /> },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Background Jobs", href: "/owner/jobs", icon: <Activity size={16} /> },
      { label: "Import Monitor", href: "/owner/imports", icon: <Upload size={16} /> },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Settings", href: "/owner/settings", icon: <Settings size={16} /> },
    ],
  },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth("PLATFORM_OWNER");

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 size={24} className="animate-spin text-rose-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppShell
      user={user as any}
      navGroups={navGroups}
      logoLetter="O"
      portalLabel="Owner Console"
      accentColor="rose-600"
      onLogout={logout}
      breadcrumbs={["Provider", "Global Network"]}
    >
      {children}
    </AppShell>
  );
}
