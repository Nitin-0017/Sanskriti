import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LiteratureEntryTransition
 * Cinematic handcrafted manuscript transition sequence:
 * - existing page gently darkens
 * - subtle floating golden particles / dust appear
 * - faint handwritten Devanagari/Haryanvi words emerge
 * - a manuscript/paper texture gradually appears
 * - a thin golden line travels horizontally across the screen
 * - the words "THE LIVING WORD" slowly appear
 * - dissolves into the Literature chapter
 * Duration: ~1650ms.
 */
export default function LiteratureEntryTransition({
  isActive,
  onComplete,
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStage(0);
      return;
    }

    setStage(1); // Page darkens & golden dust particles appear
    const t1 = setTimeout(() => setStage(2), 300); // Manuscript texture & Devanagari words emerge
    const t2 = setTimeout(() => setStage(3), 650); // Thin golden line travels horizontally
    const t3 = setTimeout(() => setStage(4), 1050); // "THE LIVING WORD" emerges
    const tEnd = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lit-entry-transition-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-0 z-[99999] bg-[#090503] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        {/* Layer 1: Dark Aged Sepia Parchment Base */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 0.45 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
        />

        {/* Layer 2: Deep Burnt Umber & Dark Gold Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(38, 20, 10, 0.4) 0%, rgba(14, 7, 3, 0.94) 75%, #080402 100%)',
          }}
        />

        {/* Layer 3: Faint Handwritten Devanagari / Haryanvi Words Emerging in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: stage >= 2 ? 0.08 : 0, scale: stage >= 2 ? 1 : 0.96 }}
            transition={{ duration: 0.8 }}
            className="text-[#ffd27d] font-cormorant italic text-7xl sm:text-9xl tracking-[0.2em] select-none text-center whitespace-nowrap leading-none"
          >
            वाणी · शब्द · स्मृति · राग · साखी
          </motion.div>
        </div>

        {/* Layer 4: Floating Golden Dust / Ink Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${10 + (i * 4.5)}%`, 
                y: `${45 + (i % 6) * 5}%`, 
                opacity: 0, 
                scale: 0.4 
              }}
              animate={{ 
                y: `${28 + (i % 7) * 6}%`, 
                opacity: [0, 0.85, 0], 
                scale: [0.4, 1.2, 0.4] 
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.04, 
                ease: 'easeOut' 
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd27d] filter blur-[0.4px] shadow-[0_0_8px_rgba(255,210,125,0.9)]"
            />
          ))}
        </div>

        {/* Layer 5: Central Transition Reveal */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl w-full">
          
          {/* Ancient Kalam Inkpot Emblem */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: stage >= 2 ? 1 : 0.85, opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 flex flex-col items-center"
          >
            <svg className="w-10 h-10 text-[#c5a059] filter drop-shadow-[0_0_15px_rgba(201,164,90,0.6)]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <path d="M48 8 C38 18, 26 34, 18 52 L14 56 L18 52 C26 44, 38 32, 54 14 Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(201,164,90,0.15)" />
              <path d="M14 56 L12 58" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 28 L36 36" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M22 36 L28 42" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="10" cy="60" r="1.5" fill="#ffd27d" />
            </svg>
          </motion.div>

          {/* Thin Golden Line Traveling Horizontally Across Screen */}
          <div className="relative w-full max-w-lg h-[2px] my-3 flex items-center justify-center">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: stage >= 3 ? '100%' : '0%', 
                opacity: stage >= 3 ? 1 : 0 
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#ffd27d] to-transparent shadow-[0_0_12px_rgba(255,210,125,0.85)]"
            />
            {/* Center ink jewel */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: stage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute w-2.5 h-2.5 rotate-45 border border-[#ffd27d] bg-[#1a0c06] shadow-[0_0_8px_#ffd27d]"
            />
          </div>

          {/* Faint Calligraphy Header */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ 
              opacity: stage >= 3 ? 1 : 0, 
              y: stage >= 3 ? 0 : 6 
            }}
            transition={{ duration: 0.4 }}
            className="my-2"
          >
            <span 
              className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d] tracking-widest block"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }}
            >
              वाणी · शब्द · स्मृति
            </span>
          </motion.div>

          {/* The Words "THE LIVING WORD" Slowly Appear */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: stage >= 4 ? 1 : 0, 
              y: stage >= 4 ? 0 : 12 
            }}
            transition={{ duration: 0.5 }}
            className="space-y-2 mt-2"
          >
            <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.36em] uppercase block font-semibold">
              CHAPTER 02 · LITERATURE
            </span>
            <h1 
              className="font-cinzel text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] tracking-widest font-normal uppercase"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.95))' }}
            >
              The Living Word
            </h1>
            <p className="text-[10px] sm:text-xs font-cinzel text-[#e8c46a] tracking-[0.26em] uppercase max-w-xl mx-auto pt-1 font-semibold">
              POETRY · ORAL TRADITION · EPIC · DEVOTION · MODERN VOICE
            </p>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
