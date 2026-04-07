'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Quote, Film, Star, Share2, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { cn } from '../lib/utils'; 


interface BollyCardProps {
  data: {
    word: string;
    meaning: string;
    movie: string;
    character: string;
    context: string;
    filmySentence: string;
    famousDialogue?: string;
    mood: 'Funny' | 'Romantic' | 'Action' | 'Drama' | 'Horror';
  } | null;
}


const getMoodStyles = (mood: string) => {
  switch (mood) {
    case 'Funny': return 'bg-yellow-100 border-yellow-400 text-yellow-900';
    case 'Romantic': return 'bg-pink-100 border-pink-400 text-pink-900';
    case 'Action': return 'bg-red-100 border-red-500 text-red-900';
    case 'Horror': return 'bg-slate-800 border-slate-600 text-slate-100'; 
    case 'Drama': return 'bg-purple-100 border-purple-400 text-purple-900';
    default: return 'bg-gray-100 border-gray-400 text-gray-900';
  }
};

export default function BollyCard({ data }: BollyCardProps) {
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

 
  const handleDownload = async () => {
    if (cardRef.current && data) {
      try {
        setIsSharing(true);
       
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      
        download(dataUrl, `${data.word}-${data.movie}.png`);
      } catch (err) {
        console.error("Failed to generate image", err);
      } finally {
        setIsSharing(false);
      }
    }
  };

  if (!data) return null;

  const moodStyle = getMoodStyles(data.mood);

  return (
    <div className="w-full max-w-lg mx-auto mt-8 flex flex-col gap-4">
      
    
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        
      
        <div 
          ref={cardRef}
          className={cn(
            "relative overflow-hidden rounded-xl border-2 shadow-xl p-6 transition-colors bg-white", 
            moodStyle 
          )}
        >
          
        
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10 pointer-events-none">
            <Film size={150} />
          </div>

         
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Clapperboard className="w-5 h-5 opacity-70" />
              <span className="font-bold uppercase tracking-wider text-sm opacity-80">
                {data.movie}
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black/10 backdrop-blur-sm">
              {data.mood}
            </span>
          </div>

        
          <div className="text-center py-6 relative z-10">
            <h2 className="text-5xl font-black mb-2 tracking-tight drop-shadow-sm">
              {data.word}
            </h2>
            <p className="text-lg italic opacity-90 font-medium">
              `{data.meaning}`
            </p>
          </div>

          
          <div className="bg-white/40 backdrop-blur-md rounded-lg p-5 mb-4 border border-white/20 shadow-sm relative z-10">
            <h3 className="text-xs font-bold uppercase mb-2 opacity-60 flex items-center gap-1">
              <Star size={12} fill="currentColor" /> The Filmy Logic
            </h3>
            <p className="text-lg font-medium leading-relaxed">
              {data.filmySentence}
            </p>
          </div>

         
          <div className="space-y-3 relative z-10">
            
           
            <div className="flex gap-3 text-sm opacity-80">
              <div className="min-w-[4px] bg-current rounded-full opacity-50" />
              <p>
                <span className="font-bold">{data.character}</span> in this scene: {data.context}
              </p>
            </div>

            
            {data.famousDialogue && (
              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-sm italic flex gap-2 items-start">
                  <Quote size={16} className="shrink-0 mt-1 fill-current opacity-50" />
                  <span>`{data.famousDialogue}`</span>
                </p>
              </div>
            )}
          </div>
          
         
          <div className="absolute bottom-2 right-4 opacity-0 scale-0 group-hover:opacity-100 transition-all">
            
          </div>

        </div>
      </motion.div>

     
      <button 
        onClick={handleDownload}
        disabled={isSharing}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSharing ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Creating Ticket...
          </>
        ) : (
          <>
            <Share2 size={18} />
            Download Movie Ticket
          </>
        )}
      </button>

    </div>
  );
}