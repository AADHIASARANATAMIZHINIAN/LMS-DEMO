"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  CheckCircle2,
  Server,
  Database,
  Cpu,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const platformGrowthData = [
  { month: "May", users: 720 },
  { month: "Jun", users: 834 },
  { month: "Jul", users: 905 },
  { month: "Aug", users: 1020 },
  { month: "Sep", users: 1148 },
  { month: "Oct", users: 1247 },
];

const metricCards = [
  {
    title: "Total Tenants",
    value: "2",
    sub: "+1 this quarter",
    icon: Building2,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "+100%",
  },
  {
    title: "Active Users",
    value: "1,247",
    sub: "+99 this month",
    icon: Users,
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    trend: "+8.6%",
  },
  {
    title: "Monthly Revenue",
    value: "$24,800",
    sub: "MRR across all tenants",
    icon: DollarSign,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "+12.3%",
  },
  {
    title: "Platform Uptime",
    value: "99.97%",
    sub: "Last 30 days",
    icon: Activity,
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: "SLA met",
  },
];

const tenants = [
  {
    name: "Astra Institute of Technology",
    domain: "astra.lms.edu",
    seats: 600,
    total: 600,
    status: "Active",
    mrr: "$12,000",
    plan: "Professional",
    health: 100,
  },
  {
    name: "Global Tech University",
    domain: "gtu.lms.edu",
    seats: 647,
    total: 1200,
    status: "Active",
    mrr: "$12,800",
    plan: "Enterprise",
    health: 54,
  },
];

const systemServices = [
  {
    name: "API Server",
    status: "Online",
    detail: "v2.4.1 — 12ms avg latency",
    icon: Server,
    ok: true,
  },
  {
    name: "Database",
    status: "Online",
    detail: "PostgreSQL 15 — 98% pool available",
    icon: Database,
    ok: true,
  },
  {
    name: "Code Execution Workers",
    status: "Online",
    detail: "14 active / 2 idle workers",
    icon: Cpu,
    ok: true,
  },
  {
    name: "Email Queue",
    status: "Empty",
    detail: "142 delivered today",
    icon: Mail,
    ok: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OwnerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <PageHeader
        title="Platform Command Center"
        description="Real-time health, revenue, and usage metrics across all tenants."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
      >
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={itemVariants}>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium">{card.title}</span>
                  <div className={`${card.bg} p-2 rounded-lg`}>
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{card.value}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {card.trend}
                  </span>
                  <span className="text-xs text-slate-500">{card.sub}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="text-slate-900 font-semibold text-base">Platform User Growth</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Total active users across all tenants — last 6 months</p>
                </div>
                <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" /> +73%
                </span>
              </div>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={platformGrowthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13 }}
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fill="url(#userGrad)"
                      dot={{ r: 4, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-slate-900 font-semibold text-base">Tenant Health</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Seat utilisation and billing snapshot</p>
                </div>
                <Shield className="w-5 h-5 text-slate-400" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {["Institution", "Domain", "Seats Used", "Utilization", "MRR", "Plan", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((t, i) => (
                      <tr key={t.name} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === tenants.length - 1 ? "border-0" : ""}`}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {t.name.charAt(0)}
                            </div>
                            <span className="text-slate-900 font-medium">{t.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-500 font-mono text-xs">{t.domain}</td>
                        <td className="px-5 py-4 text-slate-900 font-semibold">{t.seats.toLocaleString()}<span className="text-slate-400 font-normal">/{t.total.toLocaleString()}</span></td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${t.health === 100 ? "bg-rose-400" : "bg-blue-500"}`}
                                style={{ width: `${t.health}%` }}
                              />
                            </div>
                            <span className={`text-xs font-semibold ${t.health === 100 ? "text-rose-500" : "text-blue-600"}`}>{t.health}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-900 font-semibold">{t.mrr}</td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">{t.plan}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-slate-900 font-semibold text-base">System Status</h2>
            </div>
            <div className="flex flex-col gap-4">
              {systemServices.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div key={svc.name} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="p-2 bg-white border border-slate-200 rounded-lg mt-0.5">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 text-sm font-medium">{svc.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${svc.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {svc.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{svc.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-slate-900 font-semibold text-base mb-4">Today's Activity</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: "Code Submissions", value: "3,847", color: "text-blue-600" },
                { label: "Active Sessions", value: "214", color: "text-indigo-600" },
                { label: "Emails Sent", value: "142", color: "text-slate-900" },
                { label: "New Enrollments", value: "31", color: "text-emerald-600" },
                { label: "Failed Jobs", value: "0", color: "text-slate-900" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 text-sm">{stat.label}</span>
                  <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-slate-900 font-semibold text-base mb-3">Incident Log</h2>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
              <p className="text-slate-600 text-sm font-medium">No incidents in the last 30 days</p>
              <p className="text-slate-400 text-xs mt-1">All systems have been nominal</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
