"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { GraduationCap, TrendingUp, Trophy, Award } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const grades = [
  { course: "Introduction to Programming (CS101)", score: 92, grade: "A", credits: 4, status: "Completed" },
  { course: "Data Structures (CS102)", score: 88, grade: "B+", credits: 4, status: "In Progress" },
  { course: "Machine Learning (CS301)", score: 76, grade: "C+", credits: 3, status: "In Progress" },
  { course: "Operating Systems (CS401)", score: 81, grade: "B", credits: 4, status: "In Progress" },
];

const distribution = [
  { name: "A Grade", value: 1, color: "#10b981" },
  { name: "B Grade", value: 2, color: "#3b82f6" },
  { name: "C Grade", value: 1, color: "#f59e0b" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Academic Grades" description="Your performance across all enrolled courses." breadcrumb={[{ label: "Student" }, { label: "Grades" }]} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg" className="flex items-center gap-5">
          <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl shrink-0"><TrendingUp size={28} /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Cumulative GPA</p>
            <p className="text-3xl font-extrabold text-slate-900">3.6</p>
          </div>
        </Card>
        <Card padding="lg" className="flex items-center gap-5">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl shrink-0"><Trophy size={28} /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Credits Earned</p>
            <p className="text-3xl font-extrabold text-slate-900">15</p>
          </div>
        </Card>
        <Card padding="lg" className="flex items-center gap-5">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl shrink-0"><Award size={28} /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Class Rank</p>
            <p className="text-3xl font-extrabold text-slate-900">14 / 120</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="lg" className="lg:col-span-2">
          <h3 className="font-bold text-slate-900 mb-4">Course Breakdown</h3>
          <div className="space-y-4">
            {grades.map((g, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                  g.grade.startsWith("A") ? "bg-emerald-100 text-emerald-700" :
                  g.grade.startsWith("B") ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                }`}>{g.grade}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{g.course}</p>
                  <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${
                      g.score >= 90 ? "bg-emerald-500" : g.score >= 80 ? "bg-blue-500" : "bg-amber-500"
                    }`} style={{ width: `${g.score}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">{g.score}%</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{g.credits} credits</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="lg">
          <h3 className="font-bold text-slate-900 mb-4">Grade Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {distribution.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </span>
                <span className="font-bold text-slate-900">{d.value} course{d.value > 1 ? "s" : ""}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
