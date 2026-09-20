"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CommandPalette } from "../ui/CommandPalette";
import { Menu, X, Command, LogOut, ChevronDown } from "lucide-react";

export interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface NavGroup {
  group?: string;
  items: NavItemProps[];
}

export interface AppShellProps {
  children: React.ReactNode;
  user: {
    email: string;
    tenantName?: string;
    role: string;
  };
  navGroups: NavGroup[];
  logoLetter: string;
  portalLabel: string;
  accentColor: string;
  breadcrumbs?: string[];
  onLogout: () => void;
  variant?: "default" | "ide";
}

export function AppShell({ children, user, navGroups, logoLetter, portalLabel, breadcrumbs, onLogout, variant = "default" }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const role = user.role as "COORDINATOR" | "TEACHER" | "STUDENT" | "PLATFORM_OWNER";

  // Flatten nav items for the horizontal top bar
  const allItems = navGroups.flatMap(g => g.items);

  if (variant === "ide") {
    return (
      <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
        <div className="shrink-0 h-14 flex items-center justify-between px-6 border-b border-slate-200 bg-white shadow-sm">
          <Link href={`/${role.toLowerCase()}/dashboard`} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            ← Exit Lab
          </Link>
          <div className="font-serif font-bold text-lg text-slate-900 tracking-tight">University LMS</div>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
        <CommandPalette role={role} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Horizontal Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-white text-sm font-bold font-serif shadow-sm">
                {logoLetter}
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-900 text-lg font-bold font-serif tracking-tight">University LMS</span>
                <span className="ml-2 text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">{portalLabel}</span>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center gap-1">
              {allItems.map((item) => {
                const active = pathname === item.href || (item.href.split("/").length > 2 && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      active 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className={`${active ? 'text-blue-800' : 'opacity-70'}`}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))}
                className="hidden lg:flex items-center gap-2 px-3 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 transition-colors"
              >
                <Command size={14} />
                <span className="hidden xl:inline">Search...</span>
                <kbd className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-slate-400">⌘K</kbd>
              </button>

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs uppercase">
                    {user.email.charAt(0)}
                  </div>
                  <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden"
                      >
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                          <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                          {user.tenantName && <p className="text-xs text-slate-500 mt-0.5 truncate">{user.tenantName}</p>}
                        </div>
                        <div className="p-2">
                          <button 
                            onClick={() => { setProfileOpen(false); onLogout(); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-slate-200 bg-white overflow-hidden"
          >
            <nav className="p-4 space-y-1">
              {allItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-800"
                >
                  <span className="opacity-70">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-1 flex flex-col items-center p-6 lg:p-10 w-full max-w-[1400px] mx-auto">
        {/* Academic Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="w-full mb-8">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 tracking-wider uppercase">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  <span className={i === breadcrumbs.length - 1 ? "text-blue-800" : ""}>{crumb}</span>
                </span>
              ))}
            </nav>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Command Palette */}
      <CommandPalette role={role} />
    </div>
  );
}
