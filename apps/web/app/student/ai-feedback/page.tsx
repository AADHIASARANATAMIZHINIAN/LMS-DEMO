"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, CheckCircle, AlertTriangle, Lightbulb, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

const MOCK_CODE = `def two_sum(nums, target):
    # Loop through each element
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            # Check if sum matches the target
            if nums[i] + nums[j] == target:
                return [i, j]
                
    return [] # Return empty list if no match
`;

const FEEDBACK_ITEMS = [
  {
    id: 1,
    line: 3,
    type: "warning",
    title: "O(n²) Time Complexity",
    message: "Using nested loops creates an O(n²) time complexity. Consider using a Hash Map to store elements as you iterate, which will reduce the time complexity to O(n).",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  {
    id: 2,
    line: 3,
    type: "suggestion",
    title: "Pythonic Iteration",
    message: "Instead of using `range(len(nums))`, consider using `enumerate(nums)`. It is more Pythonic and gives you direct access to both the index and the value.",
    icon: Lightbulb,
    color: "text-blue-500",
    bg: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 3,
    line: 9,
    type: "success",
    title: "Good Return Practice",
    message: "Returning an empty list when no match is found is a solid practice and prevents NullPointerExceptions in languages that strictly enforce types.",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    borderColor: "border-emerald-200"
  }
];

export default function AIFeedbackPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowFeedback(false);
    
    // Simulate AI processing time
    setTimeout(() => {
      setAnalyzing(false);
      setShowFeedback(true);
    }, 2500);
  };

  const handleReset = () => {
    setAnalyzing(false);
    setShowFeedback(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="AI Code Review"
        description="Get instant, AI-driven feedback on your code submissions."
        breadcrumb={[{ label: "Assessment" }, { label: "AI Feedback", href: "/student/ai-feedback" }]}
        action={
          <div className="flex gap-3">
            <Button variant="secondary" leftIcon={<RotateCcw size={16} />} onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="teal"
              leftIcon={analyzing ? undefined : <Sparkles size={16} />}
              onClick={handleAnalyze}
              loading={analyzing}
              disabled={showFeedback || analyzing}
            >
              {analyzing ? "Analyzing Code..." : "Run AI Review"}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <Card padding="none" className="overflow-hidden flex flex-col border-slate-200">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-slate-400 text-xs font-mono ml-2">two_sum.py</span>
            </div>
          </div>
          <div className="bg-slate-950 p-4 flex-1 overflow-x-auto relative">
            {analyzing && (
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-teal-500/10 pointer-events-none z-10"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
              {MOCK_CODE.split('\n').map((line, i) => (
                <div key={i} className="flex group">
                  <span className="w-8 text-right pr-4 text-slate-600 select-none group-hover:text-slate-500">
                    {i + 1}
                  </span>
                  <span className={analyzing ? "animate-pulse" : ""}>{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
        </Card>

        {/* Feedback Section */}
        <div className="flex flex-col h-full min-h-[500px]">
          <Card padding="md" className="flex-1 flex flex-col h-full bg-slate-50/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Auto-Grader Assistant</h3>
                <p className="text-xs text-slate-500">Powered by GPT-4</p>
              </div>
              {analyzing && (
                <div className="ml-auto">
                  <span className="flex items-center gap-2 text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100 shadow-sm animate-pulse">
                    <Sparkles size={14} />
                    Analyzing your code...
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {!analyzing && !showFeedback && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Bot size={48} className="mb-4 text-slate-300" />
                  <h4 className="text-slate-700 font-medium mb-2">Ready to review</h4>
                  <p className="text-sm max-w-sm">
                    Click the "Run AI Review" button to generate automated line-by-line feedback and optimization suggestions for your code.
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {showFeedback && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm mb-6 flex items-start gap-3 shadow-sm"
                  >
                    <Sparkles size={18} className="shrink-0 mt-0.5 text-teal-600" />
                    <div>
                      <strong>Analysis Complete.</strong> I found 2 areas for improvement and 1 good practice in your solution. See the detailed line-by-line feedback below.
                    </div>
                  </motion.div>

                  {FEEDBACK_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.15 }}
                    >
                      <div className={`p-4 rounded-xl border \${item.borderColor} \${item.bg} shadow-sm relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-20" />
                        <div className="flex gap-3">
                          <div className={`shrink-0 mt-0.5 \${item.color}`}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/60 text-slate-600 border border-black/5">
                                Line {item.line}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
