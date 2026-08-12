import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Code2, Cpu, Globe } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Source Security Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">How AI Government Scheme Finder Works</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          A citizen-first public platform ensuring 100% verified official government information without third-party blog contamination.
        </p>
      </div>

      {/* CORE RULE HIGHLIGHT */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-slate-900 to-slate-950 space-y-4">
        <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Critical System Enforcement Rule</span>
        </h2>
        <p className="text-xs text-slate-200 leading-relaxed">
          The application MUST NEVER present a scheme, eligibility condition, deadline, benefit, or application link from an unofficial source.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Allowed Trusted Domains Only</span>
            </h4>
            <p className="text-[11px] text-emerald-200/80">
              *.gov.in, *.nic.in, official ministry domains, official state government portals (e.g. ap.gov.in, telangana.gov.in, tn.gov.in).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-1">
            <h4 className="font-bold text-rose-400 flex items-center gap-1">
              <span>🚫 Blocked Sources (Automatic Filtering)</span>
            </h4>
            <p className="text-[11px] text-rose-200/80">
              Blogs, news outlets, social media, private aggregator sites, YouTube videos, and unverified commercial links.
            </p>
          </div>
        </div>
      </div>

      {/* 3 STEP ENGINE WORKFLOW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">1. Gemini AI NL Parser</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Converts freeform citizen speech or text prompts into structured JSON parameters (Age, State, Income, Student status) without altering facts.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">2. Deterministic Rule Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Python eligibility engine compares demographics against official ceiling bounds (Income caps, Age ranges, Categories) with 100% mathematical precision.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">3. Live Portal Validation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dynamic web extraction module performs HTTP health checks to verify that official application links are live and accepting submissions.
          </p>
        </div>

      </div>

    </div>
  );
};
