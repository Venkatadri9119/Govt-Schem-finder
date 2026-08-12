import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceInput = ({ onTranscript, disabled = false }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;

      if (lang === 'te') rec.lang = 'te-IN';
      else if (lang === 'hi') rec.lang = 'hi-IN';
      else rec.lang = 'en-IN';

      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join('');
        if (onTranscript) {
          onTranscript(transcript);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      setSupported(false);
    }
  }, [lang]);

  const toggleListening = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 shrink-0">
      
      {/* 1. Outline Microphone Button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? "Listening... click to stop" : "Click to speak"}
        className={`p-2 rounded-full transition-all ${
          isListening
            ? 'text-rose-400 bg-rose-500/10 border border-rose-500/30 animate-pulse'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* 2. ChatGPT Style Circular Blue / Emerald Voice Wave Button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? "Active Voice Wave Mode" : "Start Voice Input"}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
          isListening
            ? 'bg-rose-600 text-white animate-bounce shadow-lg shadow-rose-600/40 ring-4 ring-rose-500/30'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 hover:scale-105'
        }`}
      >
        {/* Animated 4-bar Audio Soundwave Icon */}
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <rect x="2" y="9" width="3" height="6" rx="1.5" className={isListening ? "animate-pulse" : ""} />
          <rect x="8" y="4" width="3" height="16" rx="1.5" className={isListening ? "animate-bounce" : ""} />
          <rect x="14" y="7" width="3" height="10" rx="1.5" className={isListening ? "animate-pulse" : ""} />
          <rect x="20" y="10" width="3" height="4" rx="1.5" className={isListening ? "animate-ping" : ""} />
        </svg>
      </button>

    </div>
  );
};
