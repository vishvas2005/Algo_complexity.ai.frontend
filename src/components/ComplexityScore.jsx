import React from 'react';

const ComplexityScore = ({ data }) => {
  if (!data) return null;

  const avgRisk = Math.round(data.reduce((acc, curr) => acc + curr.risk_score, 0) / data.length);
  
  const getStatus = (val) => {
    if (val >= 65) return { label: 'CRITICAL', color: 'text-bearish', complexity: 'HIGH', debt: 'CRITICAL' };
    if (val >= 50) return { label: 'MODERATE', color: 'text-amber-500', complexity: 'MEDIUM', debt: 'MODERATE' };
    return { label: 'HEALTHY', color: 'text-bullish', complexity: 'LOW', debt: 'MINIMAL' };
  };

  const status = getStatus(avgRisk);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (avgRisk / 100) * circumference;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl h-full">
      <h3 className="text-[10px] text-zinc-500 tracking-[0.2em] mb-6 uppercase font-bold">Complexity Score</h3>
      
      <div className="flex items-center gap-8">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-800" />
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" 
              strokeDasharray={circumference} style={{ strokeDashoffset: offset }} strokeLinecap="round" className={`${status.color} transition-all duration-1000`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
            <span className={`text-xl font-black ${status.color}`}>{avgRisk}</span>
            <span className="text-[8px] text-zinc-600 tracking-tighter">/ 100</span>
          </div>
        </div>

        <div className="space-y-3 font-mono">
          <div className={`text-sm font-black tracking-widest ${status.color}`}>{status.label}</div>
          <div className="space-y-1 text-[10px]">
            <div className="text-zinc-500">Complexity <span className="text-zinc-200 font-bold">{status.complexity}</span></div>
            <div className="text-zinc-500">Maintainability <span className="text-zinc-200 font-bold">{avgRisk >= 65 ? 'POOR' : 'FAIR'}</span></div>
            <div className="text-zinc-500">Tech Debt <span className="text-zinc-200 font-bold">{status.debt}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityScore;