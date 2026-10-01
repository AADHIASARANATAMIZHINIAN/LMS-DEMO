"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  Filter, 
  User,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Mock Data
const FLAGGED_SUBMISSIONS = [
  { id: 1, student1: "Alex Johnson", student2: "Jordan Lee", assignment: "Data Structures Project 3", match: 94, status: "Pending Review" },
  { id: 2, student1: "Sam Smith", student2: "Chris Evans", assignment: "Data Structures Project 3", match: 88, status: "Under Investigation" },
  { id: 3, student1: "Taylor Swift", student2: "Morgan Wallen", assignment: "Intro to Python HW 4", match: 76, status: "Resolved" },
  { id: 4, student1: "Jamie Foxx", student2: "Tom Holland", assignment: "Web Dev Final", match: 72, status: "Pending Review" },
];

export default function PlagiarismPage() {
  const [activeSubmission, setActiveSubmission] = useState(FLAGGED_SUBMISSIONS[0]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Code Forensics Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">AI-powered plagiarism & similarity detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <RefreshCw size={14} />
            Run Global Scan
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Filter size={14} />
            Filter Reports
          </Button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - List of Flagged */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
          <Card className="p-4 bg-white shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle size={16} className="text-orange-500" />
                Flagged Submissions
              </h2>
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                {FLAGGED_SUBMISSIONS.length} alerts
              </span>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search students or assignments..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
              {FLAGGED_SUBMISSIONS.map((sub) => (
                <div 
                  key={sub.id}
                  onClick={() => setActiveSubmission(sub)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeSubmission.id === sub.id 
                      ? 'border-orange-300 bg-orange-50/50' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        sub.match > 90 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {sub.match}%
                      </div>
                      <div className="text-sm font-medium text-slate-700 truncate w-32" title={`${sub.student1} & ${sub.student2}`}>
                        {sub.student1} <span className="text-slate-400 text-xs px-1">vs</span> {sub.student2}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">{sub.assignment}</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded-full ${
                      sub.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                      sub.status === 'Under Investigation' ? 'bg-blue-100 text-blue-700' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {sub.status}
                    </span>
                    <span className="text-slate-400">2h ago</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Deep Dive */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Header Stats */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              {/* Radial Progress Mock */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#f1f5f9" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke={activeSubmission.match > 90 ? "#ef4444" : "#f97316"} 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * activeSubmission.match) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">{activeSubmission.match}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Match</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Similarity Report</h3>
                <p className="text-sm text-slate-500">
                  High degree of structural and syntactic similarity detected between submissions for <span className="font-medium text-slate-700">{activeSubmission.assignment}</span>.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">Submission A</div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{activeSubmission.student1}</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">Submission B</div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{activeSubmission.student2}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="secondary" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  Mark as Academic Dishonesty
                </Button>
                <Button size="sm" variant="secondary" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                  Dismiss Alert
                </Button>
              </div>
            </div>
          </Card>

          {/* Split Screen Diff */}
          <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden rounded-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Code2 size={16} />
                <span className="text-sm font-medium">Side-by-Side Comparison</span>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 divide-x divide-slate-800 h-[400px] overflow-y-auto text-sm font-mono leading-relaxed">
              {/* Left Code */}
              <div className="p-4 text-slate-300">
                <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800 font-sans flex items-center justify-between">
                  <span>{activeSubmission.student1} - main.js</span>
                </div>
                <div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">1</span><span className="text-purple-400">function</span> <span className="text-blue-400">bubbleSort</span>(arr) {'{'}</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">2</span>  <span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = <span className="text-orange-400">0</span>; i {'<'} arr.<span className="text-teal-400">length</span>; i++) {'{'}</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">3</span>    <span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> j = <span className="text-orange-400">0</span>; j {'<'} arr.<span className="text-teal-400">length</span> - i - <span className="text-orange-400">1</span>; j++) {'{'}</div>
                  <div className="py-0.5 bg-orange-900/30 border-l-2 border-orange-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">4</span>      <span className="text-purple-400">if</span> (arr[j] {'>'} arr[j + <span className="text-orange-400">1</span>]) {'{'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">5</span>        <span className="text-slate-500 italic">// Swap elements</span></div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">6</span>        <span className="text-purple-400">let</span> temp = arr[j];</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">7</span>        arr[j] = arr[j + <span className="text-orange-400">1</span>];</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">8</span>        arr[j + <span className="text-orange-400">1</span>] = temp;</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">9</span>      {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">10</span>    {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">11</span>  {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">12</span>  <span className="text-purple-400">return</span> arr;</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">13</span>{'}'}</div>
                </div>
              </div>

              {/* Right Code */}
              <div className="p-4 text-slate-300">
                <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800 font-sans flex items-center justify-between">
                  <span>{activeSubmission.student2} - solution.js</span>
                </div>
                <div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">1</span><span className="text-purple-400">function</span> <span className="text-blue-400">mySort</span>(array) {'{'}</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">2</span>  <span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> x = <span className="text-orange-400">0</span>; x {'<'} array.<span className="text-teal-400">length</span>; x++) {'{'}</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">3</span>    <span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> y = <span className="text-orange-400">0</span>; y {'<'} array.<span className="text-teal-400">length</span> - x - <span className="text-orange-400">1</span>; y++) {'{'}</div>
                  <div className="py-0.5 bg-orange-900/30 border-l-2 border-orange-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">4</span>      <span className="text-purple-400">if</span> (array[y] {'>'} array[y + <span className="text-orange-400">1</span>]) {'{'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">5</span>        <span className="text-slate-500 italic">// swap</span></div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">6</span>        <span className="text-purple-400">let</span> tmp = array[y];</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">7</span>        array[y] = array[y + <span className="text-orange-400">1</span>];</div>
                  <div className="py-0.5 bg-red-900/30 border-l-2 border-red-500 -ml-4 pl-4"><span className="text-slate-600 mr-4 select-none">8</span>        array[y + <span className="text-orange-400">1</span>] = tmp;</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">9</span>      {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">10</span>    {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">11</span>  {'}'}</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">12</span>  <span className="text-purple-400">return</span> array;</div>
                  <div className="py-0.5"><span className="text-slate-600 mr-4 select-none">13</span>{'}'}</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-950 p-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
              <span>Lines matched: 6/13</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Exact Match</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full inline-block"></span> Variable Renamed</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
