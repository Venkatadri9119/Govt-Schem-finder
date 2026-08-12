import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { FindSchemes } from './pages/FindSchemes';
import { Questionnaire } from './pages/Questionnaire';
import { Results } from './pages/Results';
import { SchemeDetails } from './pages/SchemeDetails';
import { SavedSchemes } from './pages/SavedSchemes';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';

export function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <Router>
          <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
            
            <div>
              <Navbar />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/find" element={<FindSchemes />} />
                  <Route path="/questionnaire" element={<Questionnaire />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/scheme/:id" element={<SchemeDetails />} />
                  <Route path="/saved" element={<SavedSchemes />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
            </div>

            <Footer />

          </div>
        </Router>
      </ProfileProvider>
    </LanguageProvider>
  );
}

export default App;
