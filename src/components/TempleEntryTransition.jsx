import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../services/audioManager';

/**
 * CINEMATIC TEMPLE ENTRY TRANSITION: FROM DARKNESS TO DIVINE KNOWLEDGE
 * 
 * Target Total Duration: ~5.6–5.7 seconds
 * 
 * Timeline & Exact Stages:
 * 0.0s – 0.7s: PHASE 1 — PURE BLACK
 *   - Completely dark empty screen (#000000), no temple, no SVG, no text.
 * 0.7s – 1.6s: PHASE 2 — DIYA SVG APPEARS
 *   - Diya appears in the center in darkness, moderate scale, gentle opacity.
 * 1.6s – 2.7s: PHASE 3 — FLAME IGNITES
 *   - Flame awakens and burns bright, halo forms, subtle sparks float up.
 * 2.7s – 4.1s: PHASE 4 — LIGHT EXPANDS
 *   - Golden light gradually expands outward from diya, illuminating darkness.
 *   - Background shifts: black → deep brown → warm temple amber tones.
 * 4.1s – 5.3s: PHASE 5 — TEMPLE REVEALS THROUGH THE LIGHT
 *   - Temple architecture fades in gradually: opacity 0 → 0.25 → 0.5 → 0.75 → 1.
 *   - Golden glow softly blends into natural temple illumination.
 * 5.3s – 5.7s: PHASE 6 — TEMPLE PAGE FULLY REVEALED
 *   - Diya dissolves away, transition finishes, temple page takes over cleanly.
 */
export default function TempleEntryTransition({ temple, onComplete }) {
  // Phase state machine:
  // 'phase1-black' | 'phase2-diya-appear' | 'phase3-flame-ignite' | 'phase4-light-expand' | 'phase5-temple-reveal' | 'phase6-settle'
  const [phase, setPhase] = useState('phase1-black');

  // Ref keeps onComplete stable so re-renders NEVER reset or cancel transition timers
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reduced motion support
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // 1. Audio Synchronization:
    // Flute & Birds continue playing uninterrupted.
    // Deep temple bell strikes at 0.0s, subtle shankh sounds at 1.8s in Phase 3,
    // temple ambience + diya loop fade in at ~4.0s in Phase 5.
    audioManager.enterTemple();

    if (isReducedMotion) {
      const quickTimer = setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 700);
      return () => clearTimeout(quickTimer);
    }

    // =========================================================================
    // EXACT 6-STAGE TIMELINE (~5.7 SECONDS TOTAL)
    // =========================================================================

    // 0.0s – 0.7s: PHASE 1 — PURE BLACK (Active on mount)

    // 0.7s – 1.6s: PHASE 2 — DIYA SVG APPEARS (~0.9s duration)
    const tPhase2 = setTimeout(() => {
      setPhase('phase2-diya-appear');
    }, 700);

    // 1.6s – 2.7s: PHASE 3 — FLAME IGNITES (~1.1s duration)
    const tPhase3 = setTimeout(() => {
      setPhase('phase3-flame-ignite');
    }, 1600);

    // 2.7s – 4.1s: PHASE 4 — LIGHT EXPANDS (~1.4s duration)
    const tPhase4 = setTimeout(() => {
      setPhase('phase4-light-expand');
    }, 2700);

    // 4.1s – 5.3s: PHASE 5 — TEMPLE REVEALS THROUGH THE LIGHT (~1.2s duration)
    const tPhase5 = setTimeout(() => {
      setPhase('phase5-temple-reveal');
    }, 4100);

    // 5.3s – 5.7s: PHASE 6 — TEMPLE PAGE SETTLES (~0.4s duration)
    const tPhase6 = setTimeout(() => {
      setPhase('phase6-settle');
    }, 5300);

    // 5.7s: COMPLETION HANDOFF (Clean reveal of interactive temple page)
    const tComplete = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 5700);

    return () => {
      clearTimeout(tPhase2);
      clearTimeout(tPhase3);
      clearTimeout(tPhase4);
      clearTimeout(tPhase5);
      clearTimeout(tPhase6);
      clearTimeout(tComplete);
    };
  }, [isReducedMotion]);

  // Determine temple backdrop image
  const templeImg = temple?.heroImg || temple?.image || temple?.img || '/assets/temple_interior_walkthrough.jpg';

  // Golden embers for Phase 3, 4, 5
  const embers = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${15 + ((i * 7.9) % 70)}%`,
    top: `${22 + ((i * 11.7) % 52)}%`,
    size: `${1.5 + (i % 3) * 1.6}px`,
    duration: 2.2 + (i % 4) * 0.5,
    delay: (i % 6) * 0.15,
  }));

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden flex items-center justify-center"
      animate={{
        backgroundColor: 
          phase === 'phase1-black' || phase === 'phase2-diya-appear' || phase === 'phase3-flame-ignite' ? '#000000' :
          phase === 'phase4-light-expand' ? '#180d06' :
          '#0c0603',
      }}
      transition={{ 
        duration: phase === 'phase4-light-expand' ? 1.4 : 0.8,
        ease: 'easeInOut' 
      }}
    >
      {/* ====================================================================
          PHASE 5: TEMPLE REVEAL THROUGH THE LIGHT
          Fades in gradually behind the diya: opacity 0 -> 0.25 -> 0.5 -> 0.75 -> 1.0.
          Temple looks as if the diya's light is physically revealing it.
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(16px) brightness(0.2)', scale: 1.06 }}
        animate={{
          opacity: 
            phase === 'phase1-black' || phase === 'phase2-diya-appear' || phase === 'phase3-flame-ignite' ? 0 :
            phase === 'phase4-light-expand' ? 0.08 :
            phase === 'phase5-temple-reveal' || phase === 'phase6-settle' ? 1.0 : 0,
          filter: 
            phase === 'phase5-temple-reveal' || phase === 'phase6-settle' ? 'blur(0px) brightness(1.0)' :
            phase === 'phase4-light-expand' ? 'blur(12px) brightness(0.4)' : 'blur(16px) brightness(0.2)',
          scale: 
            phase === 'phase5-temple-reveal' || phase === 'phase6-settle' ? 1.0 :
            phase === 'phase4-light-expand' ? 1.03 : 1.06,
        }}
        transition={{ 
          duration: phase === 'phase5-temple-reveal' ? 1.2 : 0.8, 
          ease: [0.25, 1, 0.5, 1] 
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: `url('${templeImg}')` }}
      >
        {/* Deep sanctum atmospheric shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-transparent to-[#0c0704]/70 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(10,5,2,0.92)] pointer-events-none" />
      </motion.div>

      {/* ====================================================================
          PHASE 4: EXPANDING RADIAL GOLDEN FIRELIGHT
          small golden light → larger halo → large radial illumination → screen softly lit
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{
          opacity: 
            phase === 'phase1-black' ? 0 :
            phase === 'phase2-diya-appear' ? 0.22 :
            phase === 'phase3-flame-ignite' ? 0.55 :
            phase === 'phase4-light-expand' ? 0.95 :
            phase === 'phase5-temple-reveal' ? 0.40 :
            0,
          scale: 
            phase === 'phase1-black' ? 0.2 :
            phase === 'phase2-diya-appear' ? 0.55 :
            phase === 'phase3-flame-ignite' ? 0.85 :
            phase === 'phase4-light-expand' ? 2.4 :
            phase === 'phase5-temple-reveal' ? 2.9 : 0.3,
        }}
        transition={{ 
          duration: 
            phase === 'phase4-light-expand' ? 1.4 : 
            phase === 'phase3-flame-ignite' ? 1.1 : 
            phase === 'phase5-temple-reveal' ? 1.2 : 0.9, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="absolute w-[850px] h-[850px] rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 230, 160, 0.72) 0%, rgba(235, 185, 90, 0.45) 30%, rgba(184, 115, 34, 0.22) 58%, rgba(0, 0, 0, 0) 78%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Secondary Diffuse Warmth: Illuminates the surrounding darkness during Phase 4 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 
            phase === 'phase1-black' || phase === 'phase2-diya-appear' ? 0 :
            phase === 'phase3-flame-ignite' ? 0.20 :
            phase === 'phase4-light-expand' ? 0.78 :
            phase === 'phase5-temple-reveal' ? 0.25 : 0,
        }}
        transition={{ 
          duration: phase === 'phase4-light-expand' ? 1.4 : 1.0,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(212, 168, 79, 0.32) 0%, rgba(140, 80, 20, 0.18) 55%, transparent 85%)',
        }}
      />

      {/* Floating Sacred Golden Particles/Sparks (Phases 3, 4, 5) */}
      {(phase === 'phase3-flame-ignite' || phase === 'phase4-light-expand' || phase === 'phase5-temple-reveal') && (
        <div className="absolute inset-0 pointer-events-none z-15">
          {embers.map((ember) => (
            <motion.div
              key={ember.id}
              initial={{ opacity: 0, y: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 0.95, 0],
                y: [-8, -65 - (ember.id % 3) * 25],
                x: [(ember.id % 2 === 0 ? 1 : -1) * (ember.id * 2.2), (ember.id % 2 === 0 ? 1 : -1) * (ember.id * 4.8)],
                scale: [0.7, 1.3, 0.3],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                ease: 'easeOut',
              }}
              className="absolute rounded-full bg-[#ffd27d] shadow-[0_0_12px_#ffd27d]"
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
          PHASES 2, 3, 4, 5: CENTRAL SACRED DIYA & FLAME
          Phase 1: 0% opacity (pure black).
          Phase 2: Gradually appears (scale 0.92 -> 1.0, opacity 0 -> 1.0).
          Phase 3: Flame awakens & burns bright, halo turns on.
          Phase 4: Becomes radiant, light expands outward.
          Phase 5: Golden glow connects with temple backdrop.
          Phase 6: Dissolves away smoothly over ~0.4s to reveal the temple page.
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 
            phase === 'phase1-black' ? 0 :
            phase === 'phase2-diya-appear' ? 1.0 :
            phase === 'phase3-flame-ignite' ? 1.0 :
            phase === 'phase4-light-expand' ? 1.0 :
            phase === 'phase5-temple-reveal' ? 0.90 :
            0,
          scale: 
            phase === 'phase1-black' ? 0.92 :
            phase === 'phase2-diya-appear' ? 1.0 :
            phase === 'phase3-flame-ignite' ? 1.02 :
            phase === 'phase4-light-expand' ? 1.05 :
            phase === 'phase5-temple-reveal' ? 1.04 :
            1.08,
        }}
        transition={{ 
          duration: 
            phase === 'phase2-diya-appear' ? 0.9 :
            phase === 'phase4-light-expand' ? 1.4 :
            phase === 'phase6-settle' ? 0.45 : 0.8, 
          ease: [0.25, 1, 0.5, 1] 
        }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-sm"
      >
        {/* Sacred Diya & Lotus Halo SVG Container */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          
          {/* Subtle Outer Halo Ring (Mandala Light) */}
          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
            animate={{
              opacity: 
                phase === 'phase1-black' ? 0 :
                phase === 'phase2-diya-appear' ? 0.25 :
                phase === 'phase3-flame-ignite' ? 0.70 :
                phase === 'phase4-light-expand' ? 0.90 :
                phase === 'phase5-temple-reveal' ? 0.50 : 0,
              rotate: 
                phase === 'phase4-light-expand' || phase === 'phase5-temple-reveal' ? 14 : 0,
              scale: 
                phase === 'phase4-light-expand' ? 1.08 : 1.0,
            }}
            transition={{ 
              duration: phase === 'phase4-light-expand' ? 1.4 : 1.0, 
              ease: 'easeOut' 
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Outer decorative ring */}
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#D4A84F"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                opacity="0.65"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#E8C46A"
                strokeWidth="1.2"
                opacity="0.45"
              />
              {/* Sacred 8-Point Ray Accents */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + Math.cos(rad) * 80;
                const y1 = 100 + Math.sin(rad) * 80;
                const x2 = 100 + Math.cos(rad) * 86;
                const y2 = 100 + Math.sin(rad) * 86;
                return (
                  <line
                    key={`ray-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F5D98B"
                    strokeWidth="0.9"
                    opacity="0.5"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Central Sacred Diya & Lotus SVG */}
          <motion.svg
            viewBox="0 0 220 220"
            className="w-full h-full"
            style={{
              filter: 
                phase === 'phase1-black' ? 'drop-shadow(0 0 0px rgba(0,0,0,0))' :
                phase === 'phase2-diya-appear' ? 'drop-shadow(0 0 16px rgba(212,168,79,0.35))' :
                phase === 'phase3-flame-ignite' ? 'drop-shadow(0 0 32px rgba(235,185,90,0.65))' :
                'drop-shadow(0 0 46px rgba(255,225,140,0.92))'
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Flame Radial Aura Gradient */}
              <radialGradient id="flameInnerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#FFF4D0" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#F5D98B" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#E8C46A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4A84F" stopOpacity="0" />
              </radialGradient>

              {/* Flame Main Body Gradient */}
              <linearGradient id="flameBodyGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#D4A84F" />
                <stop offset="25%" stopColor="#E8A838" />
                <stop offset="55%" stopColor="#F5D98B" />
                <stop offset="85%" stopColor="#FFF2C6" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              {/* Gold Diya Metal / Brass Gradient */}
              <linearGradient id="goldPedestalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D98B" />
                <stop offset="45%" stopColor="#D4A84F" />
                <stop offset="70%" stopColor="#9C7228" />
                <stop offset="100%" stopColor="#D4A84F" />
              </linearGradient>
            </defs>

            {/* Sacred Pedestal / Diya Base */}
            <g transform="translate(10, 8)">
              {/* Lower Stand / Foot */}
              <path
                d="M 80 155 C 80 162, 88 166, 100 166 C 112 166, 120 162, 120 155 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#E8C46A"
                strokeWidth="1.2"
                opacity="0.9"
              />

              {/* Diya Bowl (Traditional Indian Clay/Brass Katori) */}
              <path
                d="M 45 138 C 55 158, 145 158, 155 138 C 150 144, 130 150, 100 150 C 70 150, 50 144, 45 138 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#F5D98B"
                strokeWidth="1.4"
              />

              {/* Lotus Petals Radiating Beneath the Diya */}
              {/* Outer Left Petal */}
              <path
                d="M 46 138 C 30 125, 42 110, 58 122 C 52 128, 48 133, 46 138 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#D4A84F"
                strokeWidth="1"
                opacity="0.85"
              />
              {/* Outer Right Petal */}
              <path
                d="M 154 138 C 170 125, 158 110, 142 122 C 148 128, 152 133, 154 138 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#D4A84F"
                strokeWidth="1"
                opacity="0.85"
              />

              {/* Inner Petal Left */}
              <path
                d="M 64 142 C 55 120, 75 106, 85 125 C 77 131, 70 137, 64 142 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#E8C46A"
                strokeWidth="1.1"
              />
              {/* Inner Petal Right */}
              <path
                d="M 136 142 C 145 120, 125 106, 115 125 C 123 131, 130 137, 136 142 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#E8C46A"
                strokeWidth="1.1"
              />

              {/* Central Petal Plinth */}
              <path
                d="M 85 147 C 82 130, 100 115, 100 115 C 100 115, 118 130, 115 147 Z"
                fill="url(#goldPedestalGrad)"
                stroke="#F5D98B"
                strokeWidth="1.2"
              />

              {/* Oil / Ghee Surface Line */}
              <ellipse
                cx="100"
                cy="138"
                rx="48"
                ry="7"
                fill="#2E1808"
                stroke="#E8C46A"
                strokeWidth="1"
                opacity="0.85"
              />
            </g>

            {/* ================================================================
                THE SACRED FLAME (Ignites in Phase 3, blazes radiant in Phase 4)
                ================================================================ */}
            <motion.g
              initial={{ scaleY: 0.35, scaleX: 0.45, opacity: 0.4 }}
              animate={{
                scaleY: 
                  phase === 'phase1-black' ? 0.2 :
                  phase === 'phase2-diya-appear' ? 0.5 :
                  phase === 'phase3-flame-ignite' ? 1.05 :
                  phase === 'phase4-light-expand' ? 1.12 :
                  phase === 'phase5-temple-reveal' ? 1.02 : 0,
                scaleX: 
                  phase === 'phase1-black' ? 0.3 :
                  phase === 'phase2-diya-appear' ? 0.6 :
                  phase === 'phase3-flame-ignite' ? 1.0 :
                  phase === 'phase4-light-expand' ? 1.06 :
                  phase === 'phase5-temple-reveal' ? 1.0 : 0,
                opacity: 
                  phase === 'phase1-black' ? 0 :
                  phase === 'phase2-diya-appear' ? 0.65 :
                  phase === 'phase3-flame-ignite' || phase === 'phase4-light-expand' || phase === 'phase5-temple-reveal' ? 1.0 : 0,
              }}
              transition={{
                duration: phase === 'phase3-flame-ignite' ? 1.1 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: '110px 144px' }}
            >
              {/* Outer Golden Fire Aura */}
              <circle
                cx="110"
                cy="110"
                r="36"
                fill="url(#flameInnerGlow)"
                className="animate-pulse"
                opacity="0.85"
              />

              {/* Outer Flame Contour */}
              <path
                d="M 110 52 C 90 85, 92 118, 98 136 C 102 144, 118 144, 122 136 C 128 118, 130 85, 110 52 Z"
                fill="url(#flameBodyGrad)"
                stroke="#FFF4D0"
                strokeWidth="0.8"
              />

              {/* Inner Radiant Core Flame (Pure White & Golden Essence) */}
              <path
                d="M 110 74 C 98 98, 100 124, 104 136 C 106 141, 114 141, 116 136 C 120 124, 122 98, 110 74 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />

              {/* Tiny Center Bindu of Pure Light */}
              <circle
                cx="110"
                cy="128"
                r="4.5"
                fill="#FFFFFF"
                className="animate-ping opacity-75"
              />
            </motion.g>
          </motion.svg>
        </div>

        {/* Sacred Sanskrit Invocation & Temple Threshold Benediction */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 
              phase === 'phase1-black' || phase === 'phase2-diya-appear' ? 0 :
              phase === 'phase3-flame-ignite' ? 0.70 :
              phase === 'phase4-light-expand' ? 1.0 :
              phase === 'phase5-temple-reveal' ? 0.40 : 0,
            y: 
              phase === 'phase1-black' || phase === 'phase2-diya-appear' ? 8 :
              phase === 'phase3-flame-ignite' || phase === 'phase4-light-expand' ? 0 : -4,
          }}
          transition={{ 
            duration: 0.8,
            ease: 'easeOut'
          }}
          className="mt-4 space-y-1.5 pointer-events-none"
        >
          <p className="font-rozha text-sm sm:text-base text-[#f5d98b] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            तमसो मा ज्योतिर्गमय
          </p>
          <p className="font-cinzel text-[10px] sm:text-[11px] text-[#e8c46a] tracking-[0.32em] uppercase font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            ENTERING SACRED SANCTUM
          </p>
          {temple?.name && (
            <p className="font-marcellus text-xs text-[#d6b278] tracking-[0.20em] uppercase italic mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {temple.name}
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
