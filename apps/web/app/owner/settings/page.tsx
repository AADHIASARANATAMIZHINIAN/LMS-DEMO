"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Shield, Bell, Globe, Key } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Platform Settings" description="Configure global security and system preferences." breadcrumb={[{ label: "Owner" }, { label: "Settings" }]} />

      {[
        {
          icon: Shield, color: "text-indigo-600 bg-indigo-50", label: "Security",
          fields: [
            { label: "Session Timeout (minutes)", type: "number", value: "60" },
            { label: "Allowed IP Ranges", type: "text", value: "0.0.0.0/0" },
          ]
        },
        {
          icon: Globe, color: "text-blue-600 bg-blue-50", label: "Platform Identity",
          fields: [
            { label: "Platform Name", type: "text", value: "Astra LMS Platform" },
            { label: "Support Email", type: "email", value: "support@astra.edu" },
          ]
        },
        {
          icon: Bell, color: "text-amber-600 bg-amber-50", label: "Notifications",
          fields: [
            { label: "Webhook URL (Slack/Teams)", type: "url", value: "" },
          ]
        },
      ].map((section, i) => (
        <Card key={i} padding="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${section.color}`}><section.icon size={18} /></div>
            <h3 className="font-bold text-slate-900 text-base">{section.label}</h3>
          </div>
          <div className="space-y-4">
            {section.fields.map((f, j) => (
              <div key={j}>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                <input type={f.type} defaultValue={f.value} className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div className="flex justify-end gap-3">
        <Button variant="secondary">Discard</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  );
}
