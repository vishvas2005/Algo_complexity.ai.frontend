import React, { useState, useEffect } from 'react';
import { Auditservice } from '../utlis/api';
import { Terminal, ShieldAlert, Zap, Search } from 'lucide-react';

const Scanner = ({ setAuditData, setLoading, loading }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [statusMsg, setStatusMsg] = useState('SYSTEM READY');

  const loadingSteps = [
    "INITIALIZING CONNECTION...",
    "FETCHING REPOSITORY TREE...",
    "EXTRACTING CODE METRICS...",
    "RUNNING XGBOOST INFERENCE...",
    "GENERATING RISK REPORT..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      let step = 0;
      interval = setInterval(() => {
        setStatusMsg(loadingSteps[step % loadingSteps.length]);
        step++;
      }, 1500);
    } else {
      setStatusMsg('SYSTEM READY');
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAudit = async () => {
    if (!repoUrl) return;
    if (!repoUrl.includes('github.com')) {
      alert("Please enter a valid GitHub URL");
      return;
    }

    setLoading(true);
    try {
      const data = await Auditservice.analyzeRepo(repoUrl);
      setAuditData(data);
    } catch (err) {
      console.error(err);
      setStatusMsg('ERROR: CONNECTION FAILED');
      alert("Backend Offline! Member 2 se bolo 'python main.py' chalao.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-bullish" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            Terminal Status: <span className={loading ? "text-accent" : "text-bullish"}>{statusMsg}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
          <span className="flex items-center gap-1"><ShieldAlert size={10} /> SECURE_SSL</span>
          <span className="flex items-center gap-1"><Zap size={10} /> LATENCY: 24ms</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-yellow-500 group-focus-within:text-bullish transition-colors" />
        </div>
        
        <input 
          type="text" 
          placeholder="PASTE GITHUB REPOSITORY URL..."
          className="w-full border border-zinc-800 p-4 pl-12 pr-40 text-bullish font-mono text-sm outline-none focus:border-bullish/50 focus:ring-1 focus:ring-bullish/20 transition-all placeholder:text-zinc-700"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
          disabled={loading}
        />

        <button 
          onClick={handleAudit}
          disabled={loading || !repoUrl}
          className={`absolute right-2 top-2 bottom-2 px-6 rounded-md font-bold uppercase text-xs tracking-tighter transition-all ${
            loading 
            ? "bg-red-800 text-red-500 cursor-not-allowed" 
            : "bg-orange-400 text-black hover:bg-yellow-400 active:scale-95"
          }`}
        >
          {loading ? "AUDITING..." : "EXECUTE_SCAN"}
        </button>
      </div>

      {!loading && !repoUrl && (
        <p className="text-[10px] text-zinc-500 font-mono text-center">
          Supported: Public Repositories (Python). Recursive scanning enabled by default.
        </p>
      )}
    </div>
  );
};

export default Scanner;