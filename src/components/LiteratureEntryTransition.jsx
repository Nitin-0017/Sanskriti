import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LiteratureEntryTransition
 * Cinematic handcrafted manuscript transition sequence:
 * 1. Current screen softly darkens.
 * 2. Aged dark sepia parchment texture envelops the view.
 * 3. A thin golden handwritten line draws itself horizontally across the screen.
 * 4. Subtle golden ink particles drift around the stroke.
 * 5. Manuscript folio with handwritten Devanagari calligraphy ("वाणी · शब्द · स्मृति") emerges.
 * 6. Reveals: THE LIVING WORD (POETRY · ORAL TRADITION · EPIC · DEVOTION · MODERN VOICE)
 * 7. Softly dissolves into the Literature page.
 * Duration: ~1100ms.
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

    // Sequence stages:
    // 0ms: Darkening & aged parchment emerges
    // 250ms: Golden handwritten line draws across
    // 500ms: Calligraphy & ink motes emerge
    // 750ms: Title "THE LIVING WORD" illuminates
    // 1100ms: Complete and handoff to page
    setStage(1);

    const t1 = setTimeout(() => setStage(2), 240);
    const t2 = setTimeout(() => setStage(3), 520);
    const t3 = setTimeout(() => setStage(4), 780);
    const tEnd = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1150);

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
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-[99999] bg-[#0c0603] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        {/* Layer 1: Dark Aged Sepia Parchment Base */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
          style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
        />

        {/* Layer 2: Deep Burnt Umber & Dark Gold Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(35, 18, 9, 0.4) 0%, rgba(14, 7, 3, 0.92) 75%, #080402 100%)',
          }}
        />

        {/* Layer 3: Floating Golden Ink Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${15 + (i * 5)}%`, 
                y: `${40 + (i % 5) * 6}%`, 
                opacity: 0, 
                scale: 0.5 
              }}
              animate={{ 
                y: `${32 + (i % 6) * 6}%`, 
                opacity: [0, 0.7, 0], 
                scale: [0.5, 1.2, 0.6] 
              }}
              transition={{ 
                duration: 1.1, 
                delay: i * 0.04, 
                ease: 'easeOut' 
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd27d] filter blur-[0.5px] shadow-[0_0_8px_rgba(255,210,125,0.9)]"
            />
          ))}
        </div>

        {/* Layer 4: Central Archival Composition */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl w-full">
          
          {/* Manuscript Calligraphy Icon */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex flex-col items-center"
          >
            {/* Hand-drawn Golden Quill & Manuscript Glyph (Pure SVG) */}
            <svg className="w-12 h-12 text-[#c5a059] filter drop-shadow-[0_0_15px_rgba(201,164,90,0.6)]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              {/* Ancient Kalam Quill */}
              <path d="M48 8 C38 18, 26 34, 18 52 L14 56 L18 52 C26 44, 38 32, 54 14 Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(201,164,90,0.15)" />
              <path d="M14 56 L12 58" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 28 L36 36" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M22 36 L28 42" strokeWidth="1.2" strokeLinecap="round" />
              {/* Ink droplet */}
              <circle cx="10" cy="60" r="1.5" fill="#ffd27d" />
            </svg>
          </motion.div>

          {/* Golden Handwritten Horizontal Line (Draws from center outwards) */}
          <div className="relative w-full max-w-md h-[2px] my-3 flex items-center justify-center">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: stage >= 2 ? '100%' : '0%', 
                opacity: stage >= 2 ? 1 : 0 
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#ffd27d] to-transparent shadow-[0_0_12px_rgba(255,210,125,0.8)]"
            />
            {/* Center ink jewel */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: stage >= 2 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute w-2.5 h-2.5 rotate-45 border border-[#ffd27d] bg-[#1a0c06] shadow-[0_0_8px_#ffd27d]"
            />
          </div>

          {/* Handwritten Devanagari Calligraphy bleeding softly into the parchment */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ 
              opacity: stage >= 2 ? 1 : 0, 
              y: stage >= 2 ? 0 : 8 
            }}
            transition={{ duration: 0.45 }}
            className="my-3"
          >
            <span 
              className="font-cormorant italic text-3xl sm:text-4xl text-[#ffd27d] tracking-widest block"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }}
            >
              वाणी · शब्द · स्मृति
            </span>
          </motion.div>

          {/* Final Revelation: THE LIVING WORD */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: stage >= 3 ? 1 : 0, 
              y: stage >= 3 ? 0 : 12 
            }}
            transition={{ duration: 0.45 }}
            className="space-y-2 mt-2"
          >
            <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.36em] uppercase block font-semibold">
              HARYANA LITERARY ARCHIVE
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
