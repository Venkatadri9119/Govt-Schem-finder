import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { LanguageSelector } from './LanguageSelector';
import { ShieldCheck, Bookmark, LayoutDashboard, Search, FileText, Info, Home, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const { t } = useLanguage();
  const { savedSchemeIds, theme, toggleTheme } = useProfile();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 shadow-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo - Instagram Gradient Ring */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl insta-gradient-bg p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-xl tracking-tight insta-gradient-text">
                AI Scheme Finder
              </span>
              <span className="hidden xs:inline-block px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30">
                100% GOV VERIFIED
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
              Government of India & State Schemes Portal
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('navHome')}</span>
          </Link>

          <Link
            to="/find"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/find') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('navFindSchemes')}</span>
          </Link>

          <Link
            to="/questionnaire"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/questionnaire') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('navQuestionnaire')}</span>
          </Link>

          <Link
            to="/saved"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all relative ${
              isActive('/saved') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t('navSaved')}</span>
            {savedSchemeIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {savedSchemeIds.length}
              </span>
            )}
          </Link>

          <Link
            to="/dashboard"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/dashboard') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('navDashboard')}</span>
          </Link>

          <Link
            to="/about"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/about') ? 'insta-gradient-bg text-white shadow-md shadow-pink-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t('navAbout')}</span>
          </Link>
        </nav>

        {/* Right Controls: Theme Toggle + Language Selector + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Day / Night Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-slate-700/80 transition-all flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-400" />
            )}
          </button>

          <LanguageSelector />

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-pink-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              isActive('/') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-pink-400" />
            <span>{t('navHome')}</span>
          </Link>

          <Link
            to="/find"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              isActive('/find') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-pink-400" />
            <span>{t('navFindSchemes')}</span>
          </Link>

          <Link
            to="/questionnaire"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              isActive('/questionnaire') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-pink-400" />
            <span>{t('navQuestionnaire')}</span>
          </Link>

          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              isActive('/saved') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-pink-400" />
              <span>{t('navSaved')}</span>
            </div>
            {savedSchemeIds.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-extrabold flex items-center justify-center">
                {savedSchemeIds.length}
              </span>
            )}
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              isActive('/dashboard') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-pink-400" />
            <span>{t('navDashboard')}</span>
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              isActive('/about') ? 'insta-gradient-bg text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Info className="w-4 h-4 text-pink-400" />
            <span>{t('navAbout')}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
