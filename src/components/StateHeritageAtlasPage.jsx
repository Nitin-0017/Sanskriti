import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, ArrowRight, X, ChevronDown, ExternalLink, ChevronLeft, Compass } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';
import SthaneshwarTempleExperience from './SthaneshwarTempleExperience';
import TempleEntryTransition from './TempleEntryTransition';
import FolkArtsExperience from './FolkArtsExperience';
import FolkArtsEntryTransition from './FolkArtsEntryTransition';
import LiteratureEntryTransition from './LiteratureEntryTransition';
import HaryanaLiteratureExperience from './HaryanaLiteratureExperience';
import HaryanaScripturesExperience from './HaryanaScripturesExperience';
import AudioControl from './AudioControl';
import audioManager from '../services/audioManager';

/**
 * ============================================================================
 * BESPOKE 16:9 CINEMATIC HERITAGE ICONS (FAITHFUL TO USER'S REFERENCE UI)
 * Each icon is framed in a luminous astronomical halo ring with top diamond tick.
 * ============================================================================
 */

function TemplesHeroSvg({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="templeAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="templeSanctumGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffea9f" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="templeStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf6e6" />
          <stop offset="50%" stopColor="#e8cf99" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>

      {/* Celestial Circular Aura Rings */}
      <circle cx="80" cy="80" r="66" fill="url(#templeAuraGrad)" />
      <circle cx="80" cy="80" r="66" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,3" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="#c5a059" strokeWidth="0.6" opacity="0.45" />

      {/* Top Diamond Indicator at 12 o'clock */}
      <polygon points="80,10 77,14 80,18 83,14" fill="#ffd27d" stroke="#c5a059" strokeWidth="0.5" />

      {/* Golden Base Light Glow */}
      <ellipse cx="80" cy="126" rx="42" ry="6" fill="#ffd27d" opacity="0.45" filter="blur(3px)" />

      {/* Stepped Plinth Base */}
      <path d="M 28 126 L 132 126" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="34" y="120" width="92" height="6" rx="1" fill="#24140a" stroke="#d4af37" strokeWidth="1.4" />
      <rect x="42" y="114" width="76" height="6" rx="1" fill="url(#templeStoneGrad)" stroke="#4a2f1c" strokeWidth="1.2" />

      {/* Sanctum Mandapa Base Structure */}
      <rect x="50" y="86" width="60" height="28" fill="#f5ecd8" stroke="#3b1f10" strokeWidth="1.6" />
      {/* Pillars */}
      <line x1="58" y1="86" x2="58" y2="114" stroke="#4a2f1c" strokeWidth="1.8" />
      <line x1="102" y1="86" x2="102" y2="114" stroke="#4a2f1c" strokeWidth="1.8" />

      {/* Sanctum Arched Garbhagriha Portal */}
      <path d="M 68 114 L 68 96 Q 80 88 92 96 L 92 114 Z" fill="#180e08" stroke="#c5a059" strokeWidth="1.4" />
      {/* Sacred Sanctum Light / Jyoti */}
      <circle cx="80" cy="103" r="5" fill="url(#templeSanctumGlow)" />
      <path d="M 80 97 Q 78 101 80 106 Q 82 101 80 97 Z" fill="#fff5db" />

      {/* Nagara Shikhara Curvilinear Spire */}
      <path d="M 52 86 Q 60 52 80 34 Q 100 52 108 86 Z" fill="url(#templeStoneGrad)" stroke="#3b1f10" strokeWidth="1.8" />
      {/* Tiered Horizontal Ribs of Shikhara */}
      <path d="M 56 74 Q 80 67 104 74" stroke="#4a2f1c" strokeWidth="1.2" />
      <path d="M 62 62 Q 80 56 98 62" stroke="#4a2f1c" strokeWidth="1.2" />
      <path d="M 68 50 Q 80 46 92 50" stroke="#4a2f1c" strokeWidth="1.2" />
      <line x1="80" y1="36" x2="80" y2="86" stroke="#8a5a36" strokeWidth="0.9" strokeDasharray="2,2" />

      {/* Fluted Amalaka Cap */}
      <ellipse cx="80" cy="33" rx="11" ry="4.5" fill="#d4af37" stroke="#3b1f10" strokeWidth="1.4" />
      {/* Golden Kalasha Pinnacle */}
      <path d="M 76 29 Q 80 23 80 18 Q 80 23 84 29 Z" fill="#ffd27d" stroke="#4a2f1c" strokeWidth="1.1" />

      {/* Fluttering Crimson-Red & Gold Pennant Flag (Dhwaja) */}
      <path d="M 80 18 L 80 11 L 96 15 L 80 19 Z" fill="#8a2e22" stroke="#ffd27d" strokeWidth="1" />
    </svg>
  );
}

function FolkArtsHeroSvg({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="folkAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="folkSkirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf5e2" />
          <stop offset="50%" stopColor="#e6ca8d" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>

      {/* Celestial Circular Aura Rings */}
      <circle cx="80" cy="80" r="66" fill="url(#folkAuraGrad)" />
      <circle cx="80" cy="80" r="66" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,3" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="#c5a059" strokeWidth="0.6" opacity="0.45" />

      {/* Top Diamond Indicator at 12 o'clock */}
      <polygon points="80,10 77,14 80,18 83,14" fill="#ffd27d" stroke="#c5a059" strokeWidth="0.5" />

      {/* Golden Base Glow */}
      <ellipse cx="80" cy="128" rx="36" ry="5" fill="#ffd27d" opacity="0.35" filter="blur(3px)" />

      {/* Conical Golden Mukut / Headpiece */}
      <polygon points="80,24 72,40 88,40" fill="#d4af37" stroke="#3b1f10" strokeWidth="1.2" />
      <circle cx="80" cy="22" r="2.5" fill="#ffd27d" stroke="#3b1f10" strokeWidth="0.8" />

      {/* Stylized White Face with Bindi */}
      <circle cx="80" cy="46" r="7.5" fill="#fdf7ea" stroke="#3b1f10" strokeWidth="1.4" />
      <circle cx="80" cy="45" r="1.5" fill="#8a2e22" />

      {/* Traditional Crimson Choli / Bodice */}
      <path d="M 75 53 L 73 68 L 87 68 L 85 53 Z" fill="#8a2e22" stroke="#3b1f10" strokeWidth="1.4" />
      <circle cx="80" cy="60" r="2" fill="#ffd27d" />

      {/* Outspread Dynamic Arms with Gold Bangles */}
      <path d="M 73 57 L 44 65" stroke="#3b1f10" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 87 57 L 116 65" stroke="#3b1f10" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="44" cy="65" r="2.5" fill="#ffd27d" />
      <circle cx="116" cy="65" r="2.5" fill="#ffd27d" />

      {/* Flared Pyramidal Pleated Skirt (Ghaghra) */}
      <path d="M 73 68 L 44 116 Q 80 128 116 116 L 87 68 Z" fill="url(#folkSkirtGrad)" stroke="#3b1f10" strokeWidth="1.8" />
      
      {/* Radiating Pleat Lines */}
      <line x1="80" y1="68" x2="60" y2="120" stroke="#8a5a36" strokeWidth="1.2" />
      <line x1="80" y1="68" x2="80" y2="124" stroke="#d4af37" strokeWidth="1.5" />
      <line x1="80" y1="68" x2="100" y2="120" stroke="#8a5a36" strokeWidth="1.2" />

      {/* Jingling Ghunghroo Ankle Bell Studs */}
      <circle cx="68" cy="126" r="3.2" fill="#8a2e22" stroke="#ffd27d" strokeWidth="1.2" />
      <circle cx="92" cy="126" r="3.2" fill="#8a2e22" stroke="#ffd27d" strokeWidth="1.2" />
    </svg>
  );
}

function LiteratureHeroSvg({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="litAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bookPageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="60%" stopColor="#faecd0" />
          <stop offset="100%" stopColor="#e3c280" />
        </linearGradient>
      </defs>

      {/* Celestial Circular Aura Rings */}
      <circle cx="80" cy="80" r="66" fill="url(#litAuraGrad)" />
      <circle cx="80" cy="80" r="66" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,3" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="#c5a059" strokeWidth="0.6" opacity="0.45" />

      {/* Top Diamond Indicator at 12 o'clock */}
      <polygon points="80,10 77,14 80,18 83,14" fill="#ffd27d" stroke="#c5a059" strokeWidth="0.5" />

      {/* Golden Radiance Below Book */}
      <ellipse cx="80" cy="122" rx="38" ry="5" fill="#ffd27d" opacity="0.35" filter="blur(3px)" />

      {/* Dark Outer Book Binding / Cover */}
      <path d="M 32 104 Q 56 94 80 102 Q 104 94 128 104 L 128 112 Q 104 100 80 108 Q 56 100 32 112 Z" fill="#24140a" stroke="#3b1f10" strokeWidth="1.4" />

      {/* Open Curved Pages / Folios */}
      <path d="M 34 56 Q 57 46 80 54 Q 103 46 126 56 L 126 104 Q 103 94 80 102 Q 57 94 34 104 Z" fill="url(#bookPageGrad)" stroke="#3b1f10" strokeWidth="1.8" />

      {/* Center Spine Binding Line */}
      <line x1="80" y1="54" x2="80" y2="108" stroke="#8a2e22" strokeWidth="2.2" strokeLinecap="round" />

      {/* Inscribed Verse Lines (Left Folio) */}
      <line x1="44" y1="66" x2="70" y2="66" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="44" y1="74" x2="70" y2="74" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="44" y1="82" x2="70" y2="82" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="44" y1="90" x2="64" y2="90" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />

      {/* Inscribed Verse Lines (Right Folio) */}
      <line x1="90" y1="66" x2="116" y2="66" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="90" y1="74" x2="116" y2="74" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="90" y1="82" x2="116" y2="82" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <line x1="90" y1="90" x2="110" y2="90" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />

      {/* Center Silk Bookmark Ribbon */}
      <path d="M 80 54 Q 76 80 84 104 L 80 120 L 76 104 Z" fill="#d4af37" stroke="#8a5a36" strokeWidth="0.8" />
    </svg>
  );
}

function ScripturesHeroSvg({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="scriptAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="granthaWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffcf2" />
          <stop offset="50%" stopColor="#ebd6a7" />
          <stop offset="100%" stopColor="#cfab65" />
        </linearGradient>
      </defs>

      {/* Celestial Circular Aura Rings */}
      <circle cx="80" cy="80" r="66" fill="url(#scriptAuraGrad)" />
      <circle cx="80" cy="80" r="66" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,3" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="#c5a059" strokeWidth="0.6" opacity="0.45" />

      {/* Top Diamond Indicator at 12 o'clock */}
      <polygon points="80,10 77,14 80,18 83,14" fill="#ffd27d" stroke="#c5a059" strokeWidth="0.5" />

      {/* Base Light Glow */}
      <ellipse cx="80" cy="120" rx="38" ry="5" fill="#ffd27d" opacity="0.35" filter="blur(3px)" />

      {/* Upper Grantha Manuscript Bundle */}
      <rect x="36" y="58" width="88" height="20" rx="3.5" fill="url(#granthaWoodGrad)" stroke="#3b1f10" strokeWidth="1.8" />
      {/* Upper Crimson Silk Binding Ties */}
      <line x1="56" y1="56" x2="56" y2="80" stroke="#8a2e22" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="104" y1="56" x2="104" y2="80" stroke="#8a2e22" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="56" cy="68" r="2.2" fill="#ffd27d" />
      <circle cx="104" cy="68" r="2.2" fill="#ffd27d" />
      {/* Central Embossed Rosette Seal */}
      <circle cx="80" cy="68" r="5" fill="#8a2e22" stroke="#ffd27d" strokeWidth="1.4" />
      <circle cx="80" cy="68" r="2" fill="#ffd27d" />

      {/* Lower Grantha Manuscript Bundle */}
      <rect x="36" y="86" width="88" height="20" rx="3.5" fill="url(#granthaWoodGrad)" stroke="#3b1f10" strokeWidth="1.8" />
      {/* Lower Crimson Silk Binding Ties */}
      <line x1="56" y1="84" x2="56" y2="108" stroke="#8a2e22" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="104" y1="84" x2="104" y2="108" stroke="#8a2e22" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="56" cy="96" r="2.2" fill="#ffd27d" />
      <circle cx="104" cy="96" r="2.2" fill="#ffd27d" />
      {/* Sutra Inscription Marks on Lower Grantha */}
      <line x1="68" y1="96" x2="92" y2="96" stroke="#5c3818" strokeWidth="1.4" strokeDasharray="3,2.5" />
      <circle cx="80" cy="96" r="1.5" fill="#8a2e22" />
    </svg>
  );
}

function KeyPersonsHeroSvg({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="personAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="medallionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf7eb" />
          <stop offset="50%" stopColor="#ecd5a2" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>

      {/* Celestial Circular Aura Rings */}
      <circle cx="80" cy="80" r="66" fill="url(#personAuraGrad)" />
      <circle cx="80" cy="80" r="66" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,3" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="#c5a059" strokeWidth="0.6" opacity="0.45" />

      {/* Top Diamond Indicator at 12 o'clock */}
      <polygon points="80,10 77,14 80,18 83,14" fill="#ffd27d" stroke="#c5a059" strokeWidth="0.5" />

      {/* Base Light Glow */}
      <ellipse cx="80" cy="126" rx="34" ry="5" fill="#ffd27d" opacity="0.35" filter="blur(3px)" />

      {/* Antique Oval Medallion Frame */}
      <ellipse cx="80" cy="80" rx="38" ry="48" fill="url(#medallionGrad)" stroke="#3b1f10" strokeWidth="2.4" />
      <ellipse cx="80" cy="80" rx="33" ry="43" fill="#fcf6e8" stroke="#d4af37" strokeWidth="1" strokeDasharray="3,2" />

      {/* Noble / Sage Halo */}
      <circle cx="80" cy="62" r="16" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />

      {/* Noble Head with Crown/Turban Topknot */}
      <circle cx="80" cy="62" r="8" fill="#fdf7ea" stroke="#3b1f10" strokeWidth="1.8" />
      <path d="M 76 56 Q 80 48 84 56 Z" fill="#d4af37" stroke="#3b1f10" strokeWidth="1.1" />
      <circle cx="80" cy="62" r="1.5" fill="#8a2e22" />

      {/* Ceremonial Cloak / Robe Silhouette */}
      <path d="M 60 106 Q 70 80 80 80 Q 90 80 100 106 Z" fill="#24140a" stroke="#3b1f10" strokeWidth="1.8" />
      
      {/* Golden Ornamental Hem & Medallion */}
      <path d="M 66 106 Q 80 92 94 106" stroke="#ffd27d" strokeWidth="1.4" fill="none" />
      <circle cx="80" cy="88" r="2.2" fill="#ffd27d" />
    </svg>
  );
}

/**
 * State Heritage Atlas Page
 * Multi-Stage Architecture:
 * - STAGE 1: Black Haryana Cinematic Hero Intro (0-100vh) — 100% PRESERVED
 * - STAGE 2: Antique Parchment Heritage Navigation (100vh+):
 *            5 Large Living Halo Icons (130–170px), Heartbeat Waveform Line, Labels + Diamond Dividers
 * - STAGE 3: Temples Archive Page (/haryana/temples): Dedicated standalone archive with all Haryana temples
 * - STAGE 4: Temple Story Page (/haryana/temples/:id): Full immersive digital exhibition
 */
export default function StateHeritageAtlasPage({ 
  stateExperience, 
  onReturnToMap, 
  onReliveJourney 
}) {
  // Stage states: 'gate' | 'temples-archive' | 'story' | 'folk-arts' | 'literature' | 'scriptures'
  const [stage, setStage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/scriptures')) return 'scriptures';
      if (path.includes('/literature')) return 'literature';
      if (path.includes('/folk-arts')) return 'folk-arts';
      if (path.includes('/temples/')) return 'story';
      if (path.includes('/temples')) return 'temples-archive';
    }
    return 'gate';
  });

  const heritage = stateExperience.heritage || {};
  const templesList = heritage.temples || [];

  const [selectedTempleIndex, setSelectedTempleIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/temples/')) {
        const id = path.split('/temples/')[1];
        const list = stateExperience.heritage?.temples || [];
        const idx = list.findIndex(t => t.id === id);
        if (idx !== -1) return idx;
      }
    }
    return 0;
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [isTransitioningToTemples, setIsTransitioningToTemples] = useState(false);
  const [isPlateModalOpen, setIsPlateModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [enteringTempleData, setEnteringTempleData] = useState(null);
  const [isEnteringFolkArts, setIsEnteringFolkArts] = useState(false);
  const [isEnteringLiterature, setIsEnteringLiterature] = useState(false);

  // Dynamic Walkthrough States: Scroll depth & Architectural Guide Hotspots
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState('shikhara');

  const activeTemple = templesList[selectedTempleIndex] || templesList[0] || {};

  // Scroll tracker for physical sensation of moving deeper into the temple
  useEffect(() => {
    if (stage !== 'story') return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / totalHeight)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stage]);

  // URL sync & browser back/forward support
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('/scriptures')) {
        setStage('scriptures');
      } else if (path.includes('/literature')) {
        setStage('literature');
      } else if (path.includes('/folk-arts')) {
        setStage('folk-arts');
      } else if (path.includes('/temples/')) {
        const id = path.split('/temples/')[1];
        const idx = templesList.findIndex(t => t.id === id);
        if (idx !== -1) setSelectedTempleIndex(idx);
        setStage('story');
      } else if (path.includes('/temples')) {
        setStage('temples-archive');
      } else {
        setStage('gate');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [templesList]);

  // Clean Toast Dismiss Timer
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Drifting golden dust particles for dark hero background
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 4.6) % 96 + 2}%`,
    duration: `${14 + (i % 7) * 2.2}s`,
    delay: `${(i * 1.3) % 8}s`,
    size: `${2 + (i % 3) * 1.5}px`,
    opacity: 0.25 + (i % 4) * 0.12,
  }));

  // Handlers
  const handleOpenTemplesArchive = () => {
    audioManager.setGeneralWebsite();
    setIsTransitioningToTemples(true);
    setTimeout(() => {
      setStage('temples-archive');
      window.history.pushState(null, '', '/haryana/temples');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setIsTransitioningToTemples(false);
      }, 400);
    }, 450);
  };

  // Cinematic Temple Entry: Triggers sacred threshold transition before revealing temple
  const handleOpenTempleStory = (index) => {
    if (enteringTempleData) return; // Prevent double trigger
    const targetTemple = templesList[index] || activeTemple;
    setEnteringTempleData({ temple: targetTemple, index });
  };

  const handleTempleTransitionComplete = () => {
    if (!enteringTempleData) return;
    const { index, temple } = enteringTempleData;
    setSelectedTempleIndex(index);
    setStage('story');
    window.history.pushState(null, '', `/haryana/temples/${temple.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setEnteringTempleData(null);
  };

  const handleBackToGate = () => {
    audioManager.leaveTemple();
    setStage('gate');
    window.history.pushState(null, '', '/haryana');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToTemplesArchive = () => {
    audioManager.leaveTemple();
    setStage('temples-archive');
    window.history.pushState(null, '', '/haryana/temples');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenFolkArts = () => {
    if (isEnteringFolkArts) return;
    setIsEnteringFolkArts(true);
  };

  const handleFolkArtsTransitionComplete = () => {
    setStage('folk-arts');
    window.history.pushState(null, '', '/haryana/folk-arts');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsEnteringFolkArts(false);
  };

  const handleOpenLiterature = () => {
    if (isEnteringLiterature) return;
    setIsEnteringLiterature(true);
  };

  const handleLiteratureTransitionComplete = () => {
    setStage('literature');
    window.history.pushState(null, '', '/haryana/literature');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsEnteringLiterature(false);
  };

  const handleOpenScriptures = () => {
    audioManager.setGeneralWebsite();
    if (window.playTempleChime) window.playTempleChime();
    setStage('scriptures');
    window.history.pushState(null, '', '/haryana/scriptures');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCategoryItemClick = (categoryId, categoryLabel) => {
    if (categoryId === 'temples') {
      handleOpenTemplesArchive();
    } else if (categoryId === 'folkArts') {
      handleOpenFolkArts();
    } else if (categoryId === 'literature') {
      handleOpenLiterature();
    } else if (categoryId === 'scriptures') {
      handleOpenScriptures();
    } else {
      if (window.playTempleChime) window.playTempleChime();
      setToastMessage(`${categoryLabel} — Curatorial preservation in progress. This archive will open soon.`);
    }
  };

  // The Five Large Living Navigation Items (~130-170px tall on desktop)
  const navigationItems = [
    {
      id: 'temples',
      label: 'TEMPLES',
      icon: <TemplesHeroSvg className="w-full h-full" />,
    },
    {
      id: 'folkArts',
      label: 'FOLK ARTS',
      icon: <FolkArtsHeroSvg className="w-full h-full" />,
    },
    {
      id: 'literature',
      label: 'LITERATURE',
      icon: <LiteratureHeroSvg className="w-full h-full" />,
    },
    {
      id: 'scriptures',
      label: 'SCRIPTURES',
      icon: <ScripturesHeroSvg className="w-full h-full" />,
    },
    {
      id: 'keyPersons',
      label: 'KEY PERSONS',
      icon: <KeyPersonsHeroSvg className="w-full h-full" />,
    },
  ];

  // Specific high-quality imagery for each entry
  const getTempleImage = (item, index) => {
    if (item?.id === 'sthaneshwar-mahadev') return '/assets/sthaneshwar_temple_hero.jpg';
    if (item?.id === 'bhima-devi') return '/assets/bhima_devi_temple.jpg';
    if (item?.id === 'jyotisar-temple') return '/assets/jyotisar_temple.jpg';
    if (item?.id === 'agroha-dham') return '/assets/heritage_hero_bg.jpg';
    if (item?.id === 'mata-mansa-devi') return '/assets/pathway_start_closeup.jpg';
    if (item?.id === 'birla-mandir-kurukshetra') return '/assets/haryana_illustrated_hero.jpg';
    if (item?.image) return item.image;
    if (item?.intro?.heroImage) return item.intro.heroImage;
    const imgs = [
      '/assets/sthaneshwar_temple_hero.jpg',
      '/assets/bhima_devi_temple.jpg',
      '/assets/jyotisar_temple.jpg',
      '/assets/heritage_hero_bg.jpg',
      '/assets/pathway_start_closeup.jpg',
      '/assets/haryana_illustrated_hero.jpg'
    ];
    return imgs[index % imgs.length];
  };

  // Archival dossier provider for the individual temple record
  const getArchivalDossier = (temple, index) => {
    const id = temple?.id || '';
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const plateNum = romanNumerals[index] || `I`;
    const entryNum = String(index + 1).padStart(2, '0');

    if (id === 'sthaneshwar-mahadev') {
      return {
        entryNum: '01',
        plateNum: 'PLATE I',
        coordinates: '29° 58′ 48″ N, 76° 49′ 48″ E',
        folio: 'FOLIO 14-B · KURUKSHETRA CIRCLE',
        fieldRef: 'ASI / HR-74',
        stamp: 'ARCHAEOLOGICAL RECORD · VERIFIED',
        fieldAnnotation: '“An ancient sanctuary associated with the sacred landscape of Kurukshetra.”',
        caption: 'ARCHIVAL PHOTOGRAPH · THANESAR, KURUKSHETRA',
        origin: 'Ancient sacred traditions associate the site with the historic landscape of Thanesar, where early Vedic hermitages and forest austerities flourished along the holy Saraswati river basin.',
        historicalSignificance: 'Thanesar served as the imperial capital under Emperor Harshavardhana in the 7th century CE; visiting pilgrim Xuanzang documented thriving royal Shaivite devotions and sacred tanks.',
        sacredAssociations: 'Connected with Lord Shiva as Sthaneshwar ("Lord of the Abode"); regional tradition recounts the Pandavas seeking divine blessings here before the Kurukshetra battle.',
        architecturalCharacter: 'Curvilinear Nagara shikhara, subterranean sanctum housing an ancient swayambhu lingam, stepped stone bathing ghats, and an expansive sacred sarovar.',
        location: 'Situated on the ancient northern pilgrimage artery in Thanesar, forming a pivotal sacred node within the traditional 48-kos Kurukshetra parikrama.',
        culturalSignificance: 'Living center of unbroken devotion where pilgrims circumambulate the sarovar and release twilight earthen lamps, linking ancient Pushyabhuti roots with living ritual.',
        fieldNote: '“The sanctity of Sthaneshwar is inseparable from the wider sacred landscape of Kurukshetra. Even as centuries reshaped the towns and roadways of Haryana, the holy water tank and quiet sanctum remain an enduring sanctuary of prayer and memory.”',
        curatorSignature: '— Archival Curator, Archaeological Field Survey'
      };
    }

    if (id === 'bhima-devi') {
      return {
        entryNum: '02',
        plateNum: 'PLATE II',
        coordinates: '30° 47′ 49″ N, 76° 54′ 54″ E',
        folio: 'FOLIO 19-A · PINJORE VALLEY',
        fieldRef: 'ASI / HR-82',
        stamp: 'PANCHAYATANA RECORD · EXCAVATED',
        fieldAnnotation: '“Acclaimed as the Khajuraho of North India; monumental sculptural evidence of Gurjara-Pratihara stonecraft.”',
        caption: 'ARCHAEOLOGICAL EXCAVATION PLINTHS · PINJORE',
        origin: 'Erected between the 8th and 11th centuries CE during the reign of the imperial Gurjara-Pratihara monarchs along Himalayan transit corridors.',
        historicalSignificance: 'Excavations between 1974 and 1977 unearthed over a thousand sandstone carvings, proving an advanced classical sculptural renaissance in northern India.',
        sacredAssociations: 'Planned as a five-shrine Panchayatana complex dedicated to Shiva, Shakti, Vishnu, Surya, and Ganesha; folk memory recalls the Pandava exile in ancient Panchapura.',
        architecturalCharacter: 'Elaborate molded plinths (adhishthana), tiered granite basements, carved friezes of apsaras, and high-relief deities exhibiting classical dance mudras.',
        location: 'Nestled in the lush Shivalik foothills of Pinjore, Panchkula, adjacent to historic mountain springs.',
        culturalSignificance: 'Now an open-air archaeological sanctuary preserving Haryana’s premier medieval stone-carving heritage under open Himalayan skies.',
        fieldNote: '“Walking through the open-air plinths at Pinjore reveals a forgotten chapter of northern Indian sculpture. Each weathered sandstone fragment preserves the supreme balance between divine iconography and artistic grace.”',
        curatorSignature: '— Archaeological Survey of Haryana, Pinjore Division'
      };
    }

    if (id === 'jyotisar-temple') {
      return {
        entryNum: '03',
        plateNum: 'PLATE III',
        coordinates: '29° 58′ 05″ N, 76° 46′ 08″ E',
        folio: 'FOLIO 22-C · SARASWATI BASIN',
        fieldRef: 'ASI / HR-88',
        stamp: 'SACRED TIRTHA · GITA REVELATION',
        fieldAnnotation: '“The consecrated soil of the Gita Upadesha; ancient Akshaya Bata banyan tree standing beside the sacred pool.”',
        caption: 'SACRED WATER BODY & AKSHAYA BATA · JYOTISAR',
        origin: 'Revered since epic antiquity as the sacred ground where Lord Krishna delivered the immortal Bhagavad Gita discourse to warrior Arjuna.',
        historicalSignificance: 'Mentioned in the Mahabharata and classical puranic literature as the cosmic vortex of Dharma, drawing emperors, scholars, and mendicants across millennia.',
        sacredAssociations: 'The eternal Akshaya Bata banyan tree is venerated as an unbroken living witness to the sermon on selfless action and the Vishvarupa revelation.',
        architecturalCharacter: 'Marble Gita chariot pavilion sculpted in high classical detail, stepped sacred Sarovar water-body, and quiet open circumambulatory stone colonnades.',
        location: 'Located 5 km west of Thanesar, Kurukshetra along the sacred Saraswati drainage channel.',
        culturalSignificance: 'Global philosophical pilgrimage site where the universal discourse on duty, righteousness, and cosmic balance continues to be chanted daily.',
        fieldNote: '“At Jyotisar, philosophy is rooted in earth and water. The banyan tree spreading its aerial roots over the stone steps reminds the observer that here, scripture was not merely written—it was spoken into the open air.”',
        curatorSignature: '— Kurukshetra Heritage Register'
      };
    }

    if (id === 'agroha-dham') {
      return {
        entryNum: '04',
        plateNum: 'PLATE IV',
        coordinates: '29° 20′ 28″ N, 75° 37′ 15″ E',
        folio: 'FOLIO 31-D · AGROHA MOUND',
        fieldRef: 'ASI / HR-91',
        stamp: 'REPUBLICAN ARCHIVE · EXCAVATED',
        fieldAnnotation: '“Memorial of Maharaja Agrasen’s democratic merchant republic and the archaeological mound of ancient Agreya.”',
        caption: 'MONUMENTAL COMPLEX & HISTORIC EXCAVATION MOUND',
        origin: 'Archaeological excavations trace the site back to the ancient republican state of Agrodaka (c. 1000 BCE–2nd century BCE) along the desiccated Saraswati route.',
        historicalSignificance: 'Numismatic discoveries of coins inscribed \'Agodaka Janapadasa\' verify one of ancient India’s most prosperous mercantile democracies.',
        sacredAssociations: 'Dedicated to Goddess Mahalaxmi, Goddess Saraswati, and the legendary Maharaja Agrasen who instituted equal social welfare through brick-and-coin equity.',
        architecturalCharacter: 'Monumental red sandstone shikharas, towering ornamental gateways, expansive landscaped water tanks, and arched sandstone corridors.',
        location: 'Situated at Agroha in Hisar district, adjacent to the protected ASI archaeological excavation mound.',
        culturalSignificance: 'Spiritual and cultural nucleus of the worldwide Agrawal community, celebrating non-violence, economic cooperation, and republican heritage.',
        fieldNote: '“Agroha reconciles archaeology with living cultural identity. Beside the excavated stupas and terracotta plinths of the ancient mound, the grand modern sanctum stands as a testament to historical memory revived.”',
        curatorSignature: '— Hisar District Archaeological Record'
      };
    }

    if (id === 'mata-mansa-devi') {
      return {
        entryNum: '05',
        plateNum: 'PLATE V',
        coordinates: '30° 43′ 16″ N, 76° 51′ 38″ E',
        folio: 'FOLIO 37-B · SHIVALIK RIDGE',
        fieldRef: 'ASI / HR-95',
        stamp: 'SHAKTA ARCHIVE · REGISTERED',
        fieldAnnotation: '“Centuries-old Shakta pilgrimage seat in Bilaspur; historic wall frescoes blending Mughal and Rajput artistic idioms.”',
        caption: 'HILLTOP SHAKTI PEETHA SANCTUM · PANCHKULA',
        origin: 'Constructed between 1811 and 1815 CE by Maharaja Gopal Singh of Mani Majra, crowning an ancient hilltop sanctum venerated for centuries.',
        historicalSignificance: 'One of the preeminent Shakti Peethas of northern India, preserving rare 19th-century lime-plaster wall murals portraying classical Hindu mythology.',
        sacredAssociations: 'Revered as the manifestation of Goddess Mansa, granter of wishes and divine shakti, closely linked to the seven sister goddesses of the Himalayas.',
        architecturalCharacter: 'Quadrangular sanctum surmounted by thirty-eight minarets and ornate chhatris, surrounded by arched parikrama verandahs with floral lime frescoes.',
        location: 'Crowning the Bilaspur village hilltop in Panchkula, facing the Shivalik foothills near Chandigarh.',
        culturalSignificance: 'Epicenter of northern Navratri pilgrimages, where millions gather annually to climb the stone stairs in celebration of divine feminine energy.',
        fieldNote: '“The hilltop setting of Mansa Devi offers a breathtaking convergence of mountain devotion and architectural elegance. The delicate floral lime-frescoes inside the parikrama corridor remain an irreplaceable treasure of regional art.”',
        curatorSignature: '— Shivalik Heritage Survey'
      };
    }

    // Default / Birla Mandir
    return {
      entryNum: entryNum,
      plateNum: `PLATE ${plateNum}`,
      coordinates: '29° 58′ 12″ N, 76° 50′ 24″ E',
      folio: 'FOLIO 43-A · BRAHMA SAROVAR',
      fieldRef: `ASI / HR-98`,
      stamp: 'HISTORICAL ARCHIVE · CATALOGUED',
      fieldAnnotation: '“Modern classical stone marvel carved entirely in pure white marble on the banks of holy Brahma Sarovar.”',
      caption: 'MARBLE SANCTUM & BRAHMA SAROVAR EMBANKMENT',
      origin: 'Commissioned in 1952 by industrialist philanthropist Jugal Kishore Birla to honor the sacred memory of the Mahabharata and Gita.',
      historicalSignificance: 'A 20th-century resurgence of classical Nagara stone temple architecture, constructed without modern cement using traditional dry-stone interlock techniques.',
      sacredAssociations: 'Dedicated to Lord Krishna, featuring life-sized marble statues of the Pandavas and complete Gita shlokas etched upon pristine marble slabs.',
      architecturalCharacter: 'Nagara curvilinear shikhara, multi-tiered carved marble jali screens, monumental assembly mandapa, and expansive gardens facing the holy tank.',
      location: 'Situated directly along the western embankment of the vast Brahma Sarovar in Kurukshetra.',
      culturalSignificance: 'A majestic educational and spiritual repository where visitors read all 700 verses of the Bhagavad Gita carved permanently in stone along the inner walls.',
      fieldNote: '“At Birla Mandir, the ancient Gita is physically engraved into stone. As evening bells toll across Brahma Sarovar, the pure white marble shikhara glows golden against the twilight water.”',
      curatorSignature: '— Kurukshetra Heritage Register'
    };
  };

  // Walkthrough story provider for the immersive temple experience
  const getWalkthroughStory = (temple, index) => {
    const id = temple?.id || '';

    if (id === 'sthaneshwar-mahadev') {
      return {
        eyebrow: 'ENTERING THE SACRED SANCTUM',
        titlePart1: 'STHANESHWAR',
        titlePart2: 'MAHADEV TEMPLE',
        location: 'Thanesar · Kurukshetra · Haryana',
        poeticIntro: '“Where stone, water and memory meet — a sacred place shaped by centuries of devotion.”',
        threshold: {
          tag: 'ORIGIN',
          heading: 'THE SACRED THRESHOLD',
          text: 'Standing at the ancient northern gateway of Thanesar, this sanctuary marks one of the most venerable nodes within the 48-kos parikrama circuit of Kurukshetra. Along the historic Saraswati basin, centuries of devotion established a sacred precinct where pilgrims continue to cross from the secular world into timeless tranquility.',
          note: '“Tradition remembers this place as an enduring sanctuary where stone, water and prayer have remained unbroken across millenia...”'
        },
        stories: {
          tag: 'HISTORICAL SIGNIFICANCE · SACRED ASSOCIATION',
          heading: 'THE STORIES WITHIN',
          p1: 'Thanesar rose as the glorious capital of Emperor Harshavardhana during the 7th century CE, where the Pushyabhuti dynasty patronized vast Shaivite rituals. Xuanzang recorded devout ascetics and royal pilgrimages circumambulating these waters.',
          p2: 'Deep in epic lore, regional tradition recounts that the Pandavas and Lord Krishna prayed at Sthaneshwar before the Mahabharata war, invoking Mahadeva for moral fortitude, strength, and righteous victory.',
          note: '“Follow the path toward the sanctum →”'
        },
        sanctum: {
          tag: 'LIVING TRADITION',
          heading: 'THE PRESENCE OF SHIVA',
          p1: 'Descending down cool stone steps into the subterranean sanctum, the world outside falls silent. Before you rests the ancient Swayambhu Lingam, bathed in the fragrant warmth of sandalwood, fresh bilva leaves, and the gentle glow of brass ghee lamps that have flickered across centuries.',
          p2: 'Here, worship is an intimate communion with the infinite. The morning abhishekham and evening arati remain a living stream of devotion, connecting the modern pilgrim to the same sacred presence venerated by kings and sages of ancient India.',
          note: '“In the silence of the sanctum, the lingam rests in timeless devotion...”'
        },
        architecture: {
          tag: 'ARCHITECTURE',
          heading: 'STONE & DEVOTION',
          sub: 'Classical Nagara Architecture · Carved Sandstone · Sacred Tank',
          img: '/assets/temple_carved_stonework.jpg',
          note: '“Look closely at the stonework... the chisel marks of ancient artisans are still visible in the raking light.”',
          points: [
            {
              id: 'shikhara',
              title: 'CURVILINEAR SHIKHARA',
              desc: 'The shikhara rises in classical Nagara curvilinear tiers, crowned with a fluted stone amalaka and golden kalasha that direct the soul upwards toward transcendence.'
            },
            {
              id: 'stonework',
              title: 'CARVED STONEWORK',
              desc: 'Pillars and plinths are embellished with intricate floral vines, pot-and-foliage (ghata-pallava) capitals, and niche sculptures portraying attendant deities and guardians.'
            },
            {
              id: 'tank',
              title: 'SACRED WATER TANK',
              desc: 'The adjoining stepped sarovar forms the physical and spiritual heart of the complex, reflecting the spire on its calm waters during sunset rituals and bathing ceremonies.'
            }
          ]
        },
        livingPlace: {
          heading: 'A LIVING PLACE',
          quote: '“Not simply a monument of the past, but a place where memory, ritual and devotion continue to meet.”',
          desc: 'As dusk gathers over Thanesar, quiet ripples carry the glow of floating earthen lamps across the tank. Bells resound across the courtyard, renewing a prayer that has echoed here for thousands of years.',
          img: '/assets/sthaneshwar_temple_hero.jpg',
          caption: 'Sthaneshwar Mahadev Sarovar · Dusk Devotion'
        }
      };
    }

    if (id === 'bhima-devi') {
      return {
        eyebrow: 'ENTERING THE SACRED RUINS',
        titlePart1: 'BHIMA DEVI',
        titlePart2: 'TEMPLE COMPLEX',
        location: 'Pinjore · Panchkula · Haryana',
        poeticIntro: '“Monumental sandstone plinths whispering the forgotten sculptural brilliance of medieval Gurjara-Pratihara masters.”',
        threshold: {
          tag: 'ORIGIN',
          heading: 'THE SACRED THRESHOLD',
          text: 'Resting in the tranquil Shivalik foothills of Pinjore, the Bhima Devi temple plinths mark an ancient Himalayan pilgrimage trail where five sanctums once rose under open skies.',
          note: '“Tradition remembers this place as the Khajuraho of North India...”'
        },
        stories: {
          tag: 'HISTORICAL SIGNIFICANCE · SACRED ASSOCIATION',
          heading: 'THE STORIES WITHIN',
          p1: 'Built between the 8th and 11th centuries CE during the Gurjara-Pratihara epoch, this Panchayatana temple complex celebrated cosmic harmony among Shiva, Shakti, Vishnu, Surya, and Ganesha.',
          p2: 'Local lore associates the surrounding valley with the Pandavas’ woodland exile, where mountain streams and tranquil groves offered sanctuary.',
          note: '“Follow the path toward the central sanctum plinth →”'
        },
        sanctum: {
          tag: 'LIVING TRADITION',
          heading: 'THE PRESENCE OF SHAKTI',
          p1: 'Though the superstructures surrendered to time, the consecrated foundations remain charged with meditative stillness. Excavations revealed over a thousand magnificent deities.',
          p2: 'Today, the open-air sanctuary invites quiet contemplation among centuries-old stone carvings bathed in mountain sunlight.',
          note: '“In the silence of the plinths, divine forms remain frozen in stone...”'
        },
        architecture: {
          tag: 'ARCHITECTURE',
          heading: 'STONE & DEVOTION',
          sub: 'Gurjara-Pratihara Style · Tiered Adhishthana · High-Relief Sculptures',
          img: '/assets/bhima_devi_temple.jpg',
          note: '“Look closely at the stonework... the delicate dance postures of apsaras echo classical Natyashastra.”',
          points: [
            {
              id: 'shikhara',
              title: 'PANCHAYATANA PLINTHS',
              desc: 'The elaborate stepped adhishthana platform accommodated four auxiliary shrines oriented symmetrically around the central sanctum.'
            },
            {
              id: 'stonework',
              title: 'CARVED STONEWORK',
              desc: 'High-relief friezes depict celestial dancers, river goddesses Ganga and Yamuna, and intricate floral garlands carved with masterly depth.'
            },
            {
              id: 'tank',
              title: 'SHIVALIK FOOTHILLS',
              desc: 'Set against pine-covered ridges and mountain springs, the natural topography elevates the temple into a sacred cosmic landscape.'
            }
          ]
        },
        livingPlace: {
          heading: 'A LIVING PLACE',
          quote: '“Not simply a monument of the past, but an open-air sanctuary where stone and nature exist in timeless harmony.”',
          desc: 'As cool mountain breezes sweep down from the Himalayas, the weathered sandstone reliefs catch the golden amber of twilight, telling stories of devotion that time cannot erase.',
          img: '/assets/bhima_devi_temple.jpg',
          caption: 'Bhima Devi Open-Air Plinths · Shivalik Ridge'
        }
      };
    }

    if (id === 'jyotisar-temple') {
      return {
        eyebrow: 'ENTERING THE IMMORTAL SOIL',
        titlePart1: 'JYOTISAR',
        titlePart2: 'GITA TIRTHA',
        location: 'Kurukshetra · Haryana',
        poeticIntro: '“The sacred ground where the immortal dialogue of the Bhagavad Gita was spoken into the open air.”',
        threshold: {
          tag: 'ORIGIN',
          heading: 'THE SACRED THRESHOLD',
          text: 'Situated along the ancient Saraswati course in Kurukshetra, Jyotisar is the consecrated epicenter of Dharmakshetra. Here, on the cusp of conflict, wisdom triumphed over despair.',
          note: '“Tradition remembers this place as the birthplace of universal duty and timeless philosophy...”'
        },
        stories: {
          tag: 'HISTORICAL SIGNIFICANCE · SACRED ASSOCIATION',
          heading: 'THE STORIES WITHIN',
          p1: 'Mentioned in classical puranic literature as the eternal tirtha, Jyotisar has drawn emperors, scholars, and pilgrims across millennia to witness the consecrated grounds of the Gita Upadesha.',
          p2: 'Beside the holy pool stands the revered Akshaya Bata banyan tree, celebrated as an unbroken living witness to Lord Krishna’s sermon to the warrior Arjuna.',
          note: '“Follow the path toward the sacred banyan tree →”'
        },
        sanctum: {
          tag: 'LIVING TRADITION',
          heading: 'THE PRESENCE OF DHARMA',
          p1: 'Under the spreading canopy of the Akshaya Bata, Sanskrit verses resonate across the courtyard. Pilgrims light brass lamps and circumambulate the marble chariot depicting the Gitopadesha.',
          p2: 'Here, the divine revelation is not a distant memory—it is spoken, chanted, and lived every morning at sunrise.',
          note: '“In the rustle of the sacred banyan leaves, the eternal shlokas still echo...”'
        },
        architecture: {
          tag: 'ARCHITECTURE',
          heading: 'STONE & DEVOTION',
          sub: 'Sacred Banyan Sanctuary · Marble Chariot · Stepped Sarovar',
          img: '/assets/jyotisar_temple.jpg',
          note: '“Look closely at the stonework... the bronze chariot sculpture captures the precise moment of Arjuna’s surrender.”',
          points: [
            {
              id: 'shikhara',
              title: 'GITA CHARIOT PAVILION',
              desc: 'A magnificent life-sized marble tableau depicting Lord Krishna blowing the Panchajanya conch as chariot driver to warrior Arjuna.'
            },
            {
              id: 'stonework',
              title: 'AKSHAYA BATA TREE',
              desc: 'The immortal banyan tree whose aerial roots reach into the sacred soil, venerated as a living witness to the sermon of the Gita.'
            },
            {
              id: 'tank',
              title: 'SACRED WATER TANK',
              desc: 'The tranquil holy water pool where pilgrims offer prayers and float lamps reflecting the eternal illumination of wisdom.'
            }
          ]
        },
        livingPlace: {
          heading: 'A LIVING PLACE',
          quote: '“Not simply a monument of the past, but the living source where timeless philosophy continues to illuminate the human path.”',
          desc: 'At dusk, as Vedic chants float across the water and temple bells sound, the immortal banyan stands bathed in amber light, reminding every visitor of their eternal dharma.',
          img: '/assets/jyotisar_temple.jpg',
          caption: 'Jyotisar Gita Tirtha · Sacred Banyan & Sarovar'
        }
      };
    }

    // Default template for any other temple
    const nameParts = temple?.name ? temple.name.split(' ') : ['SACRED', 'TEMPLE'];
    return {
      eyebrow: 'ENTERING THE SACRED SANCTUM',
      titlePart1: nameParts.slice(0, -1).join(' ') || nameParts[0],
      titlePart2: nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
      location: temple?.location || 'Haryana · India',
      poeticIntro: temple?.intro?.tagline || '“A sacred sanctuary where centuries of prayer, stone craft, and living memory meet.”',
      threshold: {
        tag: 'ORIGIN',
        heading: 'THE SACRED THRESHOLD',
        text: temple?.intro?.historicalContext || 'Standing as an enduring spiritual anchor in Haryana, this consecrated sanctuary welcomes pilgrims across generations into a realm of peace and historic devotion.',
        note: '“Tradition remembers this place as an enduring sanctuary of faith...”'
      },
      stories: {
        tag: 'HISTORICAL SIGNIFICANCE · SACRED ASSOCIATION',
        heading: 'THE STORIES WITHIN',
        p1: temple?.intro?.significance || 'Deeply interwoven with northern Indian classical history, regional chronicles document royal patronage, cultural resurgence, and uninterrupted sacred pilgrimages.',
        p2: 'Epic traditions recall celebrated saints and philosophers visiting this precinct to offer prayers and meditate within its consecrated boundaries.',
        note: '“Follow the path toward the sanctum →”'
      },
      sanctum: {
        tag: 'LIVING TRADITION',
        heading: 'THE SACRED PRESENCE',
        p1: 'Within the peaceful inner sanctum, brass oil lamps illuminate ancient stone icons adorned with fragrant garlands, sandalwood paste, and sacred offerings.',
        p2: 'Devotees gather daily for the traditional arati and morning circumambulation, sustaining rituals that have remained unbroken across centuries.',
        note: '“In the silence of the sanctum, timeless devotion continues...”'
      },
      architecture: {
        tag: 'ARCHITECTURE',
        heading: 'STONE & DEVOTION',
        sub: 'Classical Stone Architecture · Carved Plinths · Sacred Complex',
        img: getTempleImage(temple, index),
        note: '“Look closely at the stonework... weathered sandstone preserving the craftsmanship of ancient builders.”',
        points: [
          {
            id: 'shikhara',
            title: 'TEMPLE SPIRE & MANDAPA',
            desc: 'The traditional shikhara rises proudly above the garbhagriha, harmonizing with spacious open pillared assembly halls.'
          },
          {
            id: 'stonework',
            title: 'CARVED STONEWORK',
            desc: 'Pillars and architraves feature classical motifs, floral scrolls, and divine iconography carved with timeless artistry.'
          },
          {
            id: 'tank',
            title: 'SACRED WATER TANK',
            desc: 'The surrounding courtyards and water bodies provide a serene environment for reflection, circumambulation, and communal celebration.'
          }
        ]
      },
      livingPlace: {
        heading: 'A LIVING PLACE',
        quote: '“Not simply a monument of the past, but a place where memory, ritual and devotion continue to meet.”',
        desc: 'As evening settles over the sacred complex, the gentle chime of bells and flickering oil lamps remind us that this heritage is alive and enduring.',
        img: getTempleImage(temple, index),
        caption: `${temple?.name || 'Temple'} · Sacred Atmosphere`
      }
    };
  };

  const dossier = getArchivalDossier(activeTemple, selectedTempleIndex);
  const story = getWalkthroughStory(activeTemple, selectedTempleIndex);

  return (
    <div className={`relative min-h-screen w-screen overflow-x-hidden ${stage === 'story' ? 'bg-[#0c0704] text-[#e8d7be]' : 'bg-[#0d0805] text-[#2a170d]'} font-manuscript select-none`}>
      
      {/* Dynamic Background: Parchment Map on Gate, Sandstone on Temples Archive */}
      {stage === 'gate' ? (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85"
            style={{ backgroundImage: `url('/assets/map_background.png')` }}
          />
          <div className="fixed inset-0 parchment-vignette pointer-events-none opacity-45" />
        </>
      ) : stage === 'temples-archive' ? (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90 transition-opacity duration-700"
            style={{ backgroundImage: `url('/assets/temples_sanctum_bg.jpg')` }}
          />
          {/* Subtle central warm golden haze */}
          <div className="fixed inset-0 bg-radial-[circle_at_50%_35%_rgba(201,164,90,0.14),transparent_70%] pointer-events-none" />
          {/* Deep dark architectural vignette around edges */}
          <div className="fixed inset-0 shadow-[inset_0_0_160px_rgba(10,5,3,0.95),inset_0_0_80px_rgba(10,5,3,0.98)] pointer-events-none" />
        </>
      ) : null}

      {/* Cinematic Golden Light Sweep Transition to Temples */}
      <AnimatePresence>
        {isTransitioningToTemples && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#0a0503]/85 flex items-center justify-center backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-1 bg-gradient-to-r from-transparent via-[#ffd27d] to-transparent shadow-[0_0_35px_#ffd27d]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Sacred Temple Entry Threshold Transition */}
      <AnimatePresence>
        {enteringTempleData && (
          <TempleEntryTransition
            key={`temple-transition-${enteringTempleData.temple?.id || enteringTempleData.index}`}
            temple={enteringTempleData.temple}
            onComplete={handleTempleTransitionComplete}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Folk Arts Entry Transition ("The Art Comes Alive") */}
      <AnimatePresence>
        {isEnteringFolkArts && (
          <FolkArtsEntryTransition
            onComplete={handleFolkArtsTransitionComplete}
          />
        )}
      </AnimatePresence>

      {/* ====================================================================
          TOP NAVIGATION CONTROLS FOR GATE & TEMPLES ARCHIVE
          (When in story mode, folk arts mode, or literature mode, each experience renders its own dedicated navigation)
          ==================================================================== */}
      {stage !== 'story' && stage !== 'folk-arts' && stage !== 'literature' && (
        <header className="fixed top-5 left-5 right-5 sm:left-8 sm:right-8 z-50 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            {stage === 'temples-archive' ? (
              <button
                onClick={handleBackToGate}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#c9a45a]/50 bg-[#140b07]/95 hover:bg-[#23120b] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:border-[#ffd27d] hover:shadow-[0_0_20px_rgba(201,164,90,0.45)]"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>← HARYANA HERITAGE</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onReturnToMap}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c5a059]/40 bg-[#160e08]/90 hover:bg-[#2b170c] text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Bhārata Varṣa Map</span>
                </button>

                <button
                  onClick={onReliveJourney}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#c5a059]/30 bg-[#160e08]/75 hover:bg-[#2b170c] text-[#c5a059] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-colors cursor-pointer backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                  title="Relive Journey"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Relive</span>
                </button>
              </>
            )}
          </div>

          {/* Right Heritage Pill Badge & Subtle Audio Control */}
          <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
            <AudioControl />
            {stage === 'temples-archive' ? (
              <div className="bg-[#140b07]/95 px-4 py-2 rounded-full border border-[#c9a45a]/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center gap-2 text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em]">
                <span className="text-[10px] text-[#ffd27d] animate-pulse">◉</span>
                <span>TEMPLES</span>
              </div>
            ) : (
              <div className="bg-[#140b07]/95 px-4 py-2 rounded-full border border-[#c9a45a]/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-[#c5a059]">
                  <img src="/assets/sacred_mandala.jpg" alt="Sanskriti" className="w-full h-full object-cover" />
                </div>
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#fff2d1]">
                  HARYANA
                </span>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Archival Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-10 inset-x-0 mx-auto w-max max-w-[90vw] z-50 px-6 py-3 rounded-full border border-[#8a5a36]/50 bg-[#1a0f08]/95 backdrop-blur-lg shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center gap-3 text-center"
          >
            <Compass className="w-4 h-4 text-[#d4af37] shrink-0 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-marcellus text-xs sm:text-sm text-[#fff4d0] tracking-wide">
              {toastMessage}
            </span>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-[#c5a059] hover:text-[#fff4d0] ml-2 text-xs cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          STAGE 1 & STAGE 2: HARYANA GATE VIEW (stage === 'gate')
          ==================================================================== */}
      {stage === 'gate' && (
        <main className="relative z-20 min-h-screen">
          
          {/* ------------------------------------------------------------------
              STAGE 1 — HARYANA CINEMATIC INTRO (0-100vh)
              100% PRESERVED & UNCHANGED:
              - Black/dark brown cinematic background
              - Large “HARYANA” title
              - Hindi “हरियाणा” text above it
              - “LAND OF FOLK TRADITIONS” subtitle
              - Existing particles/light effects
              - Existing circular/geometric background details
              - Existing cinematic animations
              ------------------------------------------------------------------ */}
          <section className="relative w-full h-screen overflow-hidden bg-[#0a0604] flex flex-col items-center justify-center text-center px-4">
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.14] mix-blend-screen"
              style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
            />

            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 50%, rgba(35, 20, 10, 0.4) 0%, rgba(10, 6, 4, 0.85) 65%, #0a0604 100%),
                  radial-gradient(circle at 20% 30%, rgba(184, 147, 82, 0.05) 0%, transparent 40%),
                  radial-gradient(circle at 80% 70%, rgba(138, 46, 34, 0.04) 0%, transparent 45%)
                `,
                boxShadow: 'inset 0 0 160px rgba(0,0,0,0.95), inset 0 0 60px rgba(0,0,0,0.98)'
              }}
            />

            {/* Faint Geometric / Astronomical Heritage Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16]" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#c5a059" strokeWidth="0.4" strokeDasharray="3,6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
              <circle cx="500" cy="400" r="280" fill="none" stroke="#c5a059" strokeWidth="0.6" strokeDasharray="6,4" />
              <circle cx="500" cy="400" r="260" fill="none" stroke="#8a5a36" strokeWidth="0.4" />
              <circle cx="500" cy="400" r="180" fill="none" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2,6" />
              <g transform="translate(500, 400)" className="origin-center" style={{ animation: 'spin 120s linear infinite' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1="0" y1="0" x2={175 * Math.cos((i * 30 * Math.PI) / 180)} y2={175 * Math.sin((i * 30 * Math.PI) / 180)} stroke="#c5a059" strokeWidth="0.5" strokeOpacity="0.7" />
                ))}
              </g>
              <path d="M 60,100 L 60,60 L 100,60" fill="none" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.5" />
              <path d="M 940,100 L 940,60 L 900,60" fill="none" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.5" />
              <path d="M 60,700 L 60,740 L 100,740" fill="none" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.5" />
              <path d="M 940,700 L 940,740 L 900,740" fill="none" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.5" />
            </svg>

            {/* Drifting Golden Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: p.left,
                    bottom: '-20px',
                    width: p.size,
                    height: p.size,
                    backgroundColor: '#ffd27d',
                    boxShadow: '0 0 6px rgba(255, 210, 125, 0.75)',
                    opacity: p.opacity,
                    animation: `antiqueDriftUp ${p.duration} linear infinite`,
                    animationDelay: p.delay,
                  }}
                />
              ))}
            </div>

            <LivingAtmosphereCanvas mousePos={{ x: 0, y: 0 }} progress={1} isArrival={true} />

            {/* Cinematic Typography Center */}
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9 }} 
                className="font-rozha text-base sm:text-xl text-[#c5a059] tracking-[0.25em] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none"
              >
                हरियाणा
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.94 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} 
                className="font-cinzel text-5xl sm:text-7xl lg:text-9xl font-bold tracking-[0.26em] text-[#f5ebd9] uppercase leading-none" 
                style={{ textShadow: '0 0 45px rgba(212, 175, 55, 0.28), 0 4px 15px rgba(0, 0, 0, 0.95), 0 1px 2px rgba(255, 245, 220, 0.3)' }}
              >
                HARYANA
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.9 }} 
                className="font-cinzel text-[10px] sm:text-xs tracking-[0.45em] text-[#c5a059] uppercase font-semibold mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
              >
                LAND OF FOLK TRADITIONS
              </motion.p>
            </div>

            {/* Scroll Down Cue */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: [0.4, 0.9, 0.4] }} 
              transition={{ delay: 1, duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} 
              onClick={() => {
                const el = document.getElementById('haryana-category-gate');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="absolute bottom-8 z-20 flex flex-col items-center gap-1.5 cursor-pointer text-[#c5a059]/80 hover:text-[#ffd27d] transition-colors"
            >
              <span className="font-marcellus text-[10px] tracking-[0.3em] uppercase">EXPLORE ARCHIVE</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0604] via-[#0a0604]/80 to-transparent pointer-events-none z-10" />
          </section>

          {/* ------------------------------------------------------------------
              STAGE 2 — ANTIQUE PARCHMENT HERITAGE NAVIGATION SECTION
              (Directly underneath the black Haryana hero)
              - Antique parchment/map aesthetic with subtle cartographic drawings
              - Top center: —— ❖ EXPLORE ARCHIVE ❖ ——
              - Full-width horizontal heartbeat / vital pulse waveform line
              - 5 Large living celestial halo icons (130–170px)
              - Subtle organic heartbeat breathing scale & glow pulse
              - Labels with delicate ornate diamond dividers underneath
              - Clicking TEMPLES navigates to the separate Temples Archive page
              ------------------------------------------------------------------ */}
          <section 
            id="haryana-category-gate" 
            className="relative z-20 min-h-[85vh] sm:min-h-screen py-28 sm:py-36 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Top Center Archival Preface */}
            <div className="flex items-center justify-center gap-3.5 sm:gap-4 mb-16 sm:mb-20 opacity-90 z-10 select-none">
              <span className="h-[1px] w-14 sm:w-28 lg:w-36 bg-gradient-to-r from-transparent via-[#d6a946] to-[#ffd27d] opacity-75 shadow-[0_0_4px_rgba(214,169,70,0.4)]" />
              <span className="text-[10px] sm:text-[12px] text-[#ffd27d] select-none filter drop-shadow-[0_0_4px_rgba(255,210,125,0.8)]">❖</span>
              <span className="font-cinzel text-base sm:text-lg lg:text-[23px] xl:text-[25px] font-semibold tracking-[0.22em] sm:tracking-[0.24em] text-[#fbf0d9] uppercase whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                EXPLORE ARCHIVE
              </span>
              <span className="text-[10px] sm:text-[12px] text-[#ffd27d] select-none filter drop-shadow-[0_0_4px_rgba(255,210,125,0.8)]">❖</span>
              <span className="h-[1px] w-14 sm:w-28 lg:w-36 bg-gradient-to-l from-transparent via-[#d6a946] to-[#ffd27d] opacity-75 shadow-[0_0_4px_rgba(214,169,70,0.4)]" />
            </div>

            {/* Central Navigation Container Spanning Viewport */}
            <div 
              className="relative w-full"
              style={{
                width: 'min(1560px, 95vw)',
                margin: '0 auto',
              }}
            >
              {/* Continuous Horizontal Golden Heartbeat / Pulse Waveform Line Passing Behind Icons */}
              <div className="absolute inset-x-0 top-[90px] sm:top-[98px] lg:top-[108px] xl:top-[115px] -translate-y-1/2 pointer-events-none z-0 opacity-75 heritage-energy-line">
                <svg 
                  className="w-full h-24 overflow-visible" 
                  viewBox="0 0 1400 80" 
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="heartbeatGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffd27d" stopOpacity="0" />
                      <stop offset="6%" stopColor="#d4af37" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#ffd27d" stopOpacity="0.95" />
                      <stop offset="94%" stopColor="#d4af37" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#ffd27d" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Continuous Horizontal Golden Waveform with decorative peaks between each icon */}
                  <path
                    d="M 0,40 L 80,40 L 140,40 L 210,40 L 225,40 L 235,32 L 245,48 L 255,34 L 265,46 L 275,40 L 420,40 L 490,40 L 505,40 L 515,32 L 525,48 L 535,34 L 545,46 L 555,40 L 700,40 L 770,40 L 785,40 L 795,32 L 805,48 L 815,34 L 825,46 L 835,40 L 980,40 L 1050,40 L 1065,40 L 1075,32 L 1085,48 L 1095,34 L 1105,46 L 1115,40 L 1260,40 L 1320,40 L 1400,40"
                    stroke="url(#heartbeatGoldGrad)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Small decorative golden diamonds in intervals between icons */}
                  <polygon points="250,23 246,28 250,33 254,28" fill="#ffd27d" opacity="0.95" />
                  <polygon points="530,23 526,28 530,33 534,28" fill="#ffd27d" opacity="0.95" />
                  <polygon points="810,23 806,28 810,33 814,28" fill="#ffd27d" opacity="0.95" />
                  <polygon points="1090,23 1086,28 1090,33 1094,28" fill="#ffd27d" opacity="0.95" />
                </svg>
              </div>

              {/* 5 Equal Categories Evenly Distributed Horizontally Across the Screen in One Row */}
              <div className="relative z-10 flex flex-nowrap items-center justify-between gap-x-4 sm:gap-x-8 lg:gap-x-12 w-full overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 px-2 sm:px-4">
                {navigationItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleCategoryItemClick(item.id, item.label)}
                    className="heritage-category-item group cursor-pointer flex flex-col items-center justify-center text-center select-none shrink-0 lg:shrink min-w-[170px] sm:min-w-[195px] lg:min-w-[215px]"
                  >
                    {/* Icon Container with Circular Golden Halo & Heartbeat Breathing Animation */}
                    <div className="relative flex items-center justify-center">
                      {/* Circular Antique Golden Halo Ring & Aura */}
                      <div className="heritage-halo-aura">
                        {/* Top Diamond Indicator at 12 o'clock */}
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] text-[#ffd27d] select-none filter drop-shadow-[0_0_4px_#ffd27d]">❖</span>
                        {/* Bottom Diamond Indicator at 6 o'clock */}
                        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[8px] text-[#ffd27d]/80 select-none filter drop-shadow-[0_0_3px_#ffd27d]">❖</span>
                        {/* Subtle sparkling golden particles */}
                        <span className="absolute top-[16%] right-[10%] w-1 h-1 rounded-full bg-[#ffd27d] shadow-[0_0_5px_#ffd27d] opacity-75" />
                        <span className="absolute bottom-[20%] left-[12%] w-1 h-1 rounded-full bg-[#ffd27d] shadow-[0_0_5px_#ffd27d] opacity-75" />
                      </div>

                      {/* Large SVG Icon (180–230px tall) with Continuous Breathing Pulse & Hover Enlargement */}
                      <div
                        style={{ animationDelay: `${index * 0.35}s` }}
                        className="heritage-icon-pulse relative w-[180px] h-[180px] sm:w-[195px] sm:h-[195px] lg:w-[215px] lg:h-[215px] xl:w-[230px] xl:h-[230px] flex items-center justify-center transition-all"
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Large Elegant High-Contrast Serif Category Label (Always on ONE line, never wraps) */}
                    <span 
                      className={`heritage-category-label mt-4 sm:mt-5 font-cinzel font-semibold text-xl sm:text-2xl lg:text-[26px] xl:text-[30px] text-[#fbf0d9] uppercase leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)] whitespace-nowrap transition-all duration-500 ${
                        item.id === 'folkArts' 
                          ? 'tracking-[0.14em] sm:tracking-[0.17em] lg:tracking-[0.19em]' 
                          : 'tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.24em]'
                      }`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {item.label}
                    </span>

                    {/* Decorative Underline with Center Diamond: ────── ◇ ────── */}
                    <div className="heritage-category-ornament flex items-center justify-center gap-2.5 sm:gap-3.5 mt-2.5 sm:mt-3 opacity-80 group-hover:opacity-100 transition-all duration-500">
                      <span className="h-[1px] w-10 sm:w-14 lg:w-18 bg-gradient-to-r from-transparent via-[#d6a946] to-[#ffd27d] shadow-[0_0_6px_rgba(214,169,70,0.5)]" />
                      <span className="text-[10px] sm:text-[12px] text-[#ffd27d] select-none filter drop-shadow-[0_0_5px_rgba(255,210,125,0.85)]">❖</span>
                      <span className="h-[1px] w-10 sm:w-14 lg:w-18 bg-gradient-to-l from-transparent via-[#d6a946] to-[#ffd27d] shadow-[0_0_6px_rgba(214,169,70,0.5)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          STAGE 3: SEPARATE TEMPLES ARCHIVE PAGE (/haryana/temples)
          Dedicated standalone page: Top nav ← HARYANA HERITAGE,
          Sacred museum exhibition: Hero, 01 Featured Temple, Alternating Collection
          ==================================================================== */}
      {stage === 'temples-archive' && (
        <main className="relative z-20 min-h-screen pt-28 sm:pt-36 pb-40 px-4 sm:px-8 max-w-7xl mx-auto text-[#f1dfc0]">
          
          {/* =================================================================
              1. CINEMATIC EXHIBITION HERO
              ================================================================= */}
          <section className="text-center max-w-3xl mx-auto mb-20 sm:mb-28 pt-4 sm:pt-8">
            {/* Eyebrow */}
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-cinzel text-xs sm:text-sm tracking-[0.45em] text-[#c9a45a] uppercase font-bold block mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            >
              SACRED HERITAGE
            </motion.span>

            {/* Main Museum Exhibition Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.16em] text-[#fbf0d9] uppercase leading-[1.08] drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_3px_rgba(0,0,0,1)]"
            >
              SACRED<br/>
              ARCHITECTURE<br/>
              <span className="bg-gradient-to-r from-[#ffd27d] via-[#f1dfc0] to-[#c9a45a] bg-clip-text text-transparent">OF HARYANA</span>
            </motion.h1>

            {/* Short Elegant Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cinzel text-sm sm:text-base lg:text-[17px] text-[#e0cbb2] leading-relaxed max-w-2xl mx-auto mt-6 font-normal tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
            >
              “Across Kurukshetra, Thanesar, Panchkula and the ancient lands of Haryana, sacred architecture preserves stories of devotion, dynasties, legends and living traditions.”
            </motion.p>

            {/* Subtle Ornamental Divider */}
            <div className="flex items-center justify-center gap-3.5 mt-8 opacity-80">
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#c9a45a] to-[#ffd27d]" />
              <span className="text-[10px] text-[#ffd27d] select-none filter drop-shadow-[0_0_4px_rgba(255,210,125,0.8)]">❖</span>
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#c9a45a] to-[#ffd27d]" />
            </div>
          </section>

          {/* =================================================================
              2. HERO VISUAL & FEATURED TEMPLE (01 STHANESHWAR MAHADEV)
              Sophisticated overlapping editorial layout, wide cinematic crop,
              ornamental corner brackets, warm lighting, deep shadows
              ================================================================= */}
          <section className="mb-36 sm:mb-44 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative rounded-[2px] overflow-hidden border border-[#c9a45a]/35 bg-[#1a0f08] shadow-[0_25px_60px_rgba(10,5,3,0.85)] group cursor-pointer"
              onClick={() => handleOpenTempleStory(0)}
            >
              {/* Wide Cinematic Crop Image with Slow Hover Parallax/Zoom */}
              <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden">
                <img 
                  src="/assets/sthaneshwar_temple_hero.jpg" 
                  alt="Sthaneshwar Mahadev Temple" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-95 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-[#140b07]/45 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#140b07]/80 via-transparent to-[#140b07]/35 pointer-events-none" />

                {/* Four Classical Corner Ornaments */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#ffd27d]/70 pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#ffd27d]/70 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#ffd27d]/70 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#ffd27d]/70 pointer-events-none" />
              </div>

              {/* Overlapping Editorial Content Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pointer-events-none">
                <div className="max-w-2xl">
                  {/* Large Subtle 01 Number & Period */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-cinzel text-3xl sm:text-5xl font-bold text-[#8e4932] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      01
                    </span>
                    <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#ffd27d] uppercase px-3 py-1 bg-[#160c07]/90 border border-[#c9a45a]/50 backdrop-blur-md">
                      FEATURED SANCTUM
                    </span>
                  </div>

                  {/* Temple Title */}
                  <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-[#fbf0d9] tracking-[0.12em] uppercase leading-tight group-hover:text-[#ffd27d] transition-colors duration-400 drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
                    STHANESHWAR MAHADEV TEMPLE
                  </h2>

                  {/* Location */}
                  <p className="font-cinzel text-xs sm:text-sm text-[#c9a45a] tracking-[0.2em] uppercase mt-2.5 mb-3.5 flex items-center gap-2 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    <span>❖</span>
                    <span>THANESAR, KURUKSHETRA</span>
                  </p>

                  {/* Narrative Description */}
                  <p className="font-manuscript text-sm sm:text-base text-[#e8d5bf] leading-relaxed max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    “Where the Pandavas prayed to Lord Shiva for victory in the Mahabharata war. Its sacred water tank is believed to hold purifying waters blessed by Sage Dadhichi.”
                  </p>
                </div>

                {/* Explore Story CTA */}
                <div className="pointer-events-auto">
                  <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#c9a45a]/60 bg-[#160b07]/90 group-hover:bg-[#2e1509] group-hover:border-[#ffd27d] text-[#ffd27d] text-xs font-cinzel font-bold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    <span>EXPLORE STORY</span>
                    <ArrowRight className="w-4 h-4 text-[#ffd27d] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* =================================================================
              3. THE SACRED COLLECTION (ALTERNATING EDITORIAL SECTIONS)
              Rhythm: 01, 02, 03, 04, 05, 06 alternating left/right
              ================================================================= */}
          <section>
            {/* Section Curatorial Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
              <span className="font-cinzel text-xs tracking-[0.4em] text-[#c9a45a] uppercase font-bold block mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                THE SACRED COLLECTION
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fbf0d9] tracking-[0.14em] uppercase leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                TEMPLES OF HARYANA
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3 opacity-60">
                <span className="h-[1px] w-12 bg-[#c9a45a]" />
                <span className="text-[8px] text-[#ffd27d]">❖</span>
                <span className="h-[1px] w-12 bg-[#c9a45a]" />
              </div>
              <p className="font-manuscript text-sm sm:text-base text-[#d9c4aa] italic mt-4 max-w-xl mx-auto">
                “Explore the architectural, spiritual and historical landmarks preserved across the state.”
              </p>
            </div>

            {/* Alternating Editorial Sections */}
            <div className="space-y-32 sm:space-y-40">
              {templesList.map((temple, idx) => {
                const isEven = idx % 2 === 0;
                const entryNum = String(idx + 1).padStart(2, '0');
                const templeImage = getTempleImage(temple, idx);

                return (
                  <motion.article
                    key={temple.id || idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8 }}
                    className="group relative"
                  >
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 sm:gap-14 lg:gap-16`}>
                      
                      {/* Large Architectural Photograph with Frame & Corners */}
                      <div 
                        onClick={() => handleOpenTempleStory(idx)}
                        className="w-full lg:w-[54%] h-72 sm:h-96 lg:h-[420px] relative overflow-hidden rounded-[2px] shadow-[0_20px_50px_rgba(10,5,3,0.7)] border border-[#c9a45a]/35 bg-[#1b0f08] shrink-0 cursor-pointer group/img"
                      >
                        <img 
                          src={templeImage} 
                          alt={temple.name} 
                          className="w-full h-full object-cover group-hover/img:scale-106 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-95 group-hover/img:brightness-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#140b07]/80 via-[#140b07]/20 to-transparent pointer-events-none" />

                        {/* Four Corner Ornaments */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#ffd27d]/60 pointer-events-none" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#ffd27d]/60 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#ffd27d]/60 pointer-events-none" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#ffd27d]/60 pointer-events-none" />

                        {/* Period Tag */}
                        <div className="absolute top-4 left-4">
                          <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.24em] text-[#fff4d0] uppercase px-3 py-1 bg-[#120a06]/90 border border-[#c9a45a]/50 backdrop-blur-md">
                            {temple.atAGlance?.period?.split('(')[0] || 'Historical Landmark'}
                          </span>
                        </div>
                      </div>

                      {/* Editorial Text Column */}
                      <div className="w-full lg:w-[46%] flex flex-col justify-center">
                        {/* Large Subtle Chapter Number */}
                        <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#8e4932] group-hover:text-[#c9a45a] transition-colors duration-400 block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {entryNum}
                        </span>

                        {/* Temple Name */}
                        <h3 
                          onClick={() => handleOpenTempleStory(idx)}
                          className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fbf0d9] tracking-[0.10em] leading-tight cursor-pointer group-hover:text-[#ffd27d] transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] uppercase"
                        >
                          {temple.name}
                        </h3>

                        {/* Location */}
                        <p className="font-cinzel text-xs sm:text-sm text-[#c9a45a] tracking-[0.2em] uppercase mt-2.5 mb-4 flex items-center gap-2 font-semibold">
                          <span>❖</span>
                          <span>{temple.location}</span>
                        </p>

                        {/* Description */}
                        <p className="font-manuscript text-sm sm:text-base text-[#e8d5bf] leading-relaxed mb-6 font-normal">
                          {temple.desc}
                        </p>

                        {/* CTA */}
                        <div className="pt-2">
                          <button
                            onClick={() => handleOpenTempleStory(idx)}
                            className="inline-flex items-center gap-2.5 text-xs font-cinzel font-bold text-[#ffd27d] tracking-[0.22em] uppercase transition-all cursor-pointer hover:text-[#fff0d0] group-hover:translate-x-1.5 duration-300"
                          >
                            <span>EXPLORE STORY</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#c9a45a] group-hover:text-[#ffd27d]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Ornate divider between entries */}
                    {idx < templesList.length - 1 && (
                      <div className="mt-28 sm:mt-36 flex items-center justify-center gap-4 opacity-40">
                        <span className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#c9a45a] to-transparent" />
                        <span className="text-[7px] text-[#c9a45a]">❖</span>
                        <span className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent via-[#c9a45a] to-transparent" />
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* Bottom Return Button Bar */}
          <div className="mt-32 sm:mt-40 text-center">
            <button
              onClick={handleBackToGate}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#c9a45a]/50 bg-[#160c07]/95 hover:bg-[#2c150b] text-[#ffd27d] text-xs font-cinzel font-bold tracking-[0.24em] transition-all cursor-pointer shadow-[0_6px_30px_rgba(0,0,0,0.85)] hover:border-[#ffd27d] hover:shadow-[0_0_25px_rgba(201,164,90,0.5)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO HARYANA HERITAGE</span>
            </button>
          </div>
        </main>
      )}

      {/* ====================================================================
          STAGE 4: IMMERSIVE MULTI-CHAMBER TEMPLE EXPERIENCE
          (Walkthrough -> Explore More 10 Chapters & Evidence -> Research Archive)
          ==================================================================== */}
      {stage === 'story' && (
        <SthaneshwarTempleExperience
          temple={activeTemple}
          onBackToArchive={handleBackToTemplesArchive}
          onExploreAnotherTemple={() => {
            const next = (selectedTempleIndex + 1) % templesList.length;
            handleOpenTempleStory(next);
          }}
        />
      )}

      {/* ====================================================================
          STAGE 5: IMMERSIVE FOLK ARTS OF HARYANA EXPERIENCE
          (The Living Canvas • Cultural Journey • Art Forms • Artisans • Festivals)
          ==================================================================== */}
      {stage === 'folk-arts' && (
        <FolkArtsExperience
          onBackToGate={handleBackToGate}
          onOpenLiterature={handleOpenLiterature}
        />
      )}

      {/* Cinematic Handcrafted Manuscript Entry Transition into Literature */}
      <LiteratureEntryTransition
        isActive={isEnteringLiterature}
        onComplete={handleLiteratureTransitionComplete}
      />

      {/* ====================================================================
          STAGE 6: IMMERSIVE LITERATURE OF HARYANA ARCHIVE
          (The Living Word • The Literary River • Oral Recitation • Voices • Epics • The Archive)
          ==================================================================== */}
      {stage === 'literature' && (
        <HaryanaLiteratureExperience
          onBackToGate={handleBackToGate}
          onNavigateToFolkArts={() => {
            setStage('folk-arts');
            window.history.pushState(null, '', '/haryana/folk-arts/journey');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onNavigateToArtisans={() => {
            setStage('folk-arts');
            window.history.pushState(null, '', '/haryana/folk-arts/artisans');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* ====================================================================
          STAGE 7: IMMERSIVE SCRIPTURES OF HARYANA ARCHIVE
          (The Sacred Word • The Knowledge River • Open Manuscript • Explorer • Verses • The Chamber)
          ==================================================================== */}
      {stage === 'scriptures' && (
        <HaryanaScripturesExperience
          onBackToGate={handleBackToGate}
          onNavigateToLiterature={handleOpenLiterature}
          onNavigateToTemples={handleOpenTemplesArchive}
        />
      )}

    </div>
  );
}
