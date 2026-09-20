import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  action?: ReactNode;
  meta?: ReactNode;
}

export function PageHeader({ title, description, breadcrumb, action, meta }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-1 text-[11px] text-slate-500 mb-2 font-medium" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-slate-400">/</span>}
              {crumb.href
                ? <a href={crumb.href} className="hover:text-slate-500 transition-colors uppercase tracking-widest">{crumb.label}</a>
                : <span className="text-slate-500 uppercase tracking-widest">{crumb.label}</span>
              }
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{description}</p>}
          {meta && <div className="mt-2">{meta}</div>}
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
