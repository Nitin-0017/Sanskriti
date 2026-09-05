import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FULL_TITLE = "SANSKRITI";
const TOTAL_LETTERS = 9; // 'S','A','N','S','K','R','I','T','I'

// Check session storage to see if reveal has already played
const checkHasRevealed = () => {
  try {
    return typeof window !== 'undefined' && window.sessionStorage.getItem('sanskriti_typewriter_revealed') === 'true';
  } catch (e) {
    return false;
  }
};

/**
 * BrandReveal Component
 * Displays the majestic classical typography, museum-grade tagline, and antique engraved CTA
 */
export default function BrandReveal({ onBeginJourney }) {
  const isAlreadyDone = checkHasRevealed();

  // If already revealed in this session, start at full 9 letters ('SANSKRITI').
  // Otherwise, start at 1 ('S') so the title is visibly present from frame 1!
  const [revealedCount, setRevealedCount] = useState(isAlreadyDone ? TOTAL_LETTERS : 1);
  const [isCompleted, setIsCompleted] = useState(isAlreadyDone);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isAlreadyDone || isCompleted) {
      setRevealedCount(TOTAL_LETTERS);
      setIsCompleted(true);
      return;
    }

    // Letter-by-letter reveal:
    // S (1) -> SA (2) -> SAN (3) -> SANS (4) -> SANSK (5) -> SANSKR (6) -> SANSKRI (7) -> SANSKRIT (8) -> SANSKRITI (9)
    let count = 1;
    timerRef.current = setInterval(() => {
      count += 1;
      setRevealedCount(count);

      if (count >= TOTAL_LETTERS) {
        clearInterval(timerRef.current);
        setIsCompleted(true);
        try {
          window.sessionStorage.setItem('sanskriti_typewriter_revealed', 'true');
        } catch (e) {}
      }
    }, 95);

    // Hard fallback safety: guarantee full title is permanently visible after 1.2s
    const safetyTimeout = setTimeout(() => {
      setRevealedCount(TOTAL_LETTERS);
      setIsCompleted(true);
    }, 1200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(safetyTimeout);
    };
  }, [isAlreadyDone, isCompleted]);

  const handleCtaClick = () => {
    if (window.playTempleChime) window.playTempleChime();
    if (onBeginJourney) onBeginJourney();
  };

  // The displayed text slice: guaranteed between 1 and 9 characters, NEVER blank
  const currentText = isCompleted
    ? FULL_TITLE
    : FULL_TITLE.slice(0, Math.min(TOTAL_LETTERS, Math.max(1, revealedCount)));

  return (
    <div className="relative z-50 flex flex-col items-center text-center px-4 max-w-5xl mx-auto select-none pointer-events-auto">
      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.35em" }}
        animate={{ opacity: 1, letterSpacing: "0.28em" }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="relative flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-marcellus text-[#f5ebd7] uppercase tracking-[0.28em] font-medium mb-2 sm:mb-3 px-4 py-1"
      >
        {/* Soft, feather-faded dark mist backing directly behind tagline — dissolves seamlessly into artwork */}
        <div
          className="absolute inset-0 -inset-x-8 rounded-full pointer-events-none -z-10 bg-radial from-[rgba(15,9,5,0.72)] via-[rgba(15,9,5,0.35)] to-transparent blur-md"
        />

        <span className="w-5 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#e8c878]/90" />
        <span
          style={{
            textShadow: '0 1px 3px rgba(10, 5, 2, 0.95), 0 2px 10px rgba(10, 5, 2, 0.9), 0 0 16px rgba(15, 8, 3, 0.8)',
          }}
        >
          Walk Through The Stories Of India
        </span>
        <span className="w-5 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#e8c878]/90" />
      </motion.div>

      {/* Main Title: SANSKRITI
          - Always visible opacity: 1
          - High contrast golden parchment styling
          - One-time typewriter sequence
          - Permanently static once completed, no blinking cursor
      */}
      <h1
        className="relative font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#fff6db] my-1 sm:my-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] select-none pointer-events-none"
        style={{
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
          textShadow: '0 0 35px rgba(212, 175, 55, 0.5), 0 4px 16px rgba(0, 0, 0, 0.95)',
        }}
        aria-label="SANSKRITI"
      >
        {isCompleted ? (
          // Static permanent final state - zero cursor, zero loop
          <span>{FULL_TITLE}</span>
        ) : (
          <span className="inline-block relative">
            <span className="text-[#fff6db]">{currentText}</span>
            {/* Elegant classical gold stylus glimmer ONLY while letters are typing */}
            {revealedCount < TOTAL_LETTERS && (
              <span
                className="inline-block w-[2px] sm:w-[3px] h-[0.7em] bg-gradient-to-b from-[#ffd27d] via-[#d4af37] to-transparent ml-1 align-middle shadow-[0_0_12px_#ffd27d]"
                aria-hidden="true"
              />
            )}
            {/* Ghost characters to preserve width without jitter */}
            <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
              {FULL_TITLE.slice(Math.min(TOTAL_LETTERS, Math.max(1, revealedCount)))}
            </span>
          </span>
        )}
      </h1>

      {/* Sub-motto: Explore. Discover. Preserve. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="relative flex items-center gap-2 sm:gap-4 font-cinzel text-[11px] sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.35em] text-[#f3e6cd] uppercase font-semibold mt-1 mb-7 sm:mb-9 px-4 py-0.5"
      >
        {/* Soft, feather-faded dark mist behind sub-motto */}
        <div
          className="absolute inset-0 -inset-x-6 rounded-full pointer-events-none -z-10 bg-radial from-[rgba(14,8,4,0.65)] via-[rgba(14,8,4,0.28)] to-transparent blur-md"
        />

        <span style={{ textShadow: '0 1px 3px rgba(10, 5, 2, 0.95), 0 2px 8px rgba(10, 5, 2, 0.85)' }}>Explore</span>
        <span className="text-[#dfb86c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">•</span>
        <span style={{ textShadow: '0 1px 3px rgba(10, 5, 2, 0.95), 0 2px 8px rgba(10, 5, 2, 0.85)' }}>Discover</span>
        <span className="text-[#dfb86c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">•</span>
        <span style={{ textShadow: '0 1px 3px rgba(10, 5, 2, 0.95), 0 2px 8px rgba(10, 5, 2, 0.85)' }}>Preserve</span>
      </motion.div>

      {/* Central CTA: BEGIN JOURNEY */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="flex flex-col items-center gap-3"
      >
        <button
          onClick={handleCtaClick}
          className="btn-antique-journey group px-8 sm:px-11 py-3.5 sm:py-4 rounded-sm flex items-center gap-3.5 cursor-pointer"
        >
          {/* Subtle Inner Engraved Border */}
          <div className="absolute inset-[3px] border border-[#d4af37]/30 pointer-events-none rounded-[1px]" />

          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#fff7df] group-hover:text-[#ffffff] transition-colors uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Begin Journey
          </span>

          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd27d] transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}
