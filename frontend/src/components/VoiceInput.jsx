import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceInput = ({ onTranscript, disabled = false }) => {
  const { t, lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      
      // Set language according to context
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

  if (!supported) {
    return (
      <span className="text-xs text-slate-500 italic">
        (Voice search not supported on this browser)
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      title={isListening ? "Listening... click to stop" : "Click to speak query"}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
        isListening
          ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40 border border-rose-400'
          : 'bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 border border-slate-700'
      }`}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 animate-bounce" />
          <span>Listening...</span>
          <Volume2 className="w-3.5 h-3.5 text-rose-200 animate-ping" />
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 text-amber-400" />
          <span>{t('speakBtn')}</span>
        </>
      )}
    </button>
  );
};
