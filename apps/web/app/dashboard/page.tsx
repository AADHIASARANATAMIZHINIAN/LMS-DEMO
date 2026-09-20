"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    fetch("https://astra-lms-demo-api.loca.lt/api/auth/me", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } })
      .then((r) => {
        if (!r.ok) throw new Error("unauthenticated");
        return r.json();
      })
      .then((data) => {
        const roles: string[] = data.roles ?? [];
        if (roles.includes("PLATFORM_ADMIN") || roles.includes("PLATFORM_OWNER")) {
          router.push("/owner/dashboard");
        } else if (roles.includes("COORDINATOR")) {
          router.push("/coordinator/dashboard");
        } else if (roles.includes("TEACHER")) {
          router.push("/teacher/dashboard");
        } else if (roles.includes("STUDENT")) {
          router.push("/student/dashboard");
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-800 border-t-transparent rounded-full"
      />
      <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">Loading workspace…</p>
    </div>
  );
}
