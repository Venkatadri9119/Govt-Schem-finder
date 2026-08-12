import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { SchemeCard } from '../components/SchemeCard';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export const FindSchemes = () => {
  const [searchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [stateFilter, setStateFilter] = useState(searchParams.get("state") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await api.getAllSchemes({
        query,
        category,
        state: stateFilter,
        status: statusFilter
      });
      if (res.success) {
        setSchemes(res.schemes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [query, category, stateFilter, statusFilter]);

  const categoriesList = [
    "All Categories",
    "Education & Scholarship",
    "Agriculture & Rural Development",
    "Business & Entrepreneurship",
    "Health & Social Security",
    "Women & Child Welfare",
    "Housing & Infrastructure"
  ];

  const statesList = [
    "All India",
    "Andhra Pradesh",
    "Telangana",
    "Tamil Nadu",
    "Maharashtra",
    "Karnataka",
    "Uttar Pradesh",
    "Delhi"
  ];

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Find Official Government Schemes</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore current active central and state government benefits with verified portal application links (*.gov.in).
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search text */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scheme name or keyword..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value === "All Categories" ? "" : e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
          >
            {categoriesList.map((cat, idx) => (
              <option key={idx} value={cat === "All Categories" ? "" : cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="relative">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value === "All India" ? "" : e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
          >
            {statesList.map((st, idx) => (
              <option key={idx} value={st === "All India" ? "" : st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">🟢 Open Applications</option>
            <option value="NOT_YET_OPEN">🟡 Not Yet Open</option>
            <option value="CLOSED">🔴 Closed</option>
            <option value="DEADLINE_NOT_SPECIFIED">🔵 Deadline Not Specified</option>
          </select>
        </div>

      </div>

      {/* SCHEMES GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-amber-400">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold">Retrieving verified government schemes...</span>
        </div>
      ) : schemes.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No Verified Schemes Match Your Filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search keywords, clearing state filters, or selecting "All Categories".
          </p>
          <button
            onClick={() => { setQuery(''); setCategory(''); setStateFilter(''); setStatusFilter(''); }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-all"
          >
            Reset Filters
          </button>
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
