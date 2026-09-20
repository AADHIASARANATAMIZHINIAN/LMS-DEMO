"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { LineChart, BarChart, Users, BookOpen } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart as RechartsBarChart, Bar
} from 'recharts';

export default function Page() {
  const enrollmentData = [
    { year: '2020', students: 400 },
    { year: '2021', students: 600 },
    { year: '2022', students: 450 },
    { year: '2023', students: 800 },
    { year: '2024', students: 750 },
    { year: '2025', students: 900 },
    { year: '2026', students: 1100 },
  ];

  const departmentData = [
    { name: 'Computer Sci', rate: 92 },
    { name: 'Electrical Eng', rate: 85 },
    { name: 'Mathematics', rate: 78 },
    { name: 'Physics', rate: 88 },
    { name: 'Business', rate: 95 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Institution Analytics" description="High-level metrics and historical trends for all departments." breadcrumb={[{ label: "Coordinator" }, { label: "Analytics" }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card padding="lg" className="flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-3"><Users size={24} /></div>
          <h4 className="text-3xl font-bold text-slate-900">1,100</h4>
          <p className="text-sm text-slate-500 mt-1">Total Enrolled Students</p>
        </Card>
        <Card padding="lg" className="flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-3"><BookOpen size={24} /></div>
          <h4 className="text-3xl font-bold text-slate-900">42</h4>
          <p className="text-sm text-slate-500 mt-1">Active Courses</p>
        </Card>
        <Card padding="lg" className="col-span-1 md:col-span-2">
          <h3 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2"><BarChart size={16} className="text-blue-500"/> Department Success Rates</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={departmentData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <h3 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2"><LineChart size={16} className="text-indigo-500"/> Historical Enrollment Trends</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
