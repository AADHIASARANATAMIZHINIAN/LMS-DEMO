"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle2, ChevronRight, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function NewTenantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "Astra Institute of Technology",
    domain: "astra.edu",
    studentLimit: 600,
    teacherLimit: 30,
    coordinatorLimit: 3,
    coordinatorName: "Dr. Srinivasan",
    coordinatorEmail: "coord@astra.edu",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate delay for demo effect
    await new Promise(res => setTimeout(res, 1200));

    try {
      const res = await fetch("http://localhost:3001/api/owner/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to create tenant");
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/owner/dashboard");
      }, 2000);
    } catch (err) {
      alert("Error creating tenant");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-16 h-16 bg-emerald-600/10 border border-emerald-600/20 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Tenant Successfully Created</h2>
          <p className="text-sm text-slate-500">
            Provisioned <strong>{formData.studentLimit}</strong> seats for {formData.name}.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Provision University"
        description="Create a new multi-tenant environment and allocate seats."
        breadcrumb={[{ label: "Owner Console" }, { label: "Tenants" }, { label: "New" }]}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card padding="lg">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Institutional Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              label="University Name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              label="Tenant Domain" 
              value={formData.domain}
              onChange={e => setFormData({...formData, domain: e.target.value})}
              required
            />
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-sm font-bold text-slate-900 mb-4">License & Seat Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input 
              type="number"
              label="Student Seats" 
              value={formData.studentLimit.toString()}
              onChange={e => setFormData({...formData, studentLimit: parseInt(e.target.value) || 0})}
              required
            />
            <Input 
              type="number"
              label="Teacher Seats" 
              value={formData.teacherLimit.toString()}
              onChange={e => setFormData({...formData, teacherLimit: parseInt(e.target.value) || 0})}
              required
            />
            <Input 
              type="number"
              label="Coordinator Seats" 
              value={formData.coordinatorLimit.toString()}
              onChange={e => setFormData({...formData, coordinatorLimit: parseInt(e.target.value) || 0})}
              required
            />
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Primary Coordinator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              label="Full Name" 
              value={formData.coordinatorName}
              onChange={e => setFormData({...formData, coordinatorName: e.target.value})}
              required
            />
            <Input 
              type="email"
              label="Email Address" 
              value={formData.coordinatorEmail}
              onChange={e => setFormData({...formData, coordinatorEmail: e.target.value})}
              required
            />
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <a href="/owner/dashboard">
            <Button variant="ghost">Cancel</Button>
          </a>
          <Button type="submit" variant="danger" disabled={loading} leftIcon={<Save size={14} />}>
            {loading ? "Provisioning..." : "Create Tenant"}
          </Button>
        </div>
      </form>
    </div>
  );
}
