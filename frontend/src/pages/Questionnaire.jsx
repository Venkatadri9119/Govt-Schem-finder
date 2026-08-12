import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { VoiceInput } from '../components/VoiceInput';
import { api } from '../services/api';
import { FileText, Sparkles, User, IndianRupee, MapPin, Briefcase, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export const Questionnaire = () => {
  const { t } = useLanguage();
  const { profile, setProfile, setResults, setLoading } = useProfile();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' or 'nl'
  const [nlQuery, setNlQuery] = useState('');
  const [formData, setFormData] = useState(profile);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWizardSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    try {
      // Save profile & evaluate eligibility
      await api.findSchemes(formData);
      setProfile(formData);
      
      const res = await api.findSchemes(formData);
      if (res.success) {
        setResults(res.results || []);
        navigate('/results');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleNLSubmit = async (e) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      const res = await api.naturalLanguageSearch(nlQuery);
      if (res.success) {
        if (res.parsed_profile) setProfile(res.parsed_profile);
        setResults(res.results || []);
        navigate('/results');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Citizen Privacy Protection • No Aadhaar / Personal ID Saved</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{t('enterDetailsHeading')}</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Enter basic demographic & financial details to calculate exact scheme eligibility across official government portals.
        </p>
      </div>

      {/* TAB SELECTOR */}
      <div className="flex rounded-2xl bg-slate-900/80 p-1.5 border border-slate-800 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('wizard')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'wizard'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t('structuredWizardTab')}</span>
        </button>

        <button
          onClick={() => setActiveTab('nl')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'nl'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('naturalLanguageTab')}</span>
        </button>
      </div>

      {/* TAB 1: STRUCTURED FORM WIZARD */}
      {activeTab === 'wizard' ? (
        <form onSubmit={handleWizardSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('ageLabel')} *</span>
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                placeholder="e.g. 21"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {t('genderLabel')} *
              </label>
              <select
                value={formData.gender || 'All'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Transgender">Transgender</option>
                <option value="All">Prefer not to say / All</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('stateLabel')} *</span>
              </label>
              <select
                value={formData.state || 'Andhra Pradesh'}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="All India">All India (Central Schemes)</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                District (Optional)
              </label>
              <input
                type="text"
                value={formData.district || ''}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="e.g. Visakhapatnam, Guntur, Hyderabad"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Income */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('incomeLabel')} *</span>
              </label>
              <input
                type="number"
                step="10000"
                value={formData.income || ''}
                onChange={(e) => handleInputChange('income', parseFloat(e.target.value) || '')}
                placeholder="e.g. 200000 (₹2 Lakh)"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {t('categoryLabel')}
              </label>
              <select
                value={formData.category || 'General'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="General">General / Unreserved</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('occupationLabel')}</span>
              </label>
              <select
                value={formData.occupation || 'Student'}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Student">Student</option>
                <option value="Farmer">Farmer / Agriculture</option>
                <option value="Self-Employed">Self-Employed / Business</option>
                <option value="Unemployed">Unemployed / Job Seeker</option>
                <option value="Salaried">Salaried Employee</option>
                <option value="Artisan">Artisan / Handloom Worker</option>
              </select>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Education Level</span>
              </label>
              <select
                value={formData.education_level || 'Undergraduate'}
                onChange={(e) => handleInputChange('education_level', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Schooling">Class 1 to 10</option>
                <option value="Intermediate">Class 11 / 12 / Diploma</option>
                <option value="Undergraduate">Undergraduate (B.Tech / B.Sc / Degree)</option>
                <option value="Postgraduate">Postgraduate (M.Tech / M.Sc / MBA)</option>
                <option value="Doctorate">PhD / Research</option>
              </select>
            </div>

          </div>

          {/* CHECKBOXES FOR SPECIAL CATEGORIES */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Applicable Special Conditions</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.student_status || false}
                  onChange={(e) => handleInputChange('student_status', e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                />
                <span className="text-xs text-slate-200 font-medium">{t('studentCheck')}</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.farmer_status || false}
                  onChange={(e) => handleInputChange('farmer_status', e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                />
                <span className="text-xs text-slate-200 font-medium">{t('farmerCheck')}</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.disability_status || false}
                  onChange={(e) => handleInputChange('disability_status', e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                />
                <span className="text-xs text-slate-200 font-medium">{t('disabilityCheck')}</span>
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all w-full sm:w-auto justify-center"
            >
              {isSubmitting ? (
                <span>Evaluating Rules...</span>
              ) : (
                <>
                  <span>Calculate Eligible Schemes</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        /* TAB 2: NATURAL LANGUAGE QUERY */
        <form onSubmit={handleNLSubmit} className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Describe Yourself in Freeform Text or Voice</span>
            </label>
            <p className="text-xs text-slate-400">
              Speak or write naturally in English, Telugu, or Hindi. Our AI model extracts structured demographic criteria automatically.
            </p>
            <textarea
              rows={4}
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="e.g. 'I am a 21-year-old female student living in Guntur, Andhra Pradesh. My family income is 2 lakh per year. Show me eligible scholarships.'"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <VoiceInput onTranscript={(text) => setNlQuery(text)} disabled={isSubmitting} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all w-full sm:w-auto justify-center"
            >
              {isSubmitting ? (
                <span>Processing AI...</span>
              ) : (
                <>
                  <span>Parse & Match Schemes</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
