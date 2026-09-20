"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { BarChart3, Users, Clock, Target } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export default function Page() {
  const performanceTimeline = [
    { week: 'W1', avgScore: 65, submissions: 42 },
    { week: 'W2', avgScore: 70, submissions: 45 },
    { week: 'W3', avgScore: 68, submissions: 48 },
    { week: 'W4', avgScore: 75, submissions: 40 },
    { week: 'W5', avgScore: 82, submissions: 50 },
    { week: 'W6', avgScore: 78, submissions: 52 },
    { week: 'W7', avgScore: 85, submissions: 55 },
  ];

  const skillData = [
    { subject: 'Data Structures', A: 85, fullMark: 100 },
    { subject: 'Algorithms', A: 70, fullMark: 100 },
    { subject: 'Code Quality', A: 90, fullMark: 100 },
    { subject: 'Debugging', A: 65, fullMark: 100 },
    { subject: 'Efficiency', A: 75, fullMark: 100 },
    { subject: 'Syntax', A: 95, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Class Analytics" description="Deep performance insights across your assigned classes." breadcrumb={[{ label: "Teacher" }, { label: "Analytics" }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card padding="lg">
          <div className="flex justify-between items-start mb-2">
            <div><p className="text-sm text-slate-500 font-medium">Average Score</p><p className="text-3xl font-bold mt-1">78%</p></div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded"><BarChart3 size={20} /></div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+5% from last week</p>
        </Card>
        <Card padding="lg">
          <div className="flex justify-between items-start mb-2">
            <div><p className="text-sm text-slate-500 font-medium">Submission Rate</p><p className="text-3xl font-bold mt-1">92%</p></div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded"><Users size={20} /></div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+2% from last week</p>
        </Card>
        <Card padding="lg">
          <div className="flex justify-between items-start mb-2">
            <div><p className="text-sm text-slate-500 font-medium">Avg. Time Spent</p><p className="text-3xl font-bold mt-1">1.2h</p></div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded"><Clock size={20} /></div>
          </div>
          <p className="text-xs text-rose-500 font-medium mt-2">-15m from last week</p>
        </Card>
        <Card padding="lg">
          <div className="flex justify-between items-start mb-2">
            <div><p className="text-sm text-slate-500 font-medium">Test Pass Rate</p><p className="text-3xl font-bold mt-1">84%</p></div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded"><Target size={20} /></div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+8% from last week</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="lg" className="lg:col-span-2">
          <h3 className="font-bold text-sm text-slate-900 mb-6">Class Performance Timeline</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTimeline} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="avgScore" name="Avg Score %" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="submissions" name="Submissions" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card padding="lg">
          <h3 className="font-bold text-sm text-slate-900 mb-2">Skill Breakdown</h3>
          <div className="h-72 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Class Average" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
