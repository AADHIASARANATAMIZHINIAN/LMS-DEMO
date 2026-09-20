import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { GraduationCap, TrendingUp, Trophy } from "lucide-react";

export default function Page() {
  const grades = [
    { course: "Data Structures (CS102)", score: 92, grade: "A", status: "Excellent" },
    { course: "Machine Learning (CS301)", score: 88, grade: "B+", status: "Good" },
    { course: "Operating Systems (CS401)", score: 76, grade: "C", status: "Average" }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Academic Grades" description="View your performance across all enrolled courses." breadcrumb={[{ label: "Student" }, { label: "Grades" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp size={24} /></div>
          <div><p className="text-sm text-slate-500">Cumulative GPA</p><p className="text-2xl font-bold">3.6</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Trophy size={24} /></div>
          <div><p className="text-sm text-slate-500">Total Credits</p><p className="text-2xl font-bold">42</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><GraduationCap size={24} /></div>
          <div><p className="text-sm text-slate-500">Class Rank</p><p className="text-2xl font-bold">14th / 120</p></div>
        </Card>
      </div>
      <Card padding="none" className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">Course</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Score</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Grade</th>
              <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {grades.map((g, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-slate-900">{g.course}</td>
                <td className="px-6 py-4">{g.score}%</td>
                <td className="px-6 py-4 font-bold">{g.grade}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-xs">{g.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
