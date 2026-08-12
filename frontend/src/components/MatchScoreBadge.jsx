import React from 'react';

export const MatchScoreBadge = ({ score, isEligible }) => {
  let badgeColor = "insta-gradient-bg text-white shadow-md shadow-pink-500/20";
  if (score >= 85 && isEligible) {
    badgeColor = "insta-gradient-bg text-white shadow-md shadow-purple-500/20";
  } else if (score >= 60) {
    badgeColor = "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold";
  } else {
    badgeColor = "bg-slate-800 text-slate-400 border border-slate-700";
  }

  return (
    <div className={`px-3 py-1 rounded-xl ${badgeColor} font-extrabold text-xs tracking-wider flex items-center gap-1.5 shadow`}>
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <span>{score}% Match</span>
    </div>
  );
};
