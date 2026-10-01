"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trophy, Medal, Crown, TrendingUp, Star, Loader2 } from "lucide-react";

// Fake Demo Data
const LEADERBOARD_DATA = [
  { id: 1, name: "Sarah Jenkins", avatar: "SJ", score: 1450, solved: 142, rank: 1, trend: "up" },
  { id: 2, name: "David Chen", avatar: "DC", score: 1320, solved: 128, rank: 2, trend: "up" },
  { id: 3, name: "Maya Patel", avatar: "MP", score: 1290, solved: 125, rank: 3, trend: "down" },
  { id: 4, name: "Alex Wong", avatar: "AW", score: 1150, solved: 112, rank: 4, trend: "up" },
  { id: 5, name: "Emily Davis", avatar: "ED", score: 1080, solved: 105, rank: 5, trend: "same" },
  { id: 6, name: "Michael Chang", avatar: "MC", score: 1020, solved: 98, rank: 6, trend: "down" },
  { id: 7, name: "Jessica Smith", avatar: "JS", score: 990, solved: 95, rank: 7, trend: "up" },
  { id: 8, name: "You (Student)", avatar: "ME", score: 950, solved: 91, rank: 8, trend: "up", isMe: true },
  { id: 9, name: "Chris Johnson", avatar: "CJ", score: 920, solved: 88, rank: 9, trend: "down" },
  { id: 10, name: "Amanda Lee", avatar: "AL", score: 850, solved: 82, rank: 10, trend: "same" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const rest = LEADERBOARD_DATA.slice(3);

  // Helper for podium styles
  const getPodiumStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-48 bg-gradient-to-t from-yellow-300 via-yellow-400 to-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)] border-yellow-200 z-30";
      case 2:
        return "h-36 bg-gradient-to-t from-slate-300 via-slate-400 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.4)] border-slate-300 z-20";
      case 3:
        return "h-28 bg-gradient-to-t from-orange-300 via-orange-400 to-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.4)] border-orange-300 z-10";
      default:
        return "";
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-100 drop-shadow-md mb-2" />;
      case 2: return <Medal className="w-7 h-7 text-slate-100 drop-shadow-md mb-2" />;
      case 3: return <Medal className="w-6 h-6 text-orange-100 drop-shadow-md mb-2" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-2"
        >
          <Trophy className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          Global Campus Leaderboard
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Compete with your peers, solve problems, and climb the ranks. Top 3 students at the end of the semester win exclusive swags!
        </p>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-2 md:gap-4 mt-12 mb-16 px-4">
        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center relative"
        >
          <div className="mb-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-4 border-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.5)] flex items-center justify-center font-bold text-slate-600 text-xl relative z-20">
              {topThree[1].avatar}
            </div>
            <span className="font-semibold text-slate-700 mt-2 text-sm">{topThree[1].name}</span>
            <span className="text-xs text-slate-500 font-mono">{topThree[1].solved} solved</span>
          </div>
          <div className={`w-24 md:w-32 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-2 ${getPodiumStyle(2)}`}>
            {getMedalIcon(2)}
            <span className="text-3xl font-black text-white/90">2</span>
          </div>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center relative"
        >
          <div className="absolute -top-12 animate-bounce">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-yellow-50 border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center justify-center font-bold text-yellow-600 text-2xl relative z-20">
              {topThree[0].avatar}
            </div>
            <span className="font-bold text-slate-800 mt-2 text-base">{topThree[0].name}</span>
            <span className="text-xs font-bold text-indigo-600 font-mono">{topThree[0].solved} solved</span>
          </div>
          <div className={`w-28 md:w-36 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-2 ${getPodiumStyle(1)}`}>
            {getMedalIcon(1)}
            <span className="text-5xl font-black text-white/95">1</span>
          </div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center relative"
        >
          <div className="mb-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)] flex items-center justify-center font-bold text-orange-600 text-xl relative z-20">
              {topThree[2].avatar}
            </div>
            <span className="font-semibold text-slate-700 mt-2 text-sm">{topThree[2].name}</span>
            <span className="text-xs text-slate-500 font-mono">{topThree[2].solved} solved</span>
          </div>
          <div className={`w-24 md:w-32 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-2 ${getPodiumStyle(3)}`}>
            {getMedalIcon(3)}
            <span className="text-3xl font-black text-white/90">3</span>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Table */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-500" />
            Rankings
          </h2>
          <div className="text-sm text-slate-500">
            Based on Problems Solved
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium text-right">Problems Solved</th>
                <th className="px-6 py-4 font-medium text-right">Total Score</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-slate-100"
            >
              {rest.map((student) => (
                <motion.tr 
                  key={student.id} 
                  variants={itemVariants}
                  className={`hover:bg-slate-50 transition-colors ${student.isMe ? 'bg-indigo-50/40 hover:bg-indigo-50/60' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${student.isMe ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                        {student.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {student.avatar}
                      </div>
                      <span className={`font-medium ${student.isMe ? 'text-indigo-700' : 'text-slate-700'}`}>
                        {student.name}
                      </span>
                      {student.isMe && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-slate-600">
                    {student.solved}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-semibold text-slate-700">
                    {student.score}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
