import React from 'react';
import { ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-slate-200 text-sm">AI Government Scheme Finder</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Designed to empower Indian citizens to access genuine central and state government benefits accurately. All schemes are strictly verified against official government portals (*.gov.in, *.nic.in).
          </p>
          <div className="mt-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium">
            ✓ Unofficial blogs, news portals & social media links are strictly blocked.
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider">Official Government Portals</h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                <span>myScheme Portal (myscheme.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                <span>National Scholarship Portal (scholarships.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                <span>PM-KISAN Portal (pmkisan.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                <span>National Portal of India (india.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider">System Policy & Security</h4>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Eligibility calculations are evaluated using deterministic Python rule-engine checks based on official guidelines published by Ministries.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span>Built with</span>
            <Heart className="w-4 h-4 fill-current text-rose-500" />
            <span>for Citizens across India</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>© 2026 AI Government Scheme Finder • Verified Public Digital Infrastructure</p>
        <p className="text-slate-500">Last Verified Sync: 12 August 2026</p>
      </div>
    </footer>
  );
};
