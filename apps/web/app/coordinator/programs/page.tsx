import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { GraduationCap } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Degree Programs" description="Manage degrees, diplomas, and certification tracks." breadcrumb={[{ label: "Coordinator" }, { label: "Programs" }]} />
      <Card padding="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">Program Name</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Duration</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Department</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Credits Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><GraduationCap size={16} className="text-blue-500" /> B.Tech Computer Science</td>
              <td className="px-6 py-4">4 Years</td><td className="px-6 py-4">School of Engineering</td><td className="px-6 py-4 font-mono">160</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><GraduationCap size={16} className="text-blue-500" /> B.Tech Artificial Intelligence</td>
              <td className="px-6 py-4">4 Years</td><td className="px-6 py-4">School of Engineering</td><td className="px-6 py-4 font-mono">165</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
