'use client';

import { useState } from 'react';
import { generateBollyWord } from '../actions/generate-word';
import BollyCard from '../components/BollyCard';
import { Loader2, Search, Sparkles, Film } from 'lucide-react';

// 1. The Magic List
// These words guarantee dramatic/funny results from the AI
const MAGIC_WORDS = [
  "Betrayal", "Audacity", "Destiny", "Confusion", 
  "Revenge", "Sacrifice", "Chaos", "Euphoria", 
  "Nostalgia", "Karma", "Obsession", "Melancholy",
  "Savage", "Loyalty", "Greed", "Fear"
];

export default function Home() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. The Search Logic
  async function searchWord(query: string) {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await generateBollyWord(query);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError("Scene cut! The director couldn't find that word. Try another?");
      }
    } catch (err) {
      setError("Network error. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Form Submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWord(word);
  };

  // 3. The "Magic Word" Logic
  const handleMagicWord = () => {
    // Pick a random word
    const randomWord = MAGIC_WORDS[Math.floor(Math.random() * MAGIC_WORDS.length)];
    
    // UI Feedback
    setWord(randomWord);
    
    // Trigger Search Automatically
    searchWord(randomWord);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-4 relative overflow-hidden">
      
      {/* Background Decor (Subtle Film Reel) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
         <Film className="w-[800px] h-[800px] absolute -top-40 -left-40 text-slate-900 rotate-12" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-2 tracking-tighter drop-shadow-sm">
            Bolly<span className="text-red-600">Vocab</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
            Forget dictionaries. Remember scenes. <br/>
            <span className="text-sm opacity-70">Learn English the filmy way.</span>
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-2">
          
          <form onSubmit={handleSearch} className="flex items-center gap-2 p-1">
            <div className="pl-4 text-slate-400">
              <Search size={20} />
            </div>
            <input 
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Type a word (e.g. 'Arrogance')"
              className="flex-1 py-4 bg-transparent outline-none text-lg text-slate-800 font-medium placeholder:font-normal placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={loading || !word.trim()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-6 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md flex items-center gap-2 min-w-[100px] justify-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Action!"}
            </button>
          </form>

        </div>

        {/* ✨ THE MAGIC WORD BUTTON ✨ */}
        <button 
          onClick={handleMagicWord}
          disabled={loading}
          className="mt-6 group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-bold hover:border-purple-300 hover:text-purple-600 hover:shadow-md transition-all active:scale-95"
        >
          <Sparkles size={16} className="text-purple-500 group-hover:rotate-12 transition-transform" />
          <span>I'm feeling lucky (Magic Word)</span>
          
          {/* Subtle gradient glow on hover */}
          <div className="absolute inset-0 rounded-full bg-purple-50 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 w-full text-center text-sm font-medium">
            {error}
          </div>
        )}

        {/* The Result Card */}
        <div className="w-full">
           <BollyCard data={result} />
        </div>
      
      </div>
    </main>
  );
}