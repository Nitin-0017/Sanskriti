import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cultural Accent Motif rendered dynamically in the center of the transition:
 * Adapts to the destination tradition (Phulkari, Saanjhi, Chowk Purana, Wall Art,
 * Folk Music, Saang, Puppetry, Textiles, Motifs, Surajkund, Artisans, Today).
 */
function TransitionMotif({ accent = 'folk-arts' }) {
  switch (accent) {
    case 'phulkari':
      // Subtle needle & stepped embroidery diamond with radiating golden thread lines
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.polygon
            points="60,15 105,60 60,105 15,60"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.polygon
            points="60,30 90,60 60,90 30,60"
            stroke="#e5b358"
            strokeWidth="1.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <circle cx="60" cy="60" r="3" fill="#ffd27d" />
        </svg>
      );

    case 'saanjhi':
      // Paper-cut floral stencil rosette
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.circle
            cx="60"
            cy="60"
            r="44"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 45, opacity: 0.8 }}
            transition={{ duration: 0.7 }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <motion.path
              key={deg}
              d="M60 60 C55 35 65 35 60 20 C55 35 65 35 60 60"
              stroke="#e5b358"
              strokeWidth="1.2"
              transform={`rotate(${deg} 60 60)`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            />
          ))}
          <circle cx="60" cy="60" r="4" fill="#ffd27d" />
        </svg>
      );

    case 'chowk-purana':
    case 'motifs':
      // Sacred geometric cosmic diamond mandala
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.polygon
            points="60,10 110,60 60,110 10,60"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.5 }}
          />
          <motion.polygon
            points="60,25 95,60 60,95 25,60"
            stroke="#e5b358"
            strokeWidth="1"
            strokeDasharray="2 2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <circle cx="60" cy="60" r="4" fill="#ffd27d" />
        </svg>
      );

    case 'wall-art':
      // Ochre mural arch & auspicious symbol
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.path
            d="M 25,95 C 25,45 95,45 95,95"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.circle
            cx="60"
            cy="52"
            r="16"
            stroke="#e5b358"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          />
          <circle cx="60" cy="52" r="3" fill="#ffd27d" />
        </svg>
      );

    case 'folk-music':
    case 'folk-theatre':
    case 'seasonal-arts':
      // Acoustic resonance sound wave / double-reed Been drone
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.path
            d="M 10,60 Q 35,30 60,60 T 110,60"
            stroke="currentColor"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M 10,60 Q 35,90 60,60 T 110,60"
            stroke="#e5b358"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <circle cx="60" cy="60" r="3.5" fill="#ffd27d" />
        </svg>
      );

    case 'surajkund':
      // 10th-century Surya sun reservoir stepped disc
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.circle
            cx="60"
            cy="60"
            r="38"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={{ rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 0.9, ease: 'linear' }}
          />
          <motion.circle
            cx="60"
            cy="60"
            r="26"
            stroke="#e5b358"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ rotate: 0 }}
            animate={{ rotate: -90 }}
            transition={{ duration: 0.9, ease: 'linear' }}
          />
          <circle cx="60" cy="60" r="5" fill="#ffd27d" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="60"
              x2={60 + 36 * Math.cos((deg * Math.PI) / 180)}
              y2={60 + 36 * Math.sin((deg * Math.PI) / 180)}
              stroke="#e5b358"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      );

    case 'textiles':
      // Panja weave chevrons
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.path
            d="M 20,40 L 60,70 L 100,40"
            stroke="currentColor"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M 20,60 L 60,90 L 100,60"
            stroke="#e5b358"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <circle cx="60" cy="70" r="3" fill="#ffd27d" />
        </svg>
      );

    case 'artisans':
      // Guild hallmark
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
          <polygon points="60,34 78,60 60,86 42,60" stroke="#e5b358" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="3.5" fill="#ffd27d" />
        </svg>
      );

    default:
      // Haryana Folk Lotus of Eternity
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#ffd27d]" fill="none">
          <motion.circle
            cx="60"
            cy="60"
            r="38"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M 60,30 C 50,45 50,65 60,85 C 70,65 70,45 60,30 Z"
            stroke="#e5b358"
            strokeWidth="1.3"
            fill="#ffd27d"
            fillOpacity="0.15"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <circle cx="60" cy="58" r="3.5" fill="#ffd27d" />
        </svg>
      );
  }
}

/**
 * FolkArtsChapterTransition
 * Handcrafted Indian manuscript / cultural archive chapter-to-chapter transition
 * Duration: ~900ms
 */
export default function FolkArtsChapterTransition({
  isActive,
  destinationMeta = {
    title: 'FOLK ARTS OF HARYANA',
    subtitle: 'डिजिटल सांस्कृतिक अभिलेखागार',
    accent: 'folk-arts',
  },
}) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="folk-arts-chapter-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-[#0c0502]/92 backdrop-blur-[3px]"
        >
          {/* Subtle floating golden dust motes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 19 + 5) % 95}vw`,
                  y: `${(i * 23 + 10) % 90}vh`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: ['-5vh', '105vh'],
                  opacity: [0, 0.45, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.1 + (i % 4) * 0.25,
                  ease: 'linear',
                }}
                className="absolute w-1 h-1 rounded-full bg-[#ffd27d]"
              />
            ))}
          </div>

          {/* Central Chapter Title & Handcrafted Golden Horizontal Line */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-6 max-w-2xl text-center">
            {/* Destination Accent Motif */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <TransitionMotif accent={destinationMeta.accent} />
            </motion.div>

            {/* Destination Chapter Header & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-1.5"
            >
              <span className="text-[10px] font-cinzel text-[#c5a059] tracking-[0.35em] uppercase block font-semibold">
                ENTERING CHAPTER
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl text-[#ffd27d] tracking-[0.16em] uppercase font-normal">
                {destinationMeta.title}
              </h2>
              {destinationMeta.subtitle && (
                <p className="font-cormorant italic text-lg sm:text-2xl text-[#f5ebd7]/95">
                  {destinationMeta.subtitle}
                </p>
              )}
            </motion.div>

            {/* Thin hand-drawn travelling golden line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0.8, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-48 sm:w-80 h-[1px] bg-gradient-to-r from-transparent via-[#ffd27d] to-transparent pt-1"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
