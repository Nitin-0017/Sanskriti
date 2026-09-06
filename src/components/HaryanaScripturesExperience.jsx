import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw,
  Sparkles, 
  X, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Layers,
  Flame,
  Library,
  Compass,
  Check,
  FileText,
  Bookmark,
  Scroll,
  History
} from 'lucide-react';
import { SACRED_MANUSCRIPTS_COLLECTION, SCRIPTURE_WORDS_GLOSSARY } from '../data/manuscriptBookData';
import AudioControl from './AudioControl';

// Web Audio API Synthesizer for tactile feedback (wax snap & paper rustle)
function playTactileSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    if (type === 'seal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'paper') {
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 750;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }
  } catch (e) {
    // Graceful fallback
  }
}

// ============================================================================
// SACRED EMBLEM RENDERER FOR PHYSICAL BOOK COVERS (SHELF & SPINE)
// ============================================================================
function ShelfBookEmblem({ id, color = '#c5a059' }) {
  if (id === 'bhagavad-gita') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
        <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
        <text x="18" y="23.5" textAnchor="middle" fill={color} fontSize="15" fontFamily="serif" fontWeight="bold">ॐ</text>
      </svg>
    );
  }
  if (id === 'ramayana') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
        <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
        <path d="M11 25 C 13 14, 23 12, 25 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="25" x2="25" y2="11" stroke={color} strokeWidth="0.8" strokeDasharray="1 1" />
        <line x1="18" y1="18" x2="26" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <polyline points="23,10 26,10 26,13" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'mahabharata') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
        <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
        <circle cx="18" cy="18" r="3.5" stroke={color} strokeWidth="1.2" fill="rgba(197, 160, 89, 0.25)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line 
            key={deg}
            x1="18" 
            y1="18" 
            x2={18 + 9.5 * Math.cos((deg * Math.PI) / 180)} 
            y2={18 + 9.5 * Math.sin((deg * Math.PI) / 180)} 
            stroke={color} 
            strokeWidth="0.9" 
          />
        ))}
      </svg>
    );
  }
  if (id === 'vedas') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
        <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
        <path d="M18 9 C20 13, 23 16, 22 21 C21 25, 19 26, 18 26 C17 26, 15 25, 14 21 C13 16, 16 13, 18 9 Z" fill="rgba(214,160,89,0.3)" stroke={color} strokeWidth="1" />
        <path d="M18 15 C19 17, 21 19, 20 22 C19 24, 18 25, 18 25 C18 25, 17 24, 16 22 C15 19, 17 17, 18 15 Z" fill={color} />
      </svg>
    );
  }
  if (id === 'upanishads') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
        <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
        <path d="M18 25 L18 19 M18 19 Q12 16 11 12 Q16 13 18 18 Q20 13 25 12 Q24 16 18 19 M18 16 Q15 10 18 7 Q21 10 18 16" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  // Puranas (Sacred 8-Petal Lotus)
  return (
    <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
      <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="18" cy="18" r="13.5" stroke={color} strokeWidth="0.8" />
      <path d="M18 12 C20 15, 20 19, 18 23 C16 19, 16 15, 18 12 Z" fill="rgba(214,160,89,0.25)" stroke={color} strokeWidth="0.9" />
      <path d="M18 23 C14 23, 11 19, 13 15 C15 17, 16 20, 18 23 Z" fill="rgba(214,160,89,0.2)" stroke={color} strokeWidth="0.9" />
      <path d="M18 23 C22 23, 25 19, 23 15 C21 17, 20 20, 18 23 Z" fill="rgba(214,160,89,0.2)" stroke={color} strokeWidth="0.9" />
    </svg>
  );
}

// ============================================================================
// SACRED MINIATURE ARTWORK RENDERER (LEFT FOLIO)
// ============================================================================
function ManuscriptArtwork({ folio, manuscript }) {
  if (folio.artworkType === 'yantra') {
    return (
      <div className="space-y-4 my-auto flex flex-col items-center">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-[#8a5d28]/70 p-2 flex items-center justify-center bg-[#dbbf92]/60 shadow-inner">
          <div className="absolute inset-2 border border-[#8a5d28]/40 border-dashed rounded-full animate-[spin_80s_linear_infinite]" />
          <svg viewBox="0 0 160 160" className="w-full h-full text-[#7a4e20]" fill="none">
            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
            <polygon points="80,18 98,62 144,62 108,90 122,134 80,108 38,134 52,90 16,62 62,62" stroke="currentColor" strokeWidth="1.2" fill="rgba(197, 160, 89, 0.12)" />
            <circle cx="80" cy="80" r="30" stroke="currentColor" strokeWidth="1" fill="rgba(197, 160, 89, 0.15)" />
            <text x="80" y="88" textAnchor="middle" fill="#240f04" fontSize="28" fontFamily="serif" fontWeight="bold">ॐ</text>
          </svg>
        </div>
        <div className="text-center space-y-0.5">
          <h4 className="text-lg sm:text-xl font-devanagari font-bold text-[#240f04]">
            {folio.leftContent.sanskrit}
          </h4>
          <span className="text-[10px] font-cinzel text-[#7a4e20] tracking-widest uppercase block font-semibold">
            {folio.leftContent.title}
          </span>
        </div>
      </div>
    );
  }

  // Miniature Painting Artwork
  return (
    <div className="space-y-2.5">
      <div className="relative w-full aspect-[4/3] rounded overflow-hidden border-2 border-[#7a4e20]/80 shadow-[0_4px_12px_rgba(40,20,5,0.25)] bg-[#160b05]">
        <img 
          src={folio.imagePath || '/assets/literature_epic_scene.jpg'} 
          alt={folio.leftContent.title}
          className="w-full h-full object-cover filter contrast-[1.1] sepia-[0.25]"
        />
        <div className="absolute inset-0 border border-[#c5a059]/40 pointer-events-none" />
        <div className="absolute inset-1 border border-[#8a2416]/30 pointer-events-none" />
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-[11px] font-cinzel text-[#2a1306] tracking-[0.2em] uppercase font-bold block">
          {folio.leftContent.title}
        </span>
        <p className="text-[11px] sm:text-xs font-eb-garamond italic text-[#6e4118] line-clamp-2">
          {folio.leftContent.caption}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LEFT PAGE CONTENT RENDERER (ENRICHED ARCHIVAL SUBSTRATE)
// ============================================================================
function LeftPageContent({ folio, manuscript }) {
  return (
    <div className="h-full flex flex-col justify-between p-5 sm:p-7 text-left space-y-3 select-none">
      
      {/* Top Folio Badge & Marginal Provenance Note */}
      <div className="flex items-center justify-between border-b border-[#7a4e20]/30 pb-2 text-[10px] font-cinzel text-[#6e4118]">
        <span className="font-bold tracking-widest text-[#240f04]">{folio.folioNumber}</span>
        <span className="tracking-wider uppercase">{manuscript.accessionCode} · {manuscript.region}</span>
      </div>

      {/* Main Center Miniature Artwork */}
      <div className="flex-1 flex flex-col justify-center">
        <ManuscriptArtwork folio={folio} manuscript={manuscript} />
      </div>

      {/* Enriched Archival Illumination & Provenance Notes */}
      <div className="space-y-1.5 pt-2 border-t border-[#7a4e20]/25 text-[10px] font-eb-garamond text-[#543015] leading-snug">
        <div>
          <span className="font-cinzel text-[#7a4e20] text-[8px] uppercase tracking-wider font-bold block">
            ILLUMINATION NOTE
          </span>
          <p className="text-[10px] text-[#42240e]">
            {folio.leftContent.illuminationNote || 'Natural mineral pigments: lapis lazuli, cinnabar, and gold leaf. Northern monastic school.'}
          </p>
        </div>

        <div>
          <span className="font-cinzel text-[#7a4e20] text-[8px] uppercase tracking-wider font-bold block">
            REGIONAL TRANSMISSION & REDACTION
          </span>
          <p className="text-[10px] text-[#42240e]">
            {folio.leftContent.provenanceNote || `Redacted along the holy Saraswati river plain in northern Haryana. Consecrated archive of ${manuscript.region}.`}
          </p>
        </div>
      </div>

      {/* Bottom Marginal Sanskrit Symbol & Note */}
      <div className="border-t border-[#7a4e20]/25 pt-1.5 flex items-center justify-between text-[9px] font-cinzel text-[#7a4e20]">
        <span>PROVENANCE: {manuscript.region}</span>
        <span className="font-bold">ॐ TAT SAT · ARCHIVAL ACCESSION</span>
      </div>

    </div>
  );
}

// ============================================================================
// RIGHT PAGE CONTENT RENDERER (ENRICHED WITH HISTORICAL ARCHIVAL SECTIONS)
// ============================================================================
function RightPageContent({ 
  folio, 
  manuscript, 
  onWordClick, 
  onVerseClick, 
  selectedWord,
  isVerseSelected
}) {
  const words = folio.rightContent.verseSanskrit ? folio.rightContent.verseSanskrit.split(/(\s+|।|॥)/) : [];

  return (
    <div className="h-full flex flex-col justify-between p-5 sm:p-7 text-left space-y-3 select-none">
      
      {/* Top Folio Header */}
      <div className="flex items-center justify-between border-b border-[#7a4e20]/30 pb-2 text-[10px] font-cinzel text-[#6e4118]">
        <span className="font-bold tracking-wider uppercase">
          {manuscript.title} · {folio.title}
        </span>
        <span className="tracking-widest uppercase font-bold text-[#240f04]">{manuscript.region}</span>
      </div>

      {/* Center Sun/Chakra Sacred Emblem */}
      <div className="text-center my-0.5 select-none">
        <svg viewBox="0 0 40 40" className="w-5 h-5 mx-auto text-[#7a4e20]/75" fill="none">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <line x1="20" y1="2" x2="20" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="34" x2="20" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="34" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main Sanskrit Verse in Warm Dark-Brown Ink with Interactive Words & Lines */}
      <div className="space-y-3 text-center my-auto">
        {folio.rightContent.verseSanskrit && (
          <div 
            onClick={onVerseClick}
            className={`p-2 rounded transition-all cursor-pointer ${
              isVerseSelected 
                ? 'bg-[#c5a059]/20 shadow-[0_0_12px_rgba(197,160,89,0.35)]' 
                : 'hover:bg-[#c5a059]/10'
            }`}
            title="Click to view complete verse meaning in the side panel"
          >
            <div className="text-lg sm:text-xl font-devanagari font-bold manuscript-ink-sanskrit leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
              {words.map((chunk, idx) => {
                const cleanWord = chunk.replace(/[।॥,.\s]/g, '');
                const glossaryItem = SCRIPTURE_WORDS_GLOSSARY[cleanWord];
                const isSelected = selectedWord && selectedWord.word === cleanWord;

                if (!cleanWord) {
                  return <span key={idx}>{chunk}</span>;
                }

                return (
                  <span 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation(); // Don't trigger whole verse click
                      if (glossaryItem) {
                        onWordClick(glossaryItem);
                      } else {
                        // Fallback gloss
                        onWordClick({
                          word: cleanWord,
                          transliteration: cleanWord,
                          literal: 'Preserved Sanskrit term in metrical recitation',
                          meaning: 'Integral component of the canonical verse.',
                          context: `Appears in ${manuscript.title} (${folio.title}).`,
                          significance: 'Canonical phrasing.'
                        });
                      }
                    }}
                    className={`cursor-pointer rounded px-1 transition-all ${
                      isSelected
                        ? 'bg-[#b87333] text-white shadow-[0_0_8px_rgba(184,115,51,0.6)] font-bold'
                        : 'border-b border-[#7a4e20]/60 hover:bg-[#c5a059]/35 hover:text-[#1b0802]'
                    }`}
                    title={`Click to inspect '${cleanWord}' in scholar's annotation panel`}
                  >
                    {chunk}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Transliteration in IAST Italics */}
        {folio.rightContent.transliteration && (
          <p className="text-xs sm:text-sm font-eb-garamond italic manuscript-ink-secondary leading-relaxed max-w-md mx-auto whitespace-pre-line">
            {folio.rightContent.transliteration}
          </p>
        )}

        {/* English Translation */}
        {folio.rightContent.translation && (
          <div className="pt-0.5 max-w-lg mx-auto">
            <p className="text-xs sm:text-sm font-eb-garamond manuscript-ink-primary leading-relaxed">
              {folio.rightContent.translation}
            </p>
          </div>
        )}

        {/* Integrated Restrained Archival Note directly on Manuscript */}
        <div className="pt-1.5 border-t border-[#7a4e20]/20 max-w-lg mx-auto text-left space-y-1">
          <span className="font-cinzel text-[#7a4e20] text-[8px] uppercase tracking-wider font-bold block">
            ARCHIVAL NOTE & SCHOLIA
          </span>
          <p className="text-[11px] font-eb-garamond manuscript-ink-secondary leading-relaxed">
            {folio.rightContent.archivalNote || 'This passage belongs to a larger philosophical dialogue concerning duty, action, and detachment.'}
          </p>
          <p className="text-[9px] font-cinzel text-[#7a4e20]/80 tracking-wide">
            {folio.rightContent.scribeAnnotation || 'Inscribed in classical Anushtubh meter (8 syllables per quarter) using chiseled reed kalam.'}
          </p>
        </div>
      </div>

      {/* Four-Column ARCHIVAL NOTE at Bottom */}
      <div className="border-t border-[#7a4e20]/30 pt-2 space-y-1">
        <span className="text-[8px] font-cinzel text-[#7a4e20] uppercase tracking-[0.25em] font-bold block">
          CANONICAL CATALOGUE METADATA
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
          <div>
            <span className="font-cinzel text-[#6e4118] text-[8px] uppercase block font-semibold">PERIOD</span>
            <span className="font-eb-garamond font-bold text-[#240f04]">
              {folio.rightContent.archivalNotes?.period || manuscript.period}
            </span>
          </div>
          <div>
            <span className="font-cinzel text-[#6e4118] text-[8px] uppercase block font-semibold">REGION</span>
            <span className="font-eb-garamond font-bold text-[#240f04]">
              {folio.rightContent.archivalNotes?.region || manuscript.region}
            </span>
          </div>
          <div>
            <span className="font-cinzel text-[#6e4118] text-[8px] uppercase block font-semibold">SCRIPT</span>
            <span className="font-eb-garamond font-bold text-[#240f04]">
              {folio.rightContent.archivalNotes?.script || manuscript.script}
            </span>
          </div>
          <div>
            <span className="font-cinzel text-[#6e4118] text-[8px] uppercase block font-semibold">MATERIAL</span>
            <span className="font-eb-garamond font-bold text-[#240f04]">
              {folio.rightContent.archivalNotes?.material || manuscript.substrate}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

// ============================================================================
// DEDICATED SIDE PANEL: SCHOLAR'S ARCHIVAL INTERPRETATION DESK
// Displays meaning, translation, word study, and context beside the book!
// ============================================================================
function ScholarArchivalSidePanel({
  manuscript,
  folio,
  selectedWord,
  isVerseSelected,
  onClearWordSelection,
  onSelectWord
}) {
  return (
    <aside 
      className="w-full xl:w-84 2xl:w-96 rounded-xl border border-[#c5a059]/40 bg-[#130904]/95 shadow-[0_20px_50px_rgba(0,0,0,0.92)] p-5 text-left select-none flex flex-col justify-between"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 85% 15%, rgba(197, 160, 89, 0.08) 0%, transparent 50%),
          repeating-linear-gradient(45deg, rgba(140, 100, 50, 0.015) 0px, rgba(140, 100, 50, 0.015) 1px, transparent 1px, transparent 4px)
        `,
        minHeight: 'min(78vh, 580px)'
      }}
    >
      {/* Top Archival Docket Header */}
      <div className="border-b border-[#c5a059]/30 pb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-[0.25em] uppercase font-bold flex items-center gap-1.5">
            <Bookmark className="w-3 h-3 text-[#c5a059]" />
            SCHOLAR'S INTERPRETATION
          </span>
          <span className="text-[9px] font-cinzel text-[#c5a059]/70">
            {manuscript.accessionCode}
          </span>
        </div>
        <h3 className="text-sm font-cinzel font-bold text-[#fdf7eb] uppercase tracking-wider">
          {manuscript.title}
        </h3>
        <p className="text-[10px] font-cormorant italic text-[#deb881]/80">
          {manuscript.subtitle}
        </p>
      </div>

      {/* Main Dynamic Interpretation Area */}
      <div className="flex-1 py-4 space-y-3.5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedWord ? (
            /* --------------------------------------------------------
               WORD-LEVEL SCHOLASTIC ETYMOLOGY VIEW
               -------------------------------------------------------- */
            <motion.div
              key={selectedWord.word}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#c5a059]/20">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase tracking-widest font-bold">
                  SANSKRIT WORD ANALYSIS · पद विचार
                </span>
                <button
                  onClick={onClearWordSelection}
                  className="text-[9px] font-cinzel text-[#ffd27d] hover:underline cursor-pointer"
                >
                  VIEW VERSE →
                </button>
              </div>

              <div>
                <span className="text-[8px] font-cinzel text-[#c5a059]/80 uppercase block">SELECTED TERM</span>
                <h4 className="text-2xl font-devanagari font-bold text-[#ffd27d]">
                  {selectedWord.word}
                </h4>
                <span className="text-xs font-eb-garamond italic text-[#deb881]">
                  {selectedWord.transliteration}
                </span>
              </div>

              <div className="p-2.5 rounded border border-[#c5a059]/30 bg-[#1e0f06]/80 space-y-0.5">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase font-bold block">
                  LITERAL MEANING (PADACHEDA)
                </span>
                <p className="text-xs font-eb-garamond text-[#fdf7eb] leading-relaxed">
                  “{selectedWord.literal || selectedWord.meaning}”
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase font-bold block">
                  PHILOSOPHICAL CONTEXT
                </span>
                <p className="text-xs font-eb-garamond text-[#ebdcc4] leading-relaxed">
                  {selectedWord.context}
                </p>
              </div>

              <div className="pt-2 border-t border-[#c5a059]/15">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase font-bold block">
                  CANONICAL RELEVANCE
                </span>
                <p className="text-[11px] font-eb-garamond text-[#ffd27d] leading-snug">
                  {selectedWord.significance}
                </p>
              </div>
            </motion.div>
          ) : (
            /* --------------------------------------------------------
               FULL VERSE TRANSLATION & CONTEXT VIEW
               -------------------------------------------------------- */
            <motion.div
              key={folio.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="pb-1 border-b border-[#c5a059]/20 flex items-center justify-between">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase tracking-widest font-bold">
                  VERSE MEANING & COMMENTARY
                </span>
                <span className="text-[8px] font-cinzel text-[#ffd27d]">
                  {folio.title}
                </span>
              </div>

              {/* Complete English Translation */}
              <div className="p-3 rounded border border-[#c5a059]/35 bg-[#1b0d05]/90 space-y-1">
                <span className="text-[8px] font-cinzel text-[#ffd27d] uppercase tracking-wider font-bold block">
                  ENGLISH TRANSLATION
                </span>
                <p className="text-xs sm:text-[13px] font-eb-garamond text-[#fdf7eb] leading-relaxed">
                  {folio.rightContent.translation || 'Sacred verse translation preserved across the northern monastic recensions.'}
                </p>
              </div>

              {/* Context in Simple Language */}
              <div className="space-y-1">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase tracking-wider font-bold block">
                  CONTEXT IN SIMPLE LANGUAGE
                </span>
                <p className="text-xs font-eb-garamond text-[#ebdcc4] leading-relaxed">
                  {folio.rightContent.contextExplanation || folio.rightContent.archivalNote || 'This passage belongs to a larger philosophical dialogue concerning duty, action, and detachment.'}
                </p>
              </div>

              {/* Historical Description of the Work */}
              <div className="space-y-1 pt-1.5 border-t border-[#c5a059]/15">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase tracking-wider font-bold block">
                  CANONICAL BACKGROUND
                </span>
                <p className="text-[11px] font-eb-garamond text-[#deb881]/90 leading-snug">
                  {manuscript.description}
                </p>
              </div>

              {/* Interactive Term Exploration Pills */}
              <div className="space-y-1.5 pt-1.5 border-t border-[#c5a059]/15">
                <span className="text-[8px] font-cinzel text-[#c5a059] uppercase tracking-wider font-bold block">
                  TOUCH A WORD TO INSPECT:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(folio.rightContent.interactiveWords || ['कर्मणि', 'मा', 'फलेषु', 'अकर्मणि']).map((term, tIdx) => {
                    const glossaryItem = SCRIPTURE_WORDS_GLOSSARY[term];
                    return (
                      <button
                        key={tIdx}
                        onClick={() => onSelectWord(glossaryItem || {
                          word: term,
                          transliteration: term,
                          literal: 'Canonical Sanskrit term',
                          meaning: 'Integral component of the verse.',
                          context: `Preserved in ${manuscript.title}.`,
                          significance: 'Key term.'
                        })}
                        className="px-2 py-0.5 rounded border border-[#c5a059]/40 bg-[#1e0f06] text-[10px] font-devanagari text-[#ffd27d] hover:border-[#ffd27d] hover:bg-[#c5a059]/20 transition-all cursor-pointer"
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Guidance */}
      <div className="border-t border-[#c5a059]/25 pt-2 flex items-center justify-between text-[9px] font-cinzel text-[#c5a059]/70">
        <span>INTERACTIVE ARCHIVAL SCHOLIA</span>
        <span>{manuscript.region}</span>
      </div>
    </aside>
  );
}

// ============================================================================
// MAIN SCRIPTURES EXPERIENCE COMPONENT
// ============================================================================
export default function HaryanaScripturesExperience({
  onBackToGate,
  onNavigateToLiterature,
  onNavigateToTemples,
  onReturnToMap,
  onReliveJourney
}) {
  // Navigation & State
  const [viewMode, setViewMode] = useState('collection'); // 'collection' | 'viewer'
  const [transitionPhase, setTransitionPhase] = useState('idle');
  // 'idle' | 'fading-archive' | 'central-glow' | 'glow-expanding' | 'revealing-manuscript' | 'fading-viewer' | 'contracting-glow'
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState(0); // Default Bhagavad Gita
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'opening' | 'open' | 'closing'
  const [activeFolioIndex, setActiveFolioIndex] = useState(0); // Folio index
  const [isTurningNext, setIsTurningNext] = useState(false);
  const [isTurningPrev, setIsTurningPrev] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isVerseSelected, setIsVerseSelected] = useState(false);

  // Bottom Drawers
  const [isMeaningDrawerOpen, setIsMeaningDrawerOpen] = useState(false);
  const [isHistoricalContextOpen, setIsHistoricalContextOpen] = useState(false);

  // 3D DOM References
  const bookSpreadContainerRef = useRef(null);
  const frontCoverDoorRef = useRef(null);
  const sealButtonRef = useRef(null);
  const sealGlowRef = useRef(null);
  const cordLeftRef = useRef(null);
  const cordRightRef = useRef(null);
  const openPagesContainerRef = useRef(null);
  const readingTableRef = useRef(null);
  const shelfContainerRef = useRef(null);

  // 3D Page Turn References
  const turningLeafRef = useRef(null);
  const turningShadowRef = useRef(null);

  const scrollShelf = (direction) => {
    if (shelfContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      shelfContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentManuscript = SACRED_MANUSCRIPTS_COLLECTION[selectedManuscriptIndex] || SACRED_MANUSCRIPTS_COLLECTION[0];
  const currentFolio = currentManuscript.folios[activeFolioIndex] || currentManuscript.folios[0];
  const nextFolio = currentManuscript.folios[activeFolioIndex + 1] || currentFolio;
  const prevFolio = currentManuscript.folios[activeFolioIndex - 1] || currentFolio;

  const handlePlayChime = () => {
    if (window.playTempleChime) window.playTempleChime();
  };

  // Opening a specific manuscript into full-screen with ceremonial transition
  const handleOpenManuscript = (idx) => {
    handlePlayChime();
    playTactileSound('paper');
    setSelectedManuscriptIndex(idx);
    setActiveFolioIndex(0);
    setStage('sealed');
    setSelectedWord(null);
    setIsVerseSelected(false);

    // STEP 1: Immediately fade existing archive UI toward deep black (500ms)
    setTransitionPhase('fading-archive');

    setTimeout(() => {
      // STEP 2 & 3: Deep black screen with subtle central warm antique golden light (1000ms)
      setTransitionPhase('central-glow');

      setTimeout(() => {
        // STEP 4: Golden light slowly expands outward illuminating room (1200ms)
        setTransitionPhase('glow-expanding');

        setTimeout(() => {
          // STEP 5: Selected manuscript emerges as a fully visible physical object (1000ms)
          setTransitionPhase('revealing-manuscript');

          setTimeout(() => {
            // Transition complete: switch to full-screen isolated manuscript viewer
            setViewMode('viewer');
            setTransitionPhase('idle');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }, 1000);
        }, 1200);
      }, 1000);
    }, 500);
  };

  // Return to archive collection with reverse cinematic transition
  const handleReturnToArchive = () => {
    handlePlayChime();
    playTactileSound('paper');
    setTransitionPhase('fading-viewer');

    setTimeout(() => {
      setTransitionPhase('contracting-glow');

      setTimeout(() => {
        setViewMode('collection');
        setTransitionPhase('idle');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 900);
    }, 600);
  };

  // ==========================================================================
  // PHASE 2: BREAKING THE SEAL & OPENING THE PHYSICAL BOOK (1.3s GSAP TIMELINE)
  // ==========================================================================
  const handleBreakSeal = () => {
    if (stage !== 'sealed') return;
    setStage('opening');
    playTactileSound('seal');
    handlePlayChime();

    const tl = gsap.timeline({
      onComplete: () => {
        setStage('open');
        playTactileSound('paper');
      }
    });

    // 1. Physical seal press & vibration jitter
    tl.to(sealButtonRef.current, {
      scale: 0.92,
      y: 3,
      duration: 0.12,
      ease: 'power1.inOut'
    });
    tl.to(sealButtonRef.current, {
      x: -3,
      duration: 0.05,
      repeat: 3,
      yoyo: true,
      ease: 'linear'
    });
    tl.to(sealButtonRef.current, {
      scale: 1.15,
      x: 0,
      y: 0,
      duration: 0.25,
      ease: 'back.out(2)'
    });
    tl.to(sealGlowRef.current, {
      opacity: 1,
      scale: 1.8,
      duration: 0.35,
      ease: 'power2.out'
    }, "-=0.25");

    // 2. Silk cords snap and dissolve
    tl.to([cordLeftRef.current, cordRightRef.current], {
      scaleX: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, "-=0.15");

    // 3. Book container expands width from closed (~540px) to open (~1024px)
    tl.to(bookSpreadContainerRef.current, {
      maxWidth: '64rem', // 1024px (max-w-5xl)
      duration: 1.25,
      ease: 'power3.inOut'
    }, "+=0.05");

    // 4. Front Cover swings open in 3D perspective around the left spine
    tl.to(frontCoverDoorRef.current, {
      rotateY: -180,
      opacity: 0,
      duration: 1.25,
      ease: 'power3.inOut'
    }, "<");

    // 5. Inner pages unfurl from center spine with realistic paper depth
    tl.fromTo(openPagesContainerRef.current,
      { opacity: 0, scaleX: 0.75 },
      { opacity: 1, scaleX: 1, duration: 1.25, ease: 'power3.inOut' },
      "<"
    );
  };

  // Re-bind (Close the manuscript back to Phase 1)
  const handleRebind = () => {
    if (stage !== 'open') return;
    setStage('closing');
    handlePlayChime();
    playTactileSound('paper');
    setSelectedWord(null);
    setIsVerseSelected(false);

    const tl = gsap.timeline({
      onComplete: () => {
        setStage('sealed');
        playTactileSound('seal');
      }
    });

    tl.to(frontCoverDoorRef.current, {
      rotateY: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.inOut'
    });

    tl.to(bookSpreadContainerRef.current, {
      maxWidth: '34rem', // ~540px
      duration: 1.1,
      ease: 'power3.inOut'
    }, "<");

    tl.to(openPagesContainerRef.current, {
      opacity: 0,
      scaleX: 0.75,
      duration: 0.9,
      ease: 'power3.inOut'
    }, "<");

    tl.to([cordLeftRef.current, cordRightRef.current], {
      scaleX: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, "-=0.2");

    tl.to(sealGlowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.3
    }, "-=0.2");
  };

  // ==========================================================================
  // PHASE 5: REAL 3D PHYSICAL PAGE TURNING (GSAP 850ms)
  // ==========================================================================
  const handleNextFolio = () => {
    if (isTurningNext || isTurningPrev) return;
    if (activeFolioIndex >= currentManuscript.folios.length - 1) return;

    setIsTurningNext(true);
    playTactileSound('paper');
    handlePlayChime();

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveFolioIndex(prev => prev + 1);
        setIsTurningNext(false);
        setSelectedWord(null);
        setIsVerseSelected(false);
        gsap.set(turningLeafRef.current, { rotateY: 0 });
      }
    });

    tl.fromTo(turningLeafRef.current,
      { rotateY: 0 },
      { rotateY: -180, duration: 0.85, ease: 'power2.inOut' }
    );

    tl.fromTo(turningShadowRef.current,
      { opacity: 0 },
      { opacity: 0.55, duration: 0.42, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      "-=0.85"
    );
  };

  const handlePrevFolio = () => {
    if (isTurningNext || isTurningPrev) return;
    if (activeFolioIndex <= 0) return;

    setIsTurningPrev(true);
    playTactileSound('paper');
    handlePlayChime();

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveFolioIndex(prev => prev - 1);
        setIsTurningPrev(false);
        setSelectedWord(null);
        setIsVerseSelected(false);
        gsap.set(turningLeafRef.current, { rotateY: 0 });
      }
    });

    tl.fromTo(turningLeafRef.current,
      { rotateY: 0 },
      { rotateY: 180, duration: 0.85, ease: 'power2.inOut' }
    );

    tl.fromTo(turningShadowRef.current,
      { opacity: 0 },
      { opacity: 0.55, duration: 0.42, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      "-=0.85"
    );
  };

  return (
    <div 
      className="relative min-h-screen text-[#fdf7eb] font-eb-garamond selection:bg-[#c5a059]/30 selection:text-[#ffd27d] overflow-x-hidden flex flex-col justify-between"
      style={{
        backgroundColor: '#070503',
        backgroundImage: `
          radial-gradient(ellipse at 50% 15%, rgba(201, 164, 90, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 85%, rgba(20, 10, 5, 0.96) 0%, transparent 100%),
          url('/assets/parchment_texture.jpg')
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover, cover, auto',
        backgroundBlendMode: 'screen, overlay, multiply'
      }}
    >
      {/* Subtle Dust & Warm Ambient Light in Archive Room */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 opacity-15">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#ffd27d]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl" />
      </div>

      {/* ====================================================================
          CEREMONIAL FULL-SCREEN TRANSITION OVERLAY
          Step 1: Deep black fade
          Step 2 & 3: Subtle central warm antique golden light
          Step 4: Golden light slowly expands outward
          Step 5: Physical manuscript emerges from darkness
          ==================================================================== */}
      {transitionPhase !== 'idle' && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
          style={{
            backgroundColor: '#060402',
            opacity: transitionPhase === 'fading-archive' ? 0.96 : 1,
            transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Atmospheric Ambient Glow Background */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
            style={{
              background: (transitionPhase === 'glow-expanding' || transitionPhase === 'revealing-manuscript')
                ? 'radial-gradient(ellipse at 50% 50%, rgba(197, 160, 89, 0.18) 0%, rgba(20, 10, 5, 0.85) 60%, #060402 100%)'
                : '#060402',
              opacity: (transitionPhase === 'glow-expanding' || transitionPhase === 'revealing-manuscript') ? 1 : 0
            }}
          />

          {/* Central Antique Golden Light */}
          <div 
            className="relative flex flex-col items-center justify-center transition-all ease-out"
            style={{
              transitionDuration: transitionPhase === 'central-glow' ? '1000ms' : transitionPhase === 'glow-expanding' ? '1200ms' : '800ms',
              transform: transitionPhase === 'central-glow' 
                ? 'scale(1)' 
                : (transitionPhase === 'glow-expanding' || transitionPhase === 'revealing-manuscript') 
                  ? 'scale(3.2)' 
                  : 'scale(0.2)',
              opacity: (transitionPhase === 'fading-archive' || transitionPhase === 'contracting-glow') ? 0.3 : 1
            }}
          >
            {/* Outer Soft Amber Halo */}
            <div 
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(225, 175, 95, 0.45) 0%, rgba(180, 125, 45, 0.25) 40%, rgba(70, 35, 10, 0.08) 70%, transparent 85%)',
                filter: 'blur(22px)',
                boxShadow: '0 0 80px 30px rgba(212, 160, 89, 0.22)'
              }}
            />

            {/* Core Candlelight Flame Glow */}
            <div className="absolute w-12 h-12 rounded-full bg-[#ffe8b3]/60 blur-md animate-pulse" />
          </div>

          {/* Manuscript Emerging from Darkness */}
          {(transitionPhase === 'revealing-manuscript' || transitionPhase === 'glow-expanding') && (
            <div 
              className="absolute z-20 flex flex-col items-center justify-center transition-all duration-1000 ease-out px-4"
              style={{
                opacity: transitionPhase === 'revealing-manuscript' ? 1 : 0.2,
                transform: transitionPhase === 'revealing-manuscript' ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                filter: transitionPhase === 'revealing-manuscript' ? 'blur(0px)' : 'blur(8px)'
              }}
            >
              <div 
                className="w-64 sm:w-72 aspect-[1/1.55] rounded-xs border-2 border-[#ffd27d]/60 shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_40px_rgba(255,210,125,0.3)] flex flex-col justify-between p-6 text-center select-none"
                style={{ background: currentManuscript.coverStyle.bgGradient }}
              >
                <div className="text-[9px] font-cinzel text-[#ffd27d]/80 tracking-[0.3em] uppercase">
                  {currentManuscript.accessionCode}
                </div>
                
                <div className="my-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-[#ffd27d]/80 flex items-center justify-center shadow-lg bg-black/40 mb-3">
                    <ShelfBookEmblem id={currentManuscript.id} color="#ffd27d" />
                  </div>
                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-[#fdf7eb] tracking-[0.16em] uppercase">
                    {currentManuscript.title}
                  </h3>
                  <p className="text-xs font-devanagari text-[#c5a059] mt-1">
                    {currentManuscript.sanskritTitle}
                  </p>
                </div>

                <div className="text-[9px] font-cinzel text-[#deb881]/70 tracking-widest uppercase border-t border-[#ffd27d]/20 pt-2">
                  ENTERING SACRED GRANTHA...
                </div>
              </div>
            </div>
          )}

          {/* Subtle Sanskrit Syllable in Center Glow */}
          {transitionPhase === 'central-glow' && (
            <div className="absolute z-10 text-center space-y-2 animate-fade-in pointer-events-none">
              <span className="text-3xl font-serif text-[#ffd27d]/50 block tracking-widest">
                {currentManuscript.coverStyle.sealEmblem}
              </span>
              <span className="text-[10px] font-cinzel text-[#c5a059]/70 tracking-[0.35em] uppercase block">
                REVEALING {currentManuscript.title}
              </span>
            </div>
          )}

        </div>
      )}

      {/* ====================================================================
          MODE 1: ARCHIVE COLLECTION VIEW
          Only Hero + Shelf + Feature Badges + More Than Manuscripts + Triptych + Footer
          NO big physical manuscript underneath!
          ==================================================================== */}
      {viewMode === 'collection' && (
        <div className="w-full flex flex-col justify-between min-h-screen">
          <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070503]/95 border-b border-[#c5a059]/25 px-3 sm:px-6 md:px-8 py-3 transition-all">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              
              {/* LEFT: Non-overlapping sequential navigation controls */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center md:justify-start">
                <button
                  onClick={onBackToGate}
                  className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/60 bg-[#160b06]/95 hover:border-[#ffd27d] hover:bg-[#261309] text-[#ffd27d] text-xs tracking-[0.16em] font-cinzel font-semibold uppercase transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.85)] shrink-0"
                  title="Return to Haryana Heritage Archive"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c5a059]" />
                  <span>RETURN TO ARCHIVE</span>
                </button>

                {onReturnToMap && (
                  <button
                    onClick={onReturnToMap}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/35 bg-[#160e08]/85 hover:bg-[#2b170c] hover:border-[#ffd27d]/60 text-[#deb881] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.7)] shrink-0"
                    title="Return to Bhārata Varṣa Map"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#c5a059]" />
                    <span className="hidden sm:inline">Bhārata Varṣa Map</span>
                    <span className="sm:hidden">Map</span>
                  </button>
                )}

                {onReliveJourney && (
                  <button
                    onClick={onReliveJourney}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#160e08]/75 hover:bg-[#2b170c] hover:border-[#ffd27d]/50 text-[#c5a059] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] shrink-0"
                    title="Relive Journey"
                  >
                    <RotateCcw className="w-3 h-3 text-[#c5a059]" />
                    <span>Relive</span>
                  </button>
                )}
              </div>

              {/* CENTER: Chapter & Intro */}
              <div className="text-center space-y-0.5 select-none shrink-0 px-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
                  <span className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.28em] uppercase">
                    CHAPTER 02 · SCRIPTURES
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-cormorant italic text-[#c5a059]/80 hidden md:block">
                  THE SACRED WORD · ज्ञान · श्रुति · स्मृति · “Before it was written, it was remembered.”
                </p>
              </div>

              {/* RIGHT: [Sound Off] [Haryana] and Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <AudioControl />

                <div className="bg-[#140b07]/95 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#c9a45a]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.8)] flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-[#c5a059]">
                    <img src="/assets/sacred_mandala.jpg" alt="Sanskriti" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#fff2d1]">
                    HARYANA
                  </span>
                </div>

                <button
                  onClick={handlePlayChime}
                  title="Temple Bell"
                  className="p-1.5 rounded-full border border-[#c5a059]/40 bg-[#140a05] text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </header>

      {/* ====================================================================
          SECTION 1: THE SACRED WORD HERO TITLE (CINEMATIC FULL-SCREEN 100VH OPENING)
          Occupies ~100vh with the sticky header so only the Sacred Word intro
          is visible on the first viewport. Scrolls down to reveal Section 2.
          ==================================================================== */}
      <section 
        className="relative w-full min-h-[calc(100vh-62px)] flex flex-col justify-between items-center py-10 sm:py-14 px-4 sm:px-8 overflow-hidden select-none"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(7,5,3,0.42) 0%, rgba(7,5,3,0.08) 28%, rgba(7,5,3,0.12) 65%, rgba(7,5,3,0.75) 90%, #070503 100%),
            radial-gradient(ellipse at 50% 48%, rgba(7,5,3,0.02) 0%, rgba(7,5,3,0.35) 60%, rgba(7,5,3,0.65) 85%, rgba(7,5,3,0.85) 100%),
            url('/assets/scriptures_temple_vault_bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%'
        }}
      >
        {/* Soft atmospheric haze and gentle edge vignetting */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070503] via-transparent to-black/35" />
        
        {/* Subtle warm golden atmospheric glow behind the central title */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[380px] sm:h-[480px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.11) 0%, rgba(197,160,89,0.04) 50%, transparent 72%)',
            filter: 'blur(35px)'
          }}
        />

        {/* Subtle warm ember dust particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#ffd27d] animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#ffb84d] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 rounded-full bg-[#ffd27d]" />
        </div>

        {/* Top spacer balance */}
        <div className="w-full h-2 hidden sm:block" />

        {/* Main Hero Content: Centered Horizontally & Vertically on 50% Viewport Axis */}
        <div className="relative max-w-7xl w-full mx-auto flex items-center justify-center px-2 sm:px-6 my-auto">
          
          {/* Left Vertical Archival Inscription (Kept in place without displacing center group) */}
          <div className="hidden lg:flex absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex-col items-start space-y-2.5 text-[11px] font-cinzel text-[#c5a059]/80 tracking-[0.32em] uppercase border-l border-[#c5a059]/40 pl-4 py-3 pointer-events-none">
            <span>TIMELESS</span>
            <span>TEXTS</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 my-0.5" />
            <span>LIVING</span>
            <span>WISDOM</span>
          </div>

          {/* Center Sacred Word Typography Stack — Exactly aligned to 50% viewport center axis */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[90px] xl:text-[102px] font-cinzel font-bold tracking-[0.24em] text-[#fbf1dc] uppercase drop-shadow-[0_8px_32px_rgba(0,0,0,0.98)] leading-[1.08] text-center">
              THE SACRED<br />WORD
            </h1>

            <p className="text-2xl sm:text-3xl md:text-4xl font-devanagari font-bold text-[#d4af37] tracking-[0.28em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] text-center">
              ज्ञान · श्रुति · स्मृति
            </p>

            <p className="text-base sm:text-xl md:text-2xl font-cormorant italic text-[#f0dfc8] tracking-wide max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">
              “Before it was written, it was remembered.”
            </p>

            <div className="flex items-center justify-center gap-4 pt-2 sm:pt-4">
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/70" />
              <span className="text-[#ffd27d] text-sm">✦</span>
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/70" />
            </div>
          </div>

          {/* Right Archival Quote (Kept in place without displacing center group) */}
          <div className="hidden lg:block absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 max-w-[240px] text-right border-r border-[#c5a059]/40 pr-4 py-3 pointer-events-none">
            <p className="text-sm font-cormorant italic text-[#f0dfc8]/85 leading-relaxed">
              “Not merely books, but the memory of a civilisation.”
            </p>
          </div>

        </div>

        {/* Subtle scroll cue at bottom of 100vh hero */}
        <div className="relative mt-auto pt-4 pb-2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#c5a059] uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-4 h-6 rounded-full border border-[#c5a059]/45 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-[#ffd27d] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: UNDERSTANDING THE SCRIPTURES — EDITORIAL READING SECTION
          Wide, generous two-column editorial reading layout directly on dark canvas.
          Typography: 24–28px headings, 18–20px body text, 1.8 line-height,
          high-contrast ivory/cream palette, subtle gold accents & dividers.
          ==================================================================== */}
      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-12 sm:pb-16 w-full select-none">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/70" />
            <span className="text-[#ffd27d] text-xs">✦</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/70" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.24em] uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            UNDERSTANDING THE SCRIPTURES
          </h2>
          <p className="text-base sm:text-lg font-cormorant italic text-[#e8d5b7] tracking-wide max-w-xl mx-auto">
            “Texts, traditions, and the living knowledge preserved across centuries.”
          </p>
        </div>

        {/* Generous 2-Column Editorial Reading Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-14 lg:gap-y-16 text-left">
          
          {/* BLOCK 01: PRESERVED HERITAGE */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#d4af37] tracking-wider">01</span>
              <span className="text-[#c5a059]/60 font-serif text-xl">—</span>
              <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#fcf5e5] tracking-[0.14em] uppercase">
                PRESERVED HERITAGE
              </h3>
            </div>
            <p className="text-[18px] sm:text-[19px] lg:text-[20px] font-eb-garamond text-[#ede0cc] leading-[1.8]">
              Ancient Indian knowledge was preserved through oral traditions (<span className="text-[#fcf5e5] italic font-medium">śruti</span> and <span className="text-[#fcf5e5] italic font-medium">smṛti</span>), handwritten manuscripts, palm-leaf folios (<span className="text-[#fcf5e5] italic font-medium">tāḷapatra</span>), birch bark (<span className="text-[#fcf5e5] italic font-medium">bhūrjapatra</span>) and later paper folios by lineages of scholars, teachers and scribes.
            </p>
            <div className="text-xs sm:text-[13px] font-cinzel font-semibold text-[#c5a059] tracking-[0.22em] uppercase pt-1">
              ORAL TRADITION · PALM-LEAF FOLIOS · BIRCH BARK
            </div>
          </div>

          {/* BLOCK 02: DIVERSE TRADITIONS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#d4af37] tracking-wider">02</span>
              <span className="text-[#c5a059]/60 font-serif text-xl">—</span>
              <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#fcf5e5] tracking-[0.14em] uppercase">
                DIVERSE TRADITIONS
              </h3>
            </div>
            <p className="text-[18px] sm:text-[19px] lg:text-[20px] font-eb-garamond text-[#ede0cc] leading-[1.8]">
              Scriptures are not limited to one genre of text. They encompass the revelatory hymns of the <span className="text-[#fcf5e5] font-medium">Vedas</span>, metaphysical dialogues of the <span className="text-[#fcf5e5] font-medium">Upanishads</span>, civilisational Epics (<span className="text-[#fcf5e5] italic font-medium">Itihāsa</span> such as the Ramayana and Mahabharata), the ethical Bhagavad Gita, cosmological Puranas, and profound philosophical treatises.
            </p>
            <div className="text-xs sm:text-[13px] font-cinzel font-semibold text-[#c5a059] tracking-[0.22em] uppercase pt-1">
              VEDAS · UPANISHADS · EPICS · GITA · PURANAS
            </div>
          </div>

          {/* Subtle Horizontal Hairline Divider between rows */}
          <div className="col-span-1 md:col-span-2 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/25 to-transparent my-2" />

          {/* BLOCK 03: INTERACTIVE LEARNING */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#d4af37] tracking-wider">03</span>
              <span className="text-[#c5a059]/60 font-serif text-xl">—</span>
              <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#fcf5e5] tracking-[0.14em] uppercase">
                INTERACTIVE LEARNING
              </h3>
            </div>
            <p className="text-[18px] sm:text-[19px] lg:text-[20px] font-eb-garamond text-[#ede0cc] leading-[1.8]">
              Visitors can open individual codices, turn manuscript folios, read original Sanskrit passages inscribed in Devanagari, view transliteration, reveal scholarly English translations, click important Sanskrit words to examine their grammatical context, and explore archival provenance notes.
            </p>
            <div className="text-xs sm:text-[13px] font-cinzel font-semibold text-[#c5a059] tracking-[0.22em] uppercase pt-1">
              FOLIO TURNING · SANSKRIT DEVANAGARI · WORD GLOSSARY
            </div>
          </div>

          {/* BLOCK 04: HISTORICAL INSIGHTS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#d4af37] tracking-wider">04</span>
              <span className="text-[#c5a059]/60 font-serif text-xl">—</span>
              <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-cinzel font-bold text-[#fcf5e5] tracking-[0.14em] uppercase">
                HISTORICAL INSIGHTS
              </h3>
            </div>
            <p className="text-[18px] sm:text-[19px] lg:text-[20px] font-eb-garamond text-[#ede0cc] leading-[1.8]">
              Every manuscript is intrinsically connected to a specific historical era, geographic region, script, material, and cultural lineage. The archive illuminates not only <span className="text-[#fcf5e5] italic font-medium">what</span> a text articulates, but <span className="text-[#fcf5e5] italic font-medium">where, when, and how</span> it was inscribed, conserved, and passed down across centuries.
            </p>
            <div className="text-xs sm:text-[13px] font-cinzel font-semibold text-[#c5a059] tracking-[0.22em] uppercase pt-1">
              HISTORICAL CHRONOLOGY · MATERIAL CONSERVATION · PROVENANCE
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 3: SCRIPTURE TRADITIONS — ARCHIVAL CATALOGUE / INDEX
          Horizontal classification layout with continuous golden line and 3 columns
          ==================================================================== */}
      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-8 pb-20 w-full select-none">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-cinzel font-semibold text-[#c5a059] tracking-[0.28em] uppercase">
            ARCHIVAL CLASSIFICATION
          </div>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.22em] uppercase">
            SCRIPTURE TRADITIONS
          </h3>
        </div>

        {/* Continuous Horizontal Golden Archival Line with Markers */}
        <div className="relative pt-2 pb-2 mb-10 hidden md:block">
          <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent">
            {/* 3 Gold node markers positioned above each category column */}
            <div className="absolute top-1/2 left-[16.6%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#ffd27d] bg-[#0d0703] flex items-center justify-center shadow-[0_0_8px_rgba(255,210,125,0.7)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
            </div>
            <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#ffd27d] bg-[#0d0703] flex items-center justify-center shadow-[0_0_8px_rgba(255,210,125,0.7)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
            </div>
            <div className="absolute top-1/2 left-[83.3%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#ffd27d] bg-[#0d0703] flex items-center justify-center shadow-[0_0_8px_rgba(255,210,125,0.7)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
            </div>
          </div>
        </div>

        {/* Three Large Vertical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-center md:text-left">
          
          {/* COLUMN I: VEDIC */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-xl sm:text-2xl font-cinzel font-bold text-[#d4af37] tracking-[0.18em]">I</span>
              <span className="text-[#c5a059]/60 font-serif text-lg">—</span>
              <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.16em] uppercase">
                VEDIC
              </h4>
            </div>
            <p className="text-base sm:text-[17px] font-cinzel font-medium text-[#ffd27d] tracking-wider pt-0.5">
              Vedas · Upanishads
            </p>
            <p className="text-[16px] sm:text-[17px] font-cormorant italic text-[#ede0cc] leading-relaxed pt-1">
              “Foundational hymns, rituals and philosophical inquiry.”
            </p>
          </div>

          {/* COLUMN II: EPIC */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-xl sm:text-2xl font-cinzel font-bold text-[#d4af37] tracking-[0.18em]">II</span>
              <span className="text-[#c5a059]/60 font-serif text-lg">—</span>
              <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.16em] uppercase">
                EPIC
              </h4>
            </div>
            <p className="text-base sm:text-[17px] font-cinzel font-medium text-[#ffd27d] tracking-wider pt-0.5">
              Ramayana · Mahabharata · Bhagavad Gita
            </p>
            <p className="text-[16px] sm:text-[17px] font-cormorant italic text-[#ede0cc] leading-relaxed pt-1">
              “Stories of duty, conflict and dharma.”
            </p>
          </div>

          {/* COLUMN III: PHILOSOPHICAL */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-xl sm:text-2xl font-cinzel font-bold text-[#d4af37] tracking-[0.18em]">III</span>
              <span className="text-[#c5a059]/60 font-serif text-lg">—</span>
              <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.16em] uppercase">
                PHILOSOPHICAL
              </h4>
            </div>
            <p className="text-base sm:text-[17px] font-cinzel font-medium text-[#ffd27d] tracking-wider pt-0.5">
              Puranas · Darshana · Ethics
            </p>
            <p className="text-[16px] sm:text-[17px] font-cormorant italic text-[#ede0cc] leading-relaxed pt-1">
              “Consciousness, action and liberation.”
            </p>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 4: THE MANUSCRIPT COLLECTION — PHYSICAL BOOKS ON WOODEN SHELF
          6 standing antique leather/cloth books with embossed borders & emblems
          ==================================================================== */}
      <section 
        id="manuscript-collection" 
        className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 pt-6 pb-12 select-none scroll-mt-20"
      >
        
        {/* Collection Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#c5a059]/25 pb-3.5 mb-8 gap-3">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-[#ffd27d] tracking-[0.22em] uppercase font-bold text-sm sm:text-base font-cinzel">
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              <span>THE MANUSCRIPT COLLECTION</span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-cinzel text-[#c5a059]/75 tracking-[0.2em] uppercase">
              EXPLORE INDIA’S TIMELESS SCRIPTURES
            </p>
          </div>

          <button 
            onClick={() => {
              readingTableRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-cinzel text-[#ffd27d] hover:text-white tracking-[0.2em] uppercase transition-colors group cursor-pointer"
          >
            <span>VIEW ARCHIVAL MAP</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* The Archive Bookshelf Stage */}
        <div className="relative">
          
          {/* Left Arrow Navigation Button */}
          <button
            onClick={() => scrollShelf('left')}
            aria-label="Previous manuscripts"
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-10 z-30 w-10 h-10 rounded-full border border-[#7a5225] bg-[#140a05]/95 text-[#ffd27d] items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.9)] hover:border-[#ffd27d] hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            onClick={() => scrollShelf('right')}
            aria-label="Next manuscripts"
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-10 z-30 w-10 h-10 rounded-full border border-[#7a5225] bg-[#140a05]/95 text-[#ffd27d] items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.9)] hover:border-[#ffd27d] hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Books Shelf Row (Scrollable on small viewports, full 6 row on large) */}
          <div className="relative w-full overflow-hidden">
            
            <div 
              ref={shelfContainerRef}
              className="flex items-end justify-start lg:justify-between gap-3 sm:gap-4 lg:gap-3.5 px-3 sm:px-6 overflow-x-auto no-scrollbar scroll-smooth pt-6 pb-2 relative z-10"
            >
              {/* Left partial preview book on far edge for grand archive depth */}
              <div className="hidden xl:block w-4 h-64 rounded-l-sm bg-gradient-to-r from-[#0c0603] to-[#1c1007] border-y border-l border-[#c5a059]/20 shadow-md flex-shrink-0 opacity-40 -mr-1" />

              {SACRED_MANUSCRIPTS_COLLECTION.map((mss, idx) => {
                const isSelected = selectedManuscriptIndex === idx;

                return (
                  <div
                    key={mss.id}
                    onClick={() => handleOpenManuscript(idx)}
                    className={`group relative flex-shrink-0 w-40 sm:w-44 lg:w-[15.8%] aspect-[1/1.62] rounded-xs transition-all duration-500 cursor-pointer select-none flex flex-col justify-between p-3.5 sm:p-4 ${
                      isSelected 
                        ? 'scale-105 -translate-y-4 z-20 shadow-[0_25px_45px_rgba(0,0,0,0.98),0_0_30px_rgba(255,210,125,0.3)] opacity-100' 
                        : 'hover:-translate-y-2 hover:scale-[1.02] z-10 shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      background: mss.coverStyle.bgGradient,
                      border: isSelected ? '1.5px solid #ffd27d' : '1px solid rgba(197, 160, 89, 0.45)'
                    }}
                    title={`Open ${mss.title}`}
                  >
                    {/* Left Spine Thickness & Hinge Groove */}
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/60 via-black/25 to-transparent border-r border-[#c5a059]/20 rounded-l-xs pointer-events-none" />

                    {/* Right Stacked Edge Pages (Subtle Book Block Depth) */}
                    <div className="absolute right-0 top-1 bottom-1 w-1 bg-[#d6be92]/25 rounded-r-xs pointer-events-none" />

                    {/* Outer Embossed Antique-Gold Border */}
                    <div className="absolute inset-1.5 border border-[#c5a059]/60 rounded-xs pointer-events-none" />

                    {/* Inner Fine Geometric Ornamental Line */}
                    <div className="absolute inset-2.5 border border-[#c5a059]/30 rounded-xs pointer-events-none" />

                    {/* Top: Archive Accession Tag */}
                    <div className="relative z-10 flex justify-between items-center text-[8px] font-cinzel text-[#c5a059]/75 tracking-widest uppercase">
                      <span className="font-bold">{mss.shelfBadge}</span>
                      <span>{mss.accessionCode.split('-')[1]}</span>
                    </div>

                    {/* Center: Raised Emblem / Medallion */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto py-1">
                      <div className={`p-2 rounded-full border border-[#c5a059]/70 shadow-lg bg-black/40 transition-transform duration-300 group-hover:scale-110 ${
                        isSelected ? 'border-[#ffd27d] bg-black/60' : ''
                      }`}>
                        <ShelfBookEmblem id={mss.id} color={isSelected ? '#ffd27d' : '#c5a059'} />
                      </div>
                    </div>

                    {/* Title, Devanagari Triad & Archival Date */}
                    <div className="relative z-10 text-center space-y-1 mt-auto">
                      <h3 className="text-xs sm:text-sm font-cinzel font-bold text-[#f5ebd7] tracking-[0.14em] uppercase leading-tight group-hover:text-[#ffd27d]">
                        {mss.title}
                      </h3>
                      
                      <p className="text-[9px] sm:text-[10px] font-devanagari font-medium text-[#c5a059]/90 tracking-wider">
                        {mss.shelfSubtitle}
                      </p>

                      <div className="pt-1.5 border-t border-[#c5a059]/20 flex items-center justify-center">
                        <span className="text-[8px] sm:text-[9px] font-cinzel text-[#deb881]/70 tracking-widest uppercase">
                          {mss.shelfDate}
                        </span>
                      </div>
                    </div>

                    {/* Subtle Warm Spotlight for Selected Book */}
                    {isSelected && (
                      <div className="absolute -inset-1 rounded-xs border border-[#ffd27d]/40 pointer-events-none animate-pulse" />
                    )}
                  </div>
                );
              })}

              {/* Right partial preview book on far edge for grand archive depth */}
              <div className="hidden xl:block w-4 h-64 rounded-r-sm bg-gradient-to-l from-[#0c0603] to-[#1c1007] border-y border-r border-[#c5a059]/20 shadow-md flex-shrink-0 opacity-40 -ml-1" />
            </div>

            {/* The Real Dark Aged Wooden Shelf Surface */}
            <div className="relative w-full">
              {/* Top Wood Rim Highlight */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8a5a2a] to-transparent" />
              
              {/* Shelf Top Surface Face with Pushpa Petals */}
              <div className="relative h-6 sm:h-7 w-full bg-gradient-to-b from-[#24150a] via-[#1a0e06] to-[#0d0703] border-b border-[#050301] shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
                {/* Contact Shadow of books on the shelf */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/85 to-transparent pointer-events-none" />

                {/* Scattered White Pushpa Petals */}
                <div className="absolute left-[16%] top-1 w-2 h-1.5 rounded-full bg-[#fdfaf2]/60 rotate-12 shadow-sm pointer-events-none" />
                <div className="absolute left-[33%] top-2 w-2.5 h-1.5 rounded-full bg-[#fdfaf2]/50 -rotate-45 shadow-sm pointer-events-none" />
                <div className="absolute left-[50%] top-1.5 w-2 h-2 rounded-full bg-[#fdfaf2]/70 rotate-6 shadow-sm pointer-events-none" />
                <div className="absolute left-[69%] top-2 w-3 h-1.5 rounded-full bg-[#fdfaf2]/40 -rotate-15 shadow-sm pointer-events-none" />
                <div className="absolute left-[84%] top-1 w-2 h-1.5 rounded-full bg-[#fdfaf2]/60 rotate-30 shadow-sm pointer-events-none" />
              </div>

              {/* Front Edge of Shelf Beam */}
              <div className="h-4 sm:h-5 w-full bg-gradient-to-b from-[#140b05] to-[#080402] border-t border-[#3d220f]/50 flex items-center justify-center">
                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />
              </div>
            </div>

          </div>

        </div>

      </section>



      {/* ====================================================================
          SECTION 5: MORE THAN MANUSCRIPTS PARCHMENT BANNER
          Antique sepia lithograph etching and living tradition narrative
          ==================================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full select-none">
        <div 
          className="relative rounded-lg overflow-hidden border-2 border-[#8a5d28]/70 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-6 sm:p-9 lg:p-11 flex flex-col lg:flex-row items-center justify-between gap-8 text-[#261307]"
          style={{
            background: 'linear-gradient(135deg, #e4cda4 0%, #dbbf94 40%, #e6d3ad 70%, #d4b88b 100%)',
            boxShadow: 'inset 0 0 60px rgba(138, 93, 40, 0.4), 0 25px 50px rgba(0,0,0,0.9)'
          }}
        >
          {/* Aged Parchment Framed Borders */}
          <div className="absolute inset-2 border border-[#8a5d28]/35 rounded-xs pointer-events-none" />
          <div className="absolute inset-3 border border-[#8a5d28]/20 rounded-xs border-dashed pointer-events-none" />

          {/* Left Narrative Column */}
          <div className="relative z-10 max-w-xl space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#1e0e04] tracking-[0.14em] uppercase">
              MORE THAN MANUSCRIPTS
            </h2>
            <p className="text-sm sm:text-base font-eb-garamond text-[#42250f] leading-relaxed">
              The Scriptures are not just books — they are a continuum of a living tradition. This archive brings together philosophical dialogues, epic narratives, sacred hymns, ethical treatises and timeless wisdom that have shaped thought, culture and consciousness for centuries.
            </p>
            <div>
              <a 
                href="#manuscript-collection"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('manuscript-collection');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#1e0e04] hover:text-[#8a2416] tracking-[0.2em] uppercase transition-colors group cursor-pointer border-b border-[#1e0e04]/40 pb-0.5"
              >
                <span>EXPLORE THE TRADITION</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Center 19th-Century Lithograph Sepia Temple Complex Etching */}
          <div className="relative z-10 w-full lg:w-96 aspect-[16/9] rounded overflow-hidden border border-[#8a5d28]/60 shadow-md">
            <img 
              src="/assets/temple_complex_etching.jpg" 
              alt="Ancient Temple Complex Lithograph" 
              className="w-full h-full object-cover filter contrast-[1.08] sepia-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#dbbf94]/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Archival Index Column */}
          <div className="relative z-10 w-full lg:w-32 flex lg:flex-col justify-between items-center lg:items-start border-t lg:border-t-0 lg:border-l border-[#8a5d28]/40 pt-4 lg:pt-0 lg:pl-6 text-[10px] sm:text-[11px] font-cinzel text-[#5e3818] tracking-[0.22em] uppercase space-y-0 lg:space-y-3">
            <span className="hover:text-[#1e0e04] transition-colors cursor-pointer">PEOPLE</span>
            <span className="hover:text-[#1e0e04] transition-colors cursor-pointer">PLACES</span>
            <span className="hover:text-[#1e0e04] transition-colors cursor-pointer">IDEAS</span>
            <span className="hover:text-[#1e0e04] transition-colors cursor-pointer">PRESERVATION</span>
            <span className="hover:text-[#1e0e04] transition-colors cursor-pointer">LEGACY</span>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 6: A LIVING LEGACY TRIPTYCH
          Monastic Libraries, Ancient Scripts, Timeless Relevance
          ==================================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full select-none">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#ffd27d] tracking-[0.25em] uppercase">
            A LIVING LEGACY
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/60" />
            <span className="text-[#ffd27d] text-xs">✦</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/60" />
          </div>
        </div>

        {/* 3 Triptych Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* CARD 1: MONASTIC LIBRARIES */}
          <div className="group rounded-xl overflow-hidden border border-[#c5a059]/30 bg-[#120803] shadow-[0_15px_30px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]/60 transition-all flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img 
                src="/assets/monastic_libraries_corridor.jpg" 
                alt="Monastic Libraries" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120803] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-1">
              <h3 className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.18em] uppercase">
                MONASTIC LIBRARIES
              </h3>
              <p className="text-xs font-eb-garamond text-[#deb881]/80">
                Centuries of careful preservation.
              </p>
            </div>
          </div>

          {/* CARD 2: ANCIENT SCRIPTS */}
          <div className="group rounded-xl overflow-hidden border border-[#c5a059]/30 bg-[#120803] shadow-[0_15px_30px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]/60 transition-all flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img 
                src="/assets/scriptures_hero_manuscript.jpg" 
                alt="Ancient Scripts" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120803] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-1">
              <h3 className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.18em] uppercase">
                ANCIENT SCRIPTS
              </h3>
              <p className="text-xs font-eb-garamond text-[#deb881]/80">
                From palm leaf to paper, a journey through time.
              </p>
            </div>
          </div>

          {/* CARD 3: TIMELESS RELEVANCE */}
          <div className="group rounded-xl overflow-hidden border border-[#c5a059]/30 bg-[#120803] shadow-[0_15px_30px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]/60 transition-all flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img 
                src="/assets/timeless_diya_lamp.jpg" 
                alt="Timeless Relevance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120803] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-1">
              <h3 className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.18em] uppercase">
                TIMELESS RELEVANCE
              </h3>
              <p className="text-xs font-eb-garamond text-[#deb881]/80">
                Wisdom for the modern world.
              </p>
            </div>
          </div>

        </div>

        {/* Centered Archival Quote */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
          <p className="text-base sm:text-lg font-cormorant italic text-[#deb881]/90 tracking-wide">
            “These texts are not of the past. They continue to speak, if we are willing to listen.”
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/40" />
            <span className="text-[#ffd27d]/60 text-xs">✦</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/40" />
          </div>
        </div>

      </section>

      {/* ====================================================================
          SECTION 7: ARCHIVAL MUSEUM FOOTER
          ==================================================================== */}
      <footer className="relative border-t border-[#c5a059]/25 bg-[#050302] px-6 py-6 select-none z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-cinzel text-[#c5a059]/80">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[#c5a059]/60 flex items-center justify-center text-[#ffd27d]">
              <span className="text-xs">🪷</span>
            </div>
            <span className="tracking-[0.2em] font-bold text-[#ffd27d]">
              INDIC HERITAGE ARCHIVE · KURUKSHETRA · HARYANA
            </span>
          </div>

          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 tracking-[0.2em] uppercase text-[#deb881]/70 hover:text-[#ffd27d] transition-colors cursor-pointer"
          >
            <span>KNOWLEDGE LIVES ON</span>
            <span>→</span>
          </div>
        </div>
      </footer>
        </div>
      )}

      {/* ====================================================================
          MODE 2: DEDICATED FULL-SCREEN MANUSCRIPT SANCTUARY
          Only the selected physical manuscript, reading table, and scholar's side panel!
          ==================================================================== */}
      {viewMode === 'viewer' && (
        <div className="w-full min-h-screen flex flex-col justify-between bg-[#070503] relative z-20 animate-fade-in">
          {/* Dedicated Sanctuary Header */}
          <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070503]/95 border-b border-[#c5a059]/25 px-3 sm:px-6 md:px-8 py-3 transition-all">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              
              {/* LEFT: Non-overlapping sequential navigation controls */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center md:justify-start">
                {/* 1. Primary Return to Archive button at far left */}
                <button
                  onClick={handleReturnToArchive}
                  className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/60 bg-[#160b06]/95 hover:border-[#ffd27d] hover:bg-[#261309] text-[#ffd27d] text-xs tracking-[0.16em] font-cinzel font-semibold uppercase transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.85)] shrink-0"
                  title="Return to Manuscript Archive"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c5a059]" />
                  <span>RETURN TO ARCHIVE</span>
                </button>

                {/* 2. Bharata Varsha Map */}
                {onReturnToMap && (
                  <button
                    onClick={onReturnToMap}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/35 bg-[#160e08]/85 hover:bg-[#2b170c] hover:border-[#ffd27d]/60 text-[#deb881] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.7)] shrink-0"
                    title="Return to Bhārata Varṣa Map"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#c5a059]" />
                    <span className="hidden sm:inline">Bhārata Varṣa Map</span>
                    <span className="sm:hidden">Map</span>
                  </button>
                )}

                {/* 3. Relive */}
                {onReliveJourney && (
                  <button
                    onClick={onReliveJourney}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#160e08]/75 hover:bg-[#2b170c] hover:border-[#ffd27d]/50 text-[#c5a059] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] shrink-0"
                    title="Relive Journey"
                  >
                    <RotateCcw className="w-3 h-3 text-[#c5a059]" />
                    <span>Relive</span>
                  </button>
                )}
              </div>

              {/* CENTER: Manuscript Title & Archival Info */}
              <div className="text-center space-y-0.5 select-none shrink-0 px-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
                  <span className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.25em] uppercase">
                    {currentManuscript.title}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-devanagari text-[#c5a059] truncate max-w-[280px] sm:max-w-none">
                  {currentManuscript.sanskritTitle} · {currentManuscript.period} · {currentManuscript.region}
                </p>
              </div>

              {/* RIGHT: [Sound Off] [Haryana] and Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <AudioControl />

                <div className="bg-[#140b07]/95 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#c9a45a]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.8)] flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-[#c5a059]">
                    <img src="/assets/sacred_mandala.jpg" alt="Sanskriti" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#fff2d1]">
                    HARYANA
                  </span>
                </div>

                <button
                  onClick={handlePlayChime}
                  title="Temple Bell"
                  className="p-1.5 rounded-full border border-[#c5a059]/40 bg-[#140a05] text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {(stage === 'open' || stage === 'closing') && (
                  <button
                    onClick={handleRebind}
                    className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c5a059]/40 text-[11px] font-cinzel text-[#c5a059] hover:text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
                    title="Close and re-seal the manuscript"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>RE-SEAL</span>
                  </button>
                )}
              </div>

            </div>
          </header>

{/* ====================================================================
          SECTION 3: LEVEL 2 READING TABLE — ACTIVE PHYSICAL MANUSCRIPT
          Centering the physical manuscript with Scholar's Annotation side panel!
          ==================================================================== */}
      <main 
        ref={readingTableRef}
        className="relative flex-1 flex flex-col items-center justify-center px-3 sm:px-8 py-6 z-10 overflow-hidden"
      >
        
        {/* Burning Brass Oil Diya */}
        <div className="hidden lg:flex absolute left-8 bottom-10 items-center gap-3 z-20 pointer-events-none select-none">
          <div className="relative flex flex-col items-center">
            <Flame className="w-8 h-8 text-[#ffd27d] animate-diya-flame drop-shadow-[0_0_15px_#ffd27d]" />
            <div className="w-10 h-6 border-b-4 border-l-2 border-r-2 border-[#c5a059] rounded-b-full bg-gradient-to-b from-[#8a5a20] to-[#3d2407] shadow-lg" />
          </div>
          <span className="text-[9px] font-cinzel text-[#ffd27d]/60 tracking-widest uppercase">
            TEMPLE OIL LAMP
          </span>
        </div>

        {/* Active Scripture Banner */}
        <div className="mb-4 text-center select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#160b05]/90 text-[11px] font-cinzel text-[#ffd27d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">{currentManuscript.title}</span>
            <span className="text-[#c5a059]/60">·</span>
            <span className="text-[#c5a059]">{currentManuscript.sanskritTitle}</span>
            <span className="text-[#c5a059]/60">·</span>
            <span>{currentManuscript.accessionCode}</span>
          </div>
        </div>

        {/* ==================================================================
            MAIN READING DESK: 3D MANUSCRIPT + DEDICATED SCHOLAR'S SIDE PANEL
            ================================================================== */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 my-auto">
          
          {/* LEFT / CENTER: THE 3D PHYSICAL MANUSCRIPT */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center"
            style={{ perspective: '2400px' }}
          >
            {/* Cast Table Shadow Beneath Physical Book */}
            <div 
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[92%] h-14 rounded-[50%] pointer-events-none transition-all duration-700"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.55) 50%, transparent 75%)',
                filter: 'blur(16px)',
                transform: (stage === 'open' || stage === 'opening') ? 'scaleX(1.1) scaleY(1.2)' : 'scaleX(0.65) scaleY(1)'
              }}
            />

            {/* UNIFIED 3D PHYSICAL BOOK OBJECT */}
            <div 
              ref={bookSpreadContainerRef}
              className="relative w-full mx-auto rounded-xl transition-all"
              style={{
                transformStyle: 'preserve-3d',
                maxWidth: stage === 'sealed' ? '34rem' : '64rem',
                minHeight: 'min(78vh, 580px)'
              }}
            >
              {/* OPEN TWO-PAGE SPREAD BASE */}
              <div 
                ref={openPagesContainerRef}
                className={`relative w-full rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch border-2 border-[#7a4e20] ${
                  stage === 'sealed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{
                  minHeight: 'min(78vh, 580px)',
                  transformStyle: 'preserve-3d',
                  background: '#dfc79b'
                }}
              >
                {/* Stacked Page Edges Visible Along Left, Bottom & Right Borders */}
                <div 
                  className="absolute -inset-1.5 rounded-xl pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(to bottom, #d4be94 0px, #bda173 1px, #eed9b7 2px, #8a6c42 3px)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.95), inset 0 0 15px rgba(0,0,0,0.8)'
                  }}
                />

                {/* LEFT FOLIO (Aged Parchment with Miniature Artwork) */}
                <div 
                  className="relative w-full md:w-1/2 flex flex-col justify-between manuscript-paper-aged manuscript-paper-left"
                  style={{ color: '#1a0d05' }}
                >
                  <div className="absolute inset-2 border border-[#8a5d28]/25 rounded border-dashed pointer-events-none" />
                  <div className="absolute top-3 bottom-3 left-5 w-[1.5px] bg-[#8a1c14]/35 pointer-events-none" />
                  <div className="absolute top-3 bottom-3 left-6 w-[0.5px] bg-[#8a1c14]/20 pointer-events-none" />

                  <LeftPageContent folio={currentFolio} manuscript={currentManuscript} />
                </div>

                {/* CENTER BINDING SPINE & 6 PHYSICAL RING STITCHES */}
                <div 
                  className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(20,8,3,0.55) 0%, rgba(20,8,3,0.1) 45%, rgba(20,8,3,0.1) 55%, rgba(20,8,3,0.55) 100%)',
                    boxShadow: '0 0 12px rgba(0,0,0,0.8)'
                  }}
                >
                  <div className="h-full flex flex-col justify-around items-center py-4">
                    {[...Array(6)].map((_, rIdx) => (
                      <div 
                        key={rIdx} 
                        className="w-4 h-1.5 rounded-full border border-[#c5a059] bg-[#220d04] shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT FOLIO (Aged Parchment with Sanskrit Verse & Translation) */}
                <div 
                  className="relative w-full md:w-1/2 flex flex-col justify-between manuscript-paper-aged manuscript-paper-right"
                  style={{ color: '#1a0d05' }}
                >
                  <div className="absolute inset-2 border border-[#8a5d28]/25 rounded border-dashed pointer-events-none" />
                  <div className="absolute top-3 bottom-3 right-5 w-[1.5px] bg-[#8a1c14]/35 pointer-events-none" />
                  <div className="absolute top-3 bottom-3 right-6 w-[0.5px] bg-[#8a1c14]/20 pointer-events-none" />

                  <RightPageContent 
                    folio={currentFolio} 
                    manuscript={currentManuscript}
                    selectedWord={selectedWord}
                    isVerseSelected={isVerseSelected}
                    onWordClick={(item) => {
                      setSelectedWord(item);
                      setIsVerseSelected(false);
                      playTactileSound('paper');
                    }}
                    onVerseClick={() => {
                      setSelectedWord(null);
                      setIsVerseSelected(true);
                      playTactileSound('paper');
                    }}
                  />
                </div>

                {/* 3D TURNING LEAF */}
                <div 
                  ref={turningLeafRef}
                  className={`hidden md:block absolute top-0 bottom-0 w-1/2 z-30 pointer-events-none ${
                    isTurningNext ? 'left-1/2 origin-left' : isTurningPrev ? 'left-0 origin-right' : 'hidden'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  <div 
                    ref={turningShadowRef}
                    className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-r from-black/60 via-transparent to-black/60 opacity-0"
                  />

                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 overflow-hidden manuscript-paper-aged"
                    style={{
                      backfaceVisibility: 'hidden',
                      boxShadow: 'inset 0 0 35px rgba(110,70,25,0.45)'
                    }}
                  >
                    {isTurningNext ? (
                      <RightPageContent 
                        folio={currentFolio} 
                        manuscript={currentManuscript}
                        selectedWord={null}
                        isVerseSelected={false}
                        onWordClick={() => {}} 
                        onVerseClick={() => {}} 
                      />
                    ) : (
                      <LeftPageContent 
                        folio={currentFolio} 
                        manuscript={currentManuscript}
                      />
                    )}
                  </div>

                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 overflow-hidden manuscript-paper-aged"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: 'inset 0 0 35px rgba(110,70,25,0.45)'
                    }}
                  >
                    {isTurningNext ? (
                      <LeftPageContent 
                        folio={nextFolio} 
                        manuscript={currentManuscript}
                      />
                    ) : (
                      <RightPageContent 
                        folio={prevFolio} 
                        manuscript={currentManuscript}
                        selectedWord={null}
                        isVerseSelected={false}
                        onWordClick={() => {}} 
                        onVerseClick={() => {}} 
                      />
                    )}
                  </div>
                </div>

              </div>

              {/* PHASE 1 & 2: 3D FRONT COVER DOOR (CLOSED MANUSCRIPT) */}
              <div 
                ref={frontCoverDoorRef}
                className={`absolute inset-0 z-40 rounded-xl border-2 border-[#8c6531] shadow-[0_30px_90px_rgba(0,0,0,0.98)] select-none origin-left flex flex-col justify-between ${
                  stage === 'open' ? 'hidden pointer-events-none' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: stage === 'open' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  background: currentManuscript.coverStyle.bgGradient,
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.92), 0 35px 80px rgba(0,0,0,0.98)',
                  backfaceVisibility: 'hidden',
                  minHeight: 'min(78vh, 580px)'
                }}
              >
                {/* Stacked Page Edges */}
                <div 
                  className="absolute right-0 top-3 bottom-3 w-4 rounded-r pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(to bottom, #d4be94 0px, #bda173 1px, #eed9b7 2px, #8a6c42 3px)',
                    boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.8), 3px 0 6px rgba(0,0,0,0.7)'
                  }}
                />
                <div 
                  className="absolute left-3 right-3 bottom-0 h-3 rounded-b pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(to right, #d4be94 0px, #bda173 1px, #eed9b7 2px, #8a6c42 3px)',
                    boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.8), 0 3px 6px rgba(0,0,0,0.7)'
                  }}
                />

                {/* Spine Ribs on Left Binding Edge */}
                <div className="absolute top-0 bottom-0 left-0 w-3.5 border-r border-[#ffd27d]/20 bg-gradient-to-r from-[#140802] to-transparent pointer-events-none">
                  <div className="h-full flex flex-col justify-around items-center py-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2.5 h-1 rounded bg-[#ffd27d]/40 shadow-inner" />
                    ))}
                  </div>
                </div>

                {/* Embossed Antique Gold Borders */}
                <div className="absolute inset-3 border-2 border-[#c5a059]/50 rounded pointer-events-none" />
                <div className="absolute inset-4 border border-[#ffd27d]/20 border-dashed rounded pointer-events-none" />

                {/* Corner Mounts */}
                <div className="absolute top-2 left-4 w-7 h-7 border-t-2 border-l-2 border-[#ffd27d]" />
                <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#ffd27d]" />
                <div className="absolute bottom-2 left-4 w-7 h-7 border-b-2 border-l-2 border-[#ffd27d]" />
                <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#ffd27d]" />

                {/* Cover Title */}
                <div className="text-center pt-8 space-y-1 relative z-10 px-6">
                  <span className="text-[10px] font-cinzel text-[#ffd27d]/75 tracking-[0.3em] uppercase block font-bold">
                    {currentManuscript.accessionCode} · {currentManuscript.region}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-devanagari text-[#ffd27d] font-bold tracking-[0.16em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    {currentManuscript.sanskritTitle}
                  </h3>
                  <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase block font-semibold">
                    {currentManuscript.title}
                  </span>
                </div>

                {/* Silk Binding Cords */}
                <div 
                  ref={cordLeftRef}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-3.5 z-20 origin-left pointer-events-none"
                  style={{
                    background: currentManuscript.coverStyle.cordColor,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.85)'
                  }}
                >
                  <div className="w-full h-[1px] bg-[#ffd27d]/70 my-1" />
                </div>

                <div 
                  ref={cordRightRef}
                  className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-3.5 z-20 origin-right pointer-events-none"
                  style={{
                    background: currentManuscript.coverStyle.cordColor,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.85)'
                  }}
                >
                  <div className="w-full h-[1px] bg-[#ffd27d]/70 my-1" />
                </div>

                {/* Central Wax Seal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                  <div 
                    ref={sealGlowRef}
                    className="absolute w-36 h-36 rounded-full bg-[#ffd27d] blur-2xl opacity-0 pointer-events-none"
                  />

                  <button
                    ref={sealButtonRef}
                    onClick={handleBreakSeal}
                    className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{
                      background: currentManuscript.coverStyle.sealColor,
                      border: '2px solid #ffd27d',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.98), inset 0 2px 4px rgba(255,255,255,0.35)'
                    }}
                    title="Click to break seal and open manuscript"
                  >
                    <div className="absolute inset-1.5 rounded-full border border-[#ffd27d]/50" />
                    <div className="absolute inset-3 rounded-full border border-[#ffd27d]/25 border-dashed animate-[spin_50s_linear_infinite]" />

                    <div className="text-center">
                      <span className="text-3xl sm:text-4xl font-devanagari text-[#ffd27d] drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] block">
                        {currentManuscript.coverStyle.sealEmblem}
                      </span>
                      <span className="text-[7px] font-cinzel text-[#fce8c3] tracking-widest uppercase font-bold block">
                        {currentManuscript.coverStyle.sealLabel}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Instruction: BREAK THE SEAL */}
                <div className="absolute bottom-8 inset-x-0 text-center relative z-10 space-y-1">
                  <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.25em] uppercase font-bold block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    BREAK THE SEAL
                  </span>
                  <span className="text-[11px] font-cormorant italic text-[#c5a059]/90 block">
                    Touch the seal or click to open
                  </span>
                </div>
              </div>

            </div>

            {/* Left and Right Tactile Navigation Buttons */}
            {stage === 'open' && (
              <>
                <button
                  onClick={handlePrevFolio}
                  disabled={activeFolioIndex === 0 || isTurningNext || isTurningPrev}
                  className="absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#c5a059] bg-[#160b05] text-[#ffd27d] flex flex-col items-center justify-center hover:scale-110 hover:border-[#ffd27d] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl z-30 cursor-pointer"
                  title="Previous Folio"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-[7px] font-cinzel font-bold tracking-widest uppercase">PREV</span>
                </button>

                <button
                  onClick={handleNextFolio}
                  disabled={activeFolioIndex === currentManuscript.folios.length - 1 || isTurningNext || isTurningPrev}
                  className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#c5a059] bg-[#160b05] text-[#ffd27d] flex flex-col items-center justify-center hover:scale-110 hover:border-[#ffd27d] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl z-30 cursor-pointer"
                  title="Next Folio"
                >
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-[7px] font-cinzel font-bold tracking-widest uppercase">NEXT</span>
                </button>
              </>
            )}

          </div>

          {/* RIGHT / SIDE PANEL: DEDICATED SCHOLAR'S ARCHIVAL INTERPRETATION */}
          {stage === 'open' && (
            <ScholarArchivalSidePanel
              manuscript={currentManuscript}
              folio={currentFolio}
              selectedWord={selectedWord}
              isVerseSelected={isVerseSelected}
              onClearWordSelection={() => {
                setSelectedWord(null);
                setIsVerseSelected(true);
                playTactileSound('paper');
              }}
              onSelectWord={(termItem) => {
                setSelectedWord(termItem);
                setIsVerseSelected(false);
                playTactileSound('paper');
              }}
            />
          )}

        </div>

      </main>

      {/* ====================================================================
          BOTTOM ARCHIVAL CONTROL BAR
          ==================================================================== */}
      {stage === 'open' && (
        <footer className="relative z-30 backdrop-blur-md bg-[#070503]/95 border-t border-[#c5a059]/30 px-4 md:px-8 py-3 transition-all">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-cinzel text-[#ffd27d] tracking-[0.2em] uppercase font-bold">
            
            {/* VIEW MEANING */}
            <button
              onClick={() => {
                handlePlayChime();
                setIsMeaningDrawerOpen(!isMeaningDrawerOpen);
                setIsHistoricalContextOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                isMeaningDrawerOpen
                  ? 'border-[#ffd27d] bg-[#2a1408] shadow-[0_0_15px_rgba(255,210,125,0.4)]'
                  : 'border-[#c5a059]/40 bg-[#120803] hover:border-[#ffd27d]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#ffd27d]" />
              <span>PHILOSOPHY</span>
            </button>

            <span className="text-[#c5a059]/40 hidden sm:inline">|</span>

            {/* HISTORICAL CONTEXT */}
            <button
              onClick={() => {
                handlePlayChime();
                setIsHistoricalContextOpen(!isHistoricalContextOpen);
                setIsMeaningDrawerOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                isHistoricalContextOpen
                  ? 'border-[#ffd27d] bg-[#2a1408] shadow-[0_0_15px_rgba(255,210,125,0.4)]'
                  : 'border-[#c5a059]/40 bg-[#120803] hover:border-[#ffd27d]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#ffd27d]" />
              <span>CONSERVATION NOTE</span>
            </button>

            <span className="text-[#c5a059]/40 hidden sm:inline">|</span>

            {/* RETURN TO ARCHIVE */}
            <button
              onClick={handleReturnToArchive}
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#c5a059]/40 bg-[#120803] hover:border-[#ffd27d] text-[#c5a059] hover:text-[#ffd27d] transition-all cursor-pointer"
            >
              <Library className="w-3.5 h-3.5" />
              <span>RETURN TO ARCHIVE</span>
            </button>

          </div>
        </footer>
      )}
        </div>
      )}

      {/* ====================================================================
          ELEGANT DRAWER: PHILOSOPHICAL OVERVIEW
          ==================================================================== */}
      <AnimatePresence>
        {isMeaningDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 sm:inset-x-auto sm:right-8 bottom-20 z-50 max-w-lg rounded-2xl border-2 border-[#ffd27d] bg-[#160a05] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.98)] text-left space-y-4"
          >
            <div className="flex items-start justify-between border-b border-[#c5a059]/30 pb-3">
              <div>
                <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-widest uppercase font-bold">
                  PHILOSOPHICAL HERITAGE
                </span>
                <h4 className="text-lg font-cinzel font-bold text-[#fdf7eb]">
                  {currentManuscript.title} · {currentFolio.title}
                </h4>
              </div>
              <button
                onClick={() => setIsMeaningDrawerOpen(false)}
                className="p-1 rounded-full border border-[#c5a059]/40 text-[#ffd27d] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded border border-[#c5a059]/30 bg-[#0d0704] text-xs font-eb-garamond italic text-[#ffd27d]">
              “{currentManuscript.subtitle}”
            </div>

            <div className="space-y-2 text-xs font-eb-garamond text-[#f5e9d2] leading-relaxed">
              <p>
                {currentManuscript.description}
              </p>
              <p>
                {currentFolio.rightContent.contextExplanation || 'Preserved across centuries of oral recitation and monastic transcription along the sacred rivers of Haryana.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          ELEGANT DRAWER: HISTORICAL CONTEXT & CONSERVATION
          ==================================================================== */}
      <AnimatePresence>
        {isHistoricalContextOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 sm:inset-x-auto sm:right-8 bottom-20 z-50 max-w-lg rounded-2xl border-2 border-[#ffd27d] bg-[#160a05] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.98)] text-left space-y-4"
          >
            <div className="flex items-start justify-between border-b border-[#c5a059]/30 pb-3">
              <div>
                <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-widest uppercase font-bold">
                  ARCHIVAL SPECIFICATIONS & CONSERVATION
                </span>
                <h4 className="text-lg font-cinzel font-bold text-[#fdf7eb]">
                  PROVENANCE DOSSIER
                </h4>
              </div>
              <button
                onClick={() => setIsHistoricalContextOpen(false)}
                className="p-1 rounded-full border border-[#c5a059]/40 text-[#ffd27d] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">ACCESSION CODE:</span>
                <span className="font-eb-garamond text-[#fdf7eb] font-bold">{currentManuscript.accessionCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">CANONICAL TITLE:</span>
                <span className="font-devanagari text-[#fdf7eb]">{currentManuscript.sanskritTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">REGION / PROVENANCE:</span>
                <span className="font-eb-garamond text-[#fdf7eb]">{currentManuscript.region}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">HISTORICAL PERIOD:</span>
                <span className="font-eb-garamond text-[#fdf7eb]">{currentManuscript.period}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">PRIMARY SUBSTRATE:</span>
                <span className="font-eb-garamond text-[#fdf7eb]">{currentManuscript.substrate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c5a059]/15">
                <span className="font-cinzel text-[#c5a059]">CONSERVATION PROTOCOL:</span>
                <span className="font-eb-garamond text-[#fdf7eb]">De-acidified, 45% RH Vault, Cedar Oil Fumigation</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
