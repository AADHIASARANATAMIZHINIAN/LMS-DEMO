"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Users, BookOpen, Loader2 } from "lucide-react";

export default function Page() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("https://astra-lms-demo-api.loca.lt/api/teacher/classes", { credentials: "include", headers: { "Bypass-Tunnel-Reminder": "true" } });
      if (res.ok) setClasses(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Classes" description="Classes assigned to you for this term." breadcrumb={[{ label: "Faculty" }, { label: "Classes" }]} />
      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
      ) : classes.length === 0 ? (
        <Card><div className="p-12 text-center text-slate-500">No classes assigned yet.</div></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c) => (
            <Card key={c.id} className="hover:border-blue-800/30 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{c.course?.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{c.course?.code} • {c.term}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-800">
                  <BookOpen size={18} />
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5"><Users size={14} className="text-slate-400" /> {c.class?.name}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
