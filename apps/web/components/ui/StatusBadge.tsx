type Status = "active" | "inactive" | "warning" | "danger" | "success" | "pending" | "draft" | "critical" | string;

const map: Record<string, string> = {
  active:   "badge-success",
  success:  "badge-success",
  inactive: "badge-muted",
  draft:    "badge-muted",
  archived: "badge-muted",
  warning:  "badge-warning",
  pending:  "badge-warning",
  danger:   "badge-danger",
  critical: "badge-danger",
  error:    "badge-danger",
  blue:     "badge-accent",
  accent:   "badge-accent",
  teal:     "badge-teal",
};

export function StatusBadge({ status, label, dot = true }: { status: Status; label?: string; dot?: boolean }) {
  const cls = map[status] ?? "badge-muted";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${cls}`}>
      {dot && <span className="w-1 h-1 rounded-full bg-current opacity-70 shrink-0" />}
      {label ?? status}
    </span>
  );
}
