"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "teal";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:   "bg-blue-800 hover:bg-blue-900 text-white border-transparent",
  secondary: "bg-white hover:bg-slate-100 text-slate-900 border-slate-300 hover:border-slate-300",
  ghost:     "bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-transparent",
  danger:    "bg-rose-600/10 hover:bg-rose-600/20 text-rose-600 border-rose-600/20 hover:border-rose-600/40",
  teal:      "bg-teal-600/10 hover:bg-teal-600/20 text-teal-600 border-teal-600/20 hover:border-teal-600/40",
};

const sizes: Record<Size, string> = {
  xs: "h-7 px-2.5 text-[11px] gap-1 rounded-lg font-medium",
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg font-medium",
  md: "h-9 px-4 text-sm gap-2 rounded-lg font-medium",
  lg: "h-10 px-5 text-sm gap-2 rounded-xl font-semibold",
};

export function Button({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, children, disabled, className = "", ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="button"
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...(props as any)}
    >
      {loading ? <Loader2 size={13} className="animate-spin shrink-0" /> : leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
}
