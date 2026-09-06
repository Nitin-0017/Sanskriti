import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import audioManager from '../services/audioManager';

/**
 * Cinematic Entrance Sequence
 * Step 1: Darkness & faint paper texture
 * Step 2: Sacred Golden Mandala / Shree Yantra emblem emerges with shimmering light
 * Step 3: Sacred Sanskrit invocation appears
 * Step 4: Camera glides into the ancient heritage realm
 */
export default function EntranceSequence({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Attempt instant flute audio startup on the initial intro screen
    audioManager.init();
    audioManager.setGeneralWebsite();

    // Step 1: Dust & Texture awaken
    const t1 = setTimeout(() => setStage(1), 600);
    // Step 2: Sacred Mandala illuminates & breathes
    const t2 = setTimeout(() => setStage(2), 2200);
    // Step 3: Benediction & light expansion
    const t3 = setTimeout(() => setStage(3), 4200);
    // Step 4: Complete transition and enter the world
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    audioManager.init();
    audioManager.setGeneralWebsite();
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0906] overflow-hidden select-none cursor-pointer"
      onClick={handleSkip}
    >
      {/* Background Parchment Grain Texture */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url('/assets/parchment_texture.jpg')` }}
      />

      {/* Radial Golden Light Diffusion */}
      <motion.div
        animate={{
          scale: stage >= 2 ? [1, 1.3, 1.15] : 0.8,
          opacity: stage >= 2 ? [0.3, 0.6, 0.45] : 0,
        }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#e6c275]/30 via-[#c5a059]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Center Sacred Mandala / Shree Yantra Emblem */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-lg z-10">
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ scale: 0.75, opacity: 0, rotate: -15 }}
              animate={{ 
                scale: stage >= 3 ? 1.05 : 1, 
                opacity: 1, 
                rotate: 0 
              }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-36 h-36 sm:w-48 sm:h-48 mb-6"
            >
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-ping opacity-25" />
              <div className="absolute -inset-2 rounded-full border border-[#d4af37]/20 animate-pulse" />

              <img
                src="/assets/sacred_mandala.jpg"
                alt="Sacred Mandala Sanskriti"
                className="w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(212,175,55,0.4)] border-2 border-[#c5a059]/60"
              />

              {/* Shimmer overlay */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-[#ffd27d]/20 pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sacred Sanskrit Invocation */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="font-rozha text-lg sm:text-2xl text-[#f3e5ab] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
              </p>
              <p className="font-marcellus text-xs sm:text-sm text-[#c5a059] tracking-[0.25em] uppercase">
                "Lead us from darkness to light, from ignorance to truth"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Name Prelude */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="mt-6 pt-4 border-t border-[#c5a059]/30"
            >
              <h2 className="font-cinzel text-xl sm:text-2xl tracking-[0.35em] text-[#fff4d0] font-bold">
                SANSKRITI
              </h2>
              <p className="font-manuscript text-xs sm:text-sm text-[#b8a082] italic mt-1">
                Entering the Eternal Heritage Archive...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip / Enter Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex items-center gap-2 text-xs font-marcellus tracking-[0.2em] text-[#d4af37]/80 hover:text-[#fff0c8] transition-colors border-b border-[#c5a059]/30 pb-0.5"
      >
        <span>ENTER SANSKRITI</span>
        <span>→</span>
      </motion.div>
    </motion.div>
  );
}
