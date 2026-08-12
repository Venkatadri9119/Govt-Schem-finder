import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { VoiceInput } from '../components/VoiceInput';
import { api } from '../services/api';
import { Search, Sparkles, ShieldCheck, ArrowRight, BookOpen, GraduationCap, Sprout, Briefcase, HeartPulse, UserCheck } from 'lucide-react';

export const Home = () => {
  const { t } = useLanguage();
  const { setResults, setLoading } = useProfile();
  const navigate = useNavigate();
  const [nlQuery, setNlQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleNLSubmit = async (e) => {
    e?.preventDefault();
    if (!nlQuery.trim()) return;

    setIsSearching(true);
    setLoading(true);

    try {
      const res = await api.naturalLanguageSearch(nlQuery);
      if (res.success) {
        setResults(res.results || []);
        navigate('/results');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  const sampleQueries = [
    "I am a 21-year-old student from Andhra Pradesh. My family income is ₹2 lakh per year.",
    "Farmer landholding scheme for agriculture support in India.",
    "Business startup loan scheme for women entrepreneurs under 30 years old."
  ];

  return (
    <div className="space-y-16 py-6">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-panel border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950">
        
        {/* Glowing Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t('officialSourceBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Search Box with Natural Language & Voice Input */}
          <form onSubmit={handleNLSubmit} className="mt-8">
            <div className="glass-card p-2 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
              
              <div className="flex-1 flex items-center gap-3 px-3 w-full">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={nlQuery}
                  onChange={(e) => setNlQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-transparent border-0 text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm py-2"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end px-1 pb-1 sm:pb-0">
                <VoiceInput onTranscript={(text) => setNlQuery(text)} disabled={isSearching} />

                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 w-full sm:w-auto"
                >
                  {isSearching ? (
                    <span>Parsing AI...</span>
                  ) : (
                    <>
                      <span>{t('findSchemesBtn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </form>

          {/* Sample Prompts Chips */}
          <div className="space-y-2 pt-2 text-left sm:text-center">
            <p className="text-[11px] text-slate-400 font-medium">Try asking in English or Telugu:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {sampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => { setNlQuery(query); }}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all line-clamp-1"
                >
                  💬 "{query}"
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED CATEGORIES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Explore Schemes by Category</h2>
            <p className="text-xs text-slate-400">Discover officially published benefits across key public departments</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div
            onClick={() => navigate('/find?category=Education%20%26%20Scholarship')}
            className="glass-card p-5 rounded-2xl cursor-pointer hover:border-amber-500/50 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-amber-300">Education & Scholarships</h3>
              <p className="text-[11px] text-slate-400 mt-1">Fee waivers, post-matric & merit awards</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/find?category=Agriculture%20%26%20Rural%20Development')}
            className="glass-card p-5 rounded-2xl cursor-pointer hover:border-emerald-500/50 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-emerald-300">Agriculture & Farmers</h3>
              <p className="text-[11px] text-slate-400 mt-1">PM-KISAN, Rythu Bandhu & land support</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/find?category=Business%20%26%20Entrepreneurship')}
            className="glass-card p-5 rounded-2xl cursor-pointer hover:border-sky-500/50 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-sky-300">Business & Mudra Loans</h3>
              <p className="text-[11px] text-slate-400 mt-1">Collateral-free Mudra & startup credit</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/find?category=Health%20%26%20Social%20Security')}
            className="glass-card p-5 rounded-2xl cursor-pointer hover:border-rose-500/50 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-rose-300">Health & Insurance</h3>
              <p className="text-[11px] text-slate-400 mt-1">Ayushman Bharat PM-JAY 5L cover</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/find?category=Women%20%26%20Child%20Welfare')}
            className="glass-card p-5 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-purple-300">Women & Girl Child</h3>
              <p className="text-[11px] text-slate-400 mt-1">Sukanya Samriddhi & Stand Up India</p>
            </div>
          </div>

        </div>
      </section>

      {/* WHY TRUST US / CRITICAL RULE BADGE */}
      <section className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span>🛡️ Strict Verification Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white">No Unofficial Blogs. No Fake Portal Links.</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            This platform automatically runs every retrieved URL against a domain validation module. Only official Indian government domains (<code className="text-amber-400">*.gov.in</code>, <code className="text-amber-400">*.nic.in</code>) are displayed to guarantee citizens zero fraud exposure.
          </p>
        </div>

        <button
          onClick={() => navigate('/questionnaire')}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center gap-2 shrink-0 transition-all shadow-lg"
        >
          <span>Fill Profile Questionnaire</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
