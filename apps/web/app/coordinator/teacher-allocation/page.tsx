import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Teacher Allocation" description="Assign faculty members to specific courses and sections." breadcrumb={[{ label: "Coordinator" }, { label: "Teacher Allocation" }]} />
      <Card padding="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">Course Code</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Course Name</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Section</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Assigned Faculty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-xs">CS102</td><td className="px-6 py-4 font-medium">Data Structures</td><td className="px-6 py-4">Class II-B</td>
              <td className="px-6 py-4">
                <select className="border border-slate-200 rounded px-2 py-1 text-xs">
                  <option>Alan Turing</option>
                  <option>Ada Lovelace</option>
                </select>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-xs">CS301</td><td className="px-6 py-4 font-medium">Machine Learning</td><td className="px-6 py-4">Class III-A</td>
              <td className="px-6 py-4">
                <select className="border border-slate-200 rounded px-2 py-1 text-xs">
                  <option>Grace Hopper</option>
                  <option>Alan Turing</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end"><Button size="sm">Save Allocations</Button></div>
      </Card>
    </div>
  );
}
