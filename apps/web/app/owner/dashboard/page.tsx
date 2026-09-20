"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Building2, Users, Activity, Database, Plus, ChevronRight } from "lucide-react";

// Removed static TENANTS, we will fetch dynamically

function SeatBar({ used, total, color }: { used: number; total: number; color: string }) {
  const pct = total ? Math.round((used / total) * 100) : 0;
  const level = pct >= 95 ? "critical" : pct >= 85 ? "warning" : "normal";
  const barColor = level === "critical" ? "#FF5C70" : level === "warning" ? "#F4B860" : color;
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
      </div>
      <span className="text-[10px] text-slate-500 tabular-nums whitespace-nowrap">{used}/{total}</span>
    </div>
  );
}

import { useState, useEffect } from "react";

export default function OwnerDashboard() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://astra-lms-demo-api.loca.lt/api/owner/tenants", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } })
      .then(res => res.json())
      .then(data => {
        setTenants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalStudents = tenants.reduce((a, t) => a + t.students, 0);
  const totalSeats    = tenants.reduce((a, t) => a + t.studentLimit, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Control"
        description="Internal owner console — tenant management and platform health"
        breadcrumb={[{ label: "Owner Console" }, { label: "Dashboard" }]}
        action={
          <a href="/owner/tenants/new">
            <Button variant="danger" size="sm" leftIcon={<Plus size={13} />}>
              New Tenant
            </Button>
          </a>
        }
      />

      {/* Platform metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Tenants"        value={tenants.length}    icon={<Building2 size={14} />}   accent="danger"  delay={0} />
        <MetricCard label="Total Students" value={totalStudents}      icon={<Users size={14} />}       accent="blue"    delay={0.04} sub={`of ${totalSeats} seats`} />
        <MetricCard label="Active Jobs"    value={0}                  icon={<Activity size={14} />}    accent="teal"    delay={0.08} />
        <MetricCard label="Platform DB"    value="Online"             icon={<Database size={14} />}    accent="success" delay={0.12} />
      </div>

      {/* Tenant table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="space-y-6">
        
        {/* Mock Notification for Demo Feature 4 */}
        <Card padding="none" className="border-amber-600/20 bg-amber-600/5">
          <div className="px-5 py-3.5 border-b border-amber-600/10 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              Pending Approvals (1)
            </h3>
          </div>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900 mb-1">Astra Institute of Technology</p>
              <p className="text-xs text-slate-500">Requested a <strong className="text-slate-900">Seat Expansion (+50)</strong> due to deficit during bulk import.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Reject</Button>
              <Button variant="primary" size="sm" onClick={() => {
                alert("Simulating approval: DB tenant limit updated to 650!");
              }}>Approve & Invoice</Button>
            </div>
          </div>
        </Card>

        <Card padding="none">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">University Tenants</h3>
            <a href="/owner/tenants" className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-0.5 transition-colors">
              Manage <ChevronRight size={11} />
            </a>
          </div>
          <DataTable
            columns={[
              {
                key: "name", header: "University",
                render: (r) => (
                  <div>
                    <p className="text-sm font-medium text-slate-900">{r.name}</p>
                    <code className="text-[10px] text-slate-500 font-mono">{r.code}</code>
                  </div>
                )
              },
              { key: "status",       header: "Status",   render: (r) => <StatusBadge status={r.status} label={r.status} /> },
              {
                key: "studentSeats", header: "Students",
                render: (r) => <SeatBar used={r.students} total={r.studentLimit} color="#4C7DFF" />
              },
              {
                key: "teacherSeats", header: "Teachers",
                render: (r) => <SeatBar used={r.teachers} total={r.teacherLimit} color="#58D6C5" />
              },
              { key: "lastActive",   header: "Last Active", render: (r) => <span className="text-xs text-slate-500">{r.lastActive}</span> },
              {
                key: "actions", header: "",
                render: () => (
                  <Button variant="ghost" size="xs" rightIcon={<ChevronRight size={11} />}>
                    Manage
                  </Button>
                )
              },
            ]}
            data={loading ? [] : tenants}
            keyField="id"
            compact
          />
        </Card>
      </motion.div>

      {/* System health strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {[
          { label: "PostgreSQL",     status: "Online",  color: "#4CC98A" },
          { label: "WhatsApp Mock",  status: "Active",  color: "#4CC98A" },
          { label: "Queue Workers",  status: "Idle",    color: "#F4B860" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-slate-500">{s.label}</span>
            <span className="ml-auto text-[11px] font-semibold" style={{ color: s.color }}>{s.status}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
