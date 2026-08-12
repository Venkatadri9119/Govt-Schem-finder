import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/70 rounded-lg p-1 text-xs">
      <Globe className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded font-medium transition-all ${
          lang === 'en'
            ? 'bg-amber-500 text-slate-950 font-bold shadow'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('te')}
        className={`px-2 py-1 rounded font-medium transition-all ${
          lang === 'te'
            ? 'bg-amber-500 text-slate-950 font-bold shadow'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        తెలుగు
      </button>
      <button
        onClick={() => setLang('hi')}
        className={`px-2 py-1 rounded font-medium transition-all ${
          lang === 'hi'
            ? 'bg-amber-500 text-slate-950 font-bold shadow'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};
