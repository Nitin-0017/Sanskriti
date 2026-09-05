import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../services/audioManager';

/**
 * FOLK ARTS ENTRY TRANSITION: THE LIVING CANVAS THRESHOLD
 * 
 * Consistent with Sanskriti's dark cinematic visual language:
 * 
 * Sequence:
 * 1. 0.0s – 0.8s: Dark screen (#0a0604) with faint ambient dust & subtle woven thread texture.
 * 2. 0.8s – 1.8s: Hand-painted golden folk motif gradually illuminates in center with warm firelight halo.
 * 3. 1.8s – 2.8s: Faint earth colours (terracotta, ochre, indigo) begin radiating outward from the motif.
 * 4. 2.8s – 3.5s: Background cultural environment slowly emerges through the golden glow.
 * 5. 3.5s – 3.8s: Folk Arts page reveals smoothly without any sudden jump or cut.
 * 
 * Duration: ~3.8 seconds.
 */
export default function FolkArtsEntryTransition({ onComplete }) {
  // Phases: 'phase1-dark' | 'phase2-motif-illuminate' | 'phase3-colors-radiate' | 'phase4-environment-reveal' | 'phase5-handoff'
  const [phase, setPhase] = useState('phase1-dark');

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reduced motion preference
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Switch to gentle pastoral rural soundscape (Flute + Birds continue smoothly)
    audioManager.setFolkArtsMode();

    if (isReducedMotion) {
      const timer = setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 600);
      return () => clearTimeout(timer);
    }

    // Sequence timeline (~3.8s total)
    const t1 = setTimeout(() => setPhase('phase2-motif-illuminate'), 800);
    const t2 = setTimeout(() => setPhase('phase3-colors-radiate'), 1800);
    const t3 = setTimeout(() => setPhase('phase4-environment-reveal'), 2800);
    const t4 = setTimeout(() => setPhase('phase5-handoff'), 3500);
    const t5 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isReducedMotion]);

  // Floating golden embers
  const embers = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${20 + ((i * 7.7) % 60)}%`,
    top: `${25 + ((i * 11.3) % 50)}%`,
    size: `${1.5 + (i % 3) * 1.5}px`,
    duration: 2.4 + (i % 4) * 0.5,
    delay: (i % 5) * 0.18,
  }));

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden bg-[#0a0604] flex items-center justify-center"
      style={{ backgroundColor: '#0a0604' }}
    >
      {/* ====================================================================
          STAGE 4: BACKGROUND CULTURAL ENVIRONMENT REVEAL
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(14px) brightness(0.25)', scale: 1.05 }}
        animate={{
          opacity: 
            phase === 'phase4-environment-reveal' || phase === 'phase5-handoff' ? 0.35 : 
            phase === 'phase3-colors-radiate' ? 0.12 : 0,
          filter: 
            phase === 'phase4-environment-reveal' || phase === 'phase5-handoff' ? 'blur(0px) brightness(0.4)' : 
            phase === 'phase3-colors-radiate' ? 'blur(8px) brightness(0.28)' : 'blur(14px) brightness(0.25)',
          scale: 
            phase === 'phase4-environment-reveal' || phase === 'phase5-handoff' ? 1.0 : 1.05,
        }}
        transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/haryana_folk_hero.jpg')` }}
      >
        {/* Deep dark atmospheric shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-transparent to-[#0c0704]/80 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(4,2,1,0.95)] pointer-events-none" />
      </motion.div>

      {/* ====================================================================
          STAGE 3: EXPANDING RADIAL AMBER & TERRACOTTA FIRELIGHT
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: 
            phase === 'phase1-dark' ? 0 :
            phase === 'phase2-motif-illuminate' ? 0.35 :
            phase === 'phase3-colors-radiate' ? 0.85 :
            phase === 'phase4-environment-reveal' ? 0.50 : 0,
          scale: 
            phase === 'phase1-dark' ? 0.3 :
            phase === 'phase2-motif-illuminate' ? 0.75 :
            phase === 'phase3-colors-radiate' ? 2.2 :
            phase === 'phase4-environment-reveal' ? 2.6 : 0.3,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-[850px] h-[850px] rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 219, 138, 0.65) 0%, rgba(200, 90, 56, 0.35) 30%, rgba(139, 58, 32, 0.18) 58%, rgba(0, 0, 0, 0) 78%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Floating Golden Sparks / Embers */}
      {(phase === 'phase2-motif-illuminate' || phase === 'phase3-colors-radiate' || phase === 'phase4-environment-reveal') && (
        <div className="absolute inset-0 pointer-events-none z-15">
          {embers.map((ember) => (
            <motion.div
              key={ember.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [-10, -55 - (ember.id % 3) * 20],
                x: [(ember.id % 2 === 0 ? 1 : -1) * (ember.id * 2), (ember.id % 2 === 0 ? 1 : -1) * (ember.id * 4)],
                scale: [0.8, 1.25, 0.4],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                ease: 'easeOut',
              }}
              className="absolute rounded-full bg-[#ffd27d] shadow-[0_0_10px_#ffd27d]"
              style={{
                left: ember.left,
                top: ember.top,
                width: ember.size,
                height: ember.size,
              }}
            />
          ))}
        </div>
      )}

      {/* ====================================================================
          STAGE 2: HAND-PAINTED GOLDEN MOTIF GRADUALLY ILLUMINATES
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.90 }}
        animate={{
          opacity: 
            phase === 'phase1-dark' ? 0 :
            phase === 'phase5-handoff' ? 0 : 1.0,
          scale: 
            phase === 'phase1-dark' ? 0.90 :
            phase === 'phase5-handoff' ? 1.08 : 1.0,
        }}
        transition={{ 
          duration: phase === 'phase5-handoff' ? 0.45 : 0.9, 
          ease: [0.25, 1, 0.5, 1] 
        }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-sm"
      >
        {/* Sacred Folk Art Mandala & Lotus Motif */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          
          {/* Subtle Outer Halo Ring */}
          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
            animate={{
              opacity: phase !== 'phase1-dark' ? 0.8 : 0,
              rotate: phase === 'phase3-colors-radiate' || phase === 'phase4-environment-reveal' ? 15 : 0,
              scale: phase === 'phase3-colors-radiate' ? 1.06 : 1.0,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Outer dashed antique gold circle */}
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#c9a45a"
                strokeWidth="0.9"
                strokeDasharray="4 4"
                opacity="0.75"
              />
              <circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="#ffd27d"
                strokeWidth="1.2"
                opacity="0.5"
              />
              {/* 8 Cardinal Folk Chevron Ray Accents */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + Math.cos(rad) * 78;
                const y1 = 100 + Math.sin(rad) * 78;
                const x2 = 100 + Math.cos(rad) * 85;
                const y2 = 100 + Math.sin(rad) * 85;
                return (
                  <line
                    key={`ray-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#ffd27d"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Central Folk Art Flower & Diamond Motif */}
          <svg
            viewBox="0 0 220 220"
            className="w-full h-full drop-shadow-[0_0_30px_rgba(201,164,90,0.6)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="folkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff0d0" />
                <stop offset="40%" stopColor="#ffd27d" />
                <stop offset="80%" stopColor="#c9a45a" />
                <stop offset="100%" stopColor="#8b5a1a" />
              </linearGradient>
              <linearGradient id="folkTerracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d96b43" />
                <stop offset="60%" stopColor="#b84c2a" />
                <stop offset="100%" stopColor="#6b1d28" />
              </linearGradient>
            </defs>

            {/* Central 8-Petal Blossom */}
            <g transform="translate(110, 110)">
              {/* Central Golden Bindu */}
              <circle cx="0" cy="0" r="10" fill="url(#folkGoldGrad)" stroke="#fff0d0" strokeWidth="1" />

              {/* 8 Radiating Phulkari Diamond Petals */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <g key={`diamond-${i}`} transform={`rotate(${angle})`}>
                    <polygon
                      points="0,-16 12,-34 0,-52 -12,-34"
                      fill="url(#folkGoldGrad)"
                      stroke="#c9a45a"
                      strokeWidth="0.8"
                      opacity="0.95"
                    />
                    <circle cx="0" cy="-34" r="2.5" fill="#140a06" />
                  </g>
                );
              })}

              {/* Outer Terracotta Folk Leaves */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8 + 22.5;
                return (
                  <g key={`leaf-${i}`} transform={`rotate(${angle})`}>
                    <path
                      d="M 0,-18 Q 8,-42 0,-58 Q -8,-42 0,-18"
                      fill="url(#folkTerracottaGrad)"
                      opacity="0.85"
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Sanskriti Signature Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase !== 'phase1-dark' ? 0.95 : 0,
            y: phase !== 'phase1-dark' ? 0 : 8,
          }}
          transition={{ duration: 0.8 }}
          className="mt-4 space-y-1.5 pointer-events-none"
        >
          <p className="font-rozha text-sm sm:text-base text-[#ffd27d] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            लोक कला • जीवंत परंपरा
          </p>
          <p className="font-cinzel text-[10px] sm:text-[11px] text-[#e8c46a] tracking-[0.30em] uppercase font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            ENTERING THE LIVING CANVAS
          </p>
          <p className="font-marcellus text-xs text-[#c5a059] tracking-[0.20em] uppercase italic mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Folk Arts of Haryana
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
