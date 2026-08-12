import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { api } from '../services/api';
import { SchemeCard } from '../components/SchemeCard';
import { Bookmark, RefreshCw, AlertCircle } from 'lucide-react';

export const SavedSchemes = () => {
  const { savedSchemeIds } = useProfile();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      setLoading(true);
      try {
        const res = await api.getAllSchemes();
        if (res.success) {
          const saved = (res.schemes || []).filter((s) => savedSchemeIds.includes(s.scheme_id));
          setSchemes(saved);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, [savedSchemeIds]);

  return (
    <div className="space-y-8 py-6">
      
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Bookmark className="w-4 h-4 fill-current" />
          <span>Bookmarked Citizens Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Your Saved Schemes ({schemes.length})</h1>
        <p className="text-xs text-slate-400 mt-1">
          Quickly access your bookmarked official schemes and application deadlines.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-amber-400">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold">Loading bookmarked schemes...</span>
        </div>
      ) : schemes.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No Saved Schemes Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the bookmark icon on any scheme card to save it for easy reference later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.scheme_id} scheme={scheme} />
          ))}
        </div>
      )}

    </div>
  );
};
