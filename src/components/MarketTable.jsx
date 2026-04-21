import React from 'react';
import { FileCode, AlertCircle, CheckCircle2 } from 'lucide-react';

const MarketTable = ({ results }) => {
  // CRITICAL FIX: Agar results undefined ya null hai toh empty array use karo
  const data = results || [];

  if (data.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
        <FileCode className="mx-auto text-zinc-700 mb-4" size={48} />
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
          No audit data available. Execute a scan to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
        <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
          Asset Risk Inventory
        </h3>
        <span className="text-zinc-500 text-[10px] font-mono">SCANNED_FILES: {data.length}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-sm">
          <thead className="text-zinc-500 border-b border-zinc-800 bg-black/20">
            <tr>
              <th className="p-4 font-medium">FILEPATH</th>
              <th className='"p-4 font-medium'>Language</th>
              <th className="p-4 font-medium">RISK INDEX</th>
              <th className="p-4 text-right font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-zinc-800/50 transition-all group">
                <td className="p-4 text-zinc-300 group-hover:text-white transition-colors">
                  {item.file}
                </td>
                <td className='p-4 font-light font-mono text-zinc-400'><div className=''>
                    PY</div></td>
                <td className={`p-4 font-bold ${item.risk_score > 60 ? 'text-bearish' : 'text-bullish'}`}>
                  {item.risk_score}%
                </td>
                <td className="p-4 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                    item.status.includes('BULLISH') 
                    ? 'bg-bullish/5 text-bullish border-bullish/20' 
                    : 'bg-bearish/5 text-bearish border-bearish/20'
                  }`}>
                    {item.status.includes('BULLISH') ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;