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
  Check
} from 'lucide-react';
import { SACRED_MANUSCRIPTS_COLLECTION, SCRIPTURE_WORDS_GLOSSARY } from '../data/manuscriptBookData';

// Web Audio API Synthesizer for tactile feedback (wax snap & paper rustle)
function playTactileSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    if (type === 'seal') {
      // Deep resonant wax snap + chime
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
      // Soft rustle of 500-year-old handmade parchment
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
// SACRED MINIATURE ARTWORK RENDERER (LEFT FOLIO)
// ============================================================================
function ManuscriptArtwork({ folio, manuscript }) {
  if (folio.artworkType === 'yantra') {
    return (
      <div className="space-y-4 my-auto flex flex-col items-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-[#8a5d28]/70 p-2 flex items-center justify-center bg-[#dbbf92]/60 shadow-inner">
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
          <h4 className="text-xl font-devanagari font-bold text-[#240f04]">
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
    <div className="space-y-3">
      <div className="relative w-full aspect-[4/3] rounded overflow-hidden border-2 border-[#7a4e20]/80 shadow-[0_4px_12px_rgba(40,20,5,0.25)] bg-[#160b05]">
        <img 
          src={folio.imagePath || '/assets/literature_epic_scene.jpg'} 
          alt={folio.leftContent.title}
          className="w-full h-full object-cover filter contrast-[1.1] sepia-[0.25]"
        />
        <div className="absolute inset-0 border border-[#c5a059]/40 pointer-events-none" />
        <div className="absolute inset-1 border border-[#8a2416]/30 pointer-events-none" />
      </div>
      <div className="text-center space-y-1">
        <span className="text-[11px] font-cinzel text-[#2a1306] tracking-[0.2em] uppercase font-bold block">
          {folio.leftContent.title}
        </span>
        <p className="text-xs font-eb-garamond italic text-[#6e4118]">
          {folio.leftContent.caption}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LEFT PAGE CONTENT RENDERER
// ============================================================================
function LeftPageContent({ folio, manuscript }) {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-left space-y-4 select-none">
      
      {/* Top Folio Badge & Marginal Note */}
      <div className="flex items-center justify-between border-b border-[#7a4e20]/30 pb-2 text-[10px] font-cinzel text-[#6e4118]">
        <span className="font-bold tracking-widest text-[#240f04]">{folio.folioNumber}</span>
        <span className="tracking-wider uppercase">{manuscript.accessionCode} · {manuscript.region}</span>
      </div>

      {/* Main Center Miniature Artwork */}
      <div className="flex-1 flex flex-col justify-center">
        <ManuscriptArtwork folio={folio} manuscript={manuscript} />
      </div>

      {/* Bottom Marginal Sanskrit Symbol & Note */}
      <div className="border-t border-[#7a4e20]/25 pt-2 flex items-center justify-between text-[9px] font-cinzel text-[#7a4e20]">
        <span>PROVENANCE: {manuscript.region}</span>
        <span className="font-bold">ॐ TAT SAT</span>
      </div>

    </div>
  );
}

// ============================================================================
// RIGHT PAGE CONTENT RENDERER
// Sanskrit verse in walnut ink, transliteration, English translation & Archival Note
// ============================================================================
function RightPageContent({ folio, manuscript, onWordClick, isWordStudyActive }) {
  const words = folio.rightContent.verseSanskrit ? folio.rightContent.verseSanskrit.split(/(\s+|।|॥)/) : [];

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-left space-y-4 select-none">
      
      {/* Top Folio Header */}
      <div className="flex items-center justify-between border-b border-[#7a4e20]/30 pb-2 text-[10px] font-cinzel text-[#6e4118]">
        <span className="font-bold tracking-wider uppercase">
          {manuscript.title} · {folio.title}
        </span>
        <span className="tracking-widest uppercase font-bold text-[#240f04]">{manuscript.region}</span>
      </div>

      {/* Center Sun/Chakra Sacred Emblem */}
      <div className="text-center my-0.5 select-none">
        <svg viewBox="0 0 40 40" className="w-6 h-6 mx-auto text-[#7a4e20]/75" fill="none">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <line x1="20" y1="2" x2="20" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="34" x2="20" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="34" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main Sanskrit Verse in Warm Dark-Brown Ink with Interactive Words */}
      <div className="space-y-3.5 text-center my-auto">
        {folio.rightContent.verseSanskrit && (
          <div className="text-lg sm:text-xl md:text-2xl font-devanagari font-bold manuscript-ink-sanskrit leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            {words.map((chunk, idx) => {
              const cleanWord = chunk.replace(/[।॥,.\s]/g, '');
              const glossaryItem = SCRIPTURE_WORDS_GLOSSARY[cleanWord];
              const isClickable = Boolean(glossaryItem);

              if (!isClickable) {
                return <span key={idx}>{chunk}</span>;
              }

              return (
                <span 
                  key={idx}
                  onClick={() => onWordClick(glossaryItem)}
                  className={`cursor-pointer rounded px-1 transition-all ${
                    isWordStudyActive 
                      ? 'border-b-2 border-[#b87333] bg-[#c5a059]/35 text-[#1b0802]' 
                      : 'border-b border-[#7a4e20]/60 hover:bg-[#c5a059]/30'
                  }`}
                  title={`Click to explore '${cleanWord}'`}
                >
                  {chunk}
                </span>
              );
            })}
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
          <div className="pt-1 max-w-lg mx-auto">
            <p className="text-xs sm:text-sm font-eb-garamond manuscript-ink-primary leading-relaxed">
              {folio.rightContent.translation}
            </p>
          </div>
        )}

        {/* Historical commentary / paragraphs */}
        {folio.rightContent.paragraphs && (
          <div className="pt-1 max-w-lg mx-auto space-y-1">
            {folio.rightContent.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-[11px] sm:text-xs font-eb-garamond manuscript-ink-secondary leading-relaxed text-justify">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Four-Column ARCHIVAL NOTE at Bottom */}
      <div className="border-t border-[#7a4e20]/30 pt-2.5 space-y-1">
        <span className="text-[9px] font-cinzel text-[#7a4e20] uppercase tracking-[0.25em] font-bold block">
          ARCHIVAL NOTE
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
// MAIN SCRIPTURES EXPERIENCE COMPONENT
// ============================================================================
export default function HaryanaScripturesExperience({
  onBackToGate,
  onNavigateToLiterature,
  onNavigateToTemples
}) {
  // Navigation State
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState(0); // Default to Bhagavad Gita
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'opening' | 'open' | 'closing'
  const [activeFolioIndex, setActiveFolioIndex] = useState(2); // Start on selected verse
  const [isTurningNext, setIsTurningNext] = useState(false);
  const [isTurningPrev, setIsTurningPrev] = useState(false);
  const [activeGlossaryWord, setActiveGlossaryWord] = useState(null);

  // Bottom Control Drawers
  const [isMeaningDrawerOpen, setIsMeaningDrawerOpen] = useState(false);
  const [isWordStudyActive, setIsWordStudyActive] = useState(false);
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

  // 3D Page Turn References
  const turningLeafRef = useRef(null);
  const turningShadowRef = useRef(null);

  const currentManuscript = SACRED_MANUSCRIPTS_COLLECTION[selectedManuscriptIndex] || SACRED_MANUSCRIPTS_COLLECTION[0];
  const currentFolio = currentManuscript.folios[activeFolioIndex] || currentManuscript.folios[0];
  const nextFolio = currentManuscript.folios[activeFolioIndex + 1] || currentFolio;
  const prevFolio = currentManuscript.folios[activeFolioIndex - 1] || currentFolio;

  const handlePlayChime = () => {
    if (window.playTempleChime) window.playTempleChime();
  };

  // Switching manuscript from the shelf
  const handleSelectManuscript = (idx) => {
    if (selectedManuscriptIndex === idx && stage !== 'sealed') return;
    handlePlayChime();
    playTactileSound('paper');

    // If currently open, reset to sealed
    setSelectedManuscriptIndex(idx);
    setActiveFolioIndex(0);
    setStage('sealed');
    setActiveGlossaryWord(null);

    // Scroll smoothly to reading desk
    if (readingTableRef.current) {
      readingTableRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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

    // 3. Book container smoothly expands width from closed (~540px) to open (~1024px)
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
    setActiveGlossaryWord(null);

    const tl = gsap.timeline({
      onComplete: () => {
        setStage('sealed');
        playTactileSound('seal');
      }
    });

    // 1. Front cover swings back from left to right (rotateY -180 -> 0)
    tl.to(frontCoverDoorRef.current, {
      rotateY: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.inOut'
    });

    // 2. Shrink container back to closed single-page width
    tl.to(bookSpreadContainerRef.current, {
      maxWidth: '34rem', // ~540px
      duration: 1.1,
      ease: 'power3.inOut'
    }, "<");

    // 3. Fade out open pages
    tl.to(openPagesContainerRef.current, {
      opacity: 0,
      scaleX: 0.75,
      duration: 0.9,
      ease: 'power3.inOut'
    }, "<");

    // 4. Re-tighten silk binding cords
    tl.to([cordLeftRef.current, cordRightRef.current], {
      scaleX: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, "-=0.2");

    // 5. Reset seal glow
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
        setActiveGlossaryWord(null);
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
        setActiveGlossaryWord(null);
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
          TOP NAVIGATION BAR
          ← Return to Archive | CHAPTER 02 · SCRIPTURES | SOUND | HARYANA
          ==================================================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070503]/90 border-b border-[#c5a059]/25 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <button
            onClick={onBackToGate}
            className="group flex items-center gap-2 text-[#ffd27d] hover:text-white text-xs tracking-[0.2em] font-cinzel uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c5a059]" />
            <span className="hidden sm:inline">RETURN TO ARCHIVE</span>
            <span className="sm:hidden">ARCHIVE</span>
          </button>

          <div className="text-center space-y-0.5 select-none">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
              <span className="text-xs md:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.28em] uppercase">
                CHAPTER 02 · SCRIPTURES
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-cormorant italic text-[#c5a059]/80 hidden md:block">
              THE SACRED WORD · ज्ञान · श्रुति · स्मृति · “Before it was written, it was remembered.”
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-cinzel text-[#ffd27d] tracking-widest">
            <button
              onClick={handlePlayChime}
              title="Temple Bell"
              className="p-2 rounded-full border border-[#c5a059]/40 bg-[#140a05] text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <span className="hidden sm:inline text-[#c5a059]/50">|</span>
            <span className="hidden sm:inline font-bold">HARYANA</span>

            {(stage === 'open' || stage === 'closing') && (
              <button
                onClick={handleRebind}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c5a059]/40 text-[11px] font-cinzel text-[#c5a059] hover:text-[#ffd27d] hover:border-[#ffd27d] transition-all ml-2 cursor-pointer"
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
          SECTION 1: THE SACRED WORD HERO TITLE
          Restored in all its grand, cinematic, archival glory!
          ==================================================================== */}
      <section className="relative pt-8 pb-4 text-center px-4 max-w-4xl mx-auto select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#120803]/80 text-[10px] font-cinzel text-[#c5a059] tracking-[0.3em] uppercase mb-3">
          <span>KURUKSHETRA MONASTIC ARCHIVE</span>
          <span>·</span>
          <span>MSS REPOSITORY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-bold tracking-[0.18em] text-[#ffd27d] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
          THE SACRED<br />WORD
        </h1>

        <p className="text-xl sm:text-2xl font-devanagari font-bold text-[#c5a059] tracking-widest mt-2">
          ज्ञान · श्रुति · स्मृति
        </p>

        <p className="text-sm sm:text-base font-cormorant italic text-[#deb881]/85 tracking-wide mt-2">
          “Before it was written, it was remembered.”
        </p>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent mx-auto mt-4" />
      </section>

      {/* ====================================================================
          SECTION 2: LEVEL 1 NAVIGATION — ARCHIVAL MANUSCRIPT SHELF
          Horizontal collection of physical closed manuscripts sitting side by side
          ==================================================================== */}
      <section className="relative max-w-6xl mx-auto px-4 py-4 w-full select-none">
        
        <div className="flex items-center justify-between border-b border-[#c5a059]/25 pb-2.5 mb-5 text-xs font-cinzel">
          <div className="flex items-center gap-2 text-[#ffd27d] tracking-[0.2em] uppercase font-bold">
            <Library className="w-4 h-4 text-[#c5a059]" />
            <span>MANUSCRIPT ARCHIVE · PRESERVED GRANTHAS</span>
          </div>
          <span className="text-[10px] text-[#c5a059]/70 hidden sm:inline tracking-wider">
            6 SACRED CANONS IN REPOSITORY
          </span>
        </div>

        {/* The Antique Wooden Archive Shelf */}
        <div className="relative p-4 sm:p-6 rounded-2xl border-2 border-[#543015] shadow-[inset_0_0_50px_rgba(0,0,0,0.95),0_25px_60px_rgba(0,0,0,0.95)] bg-gradient-to-b from-[#1a0e06] via-[#120703] to-[#0d0502]">
          
          {/* Wooden Shelf Texture Lines */}
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#2a1708] to-[#120703] border-t border-[#8c5220]/40 rounded-b-xl" />

          {/* Horizontal Manuscript Collection Grid / Shelf */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {SACRED_MANUSCRIPTS_COLLECTION.map((mss, idx) => {
              const isSelected = selectedManuscriptIndex === idx;

              return (
                <div
                  key={mss.id}
                  onClick={() => handleSelectManuscript(idx)}
                  className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#ffd27d] shadow-[0_0_25px_rgba(255,210,125,0.35)] -translate-y-2'
                      : 'border-[#7a4e20]/60 hover:border-[#ffd27d]/80 hover:-translate-y-1.5'
                  }`}
                  style={{
                    background: mss.coverStyle.bgGradient,
                    boxShadow: isSelected 
                      ? 'inset 0 0 25px rgba(0,0,0,0.9), 0 15px 30px rgba(0,0,0,0.9)' 
                      : 'inset 0 0 20px rgba(0,0,0,0.85), 0 8px 20px rgba(0,0,0,0.8)'
                  }}
                  title={`Inspect ${mss.title}`}
                >
                  {/* Left Spine Ribs */}
                  <div className="absolute left-0 top-2 bottom-2 w-2 border-r border-[#ffd27d]/20 bg-black/40 rounded-l pointer-events-none" />

                  {/* Top Badge & Accession */}
                  <div className="flex items-center justify-between text-[8px] font-cinzel text-[#ffd27d]/70 pb-1 border-b border-[#ffd27d]/20">
                    <span className="font-bold">{mss.shelfBadge}</span>
                    <span>{mss.accessionCode}</span>
                  </div>

                  {/* Center Emblem & Seal */}
                  <div className="my-3 flex flex-col items-center justify-center">
                    <div 
                      className="w-10 h-10 rounded-full border border-[#ffd27d]/70 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                      style={{ background: mss.coverStyle.sealColor }}
                    >
                      <span className="text-base text-[#ffd27d] font-serif">
                        {mss.coverStyle.sealEmblem}
                      </span>
                    </div>
                  </div>

                  {/* Title & Devanagari */}
                  <div className="text-center space-y-0.5">
                    <h4 className="text-[11px] font-cinzel font-bold text-[#ffd27d] tracking-wider uppercase leading-tight group-hover:text-white">
                      {mss.title}
                    </h4>
                    <span className="text-[10px] font-devanagari text-[#deb881]/80 block">
                      {mss.sanskritTitle}
                    </span>
                  </div>

                  {/* Active Indicator or Inspect Callout */}
                  <div className="pt-2 mt-2 border-t border-[#ffd27d]/15 text-center">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[8px] font-cinzel text-[#ffd27d] font-bold tracking-widest uppercase">
                        <Check className="w-2.5 h-2.5" /> ON TABLE
                      </span>
                    ) : (
                      <span className="text-[8px] font-cinzel text-[#c5a059]/60 tracking-wider uppercase group-hover:text-[#ffd27d]">
                        INSPECT →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* ====================================================================
          SECTION 3: LEVEL 2 READING TABLE — ACTIVE PHYSICAL MANUSCRIPT
          Centering the selected physical manuscript with real 3D unsealing & reading
          ==================================================================== */}
      <main 
        ref={readingTableRef}
        className="relative flex-1 flex flex-col items-center justify-center px-3 sm:px-8 py-6 z-10 overflow-hidden"
      >
        
        {/* Burning Brass Oil Diya (Candlelight in Foreground as shown in reference) */}
        <div className="hidden lg:flex absolute left-8 bottom-10 items-center gap-3 z-20 pointer-events-none select-none">
          <div className="relative flex flex-col items-center">
            <Flame className="w-8 h-8 text-[#ffd27d] animate-diya-flame drop-shadow-[0_0_15px_#ffd27d]" />
            <div className="w-10 h-6 border-b-4 border-l-2 border-r-2 border-[#c5a059] rounded-b-full bg-gradient-to-b from-[#8a5a20] to-[#3d2407] shadow-lg" />
          </div>
          <span className="text-[9px] font-cinzel text-[#ffd27d]/60 tracking-widest uppercase">
            TEMPLE OIL LAMP
          </span>
        </div>

        {/* Active Scripture Banner & Folio Indicator */}
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

        {/* 3D MANUSCRIPT VIEWPORT */}
        <div 
          className="relative w-full max-w-5xl my-auto flex items-center justify-center"
          style={{ perspective: '2400px' }}
        >
          
          {/* Cast Table Shadow Beneath the Physical Object */}
          <div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[92%] h-14 rounded-[50%] pointer-events-none transition-all duration-700"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.55) 50%, transparent 75%)',
              filter: 'blur(16px)',
              transform: (stage === 'open' || stage === 'opening') ? 'scaleX(1.1) scaleY(1.2)' : 'scaleX(0.65) scaleY(1)'
            }}
          />

          {/* ================================================================
              UNIFIED 3D PHYSICAL BOOK OBJECT
              When sealed, container is centered at max-w-xl (~540px).
              When opening, container smoothly expands to max-w-5xl (~1024px)
              while the front cover rotates open in 3D perspective!
              ================================================================ */}
          <div 
            ref={bookSpreadContainerRef}
            className="relative w-full mx-auto rounded-xl transition-all"
            style={{
              transformStyle: 'preserve-3d',
              maxWidth: stage === 'sealed' ? '34rem' : '64rem',
              minHeight: 'min(78vh, 580px)'
            }}
          >

            {/* --------------------------------------------------------------
                OPEN TWO-PAGE SPREAD BASE
                Contains the inner folios (Left Page + Right Page + Center Spine)
                -------------------------------------------------------------- */}
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
                {/* Traditional Vermilion Margin Rules */}
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
                {/* Traditional Vermilion Margin Rules */}
                <div className="absolute inset-2 border border-[#8a5d28]/25 rounded border-dashed pointer-events-none" />
                <div className="absolute top-3 bottom-3 right-5 w-[1.5px] bg-[#8a1c14]/35 pointer-events-none" />
                <div className="absolute top-3 bottom-3 right-6 w-[0.5px] bg-[#8a1c14]/20 pointer-events-none" />

                <RightPageContent 
                  folio={currentFolio} 
                  manuscript={currentManuscript}
                  onWordClick={setActiveGlossaryWord}
                  isWordStudyActive={isWordStudyActive}
                />
              </div>

              {/* ------------------------------------------------------------
                  3D TURNING LEAF (FOR PHYSICAL PAGE TURNING FLIPS)
                  ------------------------------------------------------------ */}
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

                {/* Turning Leaf Front Face */}
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
                      onWordClick={() => {}} 
                      isWordStudyActive={false} 
                    />
                  ) : (
                    <LeftPageContent 
                      folio={currentFolio} 
                      manuscript={currentManuscript}
                    />
                  )}
                </div>

                {/* Turning Leaf Back Face */}
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
                      onWordClick={() => {}} 
                      isWordStudyActive={false} 
                    />
                  )}
                </div>
              </div>

            </div>

            {/* --------------------------------------------------------------
                PHASE 1 & 2: 3D FRONT COVER DOOR (CLOSED MANUSCRIPT)
                Occupies the closed book area. Hinged at left spine.
                Swings open rotateY: 0deg -> -180deg on unsealing!
                -------------------------------------------------------------- */}
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
              {/* Stacked Page Thickness Visible along Top, Bottom & Right Borders */}
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

              {/* Spine Ribs on the Left Binding Edge */}
              <div className="absolute top-0 bottom-0 left-0 w-3.5 border-r border-[#ffd27d]/20 bg-gradient-to-r from-[#140802] to-transparent pointer-events-none">
                <div className="h-full flex flex-col justify-around items-center py-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2.5 h-1 rounded bg-[#ffd27d]/40 shadow-inner" />
                  ))}
                </div>
              </div>

              {/* Embossed Antique Gold Filigree Borders */}
              <div className="absolute inset-3 border-2 border-[#c5a059]/50 rounded pointer-events-none" />
              <div className="absolute inset-4 border border-[#ffd27d]/20 border-dashed rounded pointer-events-none" />

              {/* Antique Brass Corner Mounts */}
              <div className="absolute top-2 left-4 w-7 h-7 border-t-2 border-l-2 border-[#ffd27d]" />
              <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#ffd27d]" />
              <div className="absolute bottom-2 left-4 w-7 h-7 border-b-2 border-l-2 border-[#ffd27d]" />
              <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#ffd27d]" />

              {/* Top Title Inscribed on Wood/Leather Cover */}
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

              {/* Crimson / Saffron Silk Binding Cords */}
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

              {/* Central Physical Wax Seal (Interactive Button) */}
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

              {/* Bottom Instruction: BREAK THE SEAL */}
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

      </main>

      {/* ====================================================================
          BOTTOM ARCHIVAL CONTROL BAR (MATCHING REFERENCE EXACTLY)
          [ BOOK ICON ] VIEW MEANING | [ CHAKRA SYMBOL ] EXPLORE WORDS | [ PILLARS ICON ] HISTORICAL CONTEXT | [ SHELF ] RETURN TO SHELF
          ==================================================================== */}
      {stage === 'open' && (
        <footer className="relative z-30 backdrop-blur-md bg-[#070503]/95 border-t border-[#c5a059]/30 px-4 md:px-8 py-3 transition-all">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-cinzel text-[#ffd27d] tracking-[0.2em] uppercase font-bold">
            
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
              <span>VIEW MEANING</span>
            </button>

            <span className="text-[#c5a059]/40 hidden sm:inline">|</span>

            {/* EXPLORE WORDS */}
            <button
              onClick={() => {
                handlePlayChime();
                setIsWordStudyActive(!isWordStudyActive);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                isWordStudyActive
                  ? 'border-[#ffd27d] bg-[#2a1408] shadow-[0_0_15px_rgba(255,210,125,0.4)]'
                  : 'border-[#c5a059]/40 bg-[#120803] hover:border-[#ffd27d]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffd27d]" />
              <span>EXPLORE WORDS</span>
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
              <span>HISTORICAL CONTEXT</span>
            </button>

            <span className="text-[#c5a059]/40 hidden sm:inline">|</span>

            {/* RETURN TO SHELF */}
            <button
              onClick={handleRebind}
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#c5a059]/40 bg-[#120803] hover:border-[#ffd27d] text-[#c5a059] hover:text-[#ffd27d] transition-all cursor-pointer"
            >
              <Library className="w-3.5 h-3.5" />
              <span>ARCHIVE SHELF</span>
            </button>

          </div>
        </footer>
      )}

      {/* ====================================================================
          INTERACTIVE WORD STUDY / SCHOLAR'S MARGINAL ANNOTATION MODAL
          ==================================================================== */}
      <AnimatePresence>
        {activeGlossaryWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 sm:right-8 z-50 w-full max-w-sm rounded-xl border-2 border-[#ffd27d] bg-[#160b06] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.98)] text-left space-y-3"
          >
            <div className="flex items-start justify-between border-b border-[#c5a059]/30 pb-2">
              <div>
                <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-widest uppercase font-bold">
                  SANSKRIT ETYMOLOGY · पद विचार
                </span>
                <h5 className="text-xl font-devanagari font-bold text-[#ffd27d]">
                  {activeGlossaryWord.word}
                </h5>
                <span className="text-[10px] font-eb-garamond italic text-[#c5a059]">
                  {activeGlossaryWord.transliteration}
                </span>
              </div>
              <button
                onClick={() => setActiveGlossaryWord(null)}
                className="p-1 rounded-full border border-[#c5a059]/40 text-[#ffd27d] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-cinzel text-[#c5a059] block text-[9px] uppercase font-bold">
                  LITERAL ROOT (PADACHEDA):
                </span>
                <p className="font-eb-garamond text-[#fdf7eb] text-sm leading-relaxed">
                  {activeGlossaryWord.literal || activeGlossaryWord.meaning}
                </p>
              </div>

              <div>
                <span className="font-cinzel text-[#c5a059] block text-[9px] uppercase font-bold">
                  PHILOSOPHICAL CONTEXT:
                </span>
                <p className="font-eb-garamond text-[#f5e9d2] leading-relaxed">
                  {activeGlossaryWord.context}
                </p>
              </div>

              <div className="pt-2 border-t border-[#c5a059]/20 flex items-center justify-between text-[10px]">
                <span className="font-cinzel text-[#c5a059]">CANONICAL RELEVANCE:</span>
                <span className="font-eb-garamond font-bold text-[#ffd27d]">{activeGlossaryWord.significance}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          ELEGANT DRAWER: VIEW MEANING
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
                  PHILOSOPHICAL INTERPRETATION
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
                Ancient commentators note that these sacred granthas were preserved not as dogmatic creed, but as a living technology of self-realization and cosmic harmony.
              </p>
              <p>
                By linking personal action with universal dharma, the human seeker transcends existential sorrow and touches the eternal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          ELEGANT DRAWER: HISTORICAL CONTEXT
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
                  ARCHIVAL NOTE & CONSERVATION
                </span>
                <h4 className="text-lg font-cinzel font-bold text-[#fdf7eb]">
                  PROVENANCE & SPECIFICATIONS
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
