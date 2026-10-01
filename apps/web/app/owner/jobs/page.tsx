"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Mail,
  Database,
  BarChart3,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  AlertCircle,
  RefreshCw,
  Activity,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const jobCards = [
  {
    id: "code-exec",
    title: "Code Execution Workers",
    icon: Cpu,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    status: "Running",
    statusColor: "bg-emerald-50 text-emerald-700",
    statusDot: "bg-emerald-500",
    pulse: true,
    stats: [
      { label: "Active Workers", value: "14", highlight: true },
      { label: "Idle Workers", value: "2", highlight: false },
      { label: "Jobs Today", value: "3,847", highlight: false },
      { label: "Avg Runtime", value: "2.4s", highlight: false },
    ],
    lastRun: "Continuous",
    detail: "Isolated Docker sandbox execution across Python, Java, C++, JavaScript",
  },
  {
    id: "email",
    title: "Email Dispatcher",
    icon: Mail,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    status: "Idle",
    statusColor: "bg-slate-100 text-slate-600",
    statusDot: "bg-slate-400",
    pulse: false,
    stats: [
      { label: "Queue Length", value: "0", highlight: false },
      { label: "Sent Today", value: "142", highlight: false },
      { label: "Failed", value: "0", highlight: false },
      { label: "Avg Latency", value: "340ms", highlight: false },
    ],
    lastRun: "4 minutes ago",
    detail: "Transactional emails — grade alerts, OTP, enrollment confirmations",
  },
  {
    id: "db-backup",
    title: "Database Backup",
    icon: Database,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    status: "Scheduled",
    statusColor: "bg-amber-50 text-amber-700",
    statusDot: "bg-amber-500",
    pulse: false,
    stats: [
      { label: "Last Backup", value: "2h ago", highlight: false },
      { label: "Next Backup", value: "22h", highlight: false },
      { label: "Backup Size", value: "4.2 GB", highlight: false },
      { label: "Retention", value: "30 days", highlight: false },
    ],
    lastRun: "Today at 07:00 AM",
    detail: "Full PostgreSQL snapshot to S3-compatible object storage — encrypted at rest",
  },
  {
    id: "report-gen",
    title: "Report Generator",
    icon: BarChart3,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    status: "Idle",
    statusColor: "bg-slate-100 text-slate-600",
    statusDot: "bg-slate-400",
    pulse: false,
    stats: [
      { label: "Status", value: "Idle", highlight: false },
      { label: "Last Run", value: "Yesterday", highlight: false },
      { label: "Reports", value: "18 total", highlight: false },
      { label: "Formats", value: "PDF, CSV", highlight: false },
    ],
    lastRun: "Yesterday at 11:00 PM",
    detail: "Automated tenant analytics, grade distributions, and billing summaries",
  },
];

const recentLogs = [
  {
    id: "LOG-4821",
    time: "09:48:12 AM",
    job: "Code Execution Worker",
    tenant: "Astra Institute of Technology",
    type: "code_exec",
    duration: "1.8s",
    status: "Success",
  },
  {
    id: "LOG-4820",
    time: "09:47:55 AM",
    job: "Email Dispatcher",
    tenant: "Global Tech University",
    type: "email",
    duration: "312ms",
    status: "Success",
  },
  {
    id: "LOG-4819",
    time: "09:45:03 AM",
    job: "Code Execution Worker",
    tenant: "Global Tech University",
    type: "code_exec",
    duration: "4.2s",
    status: "Success",
  },
  {
    id: "LOG-4818",
    time: "09:40:17 AM",
    job: "Database Backup",
    tenant: "Platform",
    type: "backup",
    duration: "8m 34s",
    status: "Success",
  },
  {
    id: "LOG-4817",
    time: "09:32:44 AM",
    job: "Report Generator",
    tenant: "Astra Institute of Technology",
    type: "report",
    duration: "22.1s",
    status: "Success",
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

function TypeIcon({ type }: { type: string }) {
  if (type === "code_exec") return <Cpu className="w-3.5 h-3.5 text-blue-500" />;
  if (type === "email") return <Mail className="w-3.5 h-3.5 text-indigo-500" />;
  if (type === "backup") return <Database className="w-3.5 h-3.5 text-amber-500" />;
  return <BarChart3 className="w-3.5 h-3.5 text-violet-500" />;
}

export default function OwnerJobsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <PageHeader
          title="System Jobs"
          description="Monitor background workers, schedulers, and queued tasks across the platform."
        />
        <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shrink-0">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 bg-white border border-slate-200 rounded-xl px-5 py-3.5 mb-8 flex-wrap"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600 text-sm font-medium">System Health</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-1">
            <CheckCircle2 className="w-3 h-3" /> All Systems Nominal
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Play className="w-3.5 h-3.5 text-emerald-500" />
          <span><strong className="text-slate-900">1</strong> running</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span><strong className="text-slate-900">1</strong> scheduled</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Pause className="w-3.5 h-3.5 text-slate-400" />
          <span><strong className="text-slate-900">2</strong> idle</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span><strong className="text-slate-900">0</strong> failed</span>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
      >
        {jobCards.map((job) => {
          const Icon = job.icon;
          return (
            <motion.div key={job.id} variants={itemVariants} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 h-full hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className={`${job.iconBg} p-2.5 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${job.iconColor}`} />
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${job.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${job.statusDot} ${job.pulse ? "animate-pulse" : ""}`} />
                    {job.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-slate-900 font-semibold text-sm">{job.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{job.detail}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {job.stats.map((stat) => (
                    <div key={stat.label} className="bg-slate-50 rounded-lg px-2.5 py-2">
                      <p className="text-xs text-slate-500">{stat.label}</p>
                      <p className={`font-bold text-sm mt-0.5 ${stat.highlight ? "text-blue-600" : "text-slate-900"}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Last run: <span className="text-slate-700 font-medium">{job.lastRun}</span></span>
                  </div>
                  <button className="flex items-center gap-0.5 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Logs <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-slate-900 font-semibold text-base">Recent Job Logs</h2>
              <p className="text-slate-500 text-sm mt-0.5">Latest 5 completed job executions across all workers</p>
            </div>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
              View all logs <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Log ID", "Time", "Job Type", "Tenant", "Duration", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log, i) => (
                  <tr
                    key={log.id}
                    className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i === recentLogs.length - 1 ? "border-0" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{log.id}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-xs whitespace-nowrap">{log.time}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon type={log.type} />
                        <span className="text-slate-900 font-medium text-sm">{log.job}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-sm">{log.tenant}</td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">{log.duration}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit text-emerald-700 bg-emerald-50">
                        <CheckCircle2 className="w-3 h-3" /> {log.status}
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
  );
}
