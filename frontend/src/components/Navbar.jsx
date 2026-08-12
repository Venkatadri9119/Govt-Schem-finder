import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { LanguageSelector } from './LanguageSelector';
import { ShieldCheck, Bookmark, LayoutDashboard, Search, FileText, Info, Home } from 'lucide-react';

export const Navbar = () => {
  const { t } = useLanguage();
  const { savedSchemeIds } = useProfile();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                AI Scheme Finder
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% GOV VERIFIED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
              Government of India & State Schemes Portal
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isActive('/') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('navHome')}</span>
          </Link>

          <Link
            to="/find"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isActive('/find') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('navFindSchemes')}</span>
          </Link>

          <Link
            to="/questionnaire"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isActive('/questionnaire') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('navQuestionnaire')}</span>
          </Link>

          <Link
            to="/saved"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all relative ${
              isActive('/saved') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t('navSaved')}</span>
            {savedSchemeIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {savedSchemeIds.length}
              </span>
            )}
          </Link>

          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isActive('/dashboard') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('navDashboard')}</span>
          </Link>

          <Link
            to="/about"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isActive('/about') ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t('navAbout')}</span>
          </Link>
        </nav>

        {/* Right Section: Language Selector */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>

      </div>
    </header>
  );
};
