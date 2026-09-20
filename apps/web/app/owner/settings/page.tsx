"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Database, Server, CheckCircle2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OwnerSettingsPage() {
  const [resetting, setResetting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const handleReset = () => {
    if (!confirm("Are you sure you want to reset the presentation environment? This will wipe all modifications made during the demo.")) return;
    
    setResetting(true);
    setResetComplete(false);

    // Simulate DB wipe and re-seed
    setTimeout(() => {
      setResetting(false);
      setResetComplete(true);
      
      setTimeout(() => {
        setResetComplete(false);
      }, 5000);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader 
        title="Platform Management" 
        description="Global settings, platform health, and demonstration controls."
        breadcrumb={[{ label: "Owner Console" }, { label: "Settings" }]} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Platform Health */}
        <Card padding="lg" className="border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Server size={18} className="text-emerald-600" />
            Platform Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-500">Database Connection</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">
                <CheckCircle2 size={12} /> Healthy
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-500">Execution Sandbox (Code Engine)</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">
                <CheckCircle2 size={12} /> Healthy
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-500">AI Translation Engine</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">
                <CheckCircle2 size={12} /> Healthy
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-500">WhatsApp API Gateway</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-600/10 px-2 py-0.5 rounded">
                Simulated
              </span>
            </div>
          </div>
        </Card>

        {/* Demo Controls */}
        <Card padding="lg" className="border-rose-600/20 bg-rose-600/5">
          <h3 className="text-lg font-bold text-rose-600 mb-6 flex items-center gap-2">
            <Database size={18} />
            Demo Presentation Controls
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Use this to safely reset the presentation environment back to its deterministic seed state between vendor demos. This will drop all created tenants, classes, and analytics, and re-inject the baseline Astra Institute of Technology data.
          </p>

          <div className="p-4 bg-white rounded-lg border border-rose-600/10 mb-6">
            <div className="flex gap-3">
              <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Warning:</strong> This action is instantaneous in the demo environment but simulates a full database truncation. Do not click during an active presentation.
              </div>
            </div>
          </div>

          <Button 
            variant="danger" 
            className="w-full justify-center"
            onClick={handleReset}
            disabled={resetting || resetComplete}
            leftIcon={resetting ? <RotateCcw size={16} className="animate-spin" /> : <RotateCcw size={16} />}
          >
            {resetting ? "Rebuilding Seed Database..." : resetComplete ? "Demo Reset Successful" : "Factory Reset Demo Environment"}
          </Button>

          <AnimatePresence>
            {resetComplete && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-center text-xs text-emerald-600 font-bold"
              >
                Database truncated and deterministic seed injected successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

      </div>
    </div>
  );
}
