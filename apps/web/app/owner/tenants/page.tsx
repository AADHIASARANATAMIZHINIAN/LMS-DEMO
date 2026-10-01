"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  DollarSign,
  Plus,
  LayoutGrid,
  List,
  CheckCircle2,
  Calendar,
  Globe,
  ChevronRight,
  Zap,
  Star,
  TrendingUp,
  MoreHorizontal,
  ExternalLink,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const platformStats = [
  { label: "Total Tenants", value: "2", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Students", value: "1,247", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Total MRR", value: "$24,800", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Avg. Seat Fill", value: "72%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
];

const tenants = [
  {
    id: "ait",
    name: "Astra Institute of Technology",
    short: "AIT",
    domain: "astra.lms.edu",
    plan: "Professional",
    planColor: "bg-blue-50 text-blue-700",
    seatsUsed: 600,
    seatsTotal: 600,
    mrr: "$12,000",
    status: "Active",
    expiry: "2026-09-30",
    adminName: "Dr. Priya Nair",
    adminEmail: "priya.nair@astra.edu",
    country: "India",
    joinedDate: "Jan 2025",
    features: ["Code Execution", "Analytics", "SSO"],
    utilization: 100,
  },
  {
    id: "gtu",
    name: "Global Tech University",
    short: "GTU",
    domain: "gtu.lms.edu",
    plan: "Enterprise",
    planColor: "bg-indigo-50 text-indigo-700",
    seatsUsed: 647,
    seatsTotal: 1200,
    mrr: "$12,800",
    status: "Active",
    expiry: "2027-03-15",
    adminName: "Prof. James Okafor",
    adminEmail: "james.okafor@gtu.edu",
    country: "Nigeria",
    joinedDate: "Mar 2025",
    features: ["Code Execution", "Analytics", "SSO", "Priority Support", "Custom Domain"],
    utilization: 54,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function TenantCard({ tenant }: { tenant: typeof tenants[0] }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="bg-white border border-slate-200 rounded-xl p-6 h-full hover:shadow-lg transition-shadow flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {tenant.short}
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold text-sm leading-tight">{tenant.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Globe className="w-3 h-3 text-slate-400" />
                <span className="text-slate-500 text-xs font-mono">{tenant.domain}</span>
              </div>
            </div>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tenant.planColor}`}>
            {tenant.plan === "Enterprise"
              ? <span className="flex items-center gap-1"><Star className="w-3 h-3" />{tenant.plan}</span>
              : <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{tenant.plan}</span>
            }
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> {tenant.status}
          </span>
          <span className="text-xs text-slate-400">{tenant.country}</span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-slate-500">Seat Utilization</span>
            <span className={`text-xs font-bold ${tenant.utilization >= 90 ? "text-rose-600" : "text-blue-600"}`}>
              {tenant.seatsUsed.toLocaleString()} / {tenant.seatsTotal.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${tenant.utilization >= 90 ? "bg-rose-400" : "bg-blue-500"}`}
              style={{ width: `${tenant.utilization}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">{tenant.utilization}% capacity used</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg px-3 py-2.5">
            <p className="text-xs text-slate-500">MRR</p>
            <p className="text-slate-900 font-bold text-base mt-0.5">{tenant.mrr}</p>
          </div>
          <div className="bg-slate-50 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" /> Expires
            </div>
            <p className="text-slate-900 font-semibold text-sm mt-0.5">{tenant.expiry}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-2">Enabled Features</p>
          <div className="flex flex-wrap gap-1.5">
            {tenant.features.map((f) => (
              <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{f}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Admin Contact</p>
            <p className="text-slate-900 text-xs font-medium mt-0.5">{tenant.adminName}</p>
            <p className="text-slate-500 text-xs">{tenant.adminEmail}</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Manage <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OwnerTenantsPage() {
  const [view, setView] = useState<"card" | "table">("card");

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <PageHeader
          title="Tenant Management"
          description="Manage all provisioned institutions, licenses, and billing."
        />
        <Button onClick={() => {}} className="flex items-center gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Provision New Tenant
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
      >
        {platformStats.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} variants={itemVariants}>
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                <div className={`${s.bg} p-2.5 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium">{s.label}</p>
                  <p className="text-slate-900 font-bold text-xl mt-0.5">{s.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600 text-sm font-medium">{tenants.length} tenants</span>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-600 text-sm font-medium">{tenants.filter((t) => t.status === "Active").length} active</span>
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => setView("card")}
            className={`p-1.5 rounded-md transition-colors ${view === "card" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-1.5 rounded-md transition-colors ${view === "table" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "card" ? (
          <motion.div
            key="card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {tenants.map((t) => (
              <TenantCard key={t.id} tenant={t} />
            ))}
            <motion.div variants={itemVariants}>
              <button className="w-full h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all group">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Provision New Tenant</span>
                <span className="text-xs text-slate-400">Set up a new institution in minutes</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["Institution", "Domain", "Plan", "Seats", "Utilization", "MRR", "Expiry", "Status", ""].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((t, i) => (
                      <tr key={t.id} className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i === tenants.length - 1 ? "border-0" : ""}`}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {t.short}
                            </div>
                            <div>
                              <p className="text-slate-900 font-medium leading-tight">{t.name}</p>
                              <p className="text-slate-400 text-xs">{t.country} · Joined {t.joinedDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-500 font-mono text-xs">{t.domain}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.planColor}`}>{t.plan}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-900 font-semibold whitespace-nowrap">
                          {t.seatsUsed.toLocaleString()}<span className="text-slate-400 font-normal">/{t.seatsTotal.toLocaleString()}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${t.utilization >= 90 ? "bg-rose-400" : "bg-blue-500"}`}
                                style={{ width: `${t.utilization}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${t.utilization >= 90 ? "text-rose-500" : "text-blue-600"}`}>{t.utilization}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-900 font-bold">{t.mrr}</td>
                        <td className="px-5 py-4 text-slate-600 text-xs whitespace-nowrap">{t.expiry}</td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3" /> {t.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors whitespace-nowrap">
                            Manage <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
