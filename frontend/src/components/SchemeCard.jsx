import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { MatchScoreBadge } from './MatchScoreBadge';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, ExternalLink, CheckCircle2, Building2, ArrowRight, ShieldCheck } from 'lucide-react';

export const SchemeCard = ({ scheme }) => {
  const { savedSchemeIds, toggleSaveScheme } = useProfile();
  const { t } = useLanguage();

  const isSaved = savedSchemeIds.includes(scheme.scheme_id);
  const evalRes = scheme.eligibility_eval || {};
  const matchScore = scheme.match_score !== undefined ? scheme.match_score : 85;
  const isEligible = scheme.is_eligible !== undefined ? scheme.is_eligible : true;

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative group border border-slate-800/80 hover:border-pink-500/50 w-full overflow-hidden transition-all duration-300">
      
      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0 shadow-inner">
              {scheme.category?.includes("Education") ? "🎓" : scheme.category?.includes("Agriculture") ? "🌾" : scheme.category?.includes("Business") ? "💼" : scheme.category?.includes("Women") ? "👧" : "🏛️"}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium truncate">
                <Building2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="truncate">{scheme.department}</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-pink-300 transition-colors line-clamp-2 mt-0.5 leading-snug">
                {scheme.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => toggleSaveScheme(scheme.scheme_id)}
            title={isSaved ? "Remove from bookmarks" : "Save scheme"}
            className={`p-2.5 rounded-2xl border transition-all shrink-0 ${
              isSaved
                ? 'insta-gradient-bg text-white border-pink-400 shadow-lg shadow-pink-500/25'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Badges Row: Status + Match Score */}
        <div className="flex flex-wrap items-center justify-between gap-2 my-3 pt-3 border-t border-slate-800/80">
          <StatusBadge status={scheme.status} formattedLastDate={scheme.formatted_last_date} />
          <MatchScoreBadge score={matchScore} isEligible={isEligible} />
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {scheme.description}
        </p>

        {/* Key Benefits Highlight */}
        {scheme.benefits && scheme.benefits.length > 0 && (
          <div className="mb-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-pink-400 mb-1 flex items-center gap-1">
              <span>🎁 Key Benefits</span>
            </h4>
            <ul className="space-y-1">
              {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-tight">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why this matches you */}
        {evalRes.matched_conditions && evalRes.matched_conditions.length > 0 && (
          <div className="mb-3.5 p-3.5 rounded-2xl bg-purple-950/20 border border-purple-800/30">
            <h4 className="text-[10px] sm:text-[11px] font-extrabold text-purple-300 mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{t('whyMatches')}</span>
            </h4>
            <ul className="space-y-1">
              {evalRes.matched_conditions.slice(0, 3).map((cond, idx) => (
                <li key={idx} className="text-xs text-purple-200/90 flex items-center gap-1.5 leading-tight">
                  <span className="text-purple-400 font-bold text-[10px] shrink-0">✓</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="pt-3.5 border-t border-slate-800/80 flex flex-col gap-2.5">
        
        {/* Source Verified Badge */}
        <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-slate-400 gap-1 px-0.5">
          <span className="flex items-center gap-1 text-pink-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-pink-400" />
            <span>Verified Official Portal</span>
          </span>
          <span className="text-slate-500">Verified: {scheme.verified_at || '12 Aug 2026'}</span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-1">
          <a
            href={scheme.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all text-center"
          >
            <span>{t('viewOfficialSource')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a
            href={scheme.official_apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-2xl insta-gradient-bg text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all text-center"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>

        <Link
          to={`/scheme/${scheme.scheme_id}`}
          className="text-center text-xs font-bold text-pink-400 hover:text-pink-300 hover:underline pt-1"
        >
          View Guidelines & Documents →
        </Link>
      </div>

    </div>
  );
};
