import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    age: 21,
    gender: 'All',
    state: 'All India',
    district: '',
    occupation: 'Student',
    student_status: true,
    education_level: 'Undergraduate',
    income: 200000,
    category: 'General',
    disability_status: false,
    farmer_status: false,
    business_status: false
  });

  const [savedSchemeIds, setSavedSchemeIds] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync saved schemes from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem('saved_scheme_ids');
      if (stored) {
        setSavedSchemeIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds((prev) => {
      let updated;
      if (prev.includes(schemeId)) {
        updated = prev.filter((id) => id !== schemeId);
      } else {
        updated = [...prev, schemeId];
      }
      localStorage.setItem('saved_scheme_ids', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      setProfile,
      results,
      setResults,
      savedSchemeIds,
      toggleSaveScheme,
      loading,
      setLoading
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
