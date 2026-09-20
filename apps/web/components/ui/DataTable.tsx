import { ReactNode } from "react";

interface Col<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: Col<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  compact?: boolean;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="border-t border-slate-200">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-3.5 rounded" style={{ width: `${50 + (i * 17) % 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function DataTable<T extends Record<string, any>>({
  columns, data, keyField, loading = false, emptyMessage = "No records found.", emptyIcon, compact = false
}: DataTableProps<T>) {
  const rowH = compact ? "py-2" : "py-3";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-${col.align ?? "left"}`}
                style={col.width ? { width: col.width } : {}}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={columns.length} />)
            : data.length === 0
            ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    {emptyIcon && <div className="opacity-30 mb-1">{emptyIcon}</div>}
                    <p className="text-sm text-slate-500">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )
            : data.map((row) => (
              <tr key={String(row[keyField])} className="border-t border-slate-200 hover:bg-slate-50 transition-colors duration-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 ${rowH} text-slate-900 text-${col.align ?? "left"}`}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
