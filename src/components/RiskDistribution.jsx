import React from 'react';

const RiskDistribution = ({ data }) => {
  if (!data) return null;

  const total = data.length;
  const high = data.filter(d => d.risk_score >= 65).length;
  const mid = data.filter(d => d.risk_score >= 50 && d.risk_score < 65).length;
  const low = data.filter(d => d.risk_score < 50).length;

  const maxRiskFile = data.reduce((prev, current) => (prev.risk_score > current.risk_score) ? prev : current);

  // HEX mapping for html2canvas compatibility
  const hexMap = {
    "text-bearish": "#ef4444",
    "text-amber-500": "#f59e0b",
    "text-bullish": "#22c55e"
  };

  const Bar = ({ label, count, colorClass, width }) => (
    <div className="space-y-1 mb-4">
      <div className="flex justify-between text-[10px] font-mono">
        <span className="text-zinc-500">{label}</span>
        {/* Force HEX color for text */}
        <span className={colorClass} style={{ color: hexMap[colorClass] }}>
          {count} files
        </span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        {/* Force HEX color for background bars */}
        <div 
          className={`h-full transition-all duration-1000`} 
          style={{ 
            width: `${width}%`, 
            backgroundColor: hexMap[colorClass] 
          }} 
        />
      </div>
    </div>
  );

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl h-full">
      <h3 className="text-[10px] text-zinc-500 tracking-[0.2em] mb-6 uppercase font-bold">Risk Distribution</h3>
      
      <Bar label="HIGH (≥65%)" count={high} colorClass="text-bearish" width={(high/total)*100} />
      <Bar label="MED (50-64%)" count={mid} colorClass="text-amber-500" width={(mid/total)*100} />
      <Bar label="LOW (<50%)" count={low} colorClass="text-bullish" width={(low/total)*100} />

      <div className="mt-8 pt-4 border-t border-zinc-800 space-y-2 font-mono text-[10px]">
        <div className="flex justify-between uppercase">
          <span className="text-zinc-500">Max Risk File</span>
          {/* Explicit HEX for the filename too */}
          <span className="text-bearish" style={{ color: '#ef4444' }}>
            {maxRiskFile.file.split('/').pop()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskDistribution;