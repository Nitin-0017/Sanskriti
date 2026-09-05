import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowDown, Sparkles, Feather, Compass, BookOpen, Layers, Volume2 } from 'lucide-react';
import audioManager from '../services/audioManager';
import { HARYANA_FOLK_CHAPTERS, SURAJKUND_EXPERIENCE } from '../data/folkArtsData';
import FolkArtsTraditionDetail from './FolkArtsTraditionDetail';
import SurajkundMelaExperience from './SurajkundMelaExperience';
import FolkArtsChapterTransition from './FolkArtsChapterTransition';

/**
 * ============================================================================
 * FOLK ARTS OF HARYANA: THE LIVING CANVAS
 * 
 * Flow:
 * MAIN STATE PAGE
 *         ↓
 *    click FOLK ARTS
 *         ↓
 *    existing transition/animation
 *         ↓
 *    FOLK ARTS LANDING PAGE ("THE LIVING CANVAS — FOLK ARTS OF HARYANA")
 *         ↓
 *    user clicks "ENTER THE LIVING TRADITION" / down-arrow / scrolls down
 *         ↓
 *    FOLK ARTS JOURNEY (10 Chapters, Connecting Motifs Thread)
 *         ↓
 *    INDIVIDUAL FOLK ART MONOGRAPH PAGES (e.g. /haryana/folk-arts/phulkari)
 * ============================================================================
 */

// Authentic Folk Lotus Mandala Emblem matching the cinematic heritage reference
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

      {/* Flanking Tier 1 Petals */}
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

      {/* Flanking Tier 2 Petals */}
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

      {/* Outermost Wings */}
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

      {/* Pearl Accents */}
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

// Concentric Surya Solar Disk Motif
function SolarDiskMotif({ className = "w-28 h-28" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" stroke="#c5a059" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="38" stroke="#ffd27d" strokeWidth="1.2" opacity="0.8" />
      <circle cx="50" cy="50" r="28" stroke="#c5a059" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
      <circle cx="50" cy="50" r="16" fill="#1c0f08" stroke="#ffd27d" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" fill="#ffd27d" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
          stroke="#e5b358"
          strokeWidth="0.8"
          opacity="0.65"
        />
      ))}
    </svg>
  );
}

// Stylized Folk Peacock Motif
function PeacockMotif({ className = "w-28 h-28" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 65 C30 45 45 35 55 35 C65 35 70 42 68 50 C65 62 48 72 30 65 Z" fill="#1a0e07" stroke="#c5a059" strokeWidth="1.2" />
      <path d="M55 35 C58 26 68 22 72 25 C75 28 73 34 68 38" stroke="#ffd27d" strokeWidth="1.4" fill="none" />
      <circle cx="71" cy="26" r="1.5" fill="#ffd27d" />
      <line x1="72" y1="23" x2="76" y2="17" stroke="#e5b358" strokeWidth="1" />
      <circle cx="76" cy="17" r="1.2" fill="#ffd27d" />
      <line x1="74" y1="25" x2="80" y2="21" stroke="#e5b358" strokeWidth="1" />
      <circle cx="80" cy="21" r="1.2" fill="#ffd27d" />
      <path d="M30 65 C20 60 12 48 15 35 C18 24 30 20 42 22" stroke="#c5a059" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
      <circle cx="15" cy="35" r="2.5" fill="#ffd27d" />
      <circle cx="24" cy="26" r="2.5" fill="#e5b358" />
      <circle cx="36" cy="22" r="2.5" fill="#ffd27d" />
    </svg>
  );
}

// Sacred Geometric Chevron Lozenge Motif
function SacredLozengeMotif({ className = "w-28 h-28" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="50,10 90,50 50,90 10,50" stroke="#c5a059" strokeWidth="1.2" fill="#1c0f08" opacity="0.9" />
      <polygon points="50,22 78,50 50,78 22,50" stroke="#ffd27d" strokeWidth="1" fill="none" />
      <polygon points="50,34 66,50 50,66 34,50" stroke="#e5b358" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
      <circle cx="50" cy="50" r="4" fill="#ffd27d" />
      <circle cx="50" cy="10" r="2" fill="#c5a059" />
      <circle cx="90" cy="50" r="2" fill="#c5a059" />
      <circle cx="50" cy="90" r="2" fill="#c5a059" />
      <circle cx="10" cy="50" r="2" fill="#c5a059" />
    </svg>
  );
}

// Navigation Tabs Configuration for the Folk Arts Section
const CHAPTER_TABS = [
  { id: 'folk-arts', num: '01', label: '01 FOLK ARTS', path: '/haryana/folk-arts/journey' },
  { id: 'artisans', num: '02', label: '02 ARTISANS', path: '/haryana/folk-arts/artisans' },
  { id: 'surajkund', num: '03', label: '03 SURAJKUND', path: '/haryana/folk-arts/surajkund' },
  { id: 'today', num: '04', label: '04 TODAY', path: '/haryana/folk-arts/today' },
];

// Helper to parse current route from pathname
const parseRoute = (pathname) => {
  if (typeof window === 'undefined') {
    return { isLanding: true, chapter: null, traditionId: null };
  }
  const path = pathname || window.location.pathname;

  // 1. Individual folk art deep route: /folk-arts/:id or /haryana/folk-arts/:id
  const traditionMatch = path.match(/\/(?:folk-arts|art-forms|archive)\/([a-z0-9-]+)/);
  if (
    traditionMatch &&
    traditionMatch[1] &&
    !['journey', 'folk-arts', 'artisans', 'surajkund', 'today', 'tradition'].includes(traditionMatch[1])
  ) {
    return {
      isLanding: false,
      chapter: 'folk-arts',
      traditionId: traditionMatch[1],
    };
  }

  // 2. Surajkund Mela route
  if (path.includes('/surajkund')) {
    return { isLanding: false, chapter: 'surajkund', traditionId: null };
  }

  // 3. Artisans route
  if (path.includes('/artisans')) {
    return { isLanding: false, chapter: 'artisans', traditionId: null };
  }

  // 4. Today route
  if (path.includes('/today')) {
    return { isLanding: false, chapter: 'today', traditionId: null };
  }

  // 5. Folk Arts Journey route: /haryana/folk-arts/journey or /folk-arts/journey
  if (path.includes('/journey') || path.includes('/explore-journey')) {
    return { isLanding: false, chapter: 'folk-arts', traditionId: null };
  }

  // 6. DEFAULT FOR /haryana/folk-arts and /folk-arts:
  // MUST BE THE FOLK ARTS LANDING PAGE DIRECTLY!
  return { isLanding: true, chapter: null, traditionId: null };
};

// Clean Heritage Vector Divider (Replaces unicode glyphs/emojis with archival SVG)
function FolkHeritageDivider({ className = "my-10" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#c5a059]/40 ${className}`}>
      <span className="w-16 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/35" />
      <svg className="w-3 h-3 text-[#c5a059]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,3 21,12 12,21 3,12" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      <span className="w-16 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/35" />
    </div>
  );
}

// Destination metadata resolver for chapter transitions
const getDestinationMeta = (targetPath) => {
  if (targetPath.includes('/surajkund')) {
    return {
      title: '03 · SURAJKUND MELA',
      subtitle: 'सूरजकुण्ड अंतर्राष्ट्रीय शिल्प मेला • The Sun Lake',
      accent: 'surajkund',
    };
  }
  if (targetPath.includes('/artisans')) {
    return {
      title: '02 · THE ARTISANS',
      subtitle: 'जीवंत शिल्पकार • Master Lineages',
      accent: 'artisans',
    };
  }
  if (targetPath.includes('/today')) {
    return {
      title: '04 · TODAY: LIVING CONTINUUM',
      subtitle: 'जीवंत सातत्य • Modern Heritage',
      accent: 'today',
    };
  }
  const traditionMatch = targetPath.match(/\/(?:folk-arts|art-forms|archive)\/([a-z0-9-]+)/);
  if (
    traditionMatch &&
    traditionMatch[1] &&
    !['journey', 'folk-arts', 'artisans', 'surajkund', 'today'].includes(traditionMatch[1])
  ) {
    const tradition = HARYANA_FOLK_CHAPTERS.find((t) => t.id === traditionMatch[1]);
    if (tradition) {
      return {
        title: `${tradition.num} · ${tradition.title}`,
        subtitle: tradition.vernacular,
        accent: tradition.id,
      };
    }
  }
  if (targetPath.includes('/journey')) {
    return {
      title: '01 · FOLK ARTS OF HARYANA',
      subtitle: 'डिजिटल सांस्कृतिक अभिलेखागार • Digital Cultural Archive',
      accent: 'folk-arts',
    };
  }
  return {
    title: 'THE LIVING CANVAS',
    subtitle: 'हरियाणा की लोक परंपराएं • Living Traditions',
    accent: 'default',
  };
};

export default function FolkArtsExperience({ onBackToGate }) {
  const [routeInfo, setRouteInfo] = useState(() => parseRoute());
  const [isChapterTransitioning, setIsChapterTransitioning] = useState(false);
  const [transitionMeta, setTransitionMeta] = useState(null);
  const [activeMotifMedium, setActiveMotifMedium] = useState('embroidery');
  const [surajkundKey, setSurajkundKey] = useState(0);

  // Sync audio with Folk Arts mode
  useEffect(() => {
    audioManager.setFolkArtsMode();
  }, []);

  // Handle URL popstate (browser back/forward buttons) with transition
  useEffect(() => {
    const handlePopState = () => {
      const meta = getDestinationMeta(window.location.pathname);
      setTransitionMeta(meta);
      setIsChapterTransitioning(true);

      setTimeout(() => {
        const newRoute = parseRoute(window.location.pathname);
        setRouteInfo(newRoute);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 380);

      setTimeout(() => {
        setIsChapterTransitioning(false);
      }, 920);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // On Folk Arts landing page: detect wheel scroll down to smoothly transition into the journey
  useEffect(() => {
    if (!routeInfo.isLanding) return;

    let timeout = null;
    const handleWheel = (e) => {
      if (e.deltaY > 35) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          navigateTo('/haryana/folk-arts/journey');
        }, 80);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeout) clearTimeout(timeout);
    };
  }, [routeInfo.isLanding]);

  // Navigate between chapters with cinematic Indian manuscript transition (~900ms)
  const navigateTo = (targetPath) => {
    const meta = getDestinationMeta(targetPath);
    setTransitionMeta(meta);
    setIsChapterTransitioning(true);

    // Swap underlying route at mid-veil so user starts at the top of the destination chapter
    setTimeout(() => {
      window.history.pushState(null, '', targetPath);
      const newRoute = parseRoute(targetPath);
      setRouteInfo(newRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 400);

    // Fade out veil and reveal destination content smoothly
    setTimeout(() => {
      setIsChapterTransitioning(false);
    }, 950);
  };

  // Selected tradition object if on /folk-arts/:id
  const selectedTradition = routeInfo.traditionId
    ? HARYANA_FOLK_CHAPTERS.find((t) => t.id === routeInfo.traditionId) || null
    : null;

  // Subtle golden dust particles for the cinematic atmosphere
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7.1) % 92 + 4}%`,
    duration: `${14 + (i % 5) * 2}s`,
    delay: `${(i * 1.1) % 6}s`,
    size: `${1.2 + (i % 3) * 1.2}px`,
  }));

  // Master Artisans data for 02 ARTISANS
  const artisans = [
    {
      name: 'Ustad Mahabir Singh',
      role: 'Master Saang Librettist & Chaupal Singer',
      location: 'Sonipat Chaupal Guild',
      image: '/assets/haryana_saang_theatre.jpg',
      quote: 'A Saangi never reads from a script. The verses belong to the open sky, the soil, and the evening breeze.',
      narrative: 'For over fifty-two years, Ustad Mahabir Singh has held the central takht of Sonipat’s harvest chaupals. He memorized sixty-four classical Haryana folk epics from his master beneath a village peepal tree, carrying an oral library of twelve thousand metered dohas and raginis without ever putting pen to paper.',
      craft: 'Saang Verse Theatre & Oral Epics',
      generation: '4th Generation Bardic Lineage',
    },
    {
      name: 'Vidya Devi & Sunita Devi',
      role: 'Master Bagh & Sainchi Phulkari Embroiderers',
      location: 'Rohtak Women’s Silk Collective',
      image: '/assets/haryana_phulkari.jpg',
      quote: 'When we work the pat silk on the reverse of the khaddar, our eyes don’t count threads. Our fingers feel the weave.',
      narrative: 'Sisters-in-law Vidya and Sunita lead a collective of thirty-five women across four agrarian hamlets in Rohtak. They specialize in rare, lost geometries: the Panchranga Bagh and the sacred Shishadar Phulkari, rejecting synthetic threads to keep alive raw tussar silk and root-dyed madder canvas.',
      craft: 'Untwisted Pat Silk on Handspun Khaddar',
      generation: 'Ancestral Matriarchal Lineage',
    },
    {
      name: 'Pandit Ramphal Sharma',
      role: 'Master Sarangi Luthier & Classical Bard',
      location: 'Jind Woodcraft & Instrument Guild',
      image: '/assets/haryana_folk_hero.jpg',
      quote: 'The Sarangi must be carved from single-block mature Sheesham that has stood against north Indian winter frosts.',
      narrative: 'Pandit Ramphal is one of the last five living luthiers in Haryana who still carves the authentic 36-string folk Sarangi from single seasoned logs of heartwood Sheesham. His instruments resonate with the characteristic earthy timbres demanded by Haryana Ragini performers across northern India.',
      craft: 'Traditional Sheesham Luthiery & Folk Acoustics',
      generation: '5th Generation Instrument Maker',
    },
    {
      name: 'Shanti Devi',
      role: 'Master Saanjhi Sculptor & Ritual Singer',
      location: 'Kaithal District',
      image: '/assets/haryana_illustrated_hero.jpg',
      quote: 'The wall is not stone; when we touch it with wet canal clay, it breathes with our mothers’ prayers.',
      narrative: 'Shanti Devi has crafted over sixty annual autumn Saanjhi shrines. She teaches adolescent village girls how to knead alluvial clay with wheat husk so the sacred goddess figurines withstand the dry autumn winds without cracking.',
      craft: 'Terracotta Bas-Relief Wall Shrines',
      generation: '60 Years of Continuous Domestic Practice',
    },
  ];

  // Cross-Medium Motif Demonstrator Data
  const MOTIF_MEDIA_CONNECTIONS = {
    embroidery: {
      title: 'EMBROIDERY · PHULKARI',
      desc: 'Counted darning stitches on the reverse of homespun khaddar create stepped prismatic lozenges. The Mor (peacock) appears as a symbol of rain blessings near the bridal pallu, while the Surya (sun) forms the protective central medallion.',
      detail: 'Stitched with raw unspun pat silk in contrasting saffron, vermilion, and emerald.',
    },
    wall_art: {
      title: 'WALL PAINTING & SAANJHI',
      desc: 'Pressed into moist clay and cow-dung plaster, motifs become volumetric bas-relief sculptures. Sun and moon medallions flank the Mother Goddess Saanjhi, framing doorways against malevolent omens.',
      detail: 'Moulded by hand from canal silt, brushed with slaked lime and red geru chalk.',
    },
    textiles: {
      title: 'WEAVING · PANJA DURRIES & KHES',
      desc: 'Interlocking flat-weave techniques translate the sacred diamond (Chowkadi) and the creeping vine (Bel) into reversible floor rugs and double-cloth blankets.',
      detail: 'Beaten dense with heavy iron combs on traditional horizontal pit looms.',
    },
    household: {
      title: 'HOUSEHOLD & TERRACOTTA',
      desc: 'Incised into grain storage silos (Kothi), buttermilk churners (Madhani), and porous water surahis to bless agrarian provisions and food abundance.',
      detail: 'Carved with wooden styluses before wood-kiln firing in village potteries.',
    },
    architecture: {
      title: 'ARCHITECTURE & CARVED TIMBER',
      desc: 'Chiselled into solid Sheesham doorway frames (Torana) and haveli balconies, motifs anchor the house to cosmic harmony and hospitality.',
      detail: 'Deep geometric wood carving executed by regional Mistri carpentry guilds.',
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0704] text-[#f7e6c4] font-manuscript select-none overflow-x-hidden">


      {/* ====================================================================
          FOLK ARTS LANDING PAGE ("THE LIVING CANVAS — FOLK ARTS OF HARYANA")
          PRESERVED EXACTLY AND COMPLETELY UNTOUCHED!
          Haryana rural background photograph + subtle central golden glow & rays.
          NO intermediate button. NO "The Living Tradition" detour.
          Direct entry point for Folk Arts!
          ==================================================================== */}
      {routeInfo.isLanding ? (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Top-Left: Return to Main State Page (Haryana Gate) */}
          <div className="absolute top-6 left-6 sm:left-10 z-20">
            <button
              onClick={() => {
                if (onBackToGate) {
                  onBackToGate();
                } else {
                  window.history.pushState(null, '', '/haryana');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a45a]/50 bg-[#1c0f08]/90 hover:bg-[#2d170d] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d] hover:shadow-[0_0_20px_rgba(201,164,90,0.45)]"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
              <span>← HARYANA HERITAGE</span>
            </button>
          </div>

          {/* Background Layer 1: Authentic Haryana Rural Heritage Background Photograph */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ 
              backgroundImage: `url('/assets/haryana_folk_hero_cinematic.jpg')`,
              opacity: 0.88,
              filter: 'brightness(0.80) contrast(1.08) saturate(1.0)'
            }}
          />

          {/* Background Layer 1b: Subtle Dark Warm Brown / Burnt Umber Toning Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[#160B05]/20 mix-blend-multiply" 
          />

          {/* Background Layer 2: Central Controlled Golden Glow & Fine Golden Rays */}
          <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
            {/* Moderate, Diffused Deep Amber Halo directly behind the title */}
            <div 
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[700px] h-[350px] sm:h-[460px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 155, 61, 0.17) 0%, rgba(180, 115, 36, 0.10) 38%, rgba(120, 65, 20, 0.04) 68%, transparent 85%)',
                filter: 'blur(36px)',
              }}
            />

            {/* Fine Golden Rays Radiating Outward (Subtle, controlled, NOT overexposed white) */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-26"
              viewBox="0 0 1600 900" 
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="subtleRayGradLanding" cx="50%" cy="47%" r="60%">
                  <stop offset="0%" stopColor="#e2b85a" stopOpacity="0.32" />
                  <stop offset="30%" stopColor="#c58a32" stopOpacity="0.18" />
                  <stop offset="65%" stopColor="#8a541c" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#4a2812" stopOpacity="0" />
                </radialGradient>
                <filter id="subtleRayBlurLanding" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="18" />
                </filter>
              </defs>
              <g filter="url(#subtleRayBlurLanding)">
                <polygon points="800,420 180,0 290,0" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 0,140 0,250" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 1310,0 1420,0" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 1600,140 1600,250" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 620,0 740,0" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 860,0 980,0" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 0,680 160,900" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 1600,680 1440,900" fill="url(#subtleRayGradLanding)" />
                <polygon points="800,420 660,900 940,900" fill="url(#subtleRayGradLanding)" />
              </g>
            </svg>
          </div>

          {/* Background Layer 3: Warm Environmental Vignette framing traditional objects */}
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

          {/* Golden Dust Particles */}
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

          {/* Foreground Hero Content (The Living Canvas Landing Experience) */}
          <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center px-6 sm:px-12 py-12 text-center space-y-6 sm:space-y-7">
            
            {/* Ornamental Haryana-Inspired Emblem */}
            <div className="flex justify-center">
              <FolkLotusOrnament className="w-20 sm:w-28 h-14 sm:h-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]" />
            </div>

            {/* Eyebrow Inscription */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-cinzel text-[#e5c278] tracking-[0.26em] sm:tracking-[0.32em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/70 to-[#ffd27d]/90" />
              <span>✦</span>
              <span>CHAPTER OF LIVING HERITAGE · HARYANA</span>
              <span>✦</span>
              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#c5a059]/70 to-[#ffd27d]/90" />
            </div>

            {/* Large Elegant Serif Main Title */}
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

            {/* Bottom CTA: Directly Enters the Folk Arts Journey! */}
            <div className="flex flex-col items-center gap-3 pt-6 sm:pt-10">
              <button
                onClick={() => navigateTo('/haryana/folk-arts/journey')}
                aria-label="Enter the living tradition"
                className="group w-11 h-11 rounded-full border border-[#c5a059]/70 bg-[#160c07]/80 hover:bg-[#c5a059] flex items-center justify-center text-[#ffd27d] hover:text-[#120a05] transition-all duration-300 shadow-[0_0_15px_rgba(201,164,90,0.35)] hover:shadow-[0_0_25px_rgba(255,210,120,0.7)] cursor-pointer"
              >
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-cinzel text-[#c5a059] tracking-[0.25em] uppercase">
                <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/60" />
                <button
                  onClick={() => navigateTo('/haryana/folk-arts/journey')}
                  className="hover:text-[#ffd27d] transition-colors cursor-pointer font-medium"
                >
                  ENTER THE LIVING TRADITION
                </button>
                <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/60" />
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ====================================================================
            LEVEL 2: DEDICATED CHAPTER PAGES & HERITAGE JOURNEY
            Sticky Top Navigation revealed:
            01 FOLK ARTS | 02 ARTISANS | 03 SURAJKUND | 04 TODAY
            Vintage Archival Brown environment.
            ==================================================================== */
        <div className="relative min-h-screen w-full">

          {/* Fixed Heritage Background (Authentic Haryana Folk Art Canvas) */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Dark base fallback */}
            <div className="absolute inset-0 bg-[#120804]" />

            {/* User Uploaded Heritage Motif Background Image */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url('/assets/heritage_background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Subtle dark translucent overlay for text readability */}
            <div className="absolute inset-0 bg-[#0a0503]/30 pointer-events-none" />
          </div>

          {/* STICKY TOP NAVIGATION BAR */}
          <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#c5a059]/30 bg-[#140b07]/95 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.9)]">
            
            {/* Left: Return to Folk Arts Landing Page */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('/haryana/folk-arts')}
                className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-[#c9a45a]/50 bg-[#1c0f08]/90 hover:bg-[#2d170d] text-[#ffd27d] text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d] hover:shadow-[0_0_20px_rgba(201,164,90,0.45)]"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
                <span>← FOLK ARTS LANDING</span>
              </button>
            </div>

            {/* Center: The Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#c9a45a]/40 bg-[#160c07]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] overflow-x-auto max-w-[62vw] sm:max-w-none">
              {CHAPTER_TABS.map((ch) => {
                const isActive = routeInfo.chapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (ch.id === 'surajkund') {
                        setSurajkundKey((k) => k + 1);
                      }
                      navigateTo(ch.path);
                    }}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-cinzel tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#c9a45a] text-[#140b07] font-bold shadow-[0_0_15px_rgba(201,164,90,0.5)]'
                        : 'text-[#ffd27d]/80 hover:text-[#ffd27d] hover:bg-[#c9a45a]/15'
                    }`}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Rural Ambience Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#c9a45a]/40 bg-[#160c07]/90 backdrop-blur-md text-[#ffd27d] text-[11px] sm:text-xs font-cinzel tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              <span className="w-2 h-2 rounded-full bg-[#ffd27d] animate-pulse" />
              <span>RURAL AMBIENCE</span>
              <Volume2 className="w-3.5 h-3.5 text-[#ffd27d]/80" />
            </div>
          </header>

          {/* DEDICATED CHAPTER CONTENT CONTAINER (Expanded to 88% viewport width) */}
          <main className="relative z-10 min-h-screen pt-24 pb-28">
            <div className="w-[92%] sm:w-[88%] max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
              
              {/* ================================================================
                  ROUTE: /folk-arts/:id (e.g. /haryana/folk-arts/phulkari)
                  Dedicated Monograph Page for an individual Folk Art
                  ================================================================ */}
              {routeInfo.traditionId && selectedTradition ? (
                <FolkArtsTraditionDetail
                  tradition={selectedTradition}
                  onBackToArchive={() => navigateTo('/haryana/folk-arts/journey')}
                  onNavigateTradition={(targetId) => navigateTo(`/haryana/folk-arts/${targetId}`)}
                />
              ) : routeInfo.chapter === 'folk-arts' ? (
                /* ================================================================
                    ROUTE: /haryana/folk-arts/journey (FOLK ARTS JOURNEY)
                    Cinematic Editorial / Digital Museum Experience:
                    - Top Chapter Hero with large title, subtitle, framed visual & readable intro
                    - Section 01: Materials (Large visual + storytelling typography, no cards)
                    - Section 02: Motifs & Sacred Geometry (Alternate layout, breathing motifs)
                    - Section 03: Oral Traditions & Performance (Museum exhibition panel)
                    - Section 04: Artisans & Living Practice (People, craftsmanship, living tradition)
                    - Gateway to the 10 Individual Living Traditions
                    - Bottom Editorial Chapter Navigation
                    ================================================================ */
                <motion.div 
                  key="chapter-folk-arts-journey-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-32 sm:space-y-44"
                >
                  {/* ============================================================
                      1. CHAPTER HERO (Archival Exhibition Opening)
                      ============================================================ */}
                  <section className="space-y-10 border-b border-[#c5a059]/25 pb-24">
                    <div className="space-y-6 max-w-4xl">
                      <div className="flex items-center gap-3">
                        <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent" />
                        <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.34em] uppercase font-semibold">
                          CHAPTER 01 · DIGITAL CULTURAL ARCHIVE
                        </span>
                      </div>

                      <h1 
                        className="font-cinzel text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-tight leading-[0.95]"
                        style={{ filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.95))' }}
                      >
                        Folk Arts of Haryana
                      </h1>

                      <p className="text-xs sm:text-sm font-cinzel text-[#e8c46a] tracking-[0.26em] uppercase font-semibold">
                        EXPRESSION THROUGH THREAD, CLAY, VERSE, TIMBER & SACRED GEOMETRY
                      </p>
                    </div>

                    {/* Strong Immersive Archival Visual with Subtle Golden Framing */}
                    <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] bg-[#140b07] group">
                      <img
                        src="/assets/haryana_heritage_pavilion.jpg"
                        alt="The Living Canvas of Haryana"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/30 to-transparent" />
                      <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                        <span>ARCHIVAL EXHIBITION PLATE 01 · THE VERNACULAR SPATIAL CANVAS</span>
                        <span className="text-[#c5a059]">CONTINUOUS SACRED GEOMETRY</span>
                      </div>
                    </div>

                    {/* Introduction Paragraph in Large, Comfortable Typography */}
                    <div className="max-w-4xl pt-4">
                      <p className="font-cormorant text-2xl sm:text-3xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                        In the vast northern river plains between the Yamuna and the ancient Aravalli ridges, folk expression is an unbroken living continuum. It thrives not behind sterile museum glass, but across needle-embroidered khaddar cloth, sun-baked clay walls, high-pitched chaupal verse epics, and ancestral geometric talismans carried from grandmother to granddaughter across millennia.
                      </p>
                    </div>
                  </section>

                  {/* ============================================================
                      SECTION 01 — MATERIALS
                      Large image on one side, readable storytelling text on the other.
                      No card background. No boxed container.
                      ============================================================ */}
                  <section className="space-y-10">
                    <div className="space-y-3 max-w-3xl">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold block">
                        SECTION 01 — RAW MATERIALS & EARTH MEDIUMS
                      </span>
                      <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
                        Harvested from Canal Silt, Wild Pat Silk & Seasoned Sheesham
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
                      {/* Large Archival Visual */}
                      <div className="lg:col-span-6 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[4/3] bg-[#140b07] group">
                          <img
                            src="/assets/haryana_phulkari.jpg"
                            alt="Raw Materials & Natural Mediums of Haryana"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-75" />
                          <div className="absolute bottom-4 left-5 right-5 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            SPECIMEN · RAW TUSSAR SILK & INDIGENOUS COTTON KHADDAR
                          </div>
                        </div>
                      </div>

                      {/* Readable Storytelling Text */}
                      <div className="lg:col-span-6 space-y-6">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                          Nothing in Haryana’s folk art was ever purchased from commercial suppliers. Every thread, pigment, and chisel stroke originated directly from the agrarian landscape. The dense silt dredged from the Yamuna and seasonal monsoonal ponds yielded cooling terracotta surahis and sacred clay deities.
                        </p>
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          Women spun coarse unbleached cotton on domestic wooden charkhas, then steeped it in boiling madder root and pomegranate rinds to achieve ancestral ochres and deep earthen reds. Resilient Sheesham heartwood, seasoned through scorching summer winds and winter fogs, became resonant Sarangis and monumental chaupal pillars.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Decorative Golden Divider */}
                  <FolkHeritageDivider />

                  {/* ============================================================
                      SECTION 02 — MOTIFS & SACRED GEOMETRY
                      Changed composition: Opposite alignment.
                      Subtle Haryana-inspired motifs as decorative elements breathing across the background.
                      ============================================================ */}
                  <section className="relative space-y-10">
                    {/* Floating Background Subtle Motifs */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-25 hidden md:block">
                      <SolarDiskMotif className="w-64 h-64 text-[#c5a059]" />
                    </div>

                    <div className="space-y-3 max-w-3xl">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold block">
                        SECTION 02 — MOTIFS & SACRED GEOMETRY
                      </span>
                      <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
                        Unwritten Symbols of Solar Protection, Agrarian Cycles & Fertility
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
                      {/* Storytelling Text Column (Left) */}
                      <div className="lg:col-span-7 space-y-6">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                          Before paper or pencils existed in rural homesteads, women carried complex mathematical geometries solely in collective memory. Counted-stitch embroideries and festive mud-wall reliefs rely on ancestral symmetries passed down without manuals or formal measurements.
                        </p>
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          The concentric solar disk invokes Surya's blessings over ripening wheat fields; the stylized peacock guards domestic courtyards from ill fortune; and the sacred interlocking lozenge celebrates the fertile power of the earth. These motifs are not arbitrary decorations—they are living talismans that sanctify the everyday home.
                        </p>
                      </div>

                      {/* Breathing Decorative Motif Emblems (Right) */}
                      <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border border-[#c5a059]/25 bg-[#140a05]/60 shadow-[0_16px_50px_rgba(0,0,0,0.85)] space-y-8">
                        <div className="flex items-center gap-8">
                          <SolarDiskMotif className="w-24 h-24 text-[#ffd27d]" />
                          <PeacockMotif className="w-24 h-24 text-[#ffd27d]" />
                        </div>
                        <div className="flex items-center gap-8">
                          <SacredLozengeMotif className="w-24 h-24 text-[#ffd27d]" />
                          <FolkLotusOrnament className="w-24 h-16" />
                        </div>
                        <span className="text-[11px] font-cinzel text-[#c5a059] tracking-widest uppercase text-center block pt-2">
                          SACRED ARCHIVAL SYMBOLS OF HARYANA
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Decorative Golden Divider */}
                  <FolkHeritageDivider />

                  {/* ============================================================
                      SECTION 03 — ORAL TRADITIONS & PERFORMANCE
                      Museum exhibition panel feel. Large immersive visual with text.
                      ============================================================ */}
                  <section className="space-y-10">
                    <div className="space-y-3 max-w-4xl">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold block">
                        SECTION 03 — ORAL TRADITIONS & PERFORMANCE
                      </span>
                      <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
                        Twelve Thousand Couplets Under Peepal Boughs: The Saang & Ragini Operas
                      </h2>
                    </div>

                    {/* Museum Exhibition Visual Panel */}
                    <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] bg-[#140b07] group">
                      <img
                        src="/assets/haryana_saang_theatre.jpg"
                        alt="The Living Saang Opera & Oral Performance"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/30 to-transparent" />
                      <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                        <span>ACOUSTIC EXHIBITION · CHAUPAL LIVING THEATRE</span>
                        <span className="text-[#c5a059]">LAKHMI CHAND LINEAGE</span>
                      </div>
                    </div>

                    {/* Curatorial Storytelling underneath the panel */}
                    <div className="max-w-4xl space-y-6 pt-2">
                      <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                        Under the village peepal tree or upon an elevated wooden chaupal platform, Haryana’s history was never read—it was sung. Master bards and troubadours carried twelve thousand rhymed couplets in unbroken mental memory.
                      </p>
                      <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                        When the twilight saang begins, the village gathers in rapt silence. Accompanied by the piercing cry of the Sarangi, the resonance of the Dholak, and the brassy chime of the Chimta, ancient legends of Raja Harishchandra and local ballads awaken the dark countryside until the first light of dawn.
                      </p>
                    </div>
                  </section>

                  {/* Decorative Golden Divider */}
                  <FolkHeritageDivider />

                  {/* ============================================================
                      SECTION 04 — ARTISANS & LIVING PRACTICE
                      Focus on people, craftsmanship and living traditions.
                      Large imagery and storytelling typography.
                      ============================================================ */}
                  <section className="space-y-10">
                    <div className="space-y-3 max-w-4xl">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold block">
                        SECTION 04 — ARTISANS & LIVING PRACTICE
                      </span>
                      <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
                        The Living Custodians: Memory Transmitted Through the Hands
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
                      <div className="lg:col-span-6 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[4/3] bg-[#140b07] group">
                          <img
                            src="/assets/haryana_folk_hero.jpg"
                            alt="The Living Custodians of Haryana"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-4 left-5 right-5 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            DOCUMENTARY PORTRAIT · LIVING HEREDITARY MASTERS
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-6 space-y-6">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                          The true archives of Haryana are not books—they are the calloused hands of its living masters. From the eighty-year-old grandmother darning a bridal Bagh without counting stitches, to the master potter spinning wet silt on a wooden kick-wheel, to the Been player breathing life into a dried gourd, these lineages carry centuries of tactile wisdom.
                        </p>
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          They prove that handmade culture is not an archaic relic of the past, but an enduring, ecological, and deeply spiritual way of living in harmony with community and earth.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Decorative Golden Divider */}
                  <FolkHeritageDivider />

                  {/* ============================================================
                      GATEWAY: THE TEN LIVING TRADITIONS OF HARYANA
                      Editorial exhibition walk leading into individual monographs
                      ============================================================ */}
                  <section className="space-y-24 sm:space-y-36">
                    <div className="space-y-4 max-w-4xl">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold block">
                        THE 10 CULTURAL TRADITIONS
                      </span>
                      <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl text-[#ffd27d] font-normal leading-tight">
                        The Living Heritage Odyssey
                      </h2>
                      <p className="font-cormorant text-2xl text-[#f3e7ce]/95 leading-relaxed">
                        Walk through Haryana's ten foundational disciplines. Select any tradition to enter its dedicated monograph:
                      </p>
                    </div>

                    {/* The 10 Sequential Cultural Traditions (Large Visual Moments, NO Boxed Cards) */}
                    <div className="space-y-28 sm:space-y-36">
                      {HARYANA_FOLK_CHAPTERS.map((chap, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                          <div key={chap.id} className="relative group">
                            {/* Tradition Header */}
                            <div className="flex items-center gap-3 pb-6">
                              <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-bold">
                                {chap.archetype} · CHAPTER {chap.num}
                              </span>
                              <span className="w-16 h-[1px] bg-gradient-to-r from-[#c5a059]/60 to-transparent" />
                            </div>

                            {/* Asymmetrical Two-Column Editorial Composition */}
                            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center ${
                              isEven ? '' : 'lg:grid-flow-dense'
                            }`}>
                              
                              {/* Large Photographic Canvas */}
                              <div className={`lg:col-span-7 relative ${
                                isEven ? '' : 'lg:col-start-6'
                              }`}>
                                <div 
                                  onClick={() => navigateTo(`/haryana/folk-arts/${chap.id}`)}
                                  className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 hover:border-[#ffd27d] shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[16/10] bg-[#140b07] cursor-pointer group/img transition-all duration-500"
                                >
                                  <img
                                    src={chap.image}
                                    alt={chap.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.03]"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/35 to-transparent" />
                                  
                                  <div className="absolute top-4 left-5 px-3.5 py-1 rounded-full bg-[#160b06]/90 border border-[#c5a059]/40 text-[#ffd27d] text-[11px] font-cinzel tracking-widest uppercase">
                                    {chap.accession} · {chap.region.split(',')[0]}
                                  </div>

                                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                                    <span className="font-cormorant italic text-lg text-[#f7e6c4] normal-case">
                                      {chap.vernacular}
                                    </span>
                                    <span className="text-[#c5a059]">{chap.period.split('–')[0]}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Storytelling & Action Column */}
                              <div className={`lg:col-span-5 space-y-5 ${
                                isEven ? '' : 'lg:col-start-1'
                              }`}>
                                <h3 
                                  onClick={() => navigateTo(`/haryana/folk-arts/${chap.id}`)}
                                  className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#fff0d0] font-normal tracking-tight leading-tight hover:text-[#ffd27d] transition-colors cursor-pointer"
                                >
                                  {chap.title}
                                </h3>

                                <p className="font-cormorant italic text-xl sm:text-2xl text-[#ffd27d] leading-relaxed">
                                  “{chap.tagline.replace(/[“”"]/g, '')}”
                                </p>

                                <p className="font-cormorant text-xl text-[#e8d8b8] leading-relaxed line-clamp-4">
                                  {chap.overview}
                                </p>

                                <div className="pt-2">
                                  <button
                                    onClick={() => navigateTo(`/haryana/folk-arts/${chap.id}`)}
                                    className="group/cta inline-flex items-center gap-3 text-xs sm:text-sm font-cinzel text-[#ffd27d] hover:text-[#fff0d0] tracking-[0.24em] uppercase transition-all cursor-pointer font-semibold border-b border-[#c5a059]/50 hover:border-[#ffd27d] pb-1.5"
                                  >
                                    <span>ENTER MONOGRAPH CHAPTER</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1.5 text-[#c5a059] group-hover/cta:text-[#ffd27d]" />
                                  </button>
                                </div>
                              </div>

                            </div>

                            {/* Thin Gold Separator between traditions */}
                            {idx < HARYANA_FOLK_CHAPTERS.length - 1 && (
                              <FolkHeritageDivider className="pt-24 sm:pt-32 my-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* ============================================================
                      BOTTOM CHAPTER NAVIGATION
                      Simple elegant transition
                      ============================================================ */}
                  <div className="pt-12 border-t border-[#c5a059]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      onClick={() => navigateTo('/haryana/folk-arts')}
                      className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.24em] uppercase transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>← RETURN TO FOLK ARTS GATEWAY</span>
                    </button>

                    <button
                      onClick={() => navigateTo('/haryana/folk-arts/artisans')}
                      className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-3"
                    >
                      <span>CONTINUE TO 02 ARTISANS</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              ) : routeInfo.chapter === 'artisans' ? (
                /* ================================================================
                    ROUTE: /artisans (02 ARTISANS: THE LIVING CUSTODIANS)
                    Focus on the PEOPLE behind the traditions:
                    Name, craft, region, story, technique, generational knowledge
                    ================================================================ */
                <motion.section 
                  key="chapter-artisans-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-24 sm:space-y-36"
                >
                  <div className="space-y-6 max-w-4xl border-b border-[#c5a059]/25 pb-16">
                    <div className="flex items-center gap-3">
                      <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent" />
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                        CHAPTER 02 · THE CUSTODIANS
                      </span>
                    </div>
                    
                    <h1 
                      className="font-cinzel text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-tight leading-[0.95]"
                      style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.9))' }}
                    >
                      The Hands Behind the Tradition
                    </h1>
                    
                    <p className="font-cormorant italic text-2xl sm:text-3xl text-[#e8c46a] pt-1">
                      “These traditions survive because people continue to practice them with reverence.”
                    </p>
                  </div>

                  {/* Large Documentary Portraits (NO Boxed Cards, Open Flow) */}
                  <div className="space-y-28 sm:space-y-36">
                    {artisans.map((artisan, idx) => (
                      <div
                        key={artisan.name}
                        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center border-b border-[#c5a059]/15 pb-24 last:border-b-0 ${
                          idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                        }`}
                      >
                        <div className={`lg:col-span-5 relative ${
                          idx % 2 === 1 ? 'lg:col-start-8' : ''
                        }`}>
                          <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[4/3] bg-[#140b07] group">
                            <img
                              src={artisan.image}
                              alt={artisan.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-5 right-5 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                              {artisan.role} • {artisan.location}
                            </div>
                          </div>
                        </div>

                        <div className={`lg:col-span-7 space-y-5 ${
                          idx % 2 === 1 ? 'lg:col-start-1' : ''
                        }`}>
                          <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold">
                            <span>{artisan.generation}</span>
                            <span>·</span>
                            <span className="text-[#ffd27d]">{artisan.craft}</span>
                          </div>
                          
                          <h2 className="font-cinzel text-3xl sm:text-4xl text-[#fff0d0] font-normal leading-tight">
                            {artisan.name}
                          </h2>

                          <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d] border-l-2 border-[#c5a059] pl-5 my-3 leading-relaxed">
                            {artisan.quote}
                          </blockquote>

                          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                            {artisan.narrative}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pathway to Next Chapter */}
                  <div className="pt-8 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      onClick={() => navigateTo('/haryana/folk-arts/journey')}
                      className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.24em] uppercase transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>← 01 FOLK ARTS JOURNEY</span>
                    </button>
                    <button
                      onClick={() => navigateTo('/haryana/folk-arts/surajkund')}
                      className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-3"
                    >
                      <span>CONTINUE TO 03 SURAJKUND</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.section>
              ) : routeInfo.chapter === 'surajkund' ? (
                /* ================================================================
                    ROUTE: /surajkund (03 SURAJKUND INTERNATIONAL CRAFTS MELA)
                    ================================================================ */
                <motion.section 
                  key={`chapter-surajkund-page-${surajkundKey}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <SurajkundMelaExperience
                    key={`surajkund-experience-${surajkundKey}`}
                    onBackToFolkArts={() => navigateTo('/haryana/folk-arts/journey')}
                    onExploreArchive={() => navigateTo('/haryana/folk-arts/journey')}
                    onNavigateToArtisans={() => navigateTo('/haryana/folk-arts/artisans')}
                    onNavigateToToday={() => navigateTo('/haryana/folk-arts/today')}
                  />
                </motion.section>
              ) : (
                /* ================================================================
                    ROUTE: /today (04 TODAY: THE LIVING CONTINUUM)
                    Editorial museum storytelling across 3 living pillars (NO cards)
                    ================================================================ */
                <motion.section 
                  key="chapter-today-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-24 sm:space-y-36"
                >
                  <div className="space-y-6 max-w-4xl border-b border-[#c5a059]/25 pb-16">
                    <div className="flex items-center gap-3">
                      <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent" />
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                        CHAPTER 04 · THE LIVING CONTINUUM
                      </span>
                    </div>

                    <h1 
                      className="font-cinzel text-5xl sm:text-7xl md:text-8xl text-[#ffd27d] font-normal tracking-tight leading-[1.02]"
                      style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.9))' }}
                    >
                      This is Not History Locked in a Museum.
                    </h1>

                    <p className="font-cinzel text-2xl sm:text-4xl text-[#fff0d0] tracking-[0.16em] uppercase font-semibold">
                      IT IS A LIVING TRADITION.
                    </p>

                    <p className="font-cormorant italic text-2xl sm:text-3xl text-[#e8c46a] border-l-2 border-[#c5a059] pl-6 my-4 leading-relaxed">
                      “The clay still turns on the wheel. The needle still pierces the khaddar. The chaupal still echoes under the stars.”
                    </p>
                  </div>

                  {/* Immersive Visual Plate */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-[0_20px_60px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] bg-[#140b07] group">
                    <img
                      src="/assets/haryana_heritage_pavilion.jpg"
                      alt="Haryana Cultural Continuation Today"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0603] via-[#0d0603]/35 to-transparent" />
                    <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                      <span>LIVING ARCHIVE · PRESENT & FUTURE</span>
                      <span className="text-[#c5a059]">CONTINUOUS TRANSMISSION</span>
                    </div>
                  </div>

                  {/* Three Sequential Pillars (Open Editorial Layout, NO Boxed Cards) */}
                  <div className="space-y-16 pt-4 border-t border-[#c5a059]/20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                      <div className="lg:col-span-4 space-y-2">
                        <span className="font-cinzel text-4xl sm:text-5xl text-[#ffd27d] font-bold block">
                          01 · GI
                        </span>
                        <h3 className="font-cinzel text-2xl text-[#fff0d0] font-semibold">
                          Geographical Indication
                        </h3>
                        <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
                          LEGAL STATUTORY PRESERVATION
                        </span>
                      </div>
                      <div className="lg:col-span-8">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          Haryana Phulkari holds statutory Geographical Indication protection, defining strict authentic hand-darning standards and protecting village craftswomen against industrial machine replicas.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pt-8 border-t border-[#c5a059]/15">
                      <div className="lg:col-span-4 space-y-2">
                        <span className="font-cinzel text-4xl sm:text-5xl text-[#ffd27d] font-bold block">
                          02 · NID
                        </span>
                        <h3 className="font-cinzel text-2xl text-[#fff0d0] font-semibold">
                          Design Collaborations
                        </h3>
                        <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
                          CONTEMPORARY INNOVATION & REVALUATION
                        </span>
                      </div>
                      <div className="lg:col-span-8">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          National design institutions and cultural academies work directly with women’s collectives in Rohtak and Jhajjar, translating ancestral motifs into sustainable contemporary art.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pt-8 border-t border-[#c5a059]/15">
                      <div className="lg:col-span-4 space-y-2">
                        <span className="font-cinzel text-4xl sm:text-5xl text-[#ffd27d] font-bold block">
                          03 · SOUND
                        </span>
                        <h3 className="font-cinzel text-2xl text-[#fff0d0] font-semibold">
                          Digital Oral Archive
                        </h3>
                        <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
                          PRESERVING UNWRITTEN ACOUSTIC MEMORY
                        </span>
                      </div>
                      <div className="lg:col-span-8">
                        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                          Ethnomusicologists and folklorists are actively recording unwritten Saang operas, Raginis, and wedding verses in high-fidelity audio, archiving ancient dialects for future generations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-12 border-y border-[#c5a059]/25 text-center max-w-3xl mx-auto space-y-4">
                    <FolkLotusOrnament className="w-16 h-12 mx-auto drop-shadow-[0_0_15px_rgba(201,164,90,0.4)]" />
                    <p className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d] leading-relaxed">
                      “From the sacred soils of Kurukshetra to the starry chaupals of Sonipat, the living canvas of Haryana continues to breathe.”
                    </p>
                    <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.3em] uppercase block">
                      HERITAGE PRESERVED IN MEMORY AND PRACTICE
                    </span>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      onClick={() => navigateTo('/haryana/folk-arts/surajkund')}
                      className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.24em] uppercase transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>← 03 SURAJKUND MELA</span>
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => navigateTo('/haryana/folk-arts/journey')}
                        className="px-6 py-2.5 rounded-full border border-[#c5a059]/40 bg-[#160c07]/80 hover:bg-[#1c0f08] text-[#c5a059] hover:text-[#ffd27d] text-xs font-cinzel tracking-[0.2em] uppercase transition-colors cursor-pointer"
                      >
                        ↻ REVISIT 01 FOLK ARTS
                      </button>
                      <button
                        onClick={() => navigateTo('/haryana/folk-arts')}
                        className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#c5a059] hover:bg-[#ffd27d] text-[#140b07] font-bold text-xs font-cinzel tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(201,164,90,0.5)] flex items-center gap-3"
                      >
                        <span>RETURN TO FOLK ARTS LANDING</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}

            </div>
          </main>

        </div>
      )}

      {/* Handcrafted Indian Cultural Archive Chapter Transition */}
      <FolkArtsChapterTransition
        isActive={isChapterTransitioning}
        destinationMeta={transitionMeta}
      />
    </div>
  );
}
