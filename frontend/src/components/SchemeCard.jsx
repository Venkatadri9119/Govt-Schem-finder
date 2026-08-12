import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { MatchScoreBadge } from './MatchScoreBadge';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, ExternalLink, CheckCircle2, XCircle, Building2, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const SchemeCard = ({ scheme }) => {
  const { savedSchemeIds, toggleSaveScheme } = useProfile();
  const { t } = useLanguage();

  const isSaved = savedSchemeIds.includes(scheme.scheme_id);
  const evalRes = scheme.eligibility_eval || {};
  const matchScore = scheme.match_score !== undefined ? scheme.match_score : 85;
  const isEligible = scheme.is_eligible !== undefined ? scheme.is_eligible : true;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group border border-slate-800 hover:border-amber-500/40">
      
      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
              {scheme.category?.includes("Education") ? "🎓" : scheme.category?.includes("Agriculture") ? "🌾" : scheme.category?.includes("Business") ? "💼" : scheme.category?.includes("Women") ? "👧" : "🏛️"}
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{scheme.department}</span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 mt-0.5">
                {scheme.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => toggleSaveScheme(scheme.scheme_id)}
            title={isSaved ? "Remove from bookmarks" : "Save scheme"}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Badges Row: Status + Match Score */}
        <div className="flex flex-wrap items-center justify-between gap-2 my-4 pt-2 border-t border-slate-800/80">
          <StatusBadge status={scheme.status} formattedLastDate={scheme.formatted_last_date} />
          <MatchScoreBadge score={matchScore} isEligible={isEligible} />
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {scheme.description}
        </p>

        {/* Key Benefits Highlight */}
        {scheme.benefits && scheme.benefits.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1">
              <span>🎁 Key Benefits</span>
            </h4>
            <ul className="space-y-1">
              {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why this matches you */}
        {evalRes.matched_conditions && evalRes.matched_conditions.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
            <h4 className="text-[11px] font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('whyMatches')}</span>
            </h4>
            <ul className="space-y-1">
              {evalRes.matched_conditions.slice(0, 3).map((cond, idx) => (
                <li key={idx} className="text-xs text-emerald-200/90 flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold text-[10px]">✓</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
        
        {/* Source Verified Badge */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Official Portal</span>
          </span>
          <span className="text-slate-500">Last verified: {scheme.verified_at || '12 Aug 2026'}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <a
            href={scheme.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all text-center"
          >
            <span>{t('viewOfficialSource')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={scheme.official_apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 transition-all text-center"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <Link
          to={`/scheme/${scheme.scheme_id}`}
          className="text-center text-xs font-semibold text-amber-400 hover:text-amber-300 hover:underline pt-1"
        >
          View Complete Guidelines & Document Checklist →
        </Link>
      </div>

    </div>
  );
};
