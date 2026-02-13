import Link from 'next/link';
import { Clapperboard, Sparkles, Film, Star, ArrowRight, Tv } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS (Static CSS) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] opacity-60" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg text-white">
            <Clapperboard size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">BollyVocab</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <span>How it Works</span>
          <span>Showcase</span>
          <span>About</span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 flex flex-col items-center text-center pt-20 pb-32 px-4 max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            The #1 Bollywood EdTech App
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Don't memorize. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
            Visualize.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Master English vocabulary through the magic of <span className="text-slate-900 font-bold underline decoration-red-200 underline-offset-4">Cult Classic Cinema</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Link 
            href="/getmeaning" // Assuming your game logic is on this route now
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-200"
          >
            <Film size={20} />
            Enter the Cinema
          </Link>
          
          <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
            Watch Trailer
          </button>
        </div>

      </main>

      {/* --- FEATURE STRIP --- */}
      <section className="relative z-10 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center gap-3 p-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-2">
              <Tv size={24} />
            </div>
            <h3 className="font-bold text-lg">Curated Scenes</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              From <i>Sholay</i> to <i>Mirzapur</i>, we map words to the most iconic moments in Indian cinema.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center gap-3 p-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-2">
              <Star size={24} />
            </div>
            <h3 className="font-bold text-lg">AI Director</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Powered by Gemini AI to generate custom mnemonic cards for literally any word you type.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center gap-3 p-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-2">
              <ArrowRight size={24} />
            </div>
            <h3 className="font-bold text-lg">Instant Recall</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Stop forgetting. Start associating words with emotions, dialogues, and characters.
            </p>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-400 text-sm font-medium">
        <p>&copy; 2026 BollyVocab Studios. Made in India.</p>
      </footer>

    </div>
  );
}