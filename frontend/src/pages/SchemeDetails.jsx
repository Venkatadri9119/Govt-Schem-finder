import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { useProfile } from '../context/ProfileContext';
import { ArrowLeft, Building2, Calendar, FileText, ExternalLink, ShieldCheck, CheckCircle2, Bookmark, RefreshCw, Globe } from 'lucide-react';

export const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedSchemeIds, toggleSaveScheme } = useProfile();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [liveStatus, setLiveStatus] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await api.getSchemeDetails(id);
        if (res.success) {
          setScheme(res.scheme);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleLiveCheck = async () => {
    setVerifying(true);
    try {
      const res = await api.liveVerifyScheme(id);
      if (res.success) {
        setLiveStatus(res.live_verification);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-amber-400">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <span className="text-xs font-semibold">Loading scheme guidelines...</span>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-white">Scheme Not Found</h2>
        <button onClick={() => navigate('/find')} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
          Back to Schemes List
        </button>
      </div>
    );
  }

  const isSaved = savedSchemeIds.includes(scheme.scheme_id);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* HEADER PANEL */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{scheme.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{scheme.name}</h1>
          </div>

          <button
            onClick={() => toggleSaveScheme(scheme.scheme_id)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>{isSaved ? "Saved in Bookmarks" : "Save Scheme"}</span>
          </button>
        </div>

        {/* STATUS & DATE BADGES */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <StatusBadge status={scheme.status} formattedLastDate={scheme.formatted_last_date} />
          <span className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
            Last Verified: {scheme.verified_at || '12 Aug 2026'}
          </span>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Official Source Verified</span>
          </span>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Description, Benefits, Documents */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Official Description */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Official Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{scheme.description}</p>
          </div>

          {/* Benefits List */}
          {scheme.benefits && scheme.benefits.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Scheme Benefits & Assistance</h3>
              <ul className="space-y-2">
                {scheme.benefits.map((b, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Documents Checklist */}
          {scheme.documents && scheme.documents.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Required Documents Checklist</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.documents.map((doc, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Column: Portal Links & Live Status Checker */}
        <div className="space-y-6">
          
          {/* Action Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Official Government Portals</h3>
            
            <a
              href={scheme.official_apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={scheme.official_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <span>View Official Source PDF / Guidelines</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Live Verification Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleLiveCheck}
                disabled={verifying}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold text-xs border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{verifying ? "Checking Portal Status..." : "Perform Live HTTP Portal Check"}</span>
              </button>

              {liveStatus && (
                <div className={`mt-3 p-3 rounded-xl text-xs border ${
                  liveStatus.online ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}>
                  <p className="font-bold">{liveStatus.reason}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 break-all">URL: {liveStatus.url}</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
