import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode } from "react";

/* ── Text Input ─────────────────────────────────────── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftEl?: ReactNode;
  rightEl?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftEl, rightEl, className = "", ...props }, ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}{props.required && <span className="text-rose-600 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {leftEl && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{leftEl}</span>}
        <input
          ref={ref}
          className={[
            "w-full h-9 px-3 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400",
            "transition-all duration-150 focus:outline-none focus:ring-1",
            error ? "border-rose-600/50 focus:ring-rose-600 focus:border-rose-600"
                  : "border-slate-300 hover:border-slate-300 focus:ring-blue-800 focus:border-blue-800",
            leftEl ? "pl-9" : "",
            rightEl ? "pr-9" : "",
            className,
          ].join(" ")}
          {...props}
        />
        {rightEl && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{rightEl}</span>}
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});

/* ── Select ─────────────────────────────────────────── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, className = "", ...props }, ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>}
      <select
        ref={ref}
        className={[
          "w-full h-9 px-3 text-sm rounded-lg border bg-white text-slate-900",
          "transition-all duration-150 focus:outline-none focus:ring-1",
          error ? "border-rose-600/50 focus:ring-rose-600"
                : "border-slate-300 hover:border-slate-300 focus:ring-blue-800 focus:border-blue-800",
          className,
        ].join(" ")}
        {...props}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
});
