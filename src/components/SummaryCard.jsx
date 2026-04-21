import React from 'react';

const SummaryCard = ({ label, value, sub, colorClass, icon: Icon }) => {
  // Mapping for html2canvas to understand colors without oklab errors
  const hexMap = {
    'text-bullish': '#22c55e',
    'text-bearish': '#ef4444',
    'text-white': '#ffffff'
  };

  const bgMap = {
    'text-bullish': 'bg-bullish',
    'text-bearish': 'bg-bearish',
    'text-white': 'bg-zinc-100'
  };

  const currentColor = hexMap[colorClass] || '#e8e8e8';

  return (
    <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-xl group hover:border-zinc-700/80 transition-all duration-300">
      
      {/* Background Subtle Glow Effect - Using standard Tailwind classes */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 opacity-5 blur-2xl rounded-full transition-opacity group-hover:opacity-10 ${bgMap[colorClass] || 'bg-zinc-500'}`} />

      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-zinc-800/30 text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-all duration-300">
            <Icon size={14} />
          </div>
        )}
      </div>

      <div className="space-y-1">
        {/* FIX: Adding Inline Style to bypass oklab parsing error during PDF generation */}
        <div 
          className={`text-3xl font-black font-sans tracking-tight ${colorClass}`}
          style={{ color: currentColor }}
        >
          {value}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Pulsing dot using explicit mapping */}
          <div className={`w-1 h-1 rounded-full animate-pulse ${bgMap[colorClass] || 'bg-zinc-500'}`} />
          <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-medium">
            {sub}
          </span>
        </div>
      </div>

      {/* Decorative Scanner Line at the bottom of card */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </div>
  );
};

export default SummaryCard;