import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { LayoutDashboard, CheckCircle2, Clock, ShieldCheck, Layers, MapPin, RefreshCw } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await api.getDashboardStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-amber-400">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <span className="text-xs font-semibold">Loading portal analytics...</span>
      </div>
    );
  }

  const { total_schemes, open_schemes, closing_soon, verified_portals_count, categories_distribution, state_wise_distribution } = stats || {};

  return (
    <div className="space-y-8 py-6">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Government Schemes Portal Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time metrics on indexed official government schemes and portal verification statuses.
        </p>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Schemes</span>
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{total_schemes || 0}</p>
          <p className="text-[11px] text-slate-400">Verified official schemes</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Open</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{open_schemes || 0}</p>
          <p className="text-[11px] text-slate-400">Currently accepting applications</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Closing Soon</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{closing_soon || 0}</p>
          <p className="text-[11px] text-slate-400">Expiring in &lt; 30 days</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Portals</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{verified_portals_count || 0}</p>
          <p className="text-[11px] text-slate-400">Official *.gov.in links</p>
        </div>

      </div>

      {/* CATEGORY & STATE DISTRIBUTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Category-Wise Schemes Distribution</span>
          </h3>
          <div className="space-y-3">
            {categories_distribution && Object.entries(categories_distribution).map(([cat, count], idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span>{cat}</span>
                  <span className="text-amber-400 font-bold">{count} schemes</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full"
                    style={{ width: `${(count / total_schemes) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Coverage by Region / State</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {state_wise_distribution && Object.entries(state_wise_distribution).map(([st, count], idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-200 font-medium">{st}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  {count} schemes
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
