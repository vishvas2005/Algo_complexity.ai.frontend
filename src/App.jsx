import React, { useState } from "react";
import Scanner from "./components/Scanner";
import MarketTable from "./components/MarketTable";
import RiskChart from "./components/RiskChart";
import RiskDistribution from "./components/RiskDistribution";
import ComplexityScore from "./components/ComplexityScore";
import { Activity, ShieldCheck, Zap, Globe, Download, Terminal } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Summary Card Component
const SummaryCard = ({ label, value, sub, colorClass, icon: Icon }) => (
  <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-lg group hover:border-zinc-700 transition-all">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{label}</span>
      <Icon size={14} className="text-zinc-600 group-hover:text-bullish transition-colors" />
    </div>
    <div className={`text-2xl font-black ${colorClass}`}>{value}</div>
    <div className="text-[9px] text-zinc-600 mt-1 uppercase tracking-tighter">{sub}</div>
  </div>
);

function App() {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);


  const getStats = () => {
    if (!auditData?.audit_results || auditData.audit_results.length === 0) {
      return { avg: "0", files: 0, critical: 0, safe: 0 };
    }
    const results = auditData.audit_results;
    const totalRisk = results.reduce((acc, curr) => acc + (Number(curr.risk_score) || 0), 0);
    const avgValue = (totalRisk / results.length).toFixed(1);
    const critical = results.filter((f) => f.risk_score > 70).length;
    const safe = results.filter((f) => f.risk_score <= 50).length;
    return { avg: avgValue, files: results.length, critical, safe };
  };

  const stats = getStats();



  return (
    <div className="min-h-screen bg-[#050505] text-[#e8e8e8] p-6 md:p-12 font-mono selection:bg-bullish selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800/50 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-4xl font-black tracking-tighter">
              ALGO_COMPLEXITY<span className="text-bullish">.AI</span>
              </h1>
            </div>
            <p className="text-zinc-500 text-[10px] mt-2 tracking-[0.3em] uppercase opacity-70">
              Quantitative Risk Analysis Terminal &nbsp;|&nbsp; v2.0.1
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Lead Developer</p>
              <p className="text-bullish text-sm font-black italic">Vishvas Gupta900</p>
            </div>
                      </div>
        </header>

        {/* --- SCANNER --- */}
        <section className="bg-zinc-900/20 p-1 rounded-xl border border-zinc-800/30">
          <Scanner setAuditData={setAuditData} setLoading={setLoading} loading={loading} />
        </section>

        {/* --- REPORT CONTENT --- */}
        <div id="audit-report" className="space-y-8 py-4">
          {auditData && !loading && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                  <SummaryCard label="Portfolio Risk" value={`${stats.avg}%`} sub="AVG_COMPLEXITY" colorClass={parseFloat(stats.avg) > 50 ? "text-bearish" : "text-bullish"} icon={Activity} />
                  <SummaryCard label="Assets Scanned" value={stats.files} sub="TOTAL_FILES" colorClass="text-white" icon={Globe} />
                  <SummaryCard label="Critical Risk" value={stats.critical} sub="SCORE_GT_70" colorClass="text-bearish" icon={ShieldCheck} />
                  <SummaryCard label="Stable Assets" value={stats.safe} sub="OPTIMIZED_CODE" colorClass="text-bullish" icon={Zap} />
                </div>
                <div className="lg:col-span-2">
                  <RiskChart data={auditData.audit_results} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RiskDistribution data={auditData.audit_results} />
                <ComplexityScore data={auditData.audit_results} />
              </div>
            </>
          )}

          <section className={loading ? "opacity-20" : "opacity-100"}>
            <MarketTable results={auditData?.audit_results} />
          </section>
        </div>

        {/* --- FOOTER --- */}
        <footer className="pt-12 pb-4 text-center border-t border-zinc-900">
          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
            &copy; 2026 CODE_AUDIT_LABS // Lead Dev: Vishvas Gupta900
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;