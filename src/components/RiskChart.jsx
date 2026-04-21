import React, { useEffect, useRef, useState } from 'react';

const RiskChart = ({ data }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, file: '', risk: 0 });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    const W = container.clientWidth;
    const H = 240; // Thoda bada height for labels
    canvas.width = W;
    canvas.height = H;

    const PAD = { top: 20, right: 30, bottom: 40, left: 50 };
    const cw = W - PAD.left - PAD.right;
    const ch = H - PAD.top - PAD.bottom;
    const n = data.length;

    const getColor = (r) => r >= 65 ? "#ef4444" : r >= 50 ? "#f59e0b" : "#22c55e";

    // --- DRAWING FUNCTION ---
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 1. Draw Y-Axis Percentages & Grid
      const yLines = [0, 25, 50, 75, 100];
      ctx.font = "10px 'Share Tech Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = "#555";
      
      yLines.forEach(v => {
        const y = PAD.top + ch - (v / 100) * ch;
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + cw, y); ctx.stroke();
        ctx.fillText(`${v}%`, PAD.left - 10, y + 3);
      });

      // 2. Map Points
      const step = cw / (n - 1);
      const pts = data.map((d, i) => ({
        x: PAD.left + i * step,
        y: PAD.top + ch - (d.risk_score / 100) * ch,
        risk: d.risk_score,
        file: d.file
      }));

      // 3. Draw Bezier Curves
      ctx.lineWidth = 2.5;
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const grad = ctx.createLinearGradient(p1.x, 0, p2.x, 0);
        grad.addColorStop(0, getColor(p1.risk));
        grad.addColorStop(1, getColor(p2.risk));
        
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const cp1x = p1.x + (p2.x - p1.x) / 2;
        ctx.bezierCurveTo(cp1x, p1.y, cp1x, p2.y, p2.x, p2.y);
        ctx.stroke();
      }

      // 4. Draw Interactive Points
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = getColor(p.risk);
        ctx.fill();
        ctx.strokeStyle = "#050505";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      return pts; // Returning points for hover logic
    };

    const points = draw();

    // --- HOVER LOGIC ---
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Find closest point
      let closest = null;
      let minD = 20; // 20px threshold

      points.forEach(p => {
        const d = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
        if (d < minD) {
          minD = d;
          closest = p;
        }
      });

      if (closest) {
        setTooltip({
          show: true,
          x: closest.x,
          y: closest.y,
          file: closest.file.split('/').pop(), // Sirf filename dikhane ke liye
          risk: closest.risk
        });
      } else {
        setTooltip(prev => ({ ...prev, show: false }));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => setTooltip({ show: false }));

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };

  }, [data]);

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl relative group">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase">
         Volatility Risk Chart — Real-time Analysis
        </span>
      </div>
      
      <div className="relative">
        <canvas ref={canvasRef} className="w-full cursor-crosshair" style={{ display: 'block' }}/>
        
        {/* REACT TOOLTIP (Styled with Tailwind) */}
        {tooltip.show && (
          <div 
            className="absolute pointer-events-none bg-black/90 border border-zinc-700 p-2 rounded shadow-2xl z-50 min-w-[120px]"
            style={{ left: tooltip.x + 15, top: tooltip.y - 40 }}
          >
            <div className="text-[9px] text-amber-500 font-mono truncate max-w-[150px]">{tooltip.file}</div>
            <div className={`text-sm font-black ${tooltip.risk > 50 ? 'text-bearish' : 'text-bullish'}`}>
              {tooltip.risk.toFixed(2)}%
            </div>
            <div className="text-[8px] text-zinc-500 uppercase mt-1">
              Status: {tooltip.risk > 50 ? 'Bearish' : 'Bullish'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskChart;