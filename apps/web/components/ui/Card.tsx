import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  hover?: boolean;
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  as?: "div" | "article" | "section";
}

const padMap = { none: "", xs: "p-3", sm: "p-4", md: "p-5", lg: "p-6" };

export function Card({ children, className = "", elevated = false, hover = false, padding = "md", onClick, as: Tag = "div" }: CardProps) {
  const base = [
    "rounded-xl border transition-colors duration-150",
    elevated ? "bg-white border-slate-200" : "bg-white border-slate-200",
    hover && "hover:border-slate-300 hover:bg-white cursor-pointer",
    padMap[padding],
    className,
  ].filter(Boolean).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={base}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function CardDivider() {
  return <div className="border-t border-slate-200 -mx-5 my-4" />;
}

export function CardLabel({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">{children}</p>;
}
