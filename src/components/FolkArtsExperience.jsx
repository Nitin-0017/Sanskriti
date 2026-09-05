import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowDown, Sparkles, BookOpen, Layers, Compass, Flame } from 'lucide-react';
import audioManager from '../services/audioManager';
import { HARYANA_FOLK_TRADITIONS, SURAJKUND_EXPERIENCE } from '../data/folkArtsData';
import FolkArtsTraditionDetail from './FolkArtsTraditionDetail';
import SurajkundMelaExperience from './SurajkundMelaExperience';

/**
 * ============================================================================
 * FOLK ARTS OF HARYANA: THE LIVING CANVAS
 * Multi-Page Digital Heritage Journey Architecture
 * 
 * Flow:
 * 1. Full-Screen Cinematic Hero (Pure opening title sequence, NO top navigation)
 * 2. User scrolls or clicks "ENTER THE LIVING TRADITION"
 *    -> Top navigation smoothly slides into view & becomes sticky
 * 3. Each chapter is an INDEPENDENT PAGE / ROUTE:
 *    - Chapter 01: Tradition (/haryana/folk-arts/tradition)
 *    - Chapter 02: Materials (/haryana/folk-arts/materials)
 *    - Chapter 03: The Folk Arts Archive (/haryana/folk-arts/art-forms or /archive)
 *       -> Individual Tradition Dedicated Page (/haryana/folk-arts/art-forms/:id)
 *    - Chapter 04: Artisans (/haryana/folk-arts/artisans)
 *    - Chapter 05: Today & Surajkund Mela (/haryana/folk-arts/today or /surajkund)
 * ============================================================================
 */

// Authentic Folk Lotus Mandala Emblem matching the reference image
function FolkLotusOrnament({ className = "w-24 h-16" }) {
  return (
    <svg viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="lotusRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="70%" stopColor="#8b1e1b" />
          <stop offset="100%" stopColor="#5c110f" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2d4" />
          <stop offset="50%" stopColor="#ffd27d" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
        <filter id="ornamentGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Central Radiating Sacred Bud */}
      <circle cx="90" cy="18" r="3" fill="url(#goldGrad)" filter="url(#ornamentGlow)" />
      <path d="M90 8 C88 12 88 14 90 18 C92 14 92 12 90 8 Z" fill="url(#goldGrad)" />
      
      {/* Main Central Lotus Petal */}
      <path
        d="M90 32 C78 52 74 72 90 92 C106 72 102 52 90 32 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.8"
        filter="url(#ornamentGlow)"
      />
      
      {/* Inner teardrop in core */}
      <path
        d="M90 48 C85 60 83 72 90 82 C97 72 95 60 90 48 Z"
        fill="#5c110f"
        stroke="url(#goldGrad)"
        strokeWidth="1"
      />
      <circle cx="90" cy="65" r="3" fill="url(#goldGrad)" />

      {/* Flanking Tier 1 Petals (Inner Pair) */}
      <path
        d="M82 42 C64 56 60 76 74 94 C76 82 78 68 82 42 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.6"
      />
      <path
        d="M98 42 C116 56 120 76 106 94 C104 82 102 68 98 42 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.6"
      />

      {/* Flanking Tier 2 Petals (Outer Arch Pair) */}
      <path
        d="M72 54 C50 68 46 88 62 102 C66 90 70 78 72 54 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.4"
      />
      <path
        d="M108 54 C130 68 134 88 118 102 C114 90 110 78 108 54 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.4"
      />

      {/* Outermost Wings (Wide Horizontal Petals) */}
      <path
        d="M60 72 C32 80 26 96 46 106 C52 98 58 88 60 72 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
      />
      <path
        d="M120 72 C148 80 154 96 134 106 C128 98 122 88 120 72 Z"
        fill="url(#lotusRed)"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
      />

      {/* Tiny Golden Pearl Accents */}
      <circle cx="28" cy="92" r="2.2" fill="url(#goldGrad)" />
      <circle cx="152" cy="92" r="2.2" fill="url(#goldGrad)" />
      <circle cx="48" cy="68" r="1.8" fill="url(#goldGrad)" />
      <circle cx="132" cy="68" r="1.8" fill="url(#goldGrad)" />

      {/* Base Lotus Platform */}
      <path
        d="M62 94 C76 100 104 100 118 94 C110 102 70 102 62 94 Z"
        fill="url(#goldGrad)"
      />
      <circle cx="90" cy="103" r="2" fill="url(#goldGrad)" />
    </svg>
  );
}

// Chapter Navigation Tabs Configuration
const CHAPTER_TABS = [
  { id: 'tradition', num: '01', label: '01 TRADITION', path: '/haryana/folk-arts/tradition' },
  { id: 'materials', num: '02', label: '02 MATERIALS', path: '/haryana/folk-arts/materials' },
  { id: 'art-forms', num: '03', label: '03 ART FORMS', path: '/haryana/folk-arts/art-forms' },
  { id: 'artisans', num: '04', label: '04 ARTISANS', path: '/haryana/folk-arts/artisans' },
  { id: 'today', num: '05', label: '05 TODAY', path: '/haryana/folk-arts/today' },
];

export default function FolkArtsExperience({ onBackToGate }) {
  // Helper to extract initial chapter and tradition from URL
  const getChapterFromUrl = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/surajkund')) return 'today';
      if (path.includes('/materials')) return 'materials';
      if (path.includes('/art-forms') || path.includes('/archive')) return 'art-forms';
      if (path.includes('/artisans')) return 'artisans';
      if (path.includes('/today')) return 'today';
      if (path.includes('/tradition')) return 'tradition';
    }
    return null;
  };

  const getTraditionIdFromUrl = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const match = path.match(/\/(?:art-forms|archive)\/([a-z0-9-]+)/);
      if (match) return match[1];
    }
    return null;
  };

  const initialChapter = getChapterFromUrl();
  const [activeChapter, setActiveChapter] = useState(initialChapter || 'tradition');
  const [selectedTraditionId, setSelectedTraditionId] = useState(getTraditionIdFromUrl());
  const [showSurajkundDirect, setShowSurajkundDirect] = useState(
    typeof window !== 'undefined' && window.location.pathname.includes('/surajkund')
  );
  // Top navigation is hidden on initial Hero load, revealed only when scrolling or on a dedicated chapter route
  const [showNav, setShowNav] = useState(initialChapter !== null);
  // Transition progress from 0 (Hero landing) to 1 (Vintage Archival Brown Chapter background)
  const [scrollProgress, setScrollProgress] = useState(initialChapter !== null ? 1 : 0);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const heroRef = useRef(null);
  const chapterContentRef = useRef(null);

  // Current tradition object if one is opened
  const selectedTradition = selectedTraditionId 
    ? HARYANA_FOLK_TRADITIONS.find((t) => t.id === selectedTraditionId) || null 
    : null;

  // Sync audio with Folk Arts mode
  useEffect(() => {
    audioManager.setFolkArtsMode();
    if (!initialChapter) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Handle URL popstate (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const ch = getChapterFromUrl();
      const tr = getTraditionIdFromUrl();
      setSelectedTraditionId(tr);
      setShowSurajkundDirect(typeof window !== 'undefined' && window.location.pathname.includes('/surajkund'));
      if (ch) {
        setActiveChapter(ch);
        setShowNav(true);
        setScrollProgress(1);
      } else {
        setShowNav(false);
        setScrollProgress(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll listener: Smoothly transitions background from Hero Photograph to Vintage Archival Brown over 600-900px
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroThreshold = window.innerHeight * 0.35;
          const isDirectChapter = getChapterFromUrl() !== null;

          if (isDirectChapter) {
            if (!showNav) setShowNav(true);
            setScrollProgress(1);
          } else {
            if (scrollY > heroThreshold) {
              if (!showNav) setShowNav(true);
            } else {
              if (showNav) setShowNav(false);
            }

            const transitionDist = Math.max(window.innerHeight * 0.8, 650);
            const progress = Math.min(Math.max(scrollY / transitionDist, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showNav]);

  // Open individual tradition dedicated chapter page
  const handleOpenTradition = (traditionId) => {
    setIsPageTransitioning(true);
    setTimeout(() => {
      setSelectedTraditionId(traditionId);
      setActiveChapter('art-forms');
      setShowNav(true);
      setScrollProgress(1);
      window.history.pushState(null, '', `/haryana/folk-arts/art-forms/${traditionId}`);
      if (chapterContentRef.current) {
        chapterContentRef.current.scrollIntoView({ behavior: 'instant' });
      }
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 350);
    }, 250);
  };

  // Return to Folk Arts Archive plate view
  const handleBackToArchive = () => {
    setIsPageTransitioning(true);
    setTimeout(() => {
      setSelectedTraditionId(null);
      setActiveChapter('art-forms');
      setShowNav(true);
      window.history.pushState(null, '', '/haryana/folk-arts/art-forms');
      if (chapterContentRef.current) {
        chapterContentRef.current.scrollIntoView({ behavior: 'instant' });
      }
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 350);
    }, 250);
  };

  // Navigate to next tradition sequentially
  const handleNavigateNextTradition = () => {
    const currentIndex = HARYANA_FOLK_TRADITIONS.findIndex((t) => t.id === selectedTraditionId);
    const nextIndex = (currentIndex + 1) % HARYANA_FOLK_TRADITIONS.length;
    handleOpenTradition(HARYANA_FOLK_TRADITIONS[nextIndex].id);
  };

  // Navigate to a chapter as a distinct page route
  const handleNavigateChapter = (targetChapterId) => {
    setScrollProgress(1);
    if (targetChapterId === 'art-forms') {
      setSelectedTraditionId(null);
    }
    if (targetChapterId === 'today') {
      setShowSurajkundDirect(false);
    }

    if (activeChapter === targetChapterId && showNav && !selectedTraditionId && !showSurajkundDirect) {
      if (chapterContentRef.current) {
        chapterContentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setIsPageTransitioning(true);

    setTimeout(() => {
      setActiveChapter(targetChapterId);
      setShowNav(true);
      window.history.pushState(null, '', `/haryana/folk-arts/${targetChapterId}`);
      
      // Scroll to the start of the chapter content
      if (chapterContentRef.current) {
        chapterContentRef.current.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'instant' });
      }

      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 350);
    }, 300);
  };

  // Called when clicking "ENTER THE LIVING TRADITION" / down arrow on Hero
  const handleEnterLivingTradition = () => {
    setShowNav(true);
    setActiveChapter('tradition');
    window.history.pushState(null, '', '/haryana/folk-arts/tradition');
    if (chapterContentRef.current) {
      chapterContentRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Drifting golden dust particles
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 6.3) % 94 + 3}%`,
    duration: `${14 + (i % 5) * 2}s`,
    delay: `${(i * 1.1) % 6}s`,
    size: `${1.2 + (i % 3) * 1.2}px`,
  }));

  // Tactile Materials for Chapter 02 (Contextualized into parent folk traditions)
  const materials = [
    {
      num: '01',
      title: 'COTTON',
      sub: 'Handspun Coarse Khaddar',
      image: '/assets/haryana_phulkari.jpg',
      origin: 'Rural Rohtak & Hissar Pit Looms',
      desc: 'Homespun on village Charkhas, this heavyweight madder-dyed cotton canvas carries the rough texture of northern agrarian soil, sturdy enough to hold thousands of dense silk darning stitches without tearing.',
      quality: 'Textured • Breathable • Durable Base',
      traditionId: 'phulkari',
      traditionTitle: '01 PHULKARI',
    },
    {
      num: '02',
      title: 'SILK',
      sub: 'Untwisted Pat Floss',
      image: '/assets/haryana_phulkari.jpg',
      origin: 'Historic Grand Trunk Road Trade',
      desc: 'Raw, untwisted filament silk imported along ancient northern trading corridors and dyed in brilliant natural madder, saffron, and chrome. Its flat untwisted fibers create an incandescent, light-catching satin sheen.',
      quality: 'Incandescent • High-Luster • Unspun',
      traditionId: 'phulkari',
      traditionTitle: '01 PHULKARI',
    },
    {
      num: '03',
      title: 'CLAY',
      sub: 'Yamuna Alluvial Silt',
      image: '/assets/haryana_countryside.jpg',
      origin: 'Jhajjar & Yamuna Riverbeds',
      desc: 'Porous riverbed sediment harvested from dried ponds and river floodplains, hand-kneaded with river sand. Fired in wood-burning kilns to sculpt naturally cooling Surahi water vessels and sacred ceremonial lamps.',
      quality: 'Porous • Natural Evaporative Cooling',
      traditionId: 'pottery',
      traditionTitle: '04 TRADITIONAL POTTERY',
    },
    {
      num: '04',
      title: 'SHEESHAM WOOD',
      sub: 'Indian Rosewood',
      image: '/assets/haryana_saang_theatre.jpg',
      origin: 'Local Shivalik Foot-hills Timber',
      desc: 'Dense, resonant timber selected by master instrument makers to carve Sarangi acoustic chambers, puppet heads, chaupal benches, and hand-block textile printing stamps.',
      quality: 'Resonant • Dense Grain • Acoustic',
      traditionId: 'woodcraft',
      traditionTitle: '08 TRADITIONAL WOODCRAFT',
    },
  ];

  // Artisans for Chapter 04
  const artisans = [
    {
      role: 'MASTER EMBROIDERESS',
      name: 'Kaushalya Devi',
      location: 'Rohtak District',
      image: '/assets/haryana_phulkari.jpg',
      quote: '“When we pull the needle from the reverse side, our fingers remember the count that words cannot speak.”',
      narrative: 'For over sixty years, Kaushalya Devi has practiced the counted darning stitch on handspun khaddar. Learning at age nine beside her grandmother, she can map an entire Bagh without pencil marks, guided solely by the tactile grain of the cotton weave.',
      survival: 'She now runs a village cooperative teaching young women the authentic darning stitch, preserving unwritten heritage against factory printed substitutes.',
    },
    {
      role: 'SEVENTH-GENERATION POTTER',
      name: 'Rameshwar Kumhar',
      location: 'Jhajjar Earthen Kilns',
      image: '/assets/haryana_countryside.jpg',
      quote: '“The clay tells you when it is ready. You cannot hurry river sediment that took ten thousand years to form.”',
      narrative: 'Rameshwar shapes porous Surahis on a wooden kick wheel inherited from his grandfather. His family harvests dense clay from the Yamuna riverbed after the monsoon, aging it under damp jute for months before throwing.',
      survival: 'His water vessels are renowned across Delhi and Haryana for naturally chilling summer drinking water to cool sweetness without electricity.',
    },
    {
      role: 'SAANG FOLK OPERA PERFORMER',
      name: 'Lineage of Pandit Lakhmi Chand',
      location: 'Sonipat Village Chaupal',
      image: '/assets/haryana_saang_theatre.jpg',
      quote: '“A Saang singer does not read from paper; Saraswati sits upon the voice when the chaupal falls silent under the stars.”',
      narrative: 'Carrying forward the oral theatrical tradition founded by Haryana’s legendary folk dramatist, master performers tour rural village squares, enacting classical moral allegories through song, verse, and mime until dawn.',
      survival: 'They preserve thousands of metered quatrains entirely through oral memory, keeping living philosophical theatre vibrant in modern village gatherings.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#160B05] text-[#f4ecd8] selection:bg-[#7a2832] selection:text-[#f7e6c4] font-manuscript overflow-x-hidden select-none">
      
      {/* ====================================================================
          1. CINEMATIC WARM HERITAGE HERO BACKGROUND (LANDING / OPENING SCENE)
          Full opacity at scroll 0, smoothly darkens & fades over 600-850px scroll
          Completely disappears as user enters Chapter 01
          ==================================================================== */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-150 ease-out"
        style={{
          opacity: 1 - scrollProgress,
          visibility: scrollProgress >= 0.99 ? 'hidden' : 'visible',
        }}
      >
        {/* Layer 1: Untouched Authentic Cultural Background (Darkened by ~12% for refined exposure) */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ 
            backgroundImage: `url('/assets/haryana_folk_hero_cinematic.jpg')`,
            opacity: 0.88,
            filter: 'brightness(0.78) contrast(1.08) saturate(1.0)'
          }}
        />

        {/* Layer 1b: Subtle Dark Brown/Burnt Umber Toning Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[#160B05]/20 mix-blend-multiply" 
        />

        {/* Layer 1c: Cinematic Gradual Darkening Veil during scroll before dissolving */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[#140904]"
          style={{
            opacity: Math.min(scrollProgress * 1.35, 0.82)
          }}
        />

        {/* Layer 2: Softened, Atmospheric Golden Glow & Radiant Rays (Atmospheric, deep warm amber/gold) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
          {/* Soft, Diffused Deep Amber Halo directly behind the title */}
          <div 
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[680px] h-[340px] sm:h-[450px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 155, 61, 0.17) 0%, rgba(180, 115, 36, 0.10) 38%, rgba(120, 65, 20, 0.04) 68%, transparent 85%)',
              filter: 'blur(36px)',
            }}
          />

          {/* Softened, Atmospheric Golden Rays */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-26"
            viewBox="0 0 1600 900" 
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="subtleRayGrad" cx="50%" cy="47%" r="60%">
                <stop offset="0%" stopColor="#e2b85a" stopOpacity="0.32" />
                <stop offset="30%" stopColor="#c58a32" stopOpacity="0.18" />
                <stop offset="65%" stopColor="#8a541c" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#4a2812" stopOpacity="0" />
              </radialGradient>
              <filter id="subtleRayBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
            <g filter="url(#subtleRayBlur)">
              <polygon points="800,420 180,0 290,0" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 0,140 0,250" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 1310,0 1420,0" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 1600,140 1600,250" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 620,0 740,0" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 860,0 980,0" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 0,680 160,900" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 1600,680 1440,900" fill="url(#subtleRayGrad)" />
              <polygon points="800,420 660,900 940,900" fill="url(#subtleRayGrad)" />
            </g>
          </svg>
        </div>

        {/* Layer 3: Warm Environmental Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 90% 75% at 50% 46%, 
                transparent 30%, 
                rgba(50, 26, 11, 0.25) 62%, 
                rgba(22, 11, 5, 0.55) 86%, 
                rgba(16, 8, 3, 0.76) 100%
              ),
              linear-gradient(to bottom, 
                rgba(22, 11, 5, 0.30) 0%, 
                transparent 25%, 
                transparent 70%, 
                rgba(22, 11, 5, 0.65) 100%
              )
            `
          }}
        />

        {/* Restrained Golden Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[#ffd27d]/60 shadow-[0_0_6px_rgba(255,210,120,0.4)]"
              style={{
                left: p.left,
                top: '-10px',
                width: p.size,
                height: p.size,
                opacity: 0.25,
                animation: `particleFloat ${p.duration} linear infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* ====================================================================
          2. VINTAGE ARCHIVAL BROWN ENVIRONMENT (CHAPTER 01 & DEDICATED CHAPTERS)
          Aged handmade paper/parchment grain, deep walnut/dark sepia tones,
          subtle Haryana folk-art watermarks, archival ruling frame, deep vignette
          ==================================================================== */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-150 ease-out"
        style={{
          opacity: scrollProgress,
          visibility: scrollProgress <= 0.01 ? 'hidden' : 'visible',
        }}
      >
        {/* Layer A: Deep Walnut Brown / Dark Sepia Base Tones */}
        <div 
          className="absolute inset-0 bg-[#140904]" 
          style={{
            background: 'radial-gradient(circle at 50% 32%, #26140b 0%, #1c0e07 42%, #140804 78%, #0d0502 100%)'
          }}
        />

        {/* Layer B: Aged Parchment / Handmade Paper Texture (Deep sepia blend, subdued, NOT bright or orange) */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-[0.14]"
          style={{
            backgroundImage: `url('/assets/antique_parchment.jpg')`,
            filter: 'brightness(0.64) contrast(1.20) sepia(0.72)',
          }}
        />

        {/* Layer C: Faint Historical Paper Grain & Fiber Noise */}
        <div 
          className="absolute inset-0 opacity-[0.038] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Layer D: Extremely Subtle Haryana Folk-Art & Textile Watermark Motifs */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.042] pointer-events-none select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Phulkari Geometric Stepped Diamond Motif (Traditional counted darning stitch) */}
            <pattern id="phulkariWatermark" width="180" height="180" patternUnits="userSpaceOnUse">
              <g stroke="#d4a359" strokeWidth="0.85" fill="none">
                {/* Outer diamond */}
                <polygon points="90,15 165,90 90,165 15,90" />
                {/* Inner concentric diamonds */}
                <polygon points="90,35 145,90 90,145 35,90" strokeDasharray="3 3" />
                <polygon points="90,55 125,90 90,125 55,90" />
                <polygon points="90,75 105,90 90,105 75,90" />
                {/* Corner traditional chevrons */}
                <line x1="0" y1="0" x2="30" y2="30" />
                <line x1="180" y1="0" x2="150" y2="30" />
                <line x1="0" y1="180" x2="30" y2="150" />
                <line x1="180" y1="180" x2="150" y2="150" />
                <circle cx="90" cy="90" r="3" fill="#d4a359" />
              </g>
            </pattern>

            {/* Folk Chaupal Lotus Medallion Watermark */}
            <pattern id="folkLotusWatermark" width="360" height="360" patternUnits="userSpaceOnUse">
              <g stroke="#d4a359" strokeWidth="0.75" fill="none" opacity="0.85">
                <circle cx="180" cy="180" r="48" strokeDasharray="4 4" />
                <circle cx="180" cy="180" r="28" />
                {/* Petals */}
                <path d="M180,132 C172,150 172,165 180,180 C188,165 188,150 180,132 Z" />
                <path d="M180,228 C172,210 172,195 180,180 C188,195 188,210 180,228 Z" />
                <path d="M132,180 C150,172 165,172 180,180 C165,188 150,188 132,180 Z" />
                <path d="M228,180 C210,172 195,172 180,180 C195,188 210,188 228,180 Z" />
                <circle cx="180" cy="180" r="5" fill="#d4a359" />
              </g>
            </pattern>
          </defs>

          {/* Render repeating Phulkari diamond watermarks */}
          <rect width="100%" height="100%" fill="url(#phulkariWatermark)" />
          {/* Render repeating Folk lotus watermarks */}
          <rect width="100%" height="100%" fill="url(#folkLotusWatermark)" />
        </svg>

        {/* Layer E: Faint Archival Manuscript Margins & Ruling Lines */}
        <div className="absolute inset-4 sm:inset-8 border border-[#c5a059]/12 pointer-events-none rounded-lg">
          {/* Corner Archival Manuscript Brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]/25" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]/25" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#c5a059]/25" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#c5a059]/25" />
          
          {/* Faint Archival Folio Reference Stamp (Top Right) */}
          <div className="hidden sm:block absolute top-3 right-5 text-[9px] font-cinzel text-[#c5a059]/25 tracking-[0.28em] uppercase">
            ARCHIVAL FOLIO · HARYANA LIVING TRADITIONS
          </div>
        </div>

        {/* Layer F: Deep Vignette & Dark Edge Shading (Dark walnut / sepia gradient) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 85% 80% at 50% 48%, 
                transparent 35%, 
                rgba(20, 10, 5, 0.45) 68%, 
                rgba(14, 7, 3, 0.78) 88%,
                rgba(10, 5, 2, 0.94) 100%
              ),
              linear-gradient(to bottom,
                rgba(14, 7, 3, 0.60) 0%,
                transparent 20%,
                transparent 75%,
                rgba(14, 7, 3, 0.75) 100%
              )
            `
          }}
        />

        {/* Layer G: Inner Shadow Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(10,5,2,0.72)] pointer-events-none" />
      </div>

      {/* ====================================================================
          TOP NAVIGATION BAR (REVEALED ONLY AFTER SCROLLING PAST HERO)
          Smooth fade/slide in, sticky at top, highlights active chapter
          ==================================================================== */}
      <AnimatePresence>
        {showNav && (
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#c5a059]/30 bg-[#140b07]/94 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.9)]"
          >
            {/* Left: Return to Haryana Gate Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioManager.setGeneralWebsite();
                  onBackToGate();
                }}
                className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#c9a45a]/50 bg-[#1c0f08]/90 hover:bg-[#2d170d] text-[#ffd27d] text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d] hover:shadow-[0_0_20px_rgba(201,164,90,0.45)]"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
                <span>← HARYANA HERITAGE</span>
              </button>
            </div>

            {/* Center: Curated Multi-Page Chapter Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#c9a45a]/40 bg-[#160c07]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] overflow-x-auto max-w-[65vw] sm:max-w-none">
              {CHAPTER_TABS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleNavigateChapter(ch.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-cinzel tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    activeChapter === ch.id
                      ? 'bg-[#c9a45a] text-[#140b07] font-bold shadow-[0_0_15px_rgba(201,164,90,0.5)]'
                      : 'text-[#ffd27d]/80 hover:text-[#ffd27d] hover:bg-[#c9a45a]/15'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </nav>

            {/* Right: Rural Ambience Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#c9a45a]/40 bg-[#160c07]/90 backdrop-blur-md text-[#ffd27d] text-[11px] sm:text-xs font-cinzel tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              <span className="w-2 h-2 rounded-full bg-[#ffd27d] animate-pulse" />
              <span>RURAL AMBIENCE</span>
              <span>♫ 🌾</span>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ====================================================================
          1. CINEMATIC HERO SCREEN (OPENING TITLE SEQUENCE)
          NO navigation headers on this screen! Pure title atmosphere
          ==================================================================== */}
      <section 
        ref={heroRef}
        id="hero" 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-20 z-10 text-center"
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-6 sm:space-y-7 pt-6">
          
          {/* Decorative Emblem */}
          <div className="flex justify-center">
            <FolkLotusOrnament className="w-20 sm:w-28 h-14 sm:h-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]" />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-cinzel text-[#e5c278] tracking-[0.26em] sm:tracking-[0.32em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/70 to-[#ffd27d]/90" />
            <span>✦</span>
            <span>CHAPTER OF LIVING HERITAGE · HARYANA</span>
            <span>✦</span>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#c5a059]/70 to-[#ffd27d]/90" />
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.06em] text-center leading-[0.92] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48]"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95)) drop-shadow(0 8px 24px rgba(10,5,2,0.85)) drop-shadow(0 0 16px rgba(212,155,61,0.25))'
              }}
            >
              THE LIVING<br />CANVAS
            </h1>
            
            {/* Subtitle */}
            <p className="font-cinzel text-sm sm:text-base md:text-xl text-[#f0d494] tracking-[0.35em] uppercase font-semibold text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] pt-2">
              FOLK ARTS OF HARYANA
            </p>
          </div>

          {/* Delicate Ornamental Divider */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[#c5a059]">
            <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/60" />
            <span className="text-[#ffd27d] text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✤</span>
            <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/60" />
          </div>

          {/* Quote */}
          <p className="font-cormorant italic text-lg sm:text-2xl md:text-3xl text-[#f5e4c6] text-center max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-normal leading-relaxed">
            “Stories carried through colour, craft, music and memory.”
          </p>

          {/* Bottom CTA: ENTER THE LIVING TRADITION */}
          <div className="flex flex-col items-center gap-3 pt-6 sm:pt-10">
            <button
              onClick={handleEnterLivingTradition}
              aria-label="Enter the living tradition"
              className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#c5a059]/70 bg-[#160c07]/80 hover:bg-[#c5a059] flex items-center justify-center text-[#ffd27d] hover:text-[#120a05] transition-all duration-300 shadow-[0_0_15px_rgba(201,164,90,0.35)] hover:shadow-[0_0_25px_rgba(255,210,120,0.7)] cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-cinzel text-[#c5a059] tracking-[0.25em] uppercase">
              <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/60" />
              <button
                onClick={handleEnterLivingTradition}
                className="hover:text-[#ffd27d] transition-colors cursor-pointer"
              >
                ENTER THE LIVING TRADITION
              </button>
              <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/60" />
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          CHAPTER CONTENT CONTAINER (MULTI-PAGE ARCHITECTURE)
          Each chapter renders as its OWN dedicated page view, NOT stacked!
          ==================================================================== */}
      <main ref={chapterContentRef} className="relative z-10 min-h-screen pt-8 pb-24">
        
        {/* Archival Manuscript Transition Overlay between Chapters */}
        <AnimatePresence>
          {isPageTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-[#160B05]/96 backdrop-blur-md flex flex-col items-center justify-center space-y-4 pointer-events-none select-none"
            >
              <FolkLotusOrnament className="w-16 h-12 drop-shadow-[0_0_20px_rgba(201,164,90,0.5)] animate-pulse" />
              <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
              <span className="text-[11px] font-cinzel text-[#ffd27d] tracking-[0.28em] uppercase">
                OPENING CHAPTER ARCHIVE...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Chapter Page View */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          
          {/* ================================================================
              CHAPTER 01: THE LIVING TRADITION
              ================================================================ */}
          {activeChapter === 'tradition' && (
            <motion.section 
              key="chapter-tradition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="space-y-12"
            >
              {/* Chapter Header */}
              <div className="space-y-1">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
                  CHAPTER 01
                </span>
                <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal tracking-wide">
                  The Living Tradition
                </h2>
                <p className="text-xs font-cinzel text-[#e8c46a] tracking-[0.22em] uppercase">
                  AGRARIAN ROOTS · ORAL MEMORY
                </p>
                <div className="h-[1px] w-24 bg-gradient-to-r from-[#c5a059] to-transparent mt-3" />
              </div>

              {/* Editorial Split: Left Large Archival Image, Right Storytelling Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left: Large Archival Image */}
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_12px_45px_rgba(0,0,0,0.85)] aspect-[4/3] bg-[#140b07]">
                  <img
                    src="/assets/haryana_folk_hero.jpg"
                    alt="Haryana Village Courtyard Tradition"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-5 right-5 text-[11px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                    VILLAGE CHOUPAL & LIVING COURTYARDS
                  </div>
                </div>

                {/* Right: Narrative Storytelling in Dark Translucent Panel */}
                <div className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md space-y-5 shadow-[0_8px_35px_rgba(0,0,0,0.85)]">
                  <span className="px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
                    THE ROOTS OF COMMUNITY CULTURE
                  </span>
                  <h3 className="font-cormorant text-3xl sm:text-4xl text-[#fff0d0] font-medium leading-snug">
                    Where Handcraft Meets Communal Memory
                  </h3>
                  <p className="font-cormorant text-base sm:text-lg text-[#e8d8b8] leading-relaxed">
                    Long before written chronicles recorded the history of northern India, rural communities across Haryana transformed everyday agrarian life into living art.
                  </p>
                  <p className="font-cormorant text-base sm:text-lg text-[#e8d8b8]/90 leading-relaxed">
                    Folk traditions did not live inside isolated glass vitrines. They flourished inside village courtyards during the quiet afternoon hours, in midnight Saang performances beneath banyan trees, at monsoon Teej swings, and through young brides receiving protective Phulkari embroideries from maternal grandmothers.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-cinzel text-[#c5a059]">
                    <span>COURTYARDS</span> • <span>WEDDINGS</span> • <span>HARVESTS</span> • <span>RITUALS</span>
                  </div>
                </div>
              </div>

              {/* Pathway to Next Chapter */}
              <div className="pt-16 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  onClick={() => {
                    audioManager.setGeneralWebsite();
                    onBackToGate();
                  }}
                  className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>RETURN TO HARYANA</span>
                </button>
                <button
                  onClick={() => handleNavigateChapter('materials')}
                  className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.22em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
                >
                  <span>CONTINUE TO CHAPTER 02 — MATERIALS & CRAFT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              CHAPTER 02: MATERIALS & CRAFT
              ================================================================ */}
          {activeChapter === 'materials' && (
            <motion.section 
              key="chapter-materials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="space-y-12"
            >
              {/* Chapter Header */}
              <div className="space-y-1">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
                  CHAPTER 02
                </span>
                <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal tracking-wide">
                  Materials & Craft
                </h2>
                <p className="text-xs font-cinzel text-[#e8c46a] tracking-[0.22em] uppercase">
                  THE TACTILE ARCHIVE • SOURCED DIRECTLY FROM THE SOIL
                </p>
                <div className="h-[1px] w-24 bg-gradient-to-r from-[#c5a059] to-transparent mt-3" />
              </div>

              {/* Material Table: Asymmetrical Archive Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {materials.map((mat) => (
                  <div
                    key={mat.num}
                    className="group relative p-7 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 hover:border-[#ffd27d] transition-all duration-300 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between space-y-4"
                  >
                    {/* Header Row: Number + Title */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20">
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-2xl text-[#ffd27d] font-bold">{mat.num}</span>
                        <div>
                          <h3 className="font-cinzel text-lg text-[#fff0d0] font-semibold">{mat.title}</h3>
                          <p className="font-cormorant italic text-xs text-[#e8c46a]">{mat.sub}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#1c0f08] border border-[#c5a059]/30 text-[10px] font-cinzel text-[#c5a059] uppercase tracking-wider">
                        SPECIMEN
                      </span>
                    </div>

                    {/* Small Archival Image Strip */}
                    <div className="relative h-44 rounded-xl overflow-hidden border border-[#c5a059]/25 bg-[#1c0f08]">
                      <img
                        src={mat.image}
                        alt={mat.title}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2.5 left-3 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                        ORIGIN: {mat.origin}
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <p className="font-cormorant text-sm text-[#e8d8b8] leading-relaxed">
                      {mat.desc}
                    </p>

                    {/* Material Quality Tag & Link to Parent Folk Tradition */}
                    <div className="pt-2 border-t border-[#c5a059]/15 space-y-2.5">
                      <div className="text-[11px] font-cinzel text-[#c5a059] tracking-wider uppercase">
                        ✦ {mat.quality}
                      </div>
                      {mat.traditionId && (
                        <button
                          onClick={() => handleOpenTradition(mat.traditionId)}
                          className="w-full py-2 px-3 rounded-lg bg-[#1c0f08]/90 border border-[#c5a059]/30 hover:border-[#ffd27d] hover:bg-[#c5a059]/20 text-[#ffd27d] text-[10px] sm:text-[11px] font-cinzel tracking-wider flex items-center justify-between transition-all cursor-pointer"
                        >
                          <span>CRAFTED IN {mat.traditionTitle}</span>
                          <ArrowRight className="w-3 h-3 text-[#ffd27d]" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pathway to Next/Prev Chapter */}
              <div className="pt-16 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  onClick={() => handleNavigateChapter('tradition')}
                  className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CHAPTER 01: TRADITION</span>
                </button>
                <button
                  onClick={() => handleNavigateChapter('art-forms')}
                  className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.22em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
                >
                  <span>CONTINUE TO CHAPTER 03 — THE ART FORMS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              CHAPTER 03: THE ART FORMS
              ================================================================ */}
          {/* ================================================================
              CHAPTER 03: THE FOLK ARTS ARCHIVE & INDIVIDUAL TRADITIONS
              Editorial museum plates for 8 authentic Haryana traditions
              Clicking any tradition opens its dedicated deep-dive page
              ================================================================ */}
          {activeChapter === 'art-forms' && (
            <motion.section 
              key={selectedTraditionId ? `tradition-${selectedTraditionId}` : "chapter-art-forms-archive"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="space-y-12"
            >
              {/* If a tradition is selected, show its full dedicated chapter page */}
              {selectedTraditionId && selectedTradition ? (
                <FolkArtsTraditionDetail
                  tradition={selectedTradition}
                  onBackToArchive={handleBackToArchive}
                  onNavigateNextTradition={handleNavigateNextTradition}
                />
              ) : (
                /* Otherwise, display the museum-grade Folk Arts Archive */
                <>
                  {/* Archive Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
                        CHAPTER 03
                      </span>
                      <span className="w-10 h-[1px] bg-[#c5a059]/40" />
                    </div>
                    <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal tracking-wide">
                      The Folk Arts Archive
                    </h2>
                    <p className="text-xs sm:text-sm font-cinzel text-[#e8c46a] tracking-[0.24em] uppercase">
                      EIGHT LIVING CULTURAL TRADITIONS OF HARYANA
                    </p>
                    <p className="font-cormorant text-base sm:text-lg text-[#eeddc0]/90 max-w-3xl pt-1 leading-relaxed">
                      An archival dossier documenting the living traditions preserved across rural chaupals, agrarian courtyards, and oral memory. Select any tradition to enter its dedicated digital chapter.
                    </p>
                    <div className="h-[1px] w-28 bg-gradient-to-r from-[#c5a059] to-transparent mt-3" />
                  </div>

                  {/* Museum Editorial Archival Plates (Alternating Horizontal Composition) */}
                  <div className="space-y-12 pt-4">
                    {HARYANA_FOLK_TRADITIONS.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => handleOpenTradition(item.id)}
                        className={`group cursor-pointer rounded-2xl bg-[#140b07]/90 border border-[#c5a059]/30 hover:border-[#ffd27d] overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_55px_rgba(201,164,90,0.3)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 backdrop-blur-md ${
                          idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                        }`}
                      >
                        {/* Plate Image Frame */}
                        <div
                          className={`lg:col-span-6 relative rounded-xl overflow-hidden aspect-[16/10] bg-[#1a0e08] border border-[#c5a059]/30 ${
                            idx % 2 === 1 ? 'lg:col-start-7' : ''
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-[#080402]/30 to-transparent" />
                          
                          {/* Accession & Region Badge */}
                          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded bg-[#140b07]/90 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
                            {item.accession}
                          </div>
                          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded bg-[#140b07]/90 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-wider uppercase">
                            {item.region.split(',')[0]}
                          </div>

                          {/* Vernacular title tag */}
                          <div className="absolute bottom-3.5 left-4 text-[#ffd27d] font-cormorant italic text-base drop-shadow-md">
                            {item.vernacular}
                          </div>
                        </div>

                        {/* Plate Editorial Details */}
                        <div
                          className={`lg:col-span-6 space-y-4 ${
                            idx % 2 === 1 ? 'lg:col-start-1' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-cinzel text-xl text-[#c5a059] font-bold">
                              {item.num}
                            </span>
                            <span className="text-[11px] font-cinzel text-[#a0824b] tracking-[0.24em] uppercase">
                              HERITAGE TRADITION
                            </span>
                          </div>

                          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#ffd27d] font-normal group-hover:text-[#fff0d0] transition-colors leading-tight">
                            {item.title}
                          </h3>

                          <p className="font-cormorant italic text-sm sm:text-base text-[#e8c46a] border-l border-[#c5a059]/40 pl-3">
                            {item.tagline}
                          </p>

                          <p className="font-cormorant text-base text-[#e8d8b8] leading-relaxed">
                            {item.shortDesc}
                          </p>

                          {/* Metadata Badges */}
                          <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-cinzel">
                            <span className="px-2.5 py-1 rounded bg-[#1c0f08] border border-[#c5a059]/25 text-[#f5ebd7]">
                              MEDIUM: {item.medium.split(',')[0]}
                            </span>
                            <span className="px-2.5 py-1 rounded bg-[#1c0f08] border border-[#c5a059]/25 text-[#f5ebd7]">
                              EPOCH: {item.period.split('–')[0]}
                            </span>
                          </div>

                          {/* Action Button */}
                          <div className="pt-3 border-t border-[#c5a059]/20 flex items-center justify-between">
                            <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase">
                              PLATE {item.num} OF 08
                            </span>
                            <span className="group/btn px-4 py-2 rounded-full border border-[#c5a059]/50 bg-[#1c0f08] group-hover:bg-[#c5a059] group-hover:text-[#120a05] text-[#ffd27d] text-xs font-cinzel tracking-wider uppercase transition-all flex items-center gap-2 font-semibold">
                              <span>EXPLORE TRADITION DOSSIER</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pathway to Next/Prev Chapter */}
                  <div className="pt-16 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      onClick={() => handleNavigateChapter('materials')}
                      className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>CHAPTER 02: MATERIALS</span>
                    </button>
                    <button
                      onClick={() => handleNavigateChapter('artisans')}
                      className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.22em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
                    >
                      <span>CONTINUE TO CHAPTER 04 — THE ARTISANS</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              )}
            </motion.section>
          )}

          {/* ================================================================
              CHAPTER 04: THE ARTISANS
              ================================================================ */}
          {activeChapter === 'artisans' && (
            <motion.section 
              key="chapter-artisans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="space-y-12"
            >
              {/* Chapter Header */}
              <div className="space-y-1">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
                  CHAPTER 04
                </span>
                <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal tracking-wide">
                  The Hands Behind the Tradition
                </h2>
                <p className="font-cormorant italic text-xl text-[#e8c46a] pt-1">
                  “These traditions survive because people continue to practice them.”
                </p>
                <div className="h-[1px] w-24 bg-gradient-to-r from-[#c5a059] to-transparent mt-3" />
              </div>

              {/* Artisan Human Profiles */}
              <div className="space-y-12">
                {artisans.map((artisan, idx) => (
                  <div
                    key={artisan.name}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md shadow-[0_12px_45px_rgba(0,0,0,0.85)] ${
                      idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    {/* Visual */}
                    <div className={`lg:col-span-5 relative rounded-xl overflow-hidden border border-[#c5a059]/40 aspect-[4/3] bg-[#1c0f08] ${
                      idx % 2 === 1 ? 'lg:col-start-8' : ''
                    }`}>
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-75" />
                      <div className="absolute bottom-3 left-4 right-4 text-[11px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                        {artisan.role} • {artisan.location}
                      </div>
                    </div>

                    {/* Narrative */}
                    <div className={`lg:col-span-7 space-y-4 ${
                      idx % 2 === 1 ? 'lg:col-start-1' : ''
                    }`}>
                      <span className="px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
                        {artisan.role}
                      </span>
                      <h3 className="font-cinzel text-2xl sm:text-3xl text-[#fff0d0] font-semibold">
                        {artisan.name}
                      </h3>
                      <blockquote className="font-cormorant italic text-base sm:text-lg text-[#ffd27d] border-l-2 border-[#c9a45a] pl-4 py-1">
                        {artisan.quote}
                      </blockquote>
                      <p className="font-cormorant text-base text-[#e8d8b8] leading-relaxed">
                        {artisan.narrative}
                      </p>
                      <p className="font-cormorant text-sm text-[#c5a059] italic pt-1">
                        ✦ {artisan.survival}
                      </p>

                      {/* Direct Link to Corresponding Tradition */}
                      <div className="pt-2">
                        {idx === 0 && (
                          <button
                            onClick={() => handleOpenTradition('phulkari')}
                            className="px-5 py-2 rounded-full border border-[#c5a059]/40 bg-[#1a0e08] hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-[11px] font-cinzel tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-md"
                          >
                            <span>EXPLORE PHULKARI EMBROIDERY TRADITION</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx === 1 && (
                          <button
                            onClick={() => handleOpenTradition('pottery')}
                            className="px-5 py-2 rounded-full border border-[#c5a059]/40 bg-[#1a0e08] hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-[11px] font-cinzel tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-md"
                          >
                            <span>EXPLORE TRADITIONAL POTTERY DOSSIER</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx === 2 && (
                          <button
                            onClick={() => handleOpenTradition('saang')}
                            className="px-5 py-2 rounded-full border border-[#c5a059]/40 bg-[#1a0e08] hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-[11px] font-cinzel tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-md"
                          >
                            <span>EXPLORE SAANG FOLK OPERA DOSSIER</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pathway to Next/Prev Chapter */}
              <div className="pt-16 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  onClick={() => handleNavigateChapter('art-forms')}
                  className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CHAPTER 03: FOLK ARTS ARCHIVE</span>
                </button>
                <button
                  onClick={() => handleNavigateChapter('today')}
                  className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.22em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
                >
                  <span>CONTINUE TO CHAPTER 05 — LIVING HERITAGE TODAY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              CHAPTER 05: LIVING HERITAGE TODAY & SURAJKUND CRAFTS MELA
              ================================================================ */}
          {activeChapter === 'today' && (
            <motion.section 
              key={showSurajkundDirect ? "surajkund-experience" : "chapter-today-overview"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="space-y-12"
            >
              {showSurajkundDirect ? (
                /* Dedicated Surajkund International Crafts Mela Living Experience */
                <SurajkundMelaExperience
                  onBackToFolkArts={() => setShowSurajkundDirect(false)}
                  onExploreArchive={() => handleNavigateChapter('art-forms')}
                />
              ) : (
                /* Living Heritage Overview with Direct Gateway to Surajkund */
                <>
                  {/* Chapter Header */}
                  <div className="space-y-1">
                    <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
                      CHAPTER 05
                    </span>
                    <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal tracking-wide">
                      The Tradition Continues
                    </h2>
                    <p className="text-xs font-cinzel text-[#e8c46a] tracking-[0.22em] uppercase">
                      PAST → PRESENT → FUTURE • LIVING REINTERPRETATION
                    </p>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-[#c5a059] to-transparent mt-3" />
                  </div>

                  {/* Wide Documentary Panoramic Banner: Surajkund Living Mela Launch */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-[0_16px_55px_rgba(0,0,0,0.9)] aspect-[16/8] sm:aspect-[16/7] bg-[#140b07] group">
                    <img
                      src="/assets/haryana_saang_theatre.jpg"
                      alt="Cultural Gathering at Surajkund and Village Chaupal"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-[#080402]/60 to-transparent" />
                    
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-[#ffd27d] max-w-3xl space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#e5a93c] text-[#140b07] text-[10px] font-cinzel tracking-widest uppercase font-bold flex items-center gap-1.5">
                          <Flame className="w-3 h-3 text-[#140b07]" />
                          LIVING CELEBRATION
                        </span>
                        <span className="text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase hidden sm:inline">
                          ANNUAL GATHERING IN FEBRUARY
                        </span>
                      </div>
                      
                      <h3 className="font-cinzel text-2xl sm:text-4xl font-semibold text-[#fff0d0] leading-tight">
                        Surajkund International Crafts Mela
                      </h3>
                      
                      <p className="font-cormorant text-base sm:text-lg text-[#f3e7ce] leading-relaxed">
                        Every February, master craftspeople assemble around the ancient 10th-century sun reservoir at Surajkund, demonstrating live handcrafts, oral Saang performances, and international cultural exchange.
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setShowSurajkundDirect(true);
                            window.history.pushState(null, '', '/haryana/folk-arts/surajkund');
                          }}
                          className="group/mela px-6 sm:px-8 py-3 rounded-full border border-[#ffd27d] bg-[#c5a059] hover:bg-[#ffd27d] text-[#140b07] font-bold text-xs font-cinzel tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_0_25px_rgba(201,164,90,0.5)] flex items-center gap-2.5"
                        >
                          <span>ENTER SURAJKUND LIVING MELA EXPERIENCE (8 MILESTONES)</span>
                          <ArrowRight className="w-4 h-4 group-hover/mela:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3 Continuity Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="p-7 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md space-y-3 shadow-lg">
                      <span className="font-cinzel text-3xl text-[#ffd27d] font-bold">GI</span>
                      <h3 className="font-cinzel text-lg text-[#fff0d0] font-semibold">Geographical Indication</h3>
                      <p className="font-cormorant text-sm text-[#e8d8b8] leading-relaxed">
                        Haryana Phulkari holds official Geographical Indication protection, establishing authentic hand-stitch standards and safeguarding hereditary artisans against mass-produced counterfeits.
                      </p>
                    </div>

                    <div className="p-7 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md space-y-3 shadow-lg">
                      <span className="font-cinzel text-3xl text-[#ffd27d] font-bold">NID</span>
                      <h3 className="font-cinzel text-lg text-[#fff0d0] font-semibold">Design Collaborations</h3>
                      <p className="font-cormorant text-sm text-[#e8d8b8] leading-relaxed">
                        Leading Indian design institutes collaborate with rural women collectives, adapting classical counted-darning patterns into modern couture, museum exhibitions, and sustainable textile art.
                      </p>
                    </div>

                    <div className="p-7 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md space-y-3 shadow-lg">
                      <span className="font-cinzel text-3xl text-[#ffd27d] font-bold">ARCHIVE</span>
                      <h3 className="font-cinzel text-lg text-[#fff0d0] font-semibold">Digital Oral Preservation</h3>
                      <p className="font-cormorant text-sm text-[#e8d8b8] leading-relaxed">
                        Musicologists and folklorists are transcribing hundreds of hours of unwritten Saang operas and Raginis, ensuring that centuries of spoken wisdom survive for future generations.
                      </p>
                    </div>
                  </div>

                  {/* Pathway to Return / Restart */}
                  <div className="pt-16 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      onClick={() => handleNavigateChapter('artisans')}
                      className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>CHAPTER 04: ARTISANS</span>
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleNavigateChapter('tradition')}
                        className="px-6 py-2.5 rounded-full border border-[#c5a059]/40 bg-[#160c07]/80 hover:bg-[#1c0f08] text-[#c5a059] hover:text-[#ffd27d] text-xs font-cinzel tracking-[0.18em] uppercase transition-colors cursor-pointer"
                      >
                        ↻ REVISIT CHAPTER 01
                      </button>
                      <button
                        onClick={() => {
                          audioManager.setGeneralWebsite();
                          onBackToGate();
                        }}
                        className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#c5a059] hover:bg-[#ffd27d] text-[#140b07] font-bold text-xs font-cinzel tracking-[0.22em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(201,164,90,0.5)] flex items-center gap-2.5"
                      >
                        <span>RETURN TO HARYANA HERITAGE</span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.section>
          )}

        </div>
      </main>

    </div>
  );
}
