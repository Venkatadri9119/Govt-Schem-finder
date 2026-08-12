import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SchemeCard } from '../components/SchemeCard';
import { Sparkles, Filter, SlidersHorizontal, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Results = () => {
  const { results, profile, loading } = useProfile();
  const navigate = useNavigate();
  const [eligibleOnly, setEligibleOnly] = useState(false);

  const displayedResults = eligibleOnly
    ? results.filter((r) => r.is_eligible)
    : results;

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Questionnaire</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Recommended Official Schemes</h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculated dynamically based on your profile inputs and official ministry rule parameters.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 self-start">
          <button
            onClick={() => setEligibleOnly(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !eligibleOnly ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Matches ({results.length})
          </button>
          <button
            onClick={() => setEligibleOnly(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              eligibleOnly ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            100% Eligible ({results.filter(r => r.is_eligible).length})
          </button>
        </div>
      </div>

      {/* Citizen Profile Summary Banner */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Active Profile:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Age: <strong>{profile.age || 21}</strong> yrs</span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg">State: <strong>{profile.state || 'AP'}</strong></span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Income: <strong>₹{(profile.income || 200000).toLocaleString('en-IN')}</strong></span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Occupation: <strong>{profile.occupation || 'Student'}</strong></span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Category: <strong>{profile.category || 'General'}</strong></span>
        </div>
        <Link to="/questionnaire" className="text-amber-400 hover:underline font-semibold text-xs ml-auto">
          Edit Profile ✏️
        </Link>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-amber-400">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold">Running deterministic rule matching...</span>
        </div>
      ) : displayedResults.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No Scheme Matches Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your profile parameters or switching the filter to "All Matches".
          </p>
          <Link
            to="/questionnaire"
            className="inline-block px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg"
          >
            Update Questionnaire Details
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedResults.map((scheme) => (
            <SchemeCard key={scheme.scheme_id} scheme={scheme} />
          ))}
        </div>
      )}

    </div>
  );
};
