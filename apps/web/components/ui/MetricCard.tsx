import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  accent?: "blue" | "teal" | "success" | "warning" | "danger";
  delta?: { value: number; label?: string };
  delay?: number;
}

const accents: Record<string, { text: string; bg: string }> = {
  blue:    { text: "#4C7DFF", bg: "rgba(76,125,255,0.10)" },
  teal:    { text: "#58D6C5", bg: "rgba(88,214,197,0.10)" },
  success: { text: "#4CC98A", bg: "rgba(76,201,138,0.10)" },
  warning: { text: "#F4B860", bg: "rgba(244,184,96,0.10)" },
  danger:  { text: "#FF5C70", bg: "rgba(255,92,112,0.10)" },
};

export function MetricCard({ label, value, sub, icon, accent = "blue", delta, delay = 0 }: MetricCardProps) {
  const a = accents[accent];
  const positive = delta && delta.value > 0;
  const negative = delta && delta.value < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 tracking-wide">{label}</span>
        {icon && (
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: a.bg, color: a.text }}
          >
            {icon}
          </span>
        )}
      </div>

      <div>
        <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</span>
        {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
      </div>

      {delta && (
        <div className={`text-[11px] font-medium flex items-center gap-1 ${positive ? "text-emerald-600" : negative ? "text-rose-600" : "text-slate-500"}`}>
          <span>{positive ? "↑" : negative ? "↓" : "—"}</span>
          <span>{Math.abs(delta.value)}{delta.label ?? "%"} vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
