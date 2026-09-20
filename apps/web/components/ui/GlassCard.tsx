import { motion } from "framer-motion";

export function GlassCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`bg-white/50 backdrop-blur-xl border border-slate-2000 shadow-xl shadow-blue-900/5 rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
