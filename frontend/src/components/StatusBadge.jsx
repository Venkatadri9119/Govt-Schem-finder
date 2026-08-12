import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StatusBadge = ({ status, formattedLastDate }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'OPEN':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>🟢 {t('openStatus')}</span>
          {formattedLastDate && <span className="opacity-80 font-normal">({formattedLastDate})</span>}
        </div>
      );
    case 'NOT_YET_OPEN':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>🟡 {t('notYetOpenStatus')}</span>
          {formattedLastDate && <span className="opacity-80 font-normal">({formattedLastDate})</span>}
        </div>
      );
    case 'CLOSED':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>🔴 {t('closedStatus')}</span>
        </div>
      );
    case 'DEADLINE_NOT_SPECIFIED':
    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          <span>🔵 {t('deadlineNotSpecifiedStatus')}</span>
        </div>
      );
  }
};
