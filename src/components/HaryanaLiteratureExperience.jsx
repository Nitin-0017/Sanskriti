import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Play, 
  Pause, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Feather,
  BookOpen,
  Scroll
} from 'lucide-react';
import { 
  LITERARY_EPOCHS, 
  VOICES_OF_HARYANA, 
  SCRIPT_VERSE_SPECIMEN, 
  ORAL_EPIC_JOURNEY, 
  ARCHIVAL_SPECIMENS 
} from '../data/literatureData';
import oralRecitationAudio from '../services/oralRecitationAudio';

// ============================================================================
// STAGE DEFINITIONS FOR THE UNIFIED LITERARY RIVER
// ============================================================================
// STAGE DEFINITIONS FOR THE UNIFIED LITERARY RIVER
// ============================================================================
const RIVER_STAGES = [
  {
    id: 'oral',
    num: '01',
    title: 'ORAL TRADITION',
    subtitle: 'BEFORE WORDS WERE WRITTEN',
    short: 'ORAL TRADITION',
    era: 'Pre-Print Antiquity',
    timeBadge: ['PRE-PRINT ANTIQUITY', 'BEFORE WRITING', 'ORAL MEMORY'],
    historicalDescription:
      'Before literature touched paper or ink was ground, the village chaupal and sacred groves served as the living archives of Haryana. In this pre-literate antiquity, verse was preserved not in library vaults, but within the disciplined human breath, sustained across centuries through rigorous mnemonic meter.',
    howItLived:
      'Preserved in agricultural work-chants, cowherd calls (gwal geet), and all-night community chaupal assemblies where elders recited memorized genealogical lore.',
    howItTravelled:
      'Carried on foot by wandering Jogis, Mirasis, and folk bards across dusty bullock tracks between Sonipat, Rohtak, and the Thar desert borderlands.',
    importantForms: ['Chaupāl Bait', 'Ragini Metre', 'Kissa Recital', 'Alha Dhoha', 'Gwal Geet'],
    learned: 'Before literature touched paper, the village chaupal served as the living library of Haryana.',
    nextIntro: 'Spoken verses begin to take written form in medieval verses and mystic folios.'
  },
  {
    id: 'medieval',
    num: '02',
    title: 'MEDIEVAL VERSE',
    subtitle: 'SOUND BECOMES INK',
    short: 'MEDIEVAL VERSE',
    era: '11th – 15th Century CE',
    timeBadge: ['11TH – 15TH CENTURY', 'BIRCH BARK & PALM', 'VERSED FOLIOS'],
    historicalDescription:
      'As monastic settlements and Sufi-Bhakti centers took root across northern India, the spoken Haryanvi vernacular made its decisive leap from fleeting air to permanent ink. Wandering Nath yogis and early saint-poets discarded courtly Sanskrit to record spiritual defiance directly in the everyday peasant idiom.',
    howItLived:
      'Inscribed with reeds (kalam) and lampblack ink on birch bark (bhurjapatra) and palm folios, carefully bundled with red silk cords inside temple takhts.',
    howItTravelled:
      'Passed between disciple lineages (gurushishya parampara) and sung at annual pilgrim fairs (melas) in Kurukshetra, Pehowa, and Agroha.',
    importantForms: ['Gorakh Sabad', 'Nirguna Pada', 'Bhurjapatra Pothi', 'Sakhi Verses'],
    learned: 'Vernacular spoken verses crystallized into palm-leaf and birch-bark manuscripts.',
    nextIntro: 'Meet the poets and saints who carried these words through generations.'
  },
  {
    id: 'devotional',
    num: '03',
    title: 'DEVOTIONAL VOICES',
    subtitle: 'THE LIVING MESSENGERS',
    short: 'DEVOTIONAL VOICES',
    era: '15th – 17th Century CE',
    timeBadge: ['15TH – 17TH CENTURY', 'BHAKTI AWAKENING', 'LIVING MASTERS'],
    historicalDescription:
      'Literature cannot endure through parchment alone; it demands living human custodians. During the Bhakti awakening, mystic teachers like Sant Garibdas of Chhudani and Dayal Das elevated local spoken dialect into soaring spiritual philosophy, fearlessly condemning social divisions.',
    howItLived:
      'Practiced through daily community satsangs, dawn bhajans, and memorized granths copied by hand by village scribes in small mud ashrams.',
    howItTravelled:
      'Carried along riverbanks and trade caravans by wandering mendicants, their single-stringed ektaras echoing through rustic hamlets.',
    importantForms: ['Satnami Vani', 'Chhudani Granth', 'Bhajan Chaupai', 'Nath Pada'],
    learned: 'Custodians transformed daily dialect into high devotional philosophy.',
    nextIntro: 'These single couplets expand into monumental heroic community sagas.'
  },
  {
    id: 'epics',
    num: '04',
    title: 'FOLK EPICS',
    subtitle: 'STORIES WITHOUT BOUNDS',
    short: 'FOLK EPICS',
    era: '17th – 19th Century CE',
    timeBadge: ['17TH – 19TH CENTURY', 'HEROIC CYCLES', 'OPEN-AIR SAANG'],
    historicalDescription:
      'When dusk fell over the agrarian plains, the open-air wooden takht was raised for the Saang. Monumental folk epics like Alha-Udal, Raja Harishchandra, and Sorath were performed across eighteen sleepless nights without scripts or teleprompters, powered entirely by vocal endurance.',
    howItLived:
      'Enacted on elevated wooden platforms (takht) lit by mustard-oil torches (mashaals), surrounded by thousands of village listeners beneath starlit skies.',
    howItTravelled:
      'Troupe leaders (mandalis) travelled by bullock cart from village to village during winter months, welcomed by village headmen as honoured cultural guests.',
    importantForms: ['Saang Theatrical Ballad', 'Alha Metric Recital', 'Sorath Cycle', 'Kissa'],
    learned: 'All-night operatic performances traveled across sands without any printed books.',
    nextIntro: 'The arrival of the printing press transitions oral memory into ink and paper.'
  },
  {
    id: 'print',
    num: '05',
    title: 'PRINT CULTURE',
    subtitle: 'WORDS ENTER THE PRESS',
    short: 'PRINT CULTURE',
    era: 'Late 19th – Early 20th C.',
    timeBadge: ['LATE 19TH CENTURY', 'LITHOGRAPHY PRESS', 'VERNACULAR TYPE'],
    historicalDescription:
      'The arrival of lithographic presses and lead movable type in Rohtak, Ambala, and Delhi revolutionized Haryana’s literary landscape. Spoken epics and devotional vanis were transcribed into pocket chapbooks (kisse), making literature affordable to the plowman and merchant alike.',
    howItLived:
      'Printed on coarse yellowed pulp paper, sold for two paise at village haats and railway stations, and read aloud to illiterate gatherings by lantern light.',
    howItTravelled:
      'Distributed through itinerant railway book-vendors, weekly bazaars, and early vernacular circulating libraries in town centers.',
    importantForms: ['Litho Chapbooks (Qissa)', 'Devanagari Leaflets', 'Kaithi Commercial Ledgers', 'Mahajani Notes'],
    learned: 'Lithographic stones and movable type democratized vernacular literature.',
    nextIntro: 'Traditional folk metres meet modern social consciousness and agrarian identity.'
  },
  {
    id: 'modern',
    num: '06',
    title: 'MODERN VOICES',
    subtitle: 'AGRARIAN CONSCIOUSNESS',
    short: 'MODERN VOICES',
    era: '20th Century – Present',
    timeBadge: ['20TH CENTURY – NOW', 'RADIO & PRINT', 'LIVING IDENTITY'],
    historicalDescription:
      'In the 20th century, Pandit Lakhmi Chand, Pandit Mange Ram, and Dayachand Mayna transformed traditional meters into instruments of social critique, anti-colonial pride, and philosophical inquiry. The voice of Haryana entered All India Radio broadcasts and modern print editions without losing its earthy wit.',
    howItLived:
      'Broadcast through early valve radios in village squares, recorded on 78 RPM shellac gramophone records, and published in literary anthologies.',
    howItTravelled:
      'Through radio waves across northern India, cassette culture in agrarian tractor stereos, and university research archives.',
    importantForms: ['Modern Ragini', 'Agrarian Satire', 'Radio Opera', 'Patriotic Songs'],
    learned: 'The living spirit of Haryana literature endures in modern agrarian expression.',
    nextIntro: 'Enter the final destination: the physical archive where these works survived.'
  },
  {
    id: 'archive',
    num: '07',
    title: 'THE ARCHIVE',
    subtitle: 'THE PRESERVED SANCTUARY',
    short: 'THE ARCHIVE',
    era: 'Physical Preservation',
    timeBadge: ['ARCHIVAL REPOSITORY', 'PALM & SHELLAC', 'IMMORTAL WORD'],
    historicalDescription:
      'Here the literary river arrives at its sanctuary. Recovered from subterranean monastic chests, crumbling village havelis, and early provincial presses, these rare folios, manuscripts, and shellac recordings are catalogued and digitized for the generations yet to come.',
    howItLived:
      'Preserved in temperature-controlled archive boxes, wrapped in neem-treated red cloth, and digitized at high resolution for public scholarship.',
    howItTravelled:
      'Rescued from village dust by cultural historians, scholars, and institutional custodians across Haryana and national libraries.',
    importantForms: ['Rare Palm-Leaf Pothis', 'Lithographic First Editions', 'Gramophone Shellac', 'Restored Saang Ledgers'],
    learned: 'Rare folios, shellac discs, and stone chapbooks preserved across centuries.',
    nextIntro: 'The living word continues into the future.'
  },
];

// ============================================================================
// ARCHIVAL ARTIFACT / SYMBOL FOR EACH LITERARY STAGE
// Monochromatic antique-gold and sepia vector symbols replacing generic circles
// ============================================================================
function ArchivalEraSymbol({ stageId, isActive, isCompleted }) {
  const strokeColor = isActive ? '#ffd27d' : isCompleted ? '#c5a059' : '#8c6d3d';
  const fillColor = isActive ? 'rgba(255, 210, 125, 0.22)' : isCompleted ? 'rgba(197, 160, 89, 0.12)' : 'rgba(140, 109, 61, 0.08)';

  switch (stageId) {
    case 'oral':
      // 01 Oral Tradition: Storyteller / Chaupāl-inspired silhouette
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Chaupāl takht platform */}
          <path d="M 6,34 L 38,34 M 10,34 L 8,39 M 34,34 L 36,39" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round" />
          {/* Chaupal tree canopy arc */}
          <path d="M 8,14 C 12,6 32,6 36,14" stroke={strokeColor} strokeWidth="0.9" strokeDasharray="2 2" opacity="0.6" />
          {/* Storyteller pagri/head */}
          <circle cx="20" cy="16" r="3.6" stroke={strokeColor} strokeWidth="1.3" fill={fillColor} />
          <path d="M 17,15.5 C 19,13 22,13 24,15.5" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          {/* Torso seated in chaupal cross-legged */}
          <path d="M 20,20 C 15,22 13,27 12,33 L 30,33 C 29,27 26,22 20,20 Z" stroke={strokeColor} strokeWidth="1.3" fill={fillColor} />
          {/* Expressive recitation hand gesture */}
          <path d="M 22,23 C 27,21 29,17 31,14" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="31" cy="14" r="1.2" fill={strokeColor} />
          {/* Oral sound / breath ripples */}
          <path d="M 33,11 C 36,13 37,16 35,19" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'medieval':
      // 02 Medieval Verse: Manuscript leaf / handwritten verse
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Horizontal pothi leaf folio */}
          <rect x="6" y="14" width="32" height="16" rx="2" stroke={strokeColor} strokeWidth="1.4" fill={fillColor} />
          {/* Traditional pothi string hole */}
          <circle cx="14" cy="22" r="2" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          {/* Trailing red/gold binding string */}
          <path d="M 14,24 C 13,29 9,30 6,32" stroke={strokeColor} strokeWidth="1.1" strokeLinecap="round" />
          {/* Handwritten Devanagari calligraphy verse lines */}
          <path d="M 19,18 L 33,18 M 19,22 L 33,22 M 9,26 L 33,26" stroke={strokeColor} strokeWidth="1.1" strokeLinecap="round" strokeDasharray="3 1.5" />
          {/* Kalam reed pen tip hovering */}
          <path d="M 33,10 L 30,13 L 28,15 L 29,16 L 32,14 Z" stroke={strokeColor} strokeWidth="1.1" fill={fillColor} />
        </svg>
      );

    case 'devotional':
      // 03 Devotional Voices: Small ektara / devotional manuscript symbol
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Bamboo neck */}
          <line x1="31" y1="8" x2="15" y2="30" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />
          {/* Headstock & tuning peg */}
          <line x1="28" y1="6" x2="34" y2="10" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="33" cy="9" r="1.5" fill={strokeColor} />
          {/* Resonator gourd (tumba) */}
          <circle cx="14" cy="31" r="6.5" stroke={strokeColor} strokeWidth="1.4" fill={fillColor} />
          {/* Diaphragm sound ring */}
          <circle cx="14" cy="31" r="3.8" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 1.5" />
          {/* Single plucked bronze wire */}
          <line x1="29.5" y1="9" x2="14" y2="31" stroke={strokeColor} strokeWidth="0.9" opacity="0.85" />
          {/* Devotional resonance ripples */}
          <path d="M 23,17 C 26,16 28,18 27,21" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <path d="M 26,14 C 30,13 33,17 31,22" stroke={strokeColor} strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 1.5" />
        </svg>
      );

    case 'epics':
      // 04 Folk Epics: Horse / bardic storytelling silhouette
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Heroic steed silhouette */}
          <path d="M 13,34 C 14,27 17,21 20,18 C 19,15 18,12 20,9 C 22,8 24,9 26,12 C 28,11 31,12 32,14 C 33,17 31,19 28,20 C 28,24 31,29 32,34" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round" fill={fillColor} />
          {/* Bridle & reins */}
          <path d="M 27,15 L 22,23 M 22,23 L 15,26" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          {/* Flowing mane */}
          <path d="M 20,13 L 17,16 M 21,17 L 18,20 M 22,21 L 19,25" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          {/* Bardic epic lance / battle standard behind */}
          <line x1="10" y1="8" x2="28" y2="36" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 10,8 L 17,11 L 11,15 Z" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
        </svg>
      );

    case 'print':
      // 05 Print Culture: Antique printing block / early printed page
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Carved wooden block isometric body */}
          <rect x="9" y="13" width="22" height="20" rx="2" stroke={strokeColor} strokeWidth="1.4" fill={fillColor} />
          <path d="M 9,13 L 14,8 L 35,8 L 31,13 M 35,8 L 35,26 L 31,31" stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" fill="none" />
          {/* Carved Devanagari character 'क' in mirror image (type block) */}
          <path d="M 14,19 L 26,19 M 20,16 L 20,27 M 16,22 Q 20,20 20,24 Q 20,28 16,26" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="24.5" cy="24.5" r="1.5" stroke={strokeColor} strokeWidth="1" />
          {/* Movable type corner registration pins */}
          <circle cx="11.5" cy="15.5" r="0.8" fill={strokeColor} />
          <circle cx="28.5" cy="30.5" r="0.8" fill={strokeColor} />
        </svg>
      );

    case 'modern':
      // 06 Modern Voices: Fountain pen / typewritten page
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Fountain pen barrel & golden nib */}
          <path d="M 31,8 L 35,12 L 22,25 L 17,26 L 18,21 Z" stroke={strokeColor} strokeWidth="1.4" fill={fillColor} strokeLinejoin="round" />
          {/* Nib split line & breather hole */}
          <line x1="17" y1="26" x2="23" y2="20" stroke={strokeColor} strokeWidth="1.1" />
          <circle cx="22" cy="21" r="1" fill={strokeColor} />
          {/* Grip section ring */}
          <line x1="27" y1="12" x2="31" y2="16" stroke={strokeColor} strokeWidth="1.3" />
          {/* Ink flourish & cursive writing stroke */}
          <path d="M 16,28 C 14,31 10,29 8,31 C 6,33 11,35 16,33" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" fill="none" />
          {/* Ink drop */}
          <circle cx="10" cy="25" r="1.2" fill={strokeColor} />
        </svg>
      );

    case 'archive':
      // 07 The Archive: Stacked manuscripts / archival box
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 transition-transform duration-500" fill="none">
          {/* Archival wooden storage chest */}
          <rect x="7" y="21" width="30" height="15" rx="2" stroke={strokeColor} strokeWidth="1.4" fill={fillColor} />
          <path d="M 7,26 L 37,26 M 22,26 L 22,30 M 19,30 L 25,30 L 25,33 L 19,33 Z" stroke={strokeColor} strokeWidth="1.2" />
          {/* Brass corner brackets */}
          <path d="M 10,21 L 10,24 M 34,21 L 34,24 M 10,36 L 10,33 M 34,36 L 34,33" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />
          {/* Stacked manuscript bundle on top */}
          <rect x="11" y="15" width="22" height="5" rx="1" stroke={strokeColor} strokeWidth="1.2" fill={fillColor} />
          <rect x="13" y="10" width="18" height="4.5" rx="1" stroke={strokeColor} strokeWidth="1.1" fill={fillColor} />
          {/* Tied silk cord binding */}
          <line x1="22" y1="10" x2="22" y2="20" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );

    default:
      return null;
  }
}

// Ornate Indian Folk Peacock / Bird Motif for Footer
function IndianFolkBirdMotif({ className = "", flip = false }) {
  return (
    <svg 
      className={`w-14 h-14 text-[#c5a059]/40 select-none pointer-events-none transition-opacity duration-500 hover:opacity-80 ${className}`} 
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
    >
      <path d="M18 42 C16 34, 20 26, 28 24 C34 22, 40 26, 42 32 C44 38, 40 46, 32 48 C24 50, 18 46, 18 42 Z" fill="rgba(197, 160, 89, 0.08)" />
      <circle cx="26" cy="22" r="3.5" fill="rgba(255, 210, 125, 0.2)" />
      <path d="M23 21 L18 19 L22 23" strokeLinecap="round" />
      <path d="M26 18 L26 14 M28 18 L30 15 M24 18 L22 15" strokeLinecap="round" />
      <path d="M40 30 C48 24, 54 28, 56 36 C58 44, 48 46, 42 44" strokeDasharray="2 1.5" />
      <path d="M38 34 C44 32, 50 36, 50 42" strokeDasharray="2 1.5" />
      <path d="M12 50 C24 48, 42 48, 54 50" strokeLinecap="round" />
    </svg>
  );
}

// ============================================================================
// ASYMMETRIC EDITORIAL STAGE REVEAL COMPONENT
// Renders the vertical TIME / ERA flow spine + curatorial columns + artifact
// ============================================================================
function EditorialStageReveal({ stage, children, onAdvance, nextStageTitle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* 8. Vertical TIME / ERA Label beside active stage */}
      <div className="lg:col-span-2 hidden lg:flex flex-col items-center py-6 px-3 border-r border-[#c5a059]/25 text-center sticky top-52 select-none">
        <div className="space-y-3 w-full">
          <div className="px-2.5 py-1.5 rounded-lg bg-[#1c0e07] border border-[#c5a059]/35 shadow-inner">
            <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-[0.22em] uppercase font-bold block">
              {stage.timeBadge[0]}
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-1 text-[#c5a059]">
            <span className="w-[1px] h-3.5 bg-[#c5a059]/40" />
            <span className="text-xs leading-none">↓</span>
            <span className="w-[1px] h-3.5 bg-[#c5a059]/40" />
          </div>

          <div className="px-2.5 py-1.5 rounded-lg bg-[#160b06] border border-[#c5a059]/25">
            <span className="text-[9px] font-cinzel text-[#f5e9d2]/85 tracking-[0.18em] uppercase block">
              {stage.timeBadge[1]}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-[#c5a059]">
            <span className="w-[1px] h-3.5 bg-[#c5a059]/40" />
            <span className="text-xs leading-none">↓</span>
            <span className="w-[1px] h-3.5 bg-[#c5a059]/40" />
          </div>

          <div className="px-2.5 py-1.5 rounded-lg bg-[#241309] border border-[#ffd27d]/40 shadow-[0_0_15px_rgba(255,210,125,0.18)]">
            <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-[0.22em] uppercase font-bold block">
              {stage.timeBadge[2]}
            </span>
          </div>
        </div>

        <div className="w-[1px] h-24 bg-gradient-to-b from-[#ffd27d]/50 via-[#c5a059]/20 to-transparent mt-6" />
        
        <span className="text-[8px] font-cinzel text-[#c5a059]/70 uppercase tracking-[0.35em] rotate-90 mt-12 whitespace-nowrap">
          ARCHIVAL HORIZON
        </span>
      </div>

      {/* 7. Asymmetric Editorial Stage Reveal Content */}
      <div className="lg:col-span-10 space-y-8">
        
        {/* Stage Header */}
        <div className="border-l-4 border-[#ffd27d] pl-6 py-2 space-y-2">
          {/* Mobile Time Badge */}
          <div className="lg:hidden flex items-center gap-2 text-[9px] font-cinzel text-[#ffd27d] tracking-widest uppercase mb-1">
            <span>{stage.timeBadge[0]}</span>
            <span className="text-[#c5a059]">↓</span>
            <span>{stage.timeBadge[2]}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
              STAGE {stage.num}
            </span>
            <span className="text-xs text-[#c5a059]">·</span>
            <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.25em] uppercase font-semibold">
              {stage.subtitle}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#fff0d0] font-normal uppercase tracking-wide">
            {stage.title}
          </h2>

          <p className="font-cormorant italic text-2xl text-[#ffd27d]">
            “{stage.learned}”
          </p>
        </div>

        {/* Asymmetric Curatorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Historical Description Column */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#150904]/90 border border-[#c5a059]/35 shadow-[0_15px_45px_rgba(0,0,0,0.85)] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
                HISTORICAL CONTEXT
              </span>
              <p className="font-cormorant text-xl sm:text-2xl text-[#f5e9d2] leading-relaxed">
                {stage.historicalDescription}
              </p>
            </div>

            {/* Important Forms & Traditions */}
            <div className="pt-4 border-t border-[#c5a059]/25 space-y-2">
              <span className="text-[9px] font-cinzel text-[#ffd27d] tracking-widest uppercase block font-semibold">
                IMPORTANT FORMS & TRADITIONS:
              </span>
              <div className="flex flex-wrap gap-2">
                {stage.importantForms.map((form, fIdx) => (
                  <span 
                    key={fIdx}
                    className="px-3 py-1 rounded-full bg-[#201008] border border-[#c5a059]/35 text-[10px] font-cinzel text-[#f5e9d2] tracking-wider uppercase"
                  >
                    {form}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* How It Lived & How It Travelled Cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            
            <div className="p-5 rounded-2xl bg-[#1b0e08]/90 border border-[#c5a059]/35 shadow-lg space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
                <span className="text-[10px] font-cinzel text-[#ffd27d] tracking-[0.25em] uppercase font-bold">
                  HOW IT LIVED
                </span>
              </div>
              <p className="font-cormorant text-lg text-[#e8d8b8] leading-relaxed">
                {stage.howItLived}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1b0e08]/90 border border-[#c5a059]/35 shadow-lg space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span className="text-[10px] font-cinzel text-[#c5a059] tracking-[0.25em] uppercase font-bold">
                  HOW IT TRAVELLED
                </span>
              </div>
              <p className="font-cormorant text-lg text-[#e8d8b8] leading-relaxed">
                {stage.howItTravelled}
              </p>
            </div>

          </div>

        </div>

        {/* Archival Visual / Interactive Cultural Feature */}
        {children}

        {/* Transition Bridge to Next Era */}
        {onAdvance && (
          <div className="p-6 rounded-2xl bg-[#1a0e08]/90 border border-[#c5a059]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-cinzel text-[#c5a059] tracking-widest uppercase block font-semibold">
                WHAT COMES NEXT IN THE RIVER:
              </span>
              <p className="font-cormorant italic text-lg text-[#fff0d0]">
                {stage.nextIntro}
              </p>
            </div>
            <button
              onClick={onAdvance}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#ffd27d] bg-[#2a140a] hover:bg-[#ffd27d] text-[#ffd27d] hover:text-[#120804] text-xs font-cinzel tracking-widest uppercase transition-all cursor-pointer font-bold shrink-0 shadow-lg"
            >
              <span>ADVANCE TO {nextStageTitle || 'NEXT ERA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default function HaryanaLiteratureExperience({
  onBackToGate,
  onNavigateToFolkArts,
  onNavigateToArtisans,
}) {
  // Primary Navigation: River Stage (0: Oral, 1: Medieval, 2: Devotional, 3: Epics, 4: Print, 5: Modern, 6: Archive, 7: Epilogue)
  const [currentRiverIndex, setCurrentRiverIndex] = useState(0);
  const [hasEnteredRiver, setHasEnteredRiver] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  // Cinematic Antique Parchment Transition Phases:
  // 0: Inactive / hero locked state
  // 1: Phase 1 — Enter: Button border glows, hero dims, dust particles drift inward
  // 2: Phase 2 — The Manuscript Appears: Rolled wooden parchment emerges in center
  // 3: Phase 3 — Scroll Reveal: Rollers rotate and manuscript expands vertically
  // 4: Phase 4 — Literary Revelation: Heading and 7 Chronology milestones emerge in ink
  // 5: Phase 5 — The River Escapes: Antique-gold stream travels through 7 milestones and cascades down
  // 6: Phase 6 — Dissolve Into Page: Parchment gently diffuses, scroll unlocks, reveals River section
  const [parchmentPhase, setParchmentPhase] = useState(0);
  const [activeParchmentMilestone, setActiveParchmentMilestone] = useState(0);
  const transitionTimersRef = useRef([]);

  // Sub-states for specific eras
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0); // For Stage 03 Devotional Voices
  const [selectedScriptTab, setSelectedScriptTab] = useState('haryanvi'); // For Stage 05 Print Culture
  const [selectedEpicStage, setSelectedEpicStage] = useState(0); // For Stage 04 Folk Epics
  const [activeVoiceModal, setActiveVoiceModal] = useState(null);
  const [activeArchiveModal, setActiveArchiveModal] = useState(null);

  // Audio Recitation Player States
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 42,
  });
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const riverRef = useRef(null);

  // Reset scroll to top on initial page mount/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearAllTransitionTimers = () => {
    transitionTimersRef.current.forEach((id) => clearTimeout(id));
    transitionTimersRef.current = [];
  };

  // Skip directly to River if user chooses
  const skipTransition = () => {
    clearAllTransitionTimers();
    setParchmentPhase(0);
    setIsScrollLocked(false);
    setHasEnteredRiver(true);
    if (riverRef.current) {
      riverRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Strict scroll lock while in initial hero introduction state
  useEffect(() => {
    if (isScrollLocked && !hasEnteredRiver) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const preventDefaultScroll = (e) => {
        e.preventDefault();
      };

      const handleKey = (e) => {
        // Allow Space and Enter if focused on button
        if (e.target && e.target.tagName === 'BUTTON') {
          if (e.key === ' ' || e.key === 'Enter') return;
        }
        // Allow Escape to skip if parchment transition is active
        if (e.key === 'Escape' && parchmentPhase > 0) {
          skipTransition();
          return;
        }
        const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
        if (scrollKeys.includes(e.key)) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', preventDefaultScroll, { passive: false });
      window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
      window.addEventListener('keydown', handleKey);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('wheel', preventDefaultScroll);
        window.removeEventListener('touchmove', preventDefaultScroll);
        window.removeEventListener('keydown', handleKey);
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isScrollLocked, hasEnteredRiver, parchmentPhase]);

  // Subscribe to Audio Engine
  useEffect(() => {
    const unsub = oralRecitationAudio.subscribe((state) => {
      setAudioState(state);
    });
    return () => {
      unsub();
      oralRecitationAudio.pause();
    };
  }, []);

  // Live Canvas Waveform Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderWaveform = () => {
      const data = oralRecitationAudio.getWaveformData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.8;
      ctx.strokeStyle = audioState.isPlaying ? '#ffd27d' : 'rgba(197, 160, 89, 0.45)';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / data.length;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      if (audioState.isPlaying) {
        ctx.shadowColor = '#ffd27d';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [audioState.isPlaying, currentRiverIndex]);

  // CINEMATIC ANTIQUE PARCHMENT REVEAL (Phases 1 to 6)
  const handleEnterRiver = () => {
    if (hasEnteredRiver) {
      if (riverRef.current) {
        riverRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (parchmentPhase > 0) return;

    clearAllTransitionTimers();
    setActiveParchmentMilestone(0);

    // PHASE 1 — Enter: Button border glows, hero dims, dust begins drifting
    setParchmentPhase(1);

    // PHASE 2 — The Manuscript Appears: Rolled wooden parchment emerges in center (600ms)
    const t2 = setTimeout(() => {
      setParchmentPhase(2);
    }, 600);

    // PHASE 3 — Scroll Reveal: Top & bottom rollers rotate, parchment unrolls vertically (1050ms)
    const t3 = setTimeout(() => {
      setParchmentPhase(3);
    }, 1050);

    // PHASE 4 — Literary Revelation: Manuscript header and 7 milestones appear (1650ms)
    const t4 = setTimeout(() => {
      setParchmentPhase(4);
    }, 1650);

    // PHASE 5 — The River Escapes: Antique-gold stream journeys through the 7 milestones (2250ms)
    const t5 = setTimeout(() => {
      setParchmentPhase(5);
    }, 2250);

    // Sequence illumination for each of the 7 stages as the golden river reaches them
    const m1 = setTimeout(() => setActiveParchmentMilestone(1), 2400);
    const m2 = setTimeout(() => setActiveParchmentMilestone(2), 2600);
    const m3 = setTimeout(() => setActiveParchmentMilestone(3), 2800);
    const m4 = setTimeout(() => setActiveParchmentMilestone(4), 3000);
    const m5 = setTimeout(() => setActiveParchmentMilestone(5), 3200);
    const m6 = setTimeout(() => setActiveParchmentMilestone(6), 3400);
    const m7 = setTimeout(() => setActiveParchmentMilestone(7), 3600);

    // PHASE 6 — Transition into Page: Golden current escapes into page, parchment dissolves,
    // scroll unlocks, smoothly scrolling down to Literary River (3800ms)
    const t6 = setTimeout(() => {
      setParchmentPhase(6);
      setIsScrollLocked(false);
      if (riverRef.current) {
        riverRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 3800);

    // COMPLETION: Parchment overlay unmounts, user is immersed in Literary River (4400ms)
    const tFinish = setTimeout(() => {
      setHasEnteredRiver(true);
      setParchmentPhase(0);
    }, 4400);

    transitionTimersRef.current = [t2, t3, t4, t5, m1, m2, m3, m4, m5, m6, m7, t6, tFinish];
  };

  // Handle stage change with smooth scroll to river content
  const advanceToStage = (idx) => {
    clearAllTransitionTimers();
    setIsScrollLocked(false);
    setHasEnteredRiver(true);
    setParchmentPhase(0);
    setCurrentRiverIndex(idx);
    if (riverRef.current) {
      riverRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  const currentStage = RIVER_STAGES[currentRiverIndex] || RIVER_STAGES[0];
  const currentEpic = ORAL_EPIC_JOURNEY[selectedEpicStage];
  const currentScriptData = SCRIPT_VERSE_SPECIMEN.scripts[selectedScriptTab];
  const currentVoice = VOICES_OF_HARYANA[activeVoiceIndex];

  return (
    <div 
      className={`literature-page relative ${hasEnteredRiver ? 'min-h-screen' : 'h-screen overflow-hidden'} w-full text-[#f5e9d2] font-manuscript select-none overflow-x-hidden`}
      style={{
        backgroundImage: `linear-gradient(rgba(20, 8, 3, 0.45), rgba(20, 8, 3, 0.45)), url('/assets/literature_background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >

      {/* ====================================================================
          FULL-PAGE FIXED BACKGROUND LAYER
          Subtle scale & shift during cinematic entry
          ==================================================================== */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-[1400ms] ease-out"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 8, 3, 0.45), rgba(20, 8, 3, 0.45)), url('/assets/literature_background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          transform: parchmentPhase >= 1 ? 'scale(1.025) translateY(6px)' : 'scale(1) translateY(0)',
          filter: parchmentPhase >= 1 ? 'brightness(0.65)' : 'brightness(1)',
        }}
      />

      {/* ====================================================================
          CINEMATIC ANTIQUE PARCHMENT SCROLL REVEAL OVERLAY (Phases 1 to 6)
          ==================================================================== */}
      {parchmentPhase > 0 && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none transition-all duration-700 ${
            parchmentPhase === 6 ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
          }`}
        >
          {/* Archival Chamber Vignette Backdrop */}
          <div className="absolute inset-0 bg-[#060301]/88 backdrop-blur-[6px] transition-opacity duration-700" />

          {/* Ambient Drifting Dust & Ink Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#ffd27d] river-mote"
                style={{
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  top: `${10 + (i * 4.6) % 78}%`,
                  left: `${8 + (i * 6.7) % 84}%`,
                  opacity: 0.35 + (i % 4) * 0.15,
                  animationDelay: `${(i * 0.28)}s`,
                  animationDuration: `${3.2 + (i % 3)}s`
                }}
              />
            ))}
          </div>

          {/* Discreet Direct Entry Action */}
          <button
            type="button"
            onClick={skipTransition}
            className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full border border-[#c5a059]/35 bg-[#160b06]/90 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase hover:border-[#ffd27d] hover:text-[#fff0d0] transition-all cursor-pointer shadow-lg flex items-center gap-2"
          >
            <span>ENTER RIVER DIRECTLY</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ffd27d]" />
          </button>

          {/* THE PHYSICAL ARCHIVAL MANUSCRIPT SCROLL */}
          <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-[580px] transition-all duration-700">
            
            {/* 1. TOP TURNED WOODEN ROLLER WITH BRASS CAPS */}
            <div 
              className={`relative z-20 w-full flex items-center justify-between transition-all duration-1000 ease-out ${
                parchmentPhase < 2 ? 'scale-90 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
              }`}
            >
              {/* Left Lathed Brass Finial */}
              <div className="w-5 h-8 sm:w-7 sm:h-9 rounded-l-md parchment-roller-finial shrink-0 border-r border-[#3a1d0a] shadow-lg flex items-center justify-center">
                <div className="w-1 h-3 rounded-full bg-[#ffeaa7]/60" />
              </div>

              {/* Cylindrical Rosewood Body */}
              <div className="relative flex-1 h-6 sm:h-8 parchment-roller-wood rounded-sm flex items-center justify-center overflow-hidden border-y border-[#c5a059]/50 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <div className="text-[8px] font-cinzel text-[#ffd27d]/70 tracking-[0.45em] uppercase font-bold select-none">
                  ॥ श्री हरियाणवी साहित्य रत्नावली ॥
                </div>
              </div>

              {/* Right Lathed Brass Finial */}
              <div className="w-5 h-8 sm:w-7 sm:h-9 rounded-r-md parchment-roller-finial shrink-0 border-l border-[#3a1d0a] shadow-lg flex items-center justify-center">
                <div className="w-1 h-3 rounded-full bg-[#ffeaa7]/60" />
              </div>
            </div>

            {/* 2. EXPANDING VERTICAL PARCHMENT FOLIO BODY */}
            <div 
              className={`relative w-[92%] sm:w-[94%] mx-auto overflow-hidden parchment-paper transition-all ease-[cubic-bezier(0.25,1,0.5,1)] ${
                parchmentPhase < 3
                  ? 'h-4 opacity-75'
                  : 'h-[500px] sm:h-[590px] max-h-[72vh] opacity-100'
              }`}
              style={{
                transitionDuration: parchmentPhase >= 3 ? '1350ms' : '500ms'
              }}
            >
              {/* Faint Sanskrit Calligraphy Watermark in parchment fibers */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex flex-col justify-around p-4 select-none font-cormorant text-xl leading-relaxed text-[#42210b]">
                <p>ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्</p>
                <p>माटी की खुशबु, पांवां की थकान, चाले फिर भी हरियाणे का मान।</p>
                <p>गरीब, शब्द महल में बैठ कर, अलख लखो ततसार। जहां ज्योति निरंजन जगमगे।</p>
                <p>सांग, रागिनी, किस्सा, वाणी, शब्द, ज्ञान की अखण्ड परम्परा।</p>
                <p>इतिहास के पन्नों से निकलती हुई सरस्वती की अमृत धारा।</p>
              </div>

              {/* Inner Red Ink Ruling Margin Lines */}
              <div className="absolute inset-y-0 left-4 sm:left-6 w-[1.5px] bg-[#9e3825]/25 pointer-events-none" />
              <div className="absolute inset-y-0 right-4 sm:right-6 w-[1.5px] bg-[#9e3825]/25 pointer-events-none" />

              {/* Parchment Content (Fades in during Phase 4 & 5) */}
              <div 
                className={`relative h-full flex flex-col justify-between px-5 sm:px-8 py-4 sm:py-5 transition-opacity duration-700 ${
                  parchmentPhase >= 4 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Header of Manuscript */}
                <div className="text-center space-y-0.5 border-b border-[#a87943]/40 pb-2.5 pt-1">
                  <span className="text-[9px] font-cinzel text-[#8c5222] tracking-[0.38em] uppercase font-bold block">
                    ॥ सरस्वती श्रुति प्रवाह ॥
                  </span>
                  <h2 className="font-cinzel text-xl sm:text-2xl text-[#3b1c09] font-bold tracking-wider uppercase leading-snug">
                    The Literary River
                  </h2>
                  <p className="font-cinzel text-[9px] sm:text-[10px] text-[#6e3e18] tracking-[0.22em] uppercase font-semibold">
                    CHRONOLOGY OF WORDS · FROM ORAL MEMORY TO THE ARCHIVE
                  </p>
                </div>

                {/* Serpentine River & 7 Milestones Canvas */}
                <div className="relative flex-1 my-1">
                  {/* SVG Winding Golden River Path */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none" 
                    viewBox="0 0 500 560" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="parchmentRiverGold" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#965d2c" stopOpacity="0.8" />
                        <stop offset="25%" stopColor="#c5a059" stopOpacity="0.95" />
                        <stop offset="65%" stopColor="#ffd27d" stopOpacity="1" />
                        <stop offset="100%" stopColor="#cf9e48" stopOpacity="0.95" />
                      </linearGradient>

                      <filter id="parchmentGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Faint under-drawn ink guide line */}
                    <path
                      d="M 250,20 C 250,45 130,45 130,75 C 130,120 370,105 370,145 C 370,190 130,175 130,220 C 130,265 370,250 370,290 C 370,335 130,320 130,365 C 130,410 370,395 370,435 C 370,480 250,465 250,510 L 250,560"
                      stroke="rgba(145, 88, 41, 0.28)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                    />

                    {/* Flowing Active Antique-Gold River Stroke */}
                    <path
                      d="M 250,20 C 250,45 130,45 130,75 C 130,120 370,105 370,145 C 370,190 130,175 130,220 C 130,265 370,250 370,290 C 370,335 130,320 130,365 C 130,410 370,395 370,435 C 370,480 250,465 250,510 L 250,560"
                      stroke="url(#parchmentRiverGold)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#parchmentGlow)"
                      className={parchmentPhase >= 5 ? 'parchment-river-flowing' : ''}
                      style={{
                        strokeDashoffset: parchmentPhase < 5 ? 1400 : undefined
                      }}
                    />
                  </svg>

                  {/* The 7 Milestones revealed along the flowing River */}
                  {[
                    { num: '01', title: 'ORAL TRADITION', era: 'Pre-Print Antiquity', left: '26%', top: '13%', isLeft: true },
                    { num: '02', title: 'MEDIEVAL VERSE', era: '11th – 15th Century', left: '74%', top: '26%', isLeft: false },
                    { num: '03', title: 'DEVOTIONAL VOICES', era: '15th – 17th Century', left: '26%', top: '39%', isLeft: true },
                    { num: '04', title: 'FOLK EPICS', era: '17th – 19th Century', left: '74%', top: '52%', isLeft: false },
                    { num: '05', title: 'PRINT CULTURE', era: 'Late 19th Century', left: '26%', top: '65%', isLeft: true },
                    { num: '06', title: 'MODERN VOICES', era: '20th Century – Present', left: '74%', top: '78%', isLeft: false },
                    { num: '07', title: 'THE ARCHIVE', era: 'Living Heritage', left: '50%', top: '91%', isCenter: true },
                  ].map((st, idx) => {
                    const isLit = activeParchmentMilestone >= (idx + 1);
                    return (
                      <div
                        key={st.num}
                        style={{ left: st.left, top: st.top }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 transition-all duration-500 ${
                          st.isCenter ? 'flex-col text-center' : st.isLeft ? 'flex-row text-left' : 'flex-row-reverse text-right'
                        }`}
                      >
                        {/* Wax Seal / Antique Medallion */}
                        <div 
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-cinzel text-[9px] font-bold border shrink-0 transition-all duration-500 ${
                            isLit
                              ? 'milestone-illuminated bg-[#3e1b08] text-[#ffd27d] border-[#ffd27d] shadow-[0_0_14px_rgba(255,210,125,0.85)]'
                              : 'bg-[#dfc79a] text-[#5a2e12] border-[#a87943]/60'
                          }`}
                        >
                          {st.num}
                        </div>

                        {/* Milestone Title & Era */}
                        <div className="select-none min-w-[90px] sm:min-w-[110px]">
                          <span 
                            className={`text-[9px] sm:text-[10px] font-cinzel font-bold tracking-wider block transition-colors ${
                              isLit ? 'text-[#2a1205] drop-shadow-sm font-extrabold' : 'text-[#613617]'
                            }`}
                          >
                            {st.title}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-cormorant italic text-[#804e26] block leading-none mt-0.5">
                            {st.era}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer of Manuscript */}
                <div className="text-center pt-2 border-t border-[#a87943]/40 flex items-center justify-between text-[8px] sm:text-[9px] font-cinzel text-[#703f19] uppercase tracking-widest">
                  <span>ACCESSION № HR-LIT-01</span>
                  <span className="font-bold text-[#b5832a] animate-pulse">
                    {parchmentPhase === 5 ? 'ENTERING THE LIVING WORD...' : 'ARCHIVAL CHRONOLOGY'}
                  </span>
                  <span>KURUKSHETRA TAKHT</span>
                </div>
              </div>
            </div>

            {/* 3. BOTTOM TURNED WOODEN ROLLER */}
            <div 
              className={`relative z-20 w-full flex items-center justify-between transition-all duration-1000 ease-out ${
                parchmentPhase < 2 ? 'scale-90 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
              }`}
            >
              {/* Left Lathed Brass Finial */}
              <div className="w-5 h-8 sm:w-7 sm:h-9 rounded-l-md parchment-roller-finial shrink-0 border-r border-[#3a1d0a] shadow-lg flex items-center justify-center">
                <div className="w-1 h-3 rounded-full bg-[#ffeaa7]/60" />
              </div>

              {/* Cylindrical Rosewood Body with Hanging Seal */}
              <div className="relative flex-1 h-6 sm:h-8 parchment-roller-wood rounded-sm flex items-center justify-center overflow-visible border-y border-[#c5a059]/50 shadow-[0_15px_30px_rgba(0,0,0,0.85)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none rounded-sm" />
                {/* Silk Cord & Wax Seal Hanging at Center */}
                <div className="absolute top-6 w-1.5 h-6 bg-[#8b2318] shadow-sm flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#7a1b12] border border-[#d4af37]/60 mt-4 shadow" />
                </div>
              </div>

              {/* Right Lathed Brass Finial */}
              <div className="w-5 h-8 sm:w-7 sm:h-9 rounded-r-md parchment-roller-finial shrink-0 border-l border-[#3a1d0a] shadow-lg flex items-center justify-center">
                <div className="w-1 h-3 rounded-full bg-[#ffeaa7]/60" />
              </div>
            </div>

            {/* 4. THE RIVER ESCAPES: Golden stream pouring from bottom roller into the page */}
            {parchmentPhase >= 5 && (
              <div className="relative flex flex-col items-center pointer-events-none mt-2">
                <div className="w-[3px] rounded-full bg-gradient-to-b from-[#ffd27d] via-[#c5a059] to-transparent shadow-[0_0_20px_#ffd27d] river-escape-pour" />
                <span className="font-cinzel text-[10px] text-[#ffd27d] tracking-[0.34em] uppercase pt-2 animate-pulse font-bold">
                  ENTERING THE LITERARY RIVER...
                </span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ====================================================================
          STICKY TOP GLOBAL NAVIGATION BAR
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between border-b border-[#c5a059]/30 bg-[#120704]/95 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.92)]">
        
        {/* Left: Return to Haryana Gate */}
        <button
          onClick={() => {
            if (onBackToGate) {
              onBackToGate();
            } else {
              window.history.pushState(null, '', '/haryana');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c9a45a]/50 bg-[#1c0f08]/90 hover:bg-[#2d170d] text-[#ffd27d] text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
          <span>← HARYANA HERITAGE</span>
        </button>

        {/* Center: Stage Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a45a]/35 bg-[#170c07]/90 text-[11px] font-cinzel text-[#ffd27d]">
          <span className="text-[#c5a059]">LITERARY RIVER:</span>
          <span className="font-semibold">{currentStage.num} {currentStage.title}</span>
        </div>

        {/* Right: Audio Recitation Status */}
        <div 
          onClick={() => oralRecitationAudio.toggle()}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#c9a45a]/40 bg-[#180d07]/90 backdrop-blur-md text-[#ffd27d] text-[11px] font-cinzel tracking-wider cursor-pointer hover:border-[#ffd27d] transition-all"
        >
          <span className={`w-2 h-2 rounded-full ${audioState.isPlaying ? 'bg-[#ffd27d] animate-ping' : 'bg-[#c5a059]/60'}`} />
          <span>{audioState.isPlaying ? 'RECITATION ACTIVE' : 'ORAL ACOUSTICS'}</span>
          <Volume2 className="w-3.5 h-3.5 text-[#ffd27d]" />
        </div>
      </header>

      {/* ====================================================================
          MAIN EDITORIAL CONTAINER
          ==================================================================== */}
      <main className={`relative z-10 ${hasEnteredRiver ? 'min-h-screen pt-20 sm:pt-24 pb-32' : 'h-full flex flex-col justify-center pt-14 pb-2'}`}>
        <div className="w-[96%] sm:w-[92%] lg:w-[88%] max-w-[1580px] mx-auto space-y-8 sm:space-y-12">

          {/* ==================================================================
              PROLOGUE: THE LIVING WORD — INTRODUCTION
              Calm, spacious archival entrance viewport
              ================================================================== */}
          <section 
            id="hero" 
            className={`transition-all duration-700 ${!hasEnteredRiver ? 'space-y-3' : 'pt-4 space-y-6'} ${
              parchmentPhase >= 1 ? 'opacity-25 filter blur-[0.5px] scale-[0.98]' : 'opacity-100'
            }`}
          >
            <div className="text-center space-y-2 max-w-4xl mx-auto">
              <span className="text-[10px] sm:text-xs font-cinzel text-[#c5a059] tracking-[0.42em] uppercase font-semibold block">
                CHAPTER 02 · LITERATURE · DIGITAL ARCHIVE
              </span>

              <h1 
                className="font-cinzel text-4xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-wide uppercase leading-tight"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.95))' }}
              >
                The Living Word
              </h1>

              <p className="font-cinzel text-[11px] sm:text-xs text-[#e8c46a] tracking-[0.28em] uppercase font-semibold">
                POETRY · ORAL TRADITION · EPIC · DEVOTION · MODERN VOICE
              </p>

              <p className="font-cormorant italic text-xl sm:text-2xl text-[#fff0d0] tracking-wide">
                “Before words were printed, they were remembered.”
              </p>
            </div>

            {/* Archival Composition Frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/40 bg-[#140a05] shadow-[0_30px_90px_rgba(0,0,0,0.98)] max-w-5xl mx-auto">
              <div className="relative aspect-[16/8] sm:aspect-[21/8] max-h-[38vh] w-full overflow-hidden">
                <img
                  src="/assets/literature_manuscript_hero.jpg"
                  alt="Ancient Indian manuscript open with brass oil lamp diya and stacked books"
                  className={`w-full h-full object-cover transition-all duration-[1200ms] ${
                    parchmentPhase >= 1 ? 'brightness-[0.6] contrast-[1.15]' : 'brightness-[0.92] contrast-[1.05]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-[#0a0502]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0502]/85 via-transparent to-[#0a0502]/85 pointer-events-none" />

                {/* Subtle vignette layer */}
                <div 
                  className={`absolute inset-0 bg-[#070301]/50 transition-opacity duration-[1000ms] pointer-events-none ${
                    parchmentPhase >= 1 ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>

              {/* Marginal Notes */}
              <div className="absolute top-4 left-5 sm:top-6 sm:left-8 z-10 max-w-[200px] pointer-events-none hidden md:block">
                <div className="border-l-2 border-[#c5a059]/60 pl-3 space-y-0.5">
                  <p className="font-cinzel text-[10px] text-[#ffd27d] tracking-widest uppercase font-semibold">
                    Stories · Songs
                  </p>
                  <p className="font-cinzel text-[9px] text-[#c5a059] tracking-wider uppercase">
                    Scriptures · People
                  </p>
                  <p className="font-cormorant italic text-xs text-[#e8d8b8]">
                    A Timeless Tradition
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-5 sm:top-6 sm:right-8 z-10 max-w-[240px] pointer-events-none text-right hidden md:block">
                <div className="border-r-2 border-[#c5a059]/60 pr-3 space-y-0.5">
                  <p className="font-cormorant italic text-sm sm:text-base text-[#fff0d0] leading-snug">
                    “In every tale, a landscape.<br />In every verse, a people.”
                  </p>
                  <p className="font-cinzel text-[8px] text-[#c5a059] tracking-[0.24em] uppercase font-semibold">
                    ORAL CIVILIZATIONAL MEMORY
                  </p>
                </div>
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-5 sm:left-8 right-5 sm:right-8 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[9px] sm:text-[10px] font-cinzel text-[#ffd27d] tracking-[0.22em] uppercase border-t border-[#c5a059]/25 pt-2">
                <span>ARCHIVAL MANUSCRIPT FOLIO · BIRCH BARK & CARBON INK</span>
                <span className="text-[#c5a059]">BAMBOO KALAM · BRASS OIL LAMP · SACRED CHANT CONTINUUM</span>
              </div>
            </div>

            {/* "ENTER THE LITERARY RIVER" GATEWAY BUTTON */}
            <div className="flex flex-col items-center justify-center pt-2 text-center relative">
              <button 
                type="button"
                id="enter-literary-river-btn"
                onClick={handleEnterRiver}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEnterRiver();
                  }
                }}
                disabled={parchmentPhase > 0}
                aria-label="Enter the Literary River"
                className={`group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3 rounded-full border-2 text-xs font-cinzel tracking-[0.28em] uppercase transition-all duration-500 cursor-pointer font-bold select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd27d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120804] ${
                  parchmentPhase === 1
                    ? 'gateway-illuminated bg-[#34180d] text-[#fff0d0] border-[#ffd27d] scale-105'
                    : 'border-[#ffd27d] bg-[#1e0f08] hover:bg-[#34180d] text-[#ffd27d] shadow-[0_0_25px_rgba(255,210,125,0.35)] hover:shadow-[0_0_40px_rgba(255,210,125,0.55)] hover:scale-102 active:scale-98'
                }`}
              >
                <Sparkles className={`w-4 h-4 text-[#ffd27d] transition-all duration-500 ${parchmentPhase > 0 ? 'animate-spin text-[#fff0d0]' : 'group-hover:rotate-45'}`} />
                <span>ENTER THE LITERARY RIVER</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 text-[#ffd27d] ${parchmentPhase > 0 ? 'translate-y-1.5' : 'group-hover:translate-y-1'}`} />
              </button>

              <p className="font-cormorant italic text-base text-[#c5a059] mt-2">
                Travel along the golden thread across six literary epochs
              </p>
            </div>
          </section>

          {/* ==================================================================
              THE LITERARY RIVER — THE PHYSICAL BACKBONE
              A persistent interactive timeline river that directly unlocks & controls
              the active historical stage content.
              NOT accessible before entering the river.
              ================================================================== */}
          <div 
            ref={riverRef} 
            className={`pt-8 scroll-mt-20 space-y-10 transition-opacity duration-1000 ${
              hasEnteredRiver || parchmentPhase >= 5 ? 'opacity-100 block' : 'hidden opacity-0 pointer-events-none'
            }`}
          >


            {/* THE CONTINUOUS GOLDEN RIVER TIMELINE HEADER */}
            <div className="sticky top-[58px] z-40 bg-[#120704]/96 backdrop-blur-md py-4 sm:py-5 border-y border-[#c5a059]/35 shadow-[0_14px_40px_rgba(0,0,0,0.92)]">
              
              {/* River Header Title & Active Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-8 mb-2 sm:mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1.5px] bg-[#ffd27d]" />
                  <span className="text-[11px] font-cinzel text-[#ffd27d] tracking-[0.34em] uppercase font-bold">
                    A RIVER OF WORDS
                  </span>
                  <span className="text-xs text-[#c5a059]">·</span>
                  <span className="text-xs font-cinzel text-[#f5e9d2] tracking-wider uppercase">
                    STAGE {currentStage.num} OF 07: <strong className="text-[#ffd27d]">{currentStage.title}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-cinzel tracking-widest uppercase">
                  <span className="text-[#c5a059]">HISTORICAL HORIZON:</span>
                  <span className="text-[#ffd27d] font-semibold border-b border-[#c5a059]/40 pb-0.5">
                    {currentStage.era}
                  </span>
                </div>
              </div>

              {/* Hand-Drawn Literary River with 7 Archival Chapter Markers */}
              <div className="relative px-2 sm:px-6 overflow-x-auto select-none no-scrollbar">
                <div className="relative min-w-[1020px] max-w-[1280px] mx-auto h-[160px]">
                  
                  {/* Organic Curved Golden River Path (SVG) */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none" 
                    viewBox="0 0 1200 160" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="riverGoldGlow" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>

                      <linearGradient id="goldRiverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c5a059" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#ffd27d" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#e8c46a" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Hand-drawn manuscript River stroke (base background river) */}
                    <path
                      d="M 15,80 C 50,78 70,78 95,78 C 160,78 200,108 270,92 C 340,76 385,65 455,74 C 525,83 570,102 640,84 C 710,66 755,67 825,74 C 895,81 935,104 1005,86 C 1065,70 1095,72 1145,78 C 1170,82 1185,81 1200,80"
                      stroke="rgba(197, 160, 89, 0.28)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Companion River Bank / Wave Contour Line */}
                    <path
                      d="M 15,85 C 50,83 70,83 95,83 C 160,83 200,113 270,97 C 340,81 385,70 455,79 C 525,88 570,107 640,89 C 710,71 755,72 825,79 C 895,86 935,109 1005,91 C 1065,75 1095,77 1145,83 C 1170,87 1185,86 1200,85"
                      stroke="rgba(197, 160, 89, 0.14)"
                      strokeWidth="1.2"
                      strokeDasharray="8 5"
                      strokeLinecap="round"
                    />

                    {/* Dynamic Active Golden River Flow (tracks up to active stage) */}
                    <path
                      d="M 15,80 C 50,78 70,78 95,78 C 160,78 200,108 270,92 C 340,76 385,65 455,74 C 525,83 570,102 640,84 C 710,66 755,67 825,74 C 895,81 935,104 1005,86 C 1065,70 1095,72 1145,78 C 1170,82 1185,81 1200,80"
                      stroke="url(#goldRiverGrad)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#riverGoldGlow)"
                      strokeDasharray="1200"
                      strokeDashoffset={[1105, 930, 745, 560, 375, 195, 0][currentRiverIndex]}
                      className="transition-all duration-1000 ease-out"
                    />

                    {/* Traveling Ink particles / dust motes along the river */}
                    <circle cx="95" cy="78" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 0 ? 0.9 : 0.25} />
                    <circle cx="270" cy="92" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 1 ? 0.9 : 0.25} />
                    <circle cx="455" cy="74" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 2 ? 0.9 : 0.25} />
                    <circle cx="640" cy="84" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 3 ? 0.9 : 0.25} />
                    <circle cx="825" cy="74" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 4 ? 0.9 : 0.25} />
                    <circle cx="1005" cy="86" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 5 ? 0.9 : 0.25} />
                    <circle cx="1145" cy="78" r="2.2" fill="#ffd27d" opacity={currentRiverIndex >= 6 ? 0.9 : 0.25} />
                  </svg>

                  {/* The 7 Archival Chapter Markers sitting organically along the river */}
                  {RIVER_STAGES.map((st, idx) => {
                    const isActive = currentRiverIndex === idx;
                    const isCompleted = idx < currentRiverIndex;
                    const markerPositions = [
                      { left: '7.9%', top: '48%' },
                      { left: '22.5%', top: '56%' },
                      { left: '37.9%', top: '46%' },
                      { left: '53.3%', top: '52%' },
                      { left: '68.7%', top: '46%' },
                      { left: '83.7%', top: '53%' },
                      { left: '95.4%', top: '48%' },
                    ];
                    const pos = markerPositions[idx];

                    return (
                      <div
                        key={st.id}
                        onClick={() => advanceToStage(idx)}
                        style={{ left: pos.left, top: pos.top }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 group select-none ${
                          isActive ? 'z-20 scale-105' : 'z-10 hover:scale-102'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          
                          {/* Artifact Container with Warm Archival Glow */}
                          <div className="relative flex items-center justify-center">
                            
                            {/* Soft Golden Halo & Expanding Pulse on Active Marker */}
                            {isActive && (
                              <>
                                <div className="absolute w-20 h-20 rounded-full bg-radial from-[#ffd27d]/35 via-[#c5a059]/15 to-transparent pointer-events-none archival-halo" />
                                <div className="absolute w-14 h-14 rounded-full border border-[#ffd27d]/60 pointer-events-none archival-ring-pulse" />
                                <span className="absolute -top-3 -left-2 w-1.5 h-1.5 rounded-full bg-[#ffd27d] river-mote" />
                                <span className="absolute -bottom-2 -right-2 w-1 h-1 rounded-full bg-[#fff0d0] river-mote" style={{ animationDelay: '1.2s' }} />
                              </>
                            )}

                            {/* Archival Artifact Symbol Display (NOT a standard button) */}
                            <div 
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                isActive
                                  ? 'bg-gradient-to-b from-[#24130a] to-[#160b06] border-2 border-[#ffd27d] shadow-[0_0_25px_rgba(255,210,125,0.45)] text-[#ffd27d]'
                                  : isCompleted
                                    ? 'bg-[#180d07]/90 border border-[#c5a059]/60 text-[#c5a059] group-hover:border-[#ffd27d]/70 group-hover:text-[#ffd27d]'
                                    : 'bg-[#120704]/85 border border-[#c5a059]/25 text-[#8c6d3d] group-hover:border-[#c5a059]/50 group-hover:text-[#c5a059]'
                              }`}
                            >
                              <ArchivalEraSymbol stageId={st.id} isActive={isActive} isCompleted={isCompleted} />
                            </div>

                            {/* Chapter Number Badge */}
                            <span 
                              className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-[8px] font-cinzel font-bold tracking-widest border transition-colors ${
                                isActive
                                  ? 'bg-[#ffd27d] text-[#120804] border-[#fff0d0] shadow-sm'
                                  : 'bg-[#1a0e08] text-[#c5a059] border-[#c5a059]/30'
                              }`}
                            >
                              {st.num}
                            </span>
                          </div>

                          {/* Chapter Title & Era Labels */}
                          <div className="mt-2 text-center w-28 select-none">
                            <span 
                              className={`text-[10px] font-cinzel font-bold tracking-wider uppercase block leading-tight transition-colors ${
                                isActive 
                                  ? 'text-[#ffd27d] drop-shadow-[0_0_10px_rgba(255,210,125,0.7)]' 
                                  : isCompleted 
                                    ? 'text-[#f5e9d2]/85 group-hover:text-[#ffd27d]' 
                                    : 'text-[#a38048]/70 group-hover:text-[#f5e9d2]'
                              }`}
                            >
                              {st.title}
                            </span>
                            <span className="text-[9px] font-cormorant italic text-[#c5a059]/80 block mt-0.5 truncate">
                              {st.era.split('–')[0]}
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>

            {/* ================================================================
                DYNAMIC RIVER STAGE CONTENT (ONE UNIFIED CONTINUOUS STAGE AT A TIME)
                Unique evolutionary transitions connecting each era
                ================================================================ */}
            <div className="relative min-h-[620px]">
              <AnimatePresence mode="wait">

                {/* ------------------------------------------------------------
                    STAGE 01: ORAL TRADITION
                    Spoken sound, village chaupal, recitation audio, waveform
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 0 && (
                  <motion.div
                    key="stage-oral"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[0]}
                      onAdvance={() => advanceToStage(1)}
                      nextStageTitle="MEDIEVAL VERSE"
                    >
                      {/* Integrated Audio & Manuscript Composition */}
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left: Audio Player (Visual Focus) */}
                        <div className="lg:col-span-4 space-y-6 p-6 rounded-2xl bg-[#1a0e08]/90 border border-[#c5a059]/30">
                          <div className="space-y-1">
                            <span className="text-[10px] font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
                              ORAL ACOUSTICS
                            </span>
                            <h3 className="font-cinzel text-xl text-[#fff0d0]">
                              Play Oral Recitation
                            </h3>
                            <p className="font-cormorant italic text-sm text-[#ffd27d]">
                              Sonipat harvest chaupal · Sarangi & Been drone
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => oralRecitationAudio.toggle()}
                              className="group relative flex items-center justify-center w-18 h-18 rounded-full border-2 border-[#ffd27d] bg-[#221008] hover:bg-[#ffd27d] text-[#ffd27d] hover:text-[#120804] transition-all cursor-pointer shadow-[0_0_25px_rgba(255,210,125,0.4)] shrink-0"
                              aria-label={audioState.isPlaying ? "Pause Recitation" : "Play Oral Recitation"}
                            >
                              {audioState.isPlaying ? (
                                <Pause className="w-7 h-7 fill-current" />
                              ) : (
                                <Play className="w-7 h-7 fill-current ml-1" />
                              )}
                            </button>

                            <div className="text-[11px] font-cinzel text-[#c5a059] tracking-wider uppercase">
                              {audioState.isPlaying ? (
                                <span className="text-[#ffd27d] font-semibold animate-pulse">RESONATING ACOUSTICS</span>
                              ) : (
                                <span>CLICK TO HEAR THE VOICE</span>
                              )}
                            </div>
                          </div>

                          <div className="w-full h-14 bg-[#120804] rounded-xl border border-[#c5a059]/30 p-2 flex items-center">
                            <canvas ref={canvasRef} width={320} height={44} className="w-full h-full" />
                          </div>
                        </div>

                        {/* Center: Spoken Verse on Aged Parchment */}
                        <div className="lg:col-span-5 p-8 rounded-2xl bg-[#e3cca3] text-[#2c150a] shadow-[0_15px_50px_rgba(0,0,0,0.85)] border-2 border-[#b8955a] text-center space-y-4">
                          <span className="text-[10px] font-cinzel text-[#6d3e18] tracking-[0.3em] uppercase block font-bold border-b border-[#a37941]/40 pb-2">
                            ॥ हरियाणवी अमृतवाणी ॥
                          </span>
                          <p className="font-cormorant text-2xl sm:text-3xl text-[#2b1407] font-semibold leading-relaxed">
                            माटी की खुशबु, पांवां की थकान,<br />
                            चाले फिर भी हरियाणे का मान।<br />
                            बोलां में सादगी, दिल में आग,<br />
                            यही से लिखी जिंदगी की भाग।
                          </p>
                          <p className="font-cormorant italic text-sm text-[#553014] leading-relaxed pt-2 border-t border-[#a37941]/35">
                            “The fragrance of soil, the fatigue in footsteps, yet the pride of Haryana walks on.”
                          </p>
                        </div>

                        {/* Right: Rural Etching */}
                        <div className="lg:col-span-3 space-y-3">
                          <div className="rounded-2xl overflow-hidden border border-[#c5a059]/40 bg-[#0d0704] aspect-[4/3]">
                            <img src="/assets/rural_village_etching.jpg" alt="Rural Haryana village etching" className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]" />
                          </div>
                          <p className="font-cormorant italic text-base text-[#ffd27d] text-right">
                            “Not just written, but lived.”
                          </p>
                        </div>

                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 02: MEDIEVAL VERSE
                    Sound waves transform into handwritten ink, manuscript folios
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 1 && (
                  <motion.div
                    key="stage-medieval"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[1]}
                      onAdvance={() => advanceToStage(2)}
                      nextStageTitle="DEVOTIONAL VOICES"
                    >
                      {/* Manuscript Folio Display */}
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        <div className="lg:col-span-6 space-y-4">
                          <span className="px-3 py-1 rounded-full bg-[#201008] border border-[#c5a059]/40 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            11TH – 15TH CENTURY CE · GORAKH SABAD & SANT GARIBDAS
                          </span>
                          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#fff0d0]">
                            The Earliest Vernacular Manuscripts
                          </h3>
                          <p className="font-cormorant text-xl text-[#f5e9d2] leading-relaxed">
                            In the sand dunes of Hisar, Rohtak, and Jhajjar, Gorakhnath and Sant Garibdas challenged religious orthodoxy. They abandoned courtly Sanskrit to compose directly in the working peasant's tongue, recording moral aphorisms on birch bark and palm leaf.
                          </p>
                          <blockquote className="font-cormorant italic text-lg text-[#ffd27d] border-l-2 border-[#c5a059] pl-4 py-1">
                            “गरीब, शब्द महल में बैठ कर, अलख लखो ततसार।<br />जहां ज्योति निरंजन जगमगे, बरसे अमृत धार।”
                          </blockquote>
                        </div>

                        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#c5a059]/50 shadow-xl bg-[#0c0603]">
                          <img 
                            src="/assets/literature_hero_manuscript.jpg" 
                            alt="Medieval birch bark manuscript with kalam" 
                            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0704] via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-3 left-4 right-4 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            ARCHIVAL SPECIMEN: BIRCH BARK FOLIO WITH LAMPBLACK INK
                          </div>
                        </div>

                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 03: DEVOTIONAL VOICES
                    The custodians: Sant Garibdas, Lakhmi Chand, Bansidhar, Mange Ram, Folk Bards
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 2 && (
                  <motion.div
                    key="stage-devotional"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[2]}
                      onAdvance={() => advanceToStage(3)}
                      nextStageTitle="FOLK EPICS"
                    >
                      {/* Horizontal Archival Custodian Carousel (ONE Dominant Card) */}
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] space-y-6">
                        
                        <div className="flex items-center justify-between border-b border-[#c5a059]/25 pb-3">
                          <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
                            CUSTODIAN {activeVoiceIndex + 1} OF {VOICES_OF_HARYANA.length}: <strong className="text-[#ffd27d]">{currentVoice.name}</strong>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveVoiceIndex((prev) => (prev - 1 + VOICES_OF_HARYANA.length) % VOICES_OF_HARYANA.length)}
                              className="p-1.5 rounded-full border border-[#c5a059]/40 bg-[#160b06] text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setActiveVoiceIndex((prev) => (prev + 1) % VOICES_OF_HARYANA.length)}
                              className="p-1.5 rounded-full border border-[#c5a059]/40 bg-[#160b06] text-[#ffd27d] hover:border-[#ffd27d] transition-all cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Main Featured Custodian Card */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#ffd27d] bg-[#0c0603] shadow-[0_15px_45px_rgba(255,210,125,0.25)]">
                            <img src={currentVoice.portrait} alt={currentVoice.name} className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.1]" />
                          </div>

                          <div className="md:col-span-8 space-y-4">
                            <span className="px-3 py-1 rounded-full bg-[#25120a] border border-[#c5a059]/40 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                              {currentVoice.era} · {currentVoice.region}
                            </span>
                            <div>
                              <h3 className="font-cinzel text-3xl sm:text-4xl text-[#fff0d0]">
                                {currentVoice.name}
                              </h3>
                              <p className="font-cormorant italic text-2xl text-[#ffd27d]">
                                {currentVoice.vernacular}
                              </p>
                              <p className="text-xs font-cinzel text-[#e8c46a] tracking-wider uppercase pt-1 font-semibold">
                                {currentVoice.role}
                              </p>
                            </div>

                            <blockquote className="font-cormorant italic text-xl text-[#f5e9d2] border-l-2 border-[#c5a059] pl-4 py-1 leading-relaxed">
                              “{currentVoice.quote}”
                            </blockquote>

                            <p className="font-cormorant text-xl text-[#e8d8b8] leading-relaxed">
                              {currentVoice.summary}
                            </p>

                            <button
                              onClick={() => setActiveVoiceModal(currentVoice)}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ffd27d]/60 bg-[#2b150c] hover:bg-[#ffd27d] text-[#ffd27d] hover:text-[#120804] text-xs font-cinzel tracking-widest uppercase transition-all cursor-pointer font-bold shadow-md"
                            >
                              <span>INSPECT BIOGRAPHICAL FOLIO</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Custodian Selection Pills */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#c5a059]/20">
                          {VOICES_OF_HARYANA.map((v, idx) => (
                            <button
                              key={v.id}
                              onClick={() => setActiveVoiceIndex(idx)}
                              className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer border ${
                                activeVoiceIndex === idx
                                  ? 'bg-[#ffd27d] text-[#120804] border-[#fff0d0] font-bold shadow-[0_0_12px_#ffd27d]'
                                  : 'bg-[#1a0e08]/90 text-[#ffd27d]/80 border-[#c5a059]/30 hover:border-[#ffd27d]'
                              }`}
                            >
                              {v.name}
                            </button>
                          ))}
                        </div>

                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 04: FOLK EPICS
                    Monumental oral sagas, panoramic landscape, chapter journey
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 3 && (
                  <motion.div
                    key="stage-epics"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[3]}
                      onAdvance={() => advanceToStage(4)}
                      nextStageTitle="PRINT CULTURE"
                    >
                      {/* Panoramic Story Progression */}
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                        
                        <div className="sm:col-span-8 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#0c0603] border border-[#c5a059]/40 shadow-xl">
                          <img
                            src="/assets/epics_hero_sunset.jpg"
                            alt="Haryana folk hero with walking staff gazing across rural village sunset"
                            className="w-full h-full object-cover transition-all duration-700"
                            style={{
                              objectPosition: `${selectedEpicStage * 22}% center`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0704] via-transparent to-transparent opacity-75" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            <span>STAGE {currentEpic.stage} · {currentEpic.title}</span>
                            <span className="text-[#c5a059]">{currentEpic.subtitle}</span>
                          </div>
                        </div>

                        <div className="sm:col-span-4 flex flex-col gap-2">
                          {ORAL_EPIC_JOURNEY.map((st, idx) => {
                            const isSelected = selectedEpicStage === idx;
                            return (
                              <button
                                key={st.stage}
                                onClick={() => setSelectedEpicStage(idx)}
                                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#c5a059] text-[#120804] border-[#ffd27d] font-bold shadow-[0_0_15px_rgba(201,164,90,0.4)] scale-102'
                                    : 'bg-[#1a0e08]/90 text-[#ffd27d]/80 border-[#c5a059]/20 hover:border-[#ffd27d]'
                                }`}
                              >
                                <span className="text-[10px] uppercase font-cinzel tracking-widest block opacity-80">
                                  0{idx + 1} STORY PROGRESSION
                                </span>
                                <span className="text-xs font-cinzel font-semibold tracking-wide block mt-0.5">
                                  {st.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                      </div>

                      <div className="p-6 rounded-2xl bg-[#1a0e08]/90 border border-[#c5a059]/25 text-lg font-cormorant italic text-[#f5e9d2] leading-relaxed">
                        <span className="text-xs font-cinzel not-italic text-[#c5a059] tracking-widest uppercase block mb-1 font-semibold">
                          NARRATIVE SPOTLIGHT · {currentEpic.title}:
                        </span>
                        “{currentEpic.narrative}”
                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 05: PRINT CULTURE
                    Transition: oral memory -> manuscript -> printed page. Words in their own script.
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 4 && (
                  <motion.div
                    key="stage-print"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[4]}
                      onAdvance={() => advanceToStage(5)}
                      nextStageTitle="MODERN VOICES"
                    >
                      {/* Interactive Script Specimen */}
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                        
                        <div className="sm:col-span-4 flex flex-row sm:flex-col gap-2.5">
                          {Object.keys(SCRIPT_VERSE_SPECIMEN.scripts).map((tabKey) => {
                            const tab = SCRIPT_VERSE_SPECIMEN.scripts[tabKey];
                            const isActive = selectedScriptTab === tabKey;
                            return (
                              <button
                                key={tabKey}
                                onClick={() => setSelectedScriptTab(tabKey)}
                                className={`px-5 py-3.5 rounded-xl text-xs font-cinzel font-semibold tracking-widest uppercase text-left transition-all cursor-pointer border ${
                                  isActive
                                    ? 'bg-[#c5a059] text-[#120804] border-[#ffd27d] shadow-[0_0_15px_rgba(201,164,90,0.5)] font-bold'
                                    : 'bg-[#1a0e08]/90 text-[#ffd27d]/80 border-[#c5a059]/25 hover:border-[#ffd27d]'
                                }`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="sm:col-span-8 relative p-8 sm:p-12 rounded-2xl bg-[#e1cba1] text-[#2c1408] border-2 border-[#a8864f] shadow-inner min-h-[260px] flex flex-col justify-center overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedScriptTab}
                              initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
                              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                              exit={{ opacity: 0, filter: 'blur(3px)', y: -6 }}
                              transition={{ duration: 0.45 }}
                              className="space-y-4 text-center"
                            >
                              <span className="text-[10px] font-cinzel text-[#70421d] tracking-[0.25em] uppercase font-bold block">
                                {currentScriptData.scriptName}
                              </span>

                              <div className="space-y-2">
                                {currentScriptData.lines.map((line, idx) => (
                                  <p key={idx} className="font-cormorant text-2xl sm:text-4xl text-[#2c1408] font-semibold leading-relaxed">
                                    {line}
                                  </p>
                                ))}
                              </div>

                              <p className="text-xs font-cormorant italic text-[#633a18] pt-3 border-t border-[#ab8750]/40 max-w-xl mx-auto">
                                {currentScriptData.annotation}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 06: MODERN VOICES
                    20th Century agrarian consciousness, radio recordings, modern masters
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 5 && (
                  <motion.div
                    key="stage-modern"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[5]}
                      onAdvance={() => advanceToStage(6)}
                      nextStageTitle="THE ARCHIVE"
                    >
                      <div className="rounded-3xl bg-[#140a05]/95 border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        <div className="lg:col-span-7 space-y-4">
                          <span className="px-3 py-1 rounded-full bg-[#201008] border border-[#c5a059]/40 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                            CONTEMPORARY CONTINUUM · AIR FIELD RECORDINGS
                          </span>
                          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#fff0d0]">
                            Pandit Mange Ram & Dayachand Mayna
                          </h3>
                          <p className="font-cormorant text-xl text-[#f5e9d2] leading-relaxed">
                            The 20th century transformed Haryanvi verse into freedom songs and agrarian satire. Dayachand Mayna became Haryana's Rashtriya Kavi, while Pandit Mange Ram brought classical Rigvedic metre to All India Radio.
                          </p>
                          <blockquote className="font-cormorant italic text-lg text-[#ffd27d] border-l-2 border-[#c5a059] pl-4 py-1">
                            “चार दिन की चांदनी फेर अंधेरी रात सै, क्यूं घमंड करै बन्दे, दो दिन की तेरी औकात सै।”
                          </blockquote>
                        </div>

                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[#c5a059]/50 shadow-lg">
                            <img src="/assets/portrait_mange_ram.jpg" alt="Mange Ram" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[#c5a059]/50 shadow-lg">
                            <img src="/assets/portrait_bansidhar.jpg" alt="Bansidhar" className="w-full h-full object-cover" />
                          </div>
                        </div>

                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------
                    STAGE 07: THE ARCHIVE (WHERE THE WORD SURVIVED)
                    Only revealed after the journey has progressed!
                    ------------------------------------------------------------ */}
                {currentRiverIndex === 6 && (
                  <motion.div
                    key="stage-archive"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <EditorialStageReveal
                      stage={RIVER_STAGES[6]}
                      onAdvance={null}
                    >
                      {/* 3D Shelf Display */}
                      <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/40 bg-[#120703] shadow-[0_30px_90px_rgba(0,0,0,0.98)]">
                        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                          <img
                            src="/assets/archive_wooden_shelf.jpg"
                            alt="3D antique wooden archive shelf with ancient manuscripts, leather book, handwritten pages, and gramophone"
                            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>

                        {/* Interactive Shelf Objects Strip */}
                        <div className="relative z-10 bg-[#150904]/95 border-t border-[#c5a059]/35 px-4 sm:px-8 py-6">
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {[
                              { label: 'MANUSCRIPTS', specIndex: 0, desc: 'Birch Bark Folio' },
                              { label: 'OLD PUBLICATIONS', specIndex: 2, desc: 'Litho Chapbook' },
                              { label: 'HANDWRITTEN PAGES', specIndex: 1, desc: 'Saang Ledger' },
                              { label: 'ORAL RECORDINGS', specIndex: 3, desc: 'Shellac 78 RPM' },
                              { label: 'PRINTED BOOKS', specIndex: 4, desc: 'First Edition' },
                            ].map((item, idx) => (
                              <button
                                key={item.label}
                                onClick={() => setActiveArchiveModal(ARCHIVAL_SPECIMENS[item.specIndex])}
                                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-[#1d0f08]/80 hover:bg-[#2d160c] border border-[#c5a059]/25 hover:border-[#ffd27d] transition-all duration-300 cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.7)] hover:-translate-y-1"
                              >
                                <span className="text-[10px] font-cinzel text-[#c5a059] tracking-widest uppercase block mb-1">
                                  0{idx + 1}
                                </span>
                                <h4 className="font-cinzel text-xs sm:text-sm text-[#f5e9d2] group-hover:text-[#ffd27d] font-semibold tracking-wider uppercase transition-colors">
                                  {item.label}
                                </h4>
                                <span className="text-[10px] font-cormorant italic text-[#c5a059] mt-0.5">
                                  {item.desc}
                                </span>
                                <span className="mt-2 text-[9px] font-cinzel text-[#ffd27d]/60 group-hover:text-[#ffd27d] tracking-widest uppercase">
                                  INSPECT FOLIO →
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Completion Prompt */}
                      <div className="p-6 rounded-2xl bg-[#1a0e08]/90 border border-[#c5a059]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-cinzel text-[#c5a059] tracking-widest uppercase block font-semibold">
                            JOURNEY CULMINATION:
                          </span>
                          <p className="font-cormorant italic text-lg text-[#fff0d0]">
                            You have traversed seven epochs of memory, from spoken chants to the preserved archive.
                          </p>
                        </div>
                        <a
                          href="#epilogue"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ffd27d]/60 bg-[#2a140a] hover:bg-[#ffd27d] text-[#ffd27d] hover:text-[#120804] text-xs font-cinzel tracking-widest uppercase transition-all cursor-pointer font-bold shrink-0 shadow-lg"
                        >
                          <span>CONCLUDE JOURNEY</span>
                          <ChevronDown className="w-4 h-4" />
                        </a>
                      </div>
                    </EditorialStageReveal>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

          {/* ==================================================================
              EPILOGUE: THE WORD CONTINUES
              Quiet cinematic conclusion & next chapter navigation
              ================================================================== */}
          <section 
            id="epilogue" 
            className={`pt-16 border-t border-[#c5a059]/30 text-center max-w-4xl mx-auto space-y-8 transition-opacity duration-1000 ${
              hasEnteredRiver || parchmentPhase >= 5 ? 'opacity-100 block' : 'hidden opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              <IndianFolkBirdMotif />
              <div className="space-y-2">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.36em] uppercase font-semibold block">
                  CIVILIZATIONAL CONTINUUM
                </span>
                <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal uppercase tracking-wide">
                  The Word Continues
                </h2>
              </div>
              <IndianFolkBirdMotif flip={true} />
            </div>

            <p className="font-cormorant italic text-2xl sm:text-3xl text-[#fff0d0] leading-relaxed max-w-2xl mx-auto">
              “From voices remembered to words written,<br />Haryana’s literary tradition continues to evolve.”
            </p>

            {/* Chapter Navigation */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#c5a059]/25">
              <button
                onClick={() => {
                  if (onNavigateToFolkArts) {
                    onNavigateToFolkArts();
                  } else {
                    window.history.pushState(null, '', '/haryana/folk-arts/journey');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#c5a059]/50 bg-[#160c07] hover:bg-[#28140a] text-[#ffd27d] text-xs font-cinzel tracking-[0.22em] uppercase transition-all cursor-pointer font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>← FOLK ARTS</span>
              </button>

              <button
                onClick={() => {
                  if (onBackToGate) {
                    onBackToGate();
                  } else {
                    window.history.pushState(null, '', '/haryana');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="px-6 py-2 rounded-full border border-[#c5a059]/30 bg-[#140a05] hover:bg-[#221008] text-[#c5a059] hover:text-[#ffd27d] text-[11px] font-cinzel tracking-widest uppercase transition-all cursor-pointer"
              >
                RETURN TO HARYANA GATE
              </button>

              <button
                onClick={() => {
                  if (onNavigateToArtisans) {
                    onNavigateToArtisans();
                  } else {
                    window.history.pushState(null, '', '/haryana/folk-arts/artisans');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#c5a059]/50 bg-[#160c07] hover:bg-[#28140a] text-[#ffd27d] text-xs font-cinzel tracking-[0.22em] uppercase transition-all cursor-pointer font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
              >
                <span>ARTISANS →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* ====================================================================
          MODAL: VOICES OF HARYANA BIOGRAPHICAL MONOGRAPH
          ==================================================================== */}
      <AnimatePresence>
        {activeVoiceModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-[#070301]/94 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#160c07] border-2 border-[#c5a059]/60 p-6 sm:p-10 text-[#f5e9d2] shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6"
            >
              <button
                onClick={() => setActiveVoiceModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#c5a059]/40 bg-[#221008] text-[#ffd27d] hover:bg-[#c5a059] hover:text-[#120804] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
                <span>{activeVoiceModal.era}</span>
                <span>·</span>
                <span>{activeVoiceModal.region}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden border border-[#c5a059]/50 shrink-0 bg-[#0c0603]">
                  <img src={activeVoiceModal.portrait} alt={activeVoiceModal.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-cinzel text-3xl sm:text-4xl text-[#ffd27d] font-normal">
                    {activeVoiceModal.name}
                  </h2>
                  <p className="font-cormorant italic text-2xl text-[#fff0d0]">
                    {activeVoiceModal.vernacular}
                  </p>
                  <p className="text-xs font-cinzel text-[#e8c46a] tracking-wider uppercase font-semibold">
                    {activeVoiceModal.epithet}
                  </p>
                  <blockquote className="font-cormorant italic text-xl text-[#ffd27d] border-l-2 border-[#c5a059] pl-4 my-3 leading-relaxed">
                    “{activeVoiceModal.quote}”
                  </blockquote>
                </div>
              </div>

              <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed border-t border-[#c5a059]/20 pt-4">
                {activeVoiceModal.summary}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  CELEBRATED COMPOSITIONS & TEXTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeVoiceModal.works.map((work) => (
                    <span key={work} className="px-3.5 py-1.5 rounded-full bg-[#201008] border border-[#c5a059]/40 text-xs font-cinzel text-[#ffd27d]">
                      {work}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#c5a059]/20">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  HISTORICAL CONTRIBUTION
                </span>
                <p className="font-cormorant text-xl text-[#e8d8b8]">
                  {activeVoiceModal.contribution}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL: ARCHIVAL FOLIO INSPECTOR
          ==================================================================== */}
      <AnimatePresence>
        {activeArchiveModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-[#070301]/94 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#160c07] border-2 border-[#c5a059]/60 p-6 sm:p-10 text-[#f5e9d2] shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6"
            >
              <button
                onClick={() => setActiveArchiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#c5a059]/40 bg-[#221008] text-[#ffd27d] hover:bg-[#c5a059] hover:text-[#120804] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
                <span className="px-3 py-1 rounded-full bg-[#201008] border border-[#c5a059]/40 text-[#ffd27d]">
                  ACCESSION: {activeArchiveModal.accession}
                </span>
                <span>·</span>
                <span>{activeArchiveModal.era}</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl text-[#ffd27d] font-normal">
                {activeArchiveModal.title}
              </h2>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#c5a059]/40 bg-[#0c0603]">
                <img
                  src={activeArchiveModal.image}
                  alt={activeArchiveModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-cinzel border-y border-[#c5a059]/25 py-4">
                <div>
                  <span className="text-[#c5a059] block">MEDIUM:</span>
                  <span className="text-[#fff0d0]">{activeArchiveModal.medium}</span>
                </div>
                <div>
                  <span className="text-[#c5a059] block">DIMENSIONS:</span>
                  <span className="text-[#fff0d0]">{activeArchiveModal.dimensions}</span>
                </div>
              </div>

              <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed">
                {activeArchiveModal.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#201008] border border-[#c5a059]/30 space-y-1">
                <span className="text-[11px] font-cinzel text-[#ffd27d] tracking-wider uppercase block font-semibold">
                  CURATORIAL PROVENANCE RECORD
                </span>
                <p className="font-cormorant italic text-lg text-[#e8d8b8]">
                  {activeArchiveModal.provenance}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
