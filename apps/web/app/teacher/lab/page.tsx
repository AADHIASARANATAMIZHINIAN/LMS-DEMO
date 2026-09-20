import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Code2, Play } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Teacher Sandbox" description="Test assignments and reference solutions safely." breadcrumb={[{ label: "Teacher" }, { label: "Lab" }]} />
      <Card padding="none" className="overflow-hidden border-slate-800 bg-[#1e1e1e]">
        <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="text-xs text-slate-400 font-mono">solution.py</div>
          <button className="flex items-center gap-2 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded hover:bg-emerald-700">
            <Play size={12} /> Run Code
          </button>
        </div>
        <div className="p-4 min-h-[400px]">
          <pre className="text-slate-300 font-mono text-sm">
            <code>
{`def solve(root):
    if not root:
        return None
    root.left, root.right = solve(root.right), solve(root.left)
    return root`}
            </code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
