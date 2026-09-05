import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  X, 
  BookOpen, 
  Scroll, 
  Compass, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  FileText 
} from 'lucide-react';
import AudioControl from './AudioControl';
import audioManager from '../services/audioManager';

/**
 * ============================================================================
 * STHANESHWAR MAHADEV TEMPLE IMMERSIVE EXPERIENCE
 * 
 * Hierarchy:
 *   CHAMBER 1: WALKTHROUGH ("Enter the Sanctum")
 *   CHAMBER 2: EXPLORE MORE ("Step deeper into the story") - 10 Chapters, Timeline, Reading the Evidence
 *   CHAMBER 3: DEEP DIVE / RESEARCH ARCHIVE ("Real external sources, ASI, Govt records")
 * ============================================================================
 */

export default function SthaneshwarTempleExperience({
  temple,
  onBackToArchive,
  onExploreAnotherTemple
}) {
  // Chamber State: 'walkthrough' | 'explore-more' | 'deep-dive'
  const [chamber, setChamber] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlChamber = params.get('chamber');
      if (urlChamber === 'deep-dive' || urlChamber === 'archive' || window.location.hash === '#archive' || window.location.hash === '#deep-dive') {
        return 'deep-dive';
      }
      if (urlChamber === 'explore-more' || window.location.hash === '#explore') {
        return 'explore-more';
      }
    }
    return 'walkthrough';
  });
  const [activeChapter, setActiveChapter] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState('shikhara');
  const [activeEvidenceTab, setActiveEvidenceTab] = useState('tradition');
  const [activeTimelineEra, setActiveTimelineEra] = useState('harsha');
  const [isTransitioningChamber, setIsTransitioningChamber] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedRecordFilter, setSelectedRecordFilter] = useState('ALL');

  // Track scroll depth for dynamic atmospheric response
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / totalHeight)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chamber]);

  // Synchronize audio environment with specific temple chambers
  useEffect(() => {
    if (chamber === 'deep-dive') {
      audioManager.setResearchMode();
    } else if (chamber === 'explore-more') {
      audioManager.setExploreMoreMode();
    } else {
      audioManager.enterTemple();
    }
  }, [chamber]);


  // Leave temple on unmount
  useEffect(() => {
    return () => {
      audioManager.leaveTemple();
    };
  }, []);

  // Chamber transition handler
  const handleTransitionToChamber = (targetChamber) => {
    setIsTransitioningChamber(true);

    if (targetChamber === 'deep-dive') {
      audioManager.setResearchMode();
    } else if (targetChamber === 'explore-more') {
      audioManager.setExploreMoreMode();
    } else {
      audioManager.enterTemple();
    }

    setTimeout(() => {
      setChamber(targetChamber);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (targetChamber === 'walkthrough') {
          url.searchParams.delete('chamber');
        } else {
          url.searchParams.set('chamber', targetChamber);
        }
        window.history.replaceState({}, '', url.toString());
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setIsTransitioningChamber(false);
      }, 400);
    }, 450);
  };

  // Drifting golden diya particles
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 6.2) % 94 + 3}%`,
    bottom: `${(i * 9) % 85 + 5}%`,
    size: `${2 + (i % 3) * 1.4}px`,
    opacity: 0.28 + (i % 4) * 0.12,
  }));

  // ==========================================================================
  // REAL RESEARCH SOURCES DATA (VERIFIED AUTHORITATIVE EXTERNAL SOURCES)
  // ==========================================================================
  const researchSources = [
    {
      id: 'haryana-tourism',
      title: 'Sthaneshwara Mahadev Temple Heritage Documentation',
      author: 'Haryana Tourism Corporation',
      institution: 'Government of Haryana',
      year: 'Official State Heritage Register',
      type: 'GOVERNMENT HERITAGE RECORD',
      confidence: 'OFFICIAL STATE AUTHORITY',
      url: 'https://haryanatourism.gov.in/destination/sthaneshwar-mahadev-temple/',
      description: 'Official state heritage profile documenting the Shaivite traditions of Thanesar, the sacred tank associated with mythological and ancient healing lore, and the temple’s central role within the 48-kos parikrama circuit of Kurukshetra.',
      keyPoints: [
        'Recognized state religious monument in Thanesar',
        'Traditional association with the Pandavas and Lord Shiva',
        'Official custodian records for Kurukshetra heritage tourism'
      ]
    },
    {
      id: 'kurukshetra-gov',
      title: 'Sthaneshwar Mahadev Mandir Administrative Record',
      author: 'District Administration Kurukshetra',
      institution: 'Government of Haryana',
      year: 'Official District Gazetteer',
      type: 'ADMINISTRATIVE GAZETTEER',
      confidence: 'DISTRICT ADMINISTRATION',
      url: 'https://kurukshetra.gov.in/tourist-place/sthaneshwar-mahadev-temple/',
      description: 'Civic and religious gazetteer maintaining the administrative records, festival schedules (such as Maha Shivratri), and local pilgrimage coordination for Sthaneshwar Mahadev Mandir in Thanesar.',
      keyPoints: [
        'Detailed geographic coordinates and administrative boundaries',
        'Official parikrama node under Kurukshetra pilgrimage management',
        'Records living worship protocols and seasonal congregation data'
      ]
    },
    {
      id: 'asi-thanesar',
      title: 'Excavations at Harsh-ka-Tila, Thanesar (Kurukshetra)',
      author: 'Archaeological Survey of India (ASI)',
      institution: 'Ministry of Culture, Government of India',
      year: 'Indian Archaeology — A Review (1987–1990)',
      type: 'ARCHAEOLOGICAL EXCAVATION REPORT',
      confidence: 'ARCHAEOLOGICAL SURVEY OF INDIA',
      url: 'https://asi.nic.in/',
      description: 'Systematic archaeological excavations at the historic mound of Harsh-ka-Tila in Thanesar. The stratigraphic excavations revealed continuous cultural occupation from Painted Grey Ware (PGW), through Kushana, Gupta, and Vardhana periods up to the late medieval era.',
      keyPoints: [
        'Material evidence of ancient city fortifications and brick structures',
        'Terracotta seals, coins, and pottery confirming Pushyabhuti era prosperity',
        'Stratigraphic proof of Thanesar as a major urban and political hub'
      ]
    },
    {
      id: 'harshacharita',
      title: 'The Harshacharita (Chapter III: The Description of Srikantha & Sthanvishvara)',
      author: 'Banabhatta (Court Poet of Emperor Harshavardhana)',
      institution: 'Classical Sanskrit Chronicle (Trans. E.B. Cowell & F.W. Thomas)',
      year: 'c. 625–645 CE',
      type: 'CLASSICAL LITERARY SOURCE',
      confidence: 'CONTEMPORARY 7TH-CENTURY CHRONICLE',
      url: 'https://www.sacred-texts.com/hin/harsha/',
      description: 'The premier contemporary 7th-century biographical chronicle of King Harshavardhana. Banabhatta vividly details the province of Srikantha and the city of Sthanvishvara, describing streets resoundingly dedicated to Mahadeva, temple lamps, bilva leaf offerings, and royal Shaivite devotions.',
      keyPoints: [
        'Earliest detailed literary depiction of Sthanvishvara as a Shaivite sanctuary',
        'Describes King Prabhakaravardhana’s devout worship of the Sun and Shiva',
        'Establishes the linguistic and spiritual continuity of the name Sthaneshwar'
      ]
    },
    {
      id: 'xuanzang',
      title: 'Si-Yu-Ki: Buddhist Records of the Western World (Account of Sa-t’a-ni-ssu-fa-lo / Sthaneshvara)',
      author: 'Xuanzang (Hiuen Tsang)',
      institution: 'Historical Chinese Travelogue (Trans. Samuel Beal)',
      year: 'c. 630–640 CE',
      type: 'CLASSICAL TRAVELOGUE & TOPOGRAPHY',
      confidence: 'INDEPENDENT EYEWITNESS ACCOUNT',
      url: 'https://archive.org/details/buddhistrecordso01hsuoft',
      description: 'The firsthand travelogue of Buddhist pilgrim Xuanzang during his stay in Emperor Harsha’s dominions. He records the capital of Sthanvishvara with its fertile soil, thriving trade, numerous Deva (Hindu) temples, and widespread ascetics dedicated to spiritual austerities.',
      keyPoints: [
        'Independent foreign eyewitness validation of Thanesar in the 7th century',
        'Notes high regard for virtuous conduct, scholarship, and Shaivite shrines',
        'Confirms the sacred landscape around the Saraswati river basin'
      ]
    },
    {
      id: 'kdb-parikrama',
      title: '48-Kos Tirtha Parikrama of Kurukshetra Sacred Register',
      author: 'Kurukshetra Development Board (KDB)',
      institution: 'Statutory Board, Government of Haryana',
      year: 'Tirtha Documentation Register',
      type: 'SACRED GEOGRAPHY REGISTER',
      confidence: 'STATUTORY HERITAGE BOARD',
      url: 'https://kurukshetra.gov.in/',
      description: 'Comprehensive documentation of the traditional 134 tirthas comprising the venerable 48-kos parikrama circuit. Sthaneshwar is registered as an indispensable foundational shrine through which pilgrims perform circumambulatory rituals.',
      keyPoints: [
        'Official boundary mapping of the Kurukshetra sacred geography',
        'Preserves ancient ritual protocols and sacred bathing procedures',
        'Coordinates pilgrim heritage pathways across Kurukshetra and Kaithal'
      ]
    }
  ];

  // ==========================================================================
  // EXPLORE MORE: 5 CONTINUOUS STORY-FIRST NARRATIVE CHAPTERS
  // 70–80% typography / narrative, 20–30% imagery
  // ==========================================================================
  const fiveChapters = [
    {
      num: 1,
      roman: 'I',
      title: 'THE LAND OF THANESAR',
      sub: 'Sacred Geography · The Saraswati Basin · Ancient Sthanvishvara',
      badge: 'SACRED GEOGRAPHY',
      badgeType: 'tradition',
      marginalNote: '“The Saraswati, though receding beneath surface sands in memory, was believed to nourish this holy soil in secret spiritual currents...”',
      img: '/assets/haryana_countryside.jpg',
      imgCaption: 'Ancient alluvial expanse of Kurukshetra along the historic Saraswati river basin',
      paragraphs: [
        'Thanesar rises upon an ancient alluvial ridge where the legendary Saraswati river and its tributaries once flowed. Known in Vedic literature and the Mahabharata as the heart of Brahmavarta—the sacred tract between the holy Saraswati and Drishadvati rivers—this territory was revered as the primeval axis of Dharma and moral order.',
        'Early forest hermits and ascetic lineages recognized the unique sacred ecology of this flood basin. The confluence of perennial waters and quiet groves gave rise to sacrificial ashramas, converting the physical earth into a consecrated landscape. Here, water was not merely sustenance, but an elemental medium of spiritual purification, establishing the foundations of Sthanvishvara as a venerable northern Shaivite tirtha.',
        'Over successive centuries, these quiet hermitages evolved into a pivotal node along trans-regional travel and pilgrimage corridors connecting the Gangetic plains to the northwestern passes. Yet even as royal armies and merchant caravans traversed the realm, the sacred geography of Thanesar remained an unbroken sanctuary of meditation, sacred kundas, and continuous devotion.'
      ]
    },
    {
      num: 2,
      roman: 'II',
      title: 'THE SACRED TRADITION',
      sub: 'Sthaneshwar Mahadeva · The Pandava Association · Local Sacred Memory',
      badge: 'TEMPLE TRADITION & EPIC LORE',
      badgeType: 'tradition',
      marginalNote: '“Temple memory preserves the quiet prayer whispered here on the eve of the great battle...”',
      img: '/assets/temple_interior_walkthrough.jpg',
      imgCaption: 'The subterranean sanctum preserving the Svayambhu Shivalinga in eternal twilight',
      paragraphs: [
        'The name Sthaneshwar is a vernacular continuity of the Sanskrit Sthanvishvara—meaning the “Abode of the Lord” (Sthana + Ishvara)—designating Mahadeva as the sovereign master of this sacred seat. Local belief holds that the central lingam is Svayambhu (self-manifested), pre-dating any constructed edifice of brick or carved stone.',
        'According to deeply rooted regional tradition, on the eve of the Kurukshetra war, the five Pandava brothers and Lord Krishna walked to the quiet waters of Sthaneshwar. Confronted by the colossal moral weight of the impending fratricidal trial, they performed solemn Rudra-abhisheka before Mahadeva, invoking divine grace for righteousness and fortitude in battle. Tradition recounts that Lord Shiva blessed their righteous cause, establishing the shrine as an eternal haven where virtue overcomes despair.',
        'Complementing this epic tradition is the ancient lore of King Vena, afflicted with an incurable disease, who was healed after bathing in the sanctum’s holy waters. While modern historical methodology distinguishes between sacred legend and empirical documentation, these narratives represent the living soul of the temple, sustained unbroken across millennia of worship.'
      ]
    },
    {
      num: 3,
      roman: 'III',
      title: 'THANESAR AND THE VARDHANA AGE',
      sub: '7th-Century Imperial Seat · Harshavardhana · Classical Literary Chronicles',
      badge: 'HISTORICAL RECORD · LITERARY SOURCES',
      badgeType: 'history',
      marginalNote: '“‘The city was like an earthly abode of Mahadeva... scented with burning incense and echoing with temple bells.’ — Banabhatta, Harshacharita”',
      img: '/assets/temple_carved_stonework.jpg',
      imgCaption: 'Aged sandstone relief and floral carvings from classical post-Gupta craftsmanship',
      paragraphs: [
        'During the late 6th and early 7th centuries CE, Thanesar flourished as the imperial capital of the Pushyabhuti (Vardhana) dynasty. Under King Prabhakaravardhana and his illustrious successor, Emperor Harshavardhana (reigned 606–647 CE), the city became the cultural, political, and spiritual hub of northern India.',
        'Court poet Banabhatta in the Harshacharita provides a vivid, firsthand portrayal of Sthanvishvara: the city was fragrant with smoke rising from continuous Shaivite fire altars, the thoroughfares echoed with the chanting of sacred hymns and the chiming of bronze bells, and royal endowments regularly enriched monasteries, feeding houses, and stone sanctuaries. Devotion to Shiva was deeply entwined with imperial statecraft, with monarchs seeking Mahadeva’s benediction for royal consecrations.',
        'Visiting Chinese scholar-pilgrim Xuanzang (Huien Tsang) directly corroborated this flourishing heritage. Traveling through Thanesar during Harsha’s reign, Xuanzang recorded a populous, cultured city with numerous Deva temples and a large community of devout Pashupata Shaivite ascetics living in mutual amity alongside Buddhist monastics.'
      ]
    },
    {
      num: 4,
      roman: 'IV',
      title: 'THE TEMPLE THROUGH TIME',
      sub: 'Medieval Turbulence · Preservation of the Sanctum · 1761 Maratha Reconstruction',
      badge: 'HISTORICAL RECORD · ARCHAEOLOGICAL CHRONICLE',
      badgeType: 'history',
      marginalNote: '“The stone endured because the living devotion never deserted the sanctum.”',
      img: '/assets/pillars_frame.jpg',
      imgCaption: 'Interlocking sandstone pillars and vaulting renovated under Maratha patronage',
      paragraphs: [
        'With the decentralization of the Vardhana empire, Thanesar was positioned directly along northern India’s strategic military corridor. In 1014 CE, the forces of Mahmud of Ghazni plundered the city, damaging its above-ground monumental superstructures. Yet despite widespread devastation, hereditary priests and resident ascetics tenaciously guarded the subterranean sanctum, concealing and shielding the sacred lingam beneath stone debris.',
        'For centuries, devotional rites persisted quietly in subterranean chambers. Monumental architectural revival arrived in the 18th century with the northward expansion of the Maratha Empire. In 1761 CE, Maratha commander Sadashivrao Bhau halted his forces at Thanesar prior to the Third Battle of Panipat. He prayed at Sthaneshwar Mahadev for victory and commissioned extensive stone reconstructions of the present sanctum, its curvilinear spire, and the stepped pavilions surrounding the sarovar.',
        'The surviving temple fabric physically chronicles this multi-layered history: weathered ancient sandstone plinths from earlier medieval periods are skillfully integrated with the 18th-century Maratha lime-brick vaulting, dome structures, and water pavilions.'
      ]
    },
    {
      num: 5,
      roman: 'V',
      title: 'THE LIVING SANCTUM',
      sub: 'Present-Day Worship · Rituals · The Sacred Sarovar · Continuing Devotion',
      badge: 'LIVING HERITAGE & PILGRIMAGE TRADITION',
      badgeType: 'living',
      marginalNote: '“Every twilight, the same conch chimes that sounded for seventh-century kings and medieval ascetics...”',
      img: '/assets/sthaneshwar_temple_hero.jpg',
      imgCaption: 'Evening oil lamps floating upon the calm waters of the sacred Sthaneshwar Sarovar',
      paragraphs: [
        'Today, Sthaneshwar Mahadev Temple stands as a living, vibrant sanctuary rather than an archaeological relic. Pilgrims descend worn stone stairs into the subterranean garbhagriha, where cool stone chambers smell of fresh camphor, crushed Bilva leaves, and burning ghee wicks.',
        'Hereditary priests perform daily morning and evening abhishekam of the Svayambhu lingam with panchamrita and pure water, reciting ancient hymns from the Shri Rudram. Devotees pause at the sacred threshold stone in quiet devotion, honoring an unbroken lineage of prayer that has outlasted multiple dynastic transformations.',
        'The adjoining stepped sarovar remains a center of ritual life. On Maha Shivratri, tens of thousands of pilgrims gather along its stone ghats, chanting praises of Mahadeva and floating earthen lamps whose golden reflections turn the waters into a mirror of the night sky. Recognized today under Haryana’s state heritage register and serving as the northern guardian of the 48-kos Kurukshetra parikrama, Sthaneshwar remains an enduring sanctuary of living faith.'
      ]
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0c0704] text-[#fff6e0] select-none">

      {/* ====================================================================
          ENVIRONMENTAL BACKGROUND LAYERS
          Chambers 1 & 2: Temple Interior, Sanctum Radiance, Diya Embers
          Chamber 3: Deep Espresso / Dark Walnut Scholarly Study Archive
          ==================================================================== */}
      {/* Universal Deep Base Layer */}
      <div className="fixed inset-0 bg-[#0c0704] pointer-events-none z-0" />

      {/* --- TEMPLE ENVIRONMENT (Active ONLY for 'walkthrough' & 'explore-more') --- */}
      {chamber !== 'deep-dive' && (
        <>
          {/* Cinematic Ancient Temple Interior Backdrop */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 transition-opacity duration-1000 ease-out"
            style={{ 
              backgroundImage: `url('/assets/temple_interior_walkthrough.jpg')`,
              transform: `scale(${1 + scrollProgress * 0.05})`,
            }}
          />

          {/* Atmospheric Sanctum Radiance: Warm golden diya glow */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 55%, rgba(255, 185, 80, 0.22) 0%, rgba(180, 110, 40, 0.14) 35%, rgba(20, 10, 4, 0.70) 70%, rgba(8, 4, 2, 0.96) 100%)'
            }}
          />

          {/* Subtle Incense Haze */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 50% 65%, rgba(255, 215, 130, 0.25) 0%, transparent 65%)'
            }}
          />

          {/* Cinematic Deep Stone Shadows Vignette */}
          <div className="fixed inset-0 pointer-events-none z-0 shadow-[inset_0_0_150px_rgba(6,3,1,0.95),inset_0_0_80px_rgba(14,7,3,0.85)]" />

          {/* Gentle Floating Diya Sparks / Embers */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
              <div
                key={`ember-${p.id}`}
                className="absolute rounded-full bg-[#ffd27d] animate-pulse"
                style={{
                  left: p.left,
                  bottom: p.bottom,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                  filter: 'blur(0.8px)',
                  boxShadow: '0 0 8px #ffd27d'
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* --- SCHOLARLY ARCHIVE ENVIRONMENT (Active ONLY for 'deep-dive') --- */}
      {chamber === 'deep-dive' && (
        <>
          {/* Deep Espresso & Dark Walnut Ambient Atmospheric Gradient */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
            style={{
              background: `
                radial-gradient(ellipse 95% 75% at 50% 25%, rgba(42, 22, 12, 0.75) 0%, rgba(24, 13, 7, 0.88) 45%, rgba(12, 6, 3, 0.98) 85%, #080402 100%),
                linear-gradient(to bottom, #120904 0%, #180e07 35%, #140b05 70%, #0c0603 100%)
              `
            }}
          />

          {/* Extremely Subtle Archival Paper Fiber Grain / Texture Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Faint Irregular Aged-Paper Marks & Burnt Umber Patina */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 18% 22%, rgba(197, 160, 89, 0.04) 0%, transparent 40%),
                radial-gradient(circle at 82% 65%, rgba(197, 160, 89, 0.03) 0%, transparent 45%),
                radial-gradient(circle at 45% 85%, rgba(140, 75, 30, 0.04) 0%, transparent 50%)
              `
            }}
          />

          {/* Archival Vignette: Deep, soft dark walnut frame */}
          <div className="fixed inset-0 pointer-events-none z-0 shadow-[inset_0_0_200px_rgba(4,2,1,0.96),inset_0_0_90px_rgba(10,5,2,0.85)]" />

          {/* Subtle Archival Margin Rule Accents (Faint antique-gold ledger lines at margins) */}
          <div className="fixed inset-y-0 left-6 sm:left-12 w-[1px] bg-[#c5a059]/[0.06] pointer-events-none z-0 hidden md:block" />
          <div className="fixed inset-y-0 right-6 sm:right-12 w-[1px] bg-[#c5a059]/[0.06] pointer-events-none z-0 hidden md:block" />
        </>
      )}

      {/* ====================================================================
          TOP NAVIGATION BAR (ADAPTS PER CHAMBER)
          ==================================================================== */}
      <header className="fixed top-5 left-5 right-5 sm:left-8 sm:right-8 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {chamber === 'walkthrough' ? (
            <button
              onClick={() => {
                audioManager.leaveTemple();
                onBackToArchive();
              }}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/50 bg-[#160b06]/90 hover:bg-[#28130a] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
              <span>← TEMPLES ARCHIVE</span>
            </button>
          ) : chamber === 'explore-more' ? (
            <button
              onClick={() => handleTransitionToChamber('walkthrough')}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/50 bg-[#160b06]/90 hover:bg-[#28130a] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
              <span>← TEMPLE SANCTUM</span>
            </button>
          ) : (
            <button
              onClick={() => handleTransitionToChamber('explore-more')}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/50 bg-[#160b06]/90 hover:bg-[#28130a] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
              <span>← EXPLORE STORY</span>
            </button>
          )}
        </div>

        {/* Right Badge / Status & Subtle Audio Control */}
        <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
          <AudioControl />
          {chamber === 'walkthrough' ? (
            <div className="bg-[#160b06]/90 px-4 py-2 rounded-full border border-[#c5a059]/40 text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em] shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
              <span>STHANESHWAR · ENTRY 01</span>
            </div>
          ) : chamber === 'explore-more' ? (
            <div className="bg-[#160b06]/90 px-4 py-2 rounded-full border border-[#c5a059]/40 text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em] shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
              <span>CHAPTER {String(activeChapter).padStart(2, '0')} / 05</span>
            </div>
          ) : (
            <div className="bg-[#160b06]/90 px-4 py-2 rounded-full border border-[#c5a059]/40 text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.20em] shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffd27d]" />
              <span>RESEARCH ARCHIVE · VERIFIED</span>
            </div>
          )}
        </div>
      </header>

      {/* Cinematic Golden Sweep Transition Between Chambers */}
      <AnimatePresence>
        {isTransitioningChamber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#0a0503]/90 flex items-center justify-center backdrop-blur-xs"
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

      {/* ====================================================================
          CHAMBER 1: THE MAIN WALKTHROUGH EXPERIENCE ("ENTER THE SANCTUM")
          ==================================================================== */}
      {chamber === 'walkthrough' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full overflow-hidden"
        >
          {/* ================================================================
              HERO: ENTER THE SANCTUM
              Full-screen cinematic temple interior hero with minimal text
              ================================================================ */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto flex flex-col items-center"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#c5a059]/60" />
                <span className="text-[#c5a059] text-[10px]">❖</span>
                <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.32em] text-[#ffd27d] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  ENTERING THE SACRED SANCTUM
                </span>
                <span className="text-[#c5a059] text-[10px]">❖</span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#c5a059]/60" />
              </div>

              {/* Large Title */}
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.05em] text-[#fff6e0] uppercase leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                STHANESHWAR<br />
                <span>MAHADEV TEMPLE</span>
              </h1>

              {/* Geographic Subtitle */}
              <p className="font-marcellus text-sm sm:text-base tracking-[0.24em] text-[#d6b278] uppercase mt-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                THANESAR · KURUKSHETRA · HARYANA
              </p>

              {/* Poetic Introduction */}
              <p className="font-manuscript text-lg sm:text-2xl text-[#f3e5ca] italic max-w-2xl mt-6 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
                “Where stone, water and memory meet — a sacred place shaped by centuries of devotion.”
              </p>

              {/* Subtle Scroll Invitation CTA */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="mt-16 sm:mt-24 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                onClick={() => {
                  const el = document.getElementById('sacred-threshold');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="font-cinzel text-[10px] uppercase tracking-[0.28em] text-[#ffd27d]">
                  EXPLORE THE TEMPLE ↓
                </span>
                <div className="w-5 h-8 rounded-full border border-[#c5a059]/50 flex items-start justify-center p-1">
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-1 h-1.5 rounded-full bg-[#ffd27d]" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* ================================================================
              SECTION 1: THE SACRED THRESHOLD
              Concise, readable paragraphs on translucent dark stone plinth
              ================================================================ */}
          <section id="sacred-threshold" className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto relative z-10 py-24">
            <div className="relative rounded-xl bg-[#140a06]/85 border border-[#c5a059]/35 backdrop-blur-md p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-w-3xl">
              
              {/* Corner decorative ticks */}
              <span className="absolute top-2.5 left-2.5 text-[#c5a059]/50 text-xs font-cinzel">┌</span>
              <span className="absolute top-2.5 right-2.5 text-[#c5a059]/50 text-xs font-cinzel">┐</span>
              <span className="absolute bottom-2.5 left-2.5 text-[#c5a059]/50 text-xs font-cinzel">└</span>
              <span className="absolute bottom-2.5 right-2.5 text-[#c5a059]/50 text-xs font-cinzel">┘</span>

              {/* Small Gold Section Marker */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
                <span className="font-cinzel text-[11px] font-bold tracking-[0.28em] text-[#ffd27d] uppercase">
                  THE SACRED THRESHOLD
                </span>
              </div>

              <h2 
                className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.06em] text-[#fffdf7] uppercase mb-5 leading-tight"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)' }}
              >
                AN ANCIENT SANCTUARY OF THANESAR
              </h2>

              <p 
                className="font-marcellus text-base sm:text-[17px] text-[#f7eee1] leading-[1.8] mb-5 max-w-[620px]"
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
              >
                Standing on the historic northern gateway of Thanesar, this threshold marks the venerated cradle from which the ancient city took its name—<span className="text-[#ffd27d] font-semibold">Sthanvishvara</span>, meaning the <span className="italic text-[#ffd27d]">“Abode of the Lord.”</span> Along the ancient course of the sacred Saraswati river basin, centuries of devotion shaped this sanctuary into an enduring spiritual sanctuary.
              </p>

              <p 
                className="font-marcellus text-base sm:text-[17px] text-[#faefe0] leading-[1.8] mb-6 max-w-[620px]"
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
              >
                As a cardinal node in the traditional 48-kos parikrama circuit of Kurukshetra, Sthaneshwar links early Vedic hermitages, royal 7th-century Vardhana patronages, and uninterrupted living ritual. Across dynasties and changing centuries, the stone sanctum and holy water tank have remained unbroken in daily worship.
              </p>

              {/* Subtle Handwritten Annotation */}
              <div className="border-l-2 border-[#ffd27d]/60 pl-4 py-1.5 mt-4">
                <p 
                  className="font-handwriting text-xl sm:text-2xl text-[#fae1a6] italic leading-relaxed"
                  style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)' }}
                >
                  “Tradition remembers this threshold as the boundary between the temporal world and Mahadeva's timeless presence...”
                </p>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 2: THE STORIES WITHIN
              Connected vertical narrative path with continuous gold line
              Atmospheric feathered readability corridor (soft darkness / shadowed corridor)
              Strict factual distinction between Tradition and Historical Record
              ================================================================ */}
          <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto relative z-10 py-28">
            
            {/* Atmospheric Readability Corridor (Broad feathered dark warm-brown gradient) */}
            <div 
              className="absolute inset-0 -mx-8 sm:-mx-20 lg:-mx-28 pointer-events-none z-0"
              style={{
                background: `
                  radial-gradient(ellipse 85% 82% at 50% 50%, rgba(12, 6, 3, 0.62) 0%, rgba(12, 6, 3, 0.45) 50%, rgba(12, 6, 3, 0.12) 82%, transparent 100%),
                  linear-gradient(to right, transparent 0%, rgba(10, 5, 2, 0.52) 18%, rgba(10, 5, 2, 0.68) 50%, rgba(10, 5, 2, 0.52) 82%, transparent 100%)
                `,
                filter: 'blur(8px)',
              }}
            />

            {/* Faint Incense / Warm Amber Haze Layer */}
            <div 
              className="absolute inset-0 pointer-events-none z-0 opacity-40"
              style={{
                background: 'radial-gradient(circle at 50% 38%, rgba(212, 175, 55, 0.08) 0%, rgba(197, 160, 89, 0.03) 48%, transparent 70%)',
              }}
            />

            {/* Section Header */}
            <div className="mb-14 text-center max-w-xl mx-auto relative z-10">
              <div className="flex items-center justify-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
                <span className="font-cinzel text-[11px] font-bold tracking-[0.28em] text-[#ffd27d] uppercase">
                  NARRATIVE PATHWAY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
              </div>
              <h2 
                className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#fffdf7] uppercase"
                style={{ textShadow: '0 3px 18px rgba(0,0,0,0.98), 0 1px 4px rgba(0,0,0,0.9)' }}
              >
                THE STORIES WITHIN
              </h2>
              <p 
                className="font-marcellus text-sm sm:text-base text-[#e5c58e] tracking-[0.16em] uppercase mt-2.5"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}
              >
                A Connected Journey Through Lore, Chronicle, and Living Worship
              </p>
            </div>

            {/* Continuous Vertical Timeline with Thin Gold Connecting Line */}
            <div className="relative pl-6 sm:pl-10 border-l border-[#c5a059]/45 space-y-11 ml-2 sm:ml-6 relative z-10">

              {/* Milestone 01 */}
              <div className="relative group py-2">
                {/* Subtle feathered local readability haze behind text */}
                <div className="absolute -inset-y-2 -inset-x-4 rounded-2xl bg-gradient-to-r from-[#120904]/55 via-[#100703]/35 to-transparent pointer-events-none" />

                <span className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-[#180e08] border border-[#ffd27d] flex items-center justify-center text-[10px] font-cinzel font-bold text-[#ffd27d] shadow-[0_0_15px_rgba(255,210,125,0.35)] z-10">
                  01
                </span>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#261309]/90 border border-[#c5a059]/60 text-[10px] font-cinzel tracking-[0.14em] text-[#ffd27d] uppercase font-semibold">
                      HISTORICAL GEOGRAPHY
                    </span>
                  </div>
                  <h3 
                    className="font-cinzel text-xl sm:text-2xl font-semibold sm:font-bold text-[#fffdf7] uppercase mt-1 mb-2 tracking-[0.04em]"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
                  >
                    THE ANCIENT TIRTHA
                  </h3>
                  <p 
                    className="font-marcellus text-[15px] sm:text-[16.5px] text-[#f7eee1] leading-[1.8] max-w-[560px]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    Along the historic Saraswati drainage channel, early Vedic settlements revered this tract as holy ground. The sacred tank and ancient shrine emerged as an anchor for ascetic austerities, giving rise to Sthanvishvara as a principal northern Shaivite tirtha.
                  </p>
                </div>
              </div>

              {/* Milestone 02: Clearly Attributed as Traditional Belief */}
              <div className="relative group py-2">
                {/* Subtle feathered local readability haze behind text */}
                <div className="absolute -inset-y-2 -inset-x-4 rounded-2xl bg-gradient-to-r from-[#140805]/55 via-[#100703]/35 to-transparent pointer-events-none" />

                <span className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-[#180e08] border border-[#ffd27d] flex items-center justify-center text-[10px] font-cinzel font-bold text-[#ffd27d] shadow-[0_0_15px_rgba(255,210,125,0.35)] z-10">
                  02
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#3d180e]/90 border border-[#d4af37]/70 text-[10px] font-cinzel tracking-[0.14em] text-[#ffd27d] uppercase font-semibold">
                      TRADITIONAL BELIEF · EPIC LORE
                    </span>
                  </div>
                  <h3 
                    className="font-cinzel text-xl sm:text-2xl font-semibold sm:font-bold text-[#fffdf7] uppercase mt-1 mb-2 tracking-[0.04em]"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
                  >
                    THE PANDAVA TRADITION
                  </h3>
                  <p 
                    className="font-marcellus text-[15px] sm:text-[16.5px] text-[#f7eee1] leading-[1.8] max-w-[560px]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    According to deep-rooted local and temple tradition, the Pandava brothers and Lord Krishna prayed at Sthaneshwar on the eve of the Kurukshetra war. Tradition recounts that they invoked Mahadeva for righteousness and divine strength to face the trial of battle.
                  </p>
                  <p 
                    className="font-handwriting text-lg sm:text-xl text-[#fae1a6] italic mt-2.5 max-w-[560px]"
                    style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)' }}
                  >
                    * Temple memory preserves this sacred association, passed down through living storytelling.
                  </p>
                </div>
              </div>

              {/* Milestone 03: Documented Literary & Historical Record */}
              <div className="relative group py-2">
                {/* Subtle feathered local readability haze behind text */}
                <div className="absolute -inset-y-2 -inset-x-4 rounded-2xl bg-gradient-to-r from-[#0d1a11]/55 via-[#0e120d]/35 to-transparent pointer-events-none" />

                <span className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-[#180e08] border border-[#ffd27d] flex items-center justify-center text-[10px] font-cinzel font-bold text-[#ffd27d] shadow-[0_0_15px_rgba(255,210,125,0.35)] z-10">
                  03
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#16271c]/90 border border-[#68b082]/70 text-[10px] font-cinzel tracking-[0.14em] text-[#a4ebb9] uppercase font-semibold">
                      HISTORICAL RECORD · LITERARY SOURCE
                    </span>
                  </div>
                  <h3 
                    className="font-cinzel text-xl sm:text-2xl font-semibold sm:font-bold text-[#fffdf7] uppercase mt-1 mb-2 tracking-[0.04em]"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
                  >
                    THANESAR AND THE VARDHANA AGE
                  </h3>
                  <p 
                    className="font-marcellus text-[15px] sm:text-[16.5px] text-[#f7eee1] leading-[1.8] max-w-[560px]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    In the 7th century CE, Thanesar flourished as the royal seat of Emperor Harshavardhana. Court chronicler Banabhatta in the <span className="italic text-[#ffd27d] font-semibold">Harshacharita</span> and visiting scholar Xuanzang directly documented flourishing Shaivite worship, temple smoke, and royal donations within Sthanvishvara.
                  </p>
                </div>
              </div>

              {/* Milestone 04: Historical Reconstruction */}
              <div className="relative group py-2">
                {/* Subtle feathered local readability haze behind text */}
                <div className="absolute -inset-y-2 -inset-x-4 rounded-2xl bg-gradient-to-r from-[#120904]/55 via-[#100703]/35 to-transparent pointer-events-none" />

                <span className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-[#180e08] border border-[#ffd27d] flex items-center justify-center text-[10px] font-cinzel font-bold text-[#ffd27d] shadow-[0_0_15px_rgba(255,210,125,0.35)] z-10">
                  04
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#261309]/90 border border-[#c5a059]/60 text-[10px] font-cinzel tracking-[0.14em] text-[#ffd27d] uppercase font-semibold">
                      RECONSTRUCTION & RESILIENCE
                    </span>
                  </div>
                  <h3 
                    className="font-cinzel text-xl sm:text-2xl font-semibold sm:font-bold text-[#fffdf7] uppercase mt-1 mb-2 tracking-[0.04em]"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
                  >
                    THE TEMPLE THROUGH TIME
                  </h3>
                  <p 
                    className="font-marcellus text-[15px] sm:text-[16.5px] text-[#f7eee1] leading-[1.8] max-w-[560px]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    Surviving the medieval destruction of the city in 1014 CE, local Shaivite priests preserved the lingam. In 1761, Maratha commander Sadashivrao Bhau encamped here prior to the Third Battle of Panipat, worshipping Mahadeva and sponsoring renovations to the stone sanctum.
                  </p>
                </div>
              </div>

              {/* Milestone 05: Living Worship */}
              <div className="relative group py-2">
                {/* Subtle feathered local readability haze behind text */}
                <div className="absolute -inset-y-2 -inset-x-4 rounded-2xl bg-gradient-to-r from-[#120904]/55 via-[#100703]/35 to-transparent pointer-events-none" />

                <span className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-[#180e08] border border-[#ffd27d] flex items-center justify-center text-[10px] font-cinzel font-bold text-[#ffd27d] shadow-[0_0_15px_rgba(255,210,125,0.35)] z-10">
                  05
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#261309]/90 border border-[#c5a059]/60 text-[10px] font-cinzel tracking-[0.14em] text-[#ffd27d] uppercase font-semibold">
                      LIVING TRADITION
                    </span>
                  </div>
                  <h3 
                    className="font-cinzel text-xl sm:text-2xl font-semibold sm:font-bold text-[#fffdf7] uppercase mt-1 mb-2 tracking-[0.04em]"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
                  >
                    A LIVING PLACE OF WORSHIP
                  </h3>
                  <p 
                    className="font-marcellus text-[15px] sm:text-[16.5px] text-[#f7eee1] leading-[1.8] max-w-[560px]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    Today, the subterranean garbhagriha remains alive with chanting, fresh bilva leaf offerings, and the perpetual flame of ghee lamps. Sthaneshwar is not a museum relic, but an unbroken sacred sanctuary where pilgrims still cross to meet the divine.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ================================================================
              SECTION 3: ARCHITECTURE — "STONE & DEVOTION"
              Interactive Visual Callout Markers (① Shikhara, ② Stonework, ③ Pillar, ④ Tank)
              High contrast text, connected vertical explanation with thin gold line
              ================================================================ */}
          <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto relative z-10 py-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
                <span className="font-cinzel text-[11px] font-bold tracking-[0.28em] text-[#ffd27d] uppercase">
                  ARCHITECTURE OF THE SANCTUM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
              </div>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#fff6e0] uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
                STONE & DEVOTION
              </h2>
              <p className="font-marcellus text-sm sm:text-base text-[#d6b278] tracking-[0.16em] uppercase mt-2">
                Curvilinear Nagara Shikhara · Carved Sandstone · Sacred Tank
              </p>
            </div>

            {/* Split Interactive Architectural Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left: Large Architectural Photograph with Interactive Visual Markers */}
              <div className="lg:col-span-7 relative group">
                <div 
                  onClick={() => setModalImage('/assets/temple_carved_stonework.jpg')}
                  className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-[#c5a059]/40 cursor-pointer"
                  title="Click to view full photograph"
                >
                  <img
                    src="/assets/temple_carved_stonework.jpg"
                    alt="Carved Temple Stonework"
                    className="w-full h-auto max-h-[560px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  
                  {/* Organic dark vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-transparent to-[#0c0704]/40 pointer-events-none" />
                  <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(10,5,2,0.88)] pointer-events-none" />

                  {/* Marker ①: Shikhara */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.playPoojaBell(0.06);
                      setActiveHotspot('shikhara');
                    }}
                    className={`absolute top-[26%] right-[32%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'shikhara' ? 'bg-[#ffd27d] scale-110 shadow-[0_0_30px_#ffd27d]' : 'bg-[#180e08]/90 border border-[#ffd27d]/70 hover:scale-105'
                    }`}
                    title="Marker 1: Shikhara"
                  >
                    <span className={`text-xs font-cinzel font-bold ${activeHotspot === 'shikhara' ? 'text-[#180e08]' : 'text-[#ffd27d]'}`}>①</span>
                    <span className="absolute inset-0 rounded-full border border-[#ffd27d] animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Marker ②: Carved Stonework */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.playPoojaBell(0.06);
                      setActiveHotspot('stonework');
                    }}
                    className={`absolute top-[64%] right-[36%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'stonework' ? 'bg-[#ffd27d] scale-110 shadow-[0_0_30px_#ffd27d]' : 'bg-[#180e08]/90 border border-[#ffd27d]/70 hover:scale-105'
                    }`}
                    title="Marker 2: Carved Stonework"
                  >
                    <span className={`text-xs font-cinzel font-bold ${activeHotspot === 'stonework' ? 'text-[#180e08]' : 'text-[#ffd27d]'}`}>②</span>
                    <span className="absolute inset-0 rounded-full border border-[#ffd27d] animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Marker ③: Carved Pillar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.playPoojaBell(0.06);
                      setActiveHotspot('pillar');
                    }}
                    className={`absolute top-[48%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'pillar' ? 'bg-[#ffd27d] scale-110 shadow-[0_0_30px_#ffd27d]' : 'bg-[#180e08]/90 border border-[#ffd27d]/70 hover:scale-105'
                    }`}
                    title="Marker 3: Carved Pillar"
                  >
                    <span className={`text-xs font-cinzel font-bold ${activeHotspot === 'pillar' ? 'text-[#180e08]' : 'text-[#ffd27d]'}`}>③</span>
                    <span className="absolute inset-0 rounded-full border border-[#ffd27d] animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Marker ④: Sacred Water Tank */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.playPoojaBell(0.06);
                      setActiveHotspot('tank');
                    }}
                    className={`absolute bottom-[14%] right-[22%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'tank' ? 'bg-[#ffd27d] scale-110 shadow-[0_0_30px_#ffd27d]' : 'bg-[#180e08]/90 border border-[#ffd27d]/70 hover:scale-105'
                    }`}
                    title="Marker 4: Sacred Water Tank"
                  >
                    <span className={`text-xs font-cinzel font-bold ${activeHotspot === 'tank' ? 'text-[#180e08]' : 'text-[#ffd27d]'}`}>④</span>
                    <span className="absolute inset-0 rounded-full border border-[#ffd27d] animate-ping opacity-60 pointer-events-none" />
                  </button>
                </div>

                <p className="font-handwriting text-lg sm:text-xl text-[#ffd88f] mt-3 italic pl-2">
                  “Look closely at the stonework... chisel marks from centuries of devotional craftsmanship remain vivid in the raking light.”
                </p>
              </div>

              {/* Right: Connected Vertical Observations with High Contrast Ivory Text */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-cinzel tracking-[0.25em] text-[#ffd27d] uppercase mb-1 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
                  <span>CONNECTED ARCHITECTURAL OBSERVATIONS</span>
                </div>

                {/* 01 SHIKHARA */}
                <div 
                  onClick={() => {
                    audioManager.playPoojaBell(0.06);
                    setActiveHotspot('shikhara');
                  }}
                  className={`p-5 rounded-lg transition-all cursor-pointer border ${
                    activeHotspot === 'shikhara'
                      ? 'bg-[#221208]/90 border-[#ffd27d] shadow-[0_4px_25px_rgba(255,210,125,0.2)]'
                      : 'bg-[#140a06]/75 border-[#c5a059]/30 hover:border-[#c5a059]/70 hover:bg-[#1a0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 border border-[#ffd27d] flex items-center justify-center text-xs font-cinzel font-bold text-[#ffd27d]">
                      ①
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.12em] text-[#fffdf7] uppercase">
                      CURVILINEAR SHIKHARA
                    </h3>
                  </div>
                  <p 
                    className="font-marcellus text-sm sm:text-[15px] text-[#f7eee1] leading-[1.75]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    The shikhara rises in traditional Nagara curvilinear tiers, crowned by a fluted stone amalaka and golden kalasha. The vertical ascent directs the pilgrim’s spirit skyward, symbolizing transcendence over temporal reality.
                  </p>
                </div>

                {/* 02 CARVED STONEWORK */}
                <div 
                  onClick={() => {
                    audioManager.playPoojaBell(0.06);
                    setActiveHotspot('stonework');
                  }}
                  className={`p-5 rounded-lg transition-all cursor-pointer border ${
                    activeHotspot === 'stonework'
                      ? 'bg-[#221208]/90 border-[#ffd27d] shadow-[0_4px_25px_rgba(255,210,125,0.2)]'
                      : 'bg-[#140a06]/75 border-[#c5a059]/30 hover:border-[#c5a059]/70 hover:bg-[#1a0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 border border-[#ffd27d] flex items-center justify-center text-xs font-cinzel font-bold text-[#ffd27d]">
                      ②
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.12em] text-[#fffdf7] uppercase">
                      CARVED STONEWORK & DEVATAS
                    </h3>
                  </div>
                  <p 
                    className="font-marcellus text-sm sm:text-[15px] text-[#f7eee1] leading-[1.75]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    Aged sandstone relief carvings feature intricate floral vines, pot-and-foliage (ghata-pallava) capitals, and niche sculptures of guardian devatas and celestial attendants weathered by centuries of seasons.
                  </p>
                </div>

                {/* 03 PILLARS & ARCHITRAVES */}
                <div 
                  onClick={() => {
                    audioManager.playPoojaBell(0.06);
                    setActiveHotspot('pillar');
                  }}
                  className={`p-5 rounded-lg transition-all cursor-pointer border ${
                    activeHotspot === 'pillar'
                      ? 'bg-[#221208]/90 border-[#ffd27d] shadow-[0_4px_25px_rgba(255,210,125,0.2)]'
                      : 'bg-[#140a06]/75 border-[#c5a059]/30 hover:border-[#c5a059]/70 hover:bg-[#1a0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 border border-[#ffd27d] flex items-center justify-center text-xs font-cinzel font-bold text-[#ffd27d]">
                      ③
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.12em] text-[#fffdf7] uppercase">
                      WEATHERED STONE PILLARS
                    </h3>
                  </div>
                  <p 
                    className="font-marcellus text-sm sm:text-[15px] text-[#f7eee1] leading-[1.75]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    Load-bearing square-to-octagonal sandstone pillars flank the mandapa passages, exhibiting the dry-stone interlocking technique perfected by northern Indian temple guilds.
                  </p>
                </div>

                {/* 04 SACRED WATER TANK */}
                <div 
                  onClick={() => {
                    audioManager.playPoojaBell(0.06);
                    setActiveHotspot('tank');
                  }}
                  className={`p-5 rounded-lg transition-all cursor-pointer border ${
                    activeHotspot === 'tank'
                      ? 'bg-[#221208]/90 border-[#ffd27d] shadow-[0_4px_25px_rgba(255,210,125,0.2)]'
                      : 'bg-[#140a06]/75 border-[#c5a059]/30 hover:border-[#c5a059]/70 hover:bg-[#1a0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 border border-[#ffd27d] flex items-center justify-center text-xs font-cinzel font-bold text-[#ffd27d]">
                      ④
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.12em] text-[#fffdf7] uppercase">
                      SACRED WATER TANK (SAROVAR)
                    </h3>
                  </div>
                  <p 
                    className="font-marcellus text-sm sm:text-[15px] text-[#f7eee1] leading-[1.75]"
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                  >
                    The adjoining stepped tank acts as the physical and contemplative mirror of the sanctum, where evening lamps illuminate calm waters and pilgrims perform traditional purificatory baths.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* ================================================================
              SECTION 4: A LIVING SANCTUARY (VISUAL EPILOGUE)
              ================================================================ */}
          <section className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-8 max-w-5xl mx-auto relative z-10 py-24 text-center">
            <div 
              onClick={() => setModalImage('/assets/sthaneshwar_temple_hero.jpg')}
              className="relative w-full max-w-4xl mb-12 rounded-xl overflow-hidden border border-[#c5a059]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group cursor-pointer"
              title="Click to view full photograph"
            >
              <img
                src="/assets/sthaneshwar_temple_hero.jpg"
                alt="Sthaneshwar Mahadev Sarovar at Dusk"
                className="w-full h-auto max-h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-transparent to-[#0c0704]/40 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(10,5,2,0.9)] pointer-events-none" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-marcellus text-xs sm:text-sm text-[#f5ebd7] tracking-[0.2em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Sthaneshwar Mahadev Sarovar · Dusk Devotion
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-[1px] w-12 bg-[#c5a059]/50" />
                <span className="text-[#ffd27d] text-xs">❖</span>
                <span className="font-cinzel text-[11px] font-bold tracking-[0.3em] text-[#ffd27d] uppercase">
                  A LIVING SANCTUARY
                </span>
                <span className="text-[#ffd27d] text-xs">❖</span>
                <span className="h-[1px] w-12 bg-[#c5a059]/50" />
              </div>

              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#fff6e0] uppercase mb-5 drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)]">
                A LIVING PLACE
              </h2>

              <p className="font-manuscript text-xl sm:text-2xl text-[#f3e5ca] italic leading-relaxed mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                “Not simply a monument of the past, but a place where memory, ritual and devotion continue to meet.”
              </p>

              <p className="font-marcellus text-sm sm:text-base text-[#e8d5bf] leading-relaxed mb-10">
                Centuries have swept across Haryana, yet the water of this tank still mirrors the evening stars, and bells still summon pilgrims to the sacred threshold. Sthaneshwar remains alive in the heart of Kurukshetra.
              </p>
            </div>
          </section>

          {/* ================================================================
              TRANSITION PORTAL: EXPLORE MORE
              "Step deeper into the story of Sthaneshwar."
              Moves visitor into the 10-chapter digital exhibition chambers
              ================================================================ */}
          <section className="px-4 sm:px-8 max-w-4xl mx-auto relative z-10 pb-32">
            <div className="rounded-2xl bg-gradient-to-b from-[#221208]/90 via-[#180d06]/95 to-[#0e0703] border-2 border-[#d4af37]/60 p-8 sm:p-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)]">
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-[1px] w-10 bg-[#ffd27d]/60" />
                <Sparkles className="w-4 h-4 text-[#ffd27d]" />
                <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#ffd27d] uppercase">
                  DEEPEN YOUR JOURNEY
                </span>
                <Sparkles className="w-4 h-4 text-[#ffd27d]" />
                <span className="h-[1px] w-10 bg-[#ffd27d]/60" />
              </div>

              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.08em] text-[#fff6e0] uppercase mb-3">
                EXPLORE MORE
              </h2>

              <p className="font-manuscript text-xl sm:text-2xl text-[#ffd88f] italic mb-5">
                “Step deeper into the story of Sthaneshwar.”
              </p>

              <p className="font-marcellus text-sm sm:text-base text-[#e8d5bf] max-w-xl mx-auto leading-relaxed mb-8">
                Move into the ten-chapter digital heritage exhibition—exploring ancient Thanesar’s geography, the Vardhana dynasty chronicle, historical timelines, and comparative reading of fact and tradition.
              </p>

              <button
                onClick={() => handleTransitionToChamber('explore-more')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#ffd27d] bg-[#d4af37]/25 hover:bg-[#d4af37]/40 text-[#fff6e0] text-xs sm:text-sm font-cinzel font-bold tracking-[0.22em] uppercase transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] cursor-pointer"
              >
                <span>EXPLORE MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#ffd27d]" />
              </button>
            </div>
          </section>

        </motion.div>
      )}

      {/* ====================================================================
          CHAMBER 2: EXPLORE MORE — THE SACRED CHRONICLE OF STHANESHWAR
          Story-first, image-light (75% typography, 25% imagery)
          Continuous vertical narrative journey across Chapters I to V
          Focused entirely on the immersive sacred narrative of the temple
          ==================================================================== */}
      {chamber === 'explore-more' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full overflow-hidden pt-28 pb-32 px-4 sm:px-8 max-w-4xl mx-auto"
        >
          {/* Atmospheric Feathered Reading Corridor (Soft darkness / shadowed temple corridor) */}
          <div 
            className="absolute inset-0 -mx-8 sm:-mx-20 lg:-mx-28 pointer-events-none z-0"
            style={{
              background: `
                radial-gradient(ellipse 85% 90% at 50% 50%, rgba(12, 6, 3, 0.76) 0%, rgba(12, 6, 3, 0.58) 50%, rgba(12, 6, 3, 0.18) 85%, transparent 100%),
                linear-gradient(to right, transparent 0%, rgba(10, 5, 2, 0.60) 15%, rgba(10, 5, 2, 0.78) 50%, rgba(10, 5, 2, 0.60) 85%, transparent 100%)
              `,
              filter: 'blur(8px)',
            }}
          />

          {/* Faint Warm Incense / Amber Smoke Layer */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 opacity-35"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.08) 0%, rgba(197, 160, 89, 0.02) 50%, transparent 75%)',
            }}
          />

          {/* Chronicle Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
              <span className="font-cinzel text-xs font-bold tracking-[0.30em] text-[#ffd27d] uppercase">
                CHRONICLE OF STHANESHWAR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
            </div>
            <h1 
              className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#fffdf7] uppercase leading-tight"
              style={{ textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 1px 4px rgba(0,0,0,0.9)' }}
            >
              THE SACRED CHRONICLE
            </h1>
            <p 
              className="font-marcellus text-sm sm:text-base text-[#e5c58e] tracking-[0.16em] uppercase mt-2.5"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}
            >
              A Continuous Story of Sacred Land, Imperial Zenith, and Living Devotion
            </p>
          </div>

          {/* Quick Chapter & Record Jump Bar */}
          <div className="mb-14 overflow-x-auto pb-2 scrollbar-none relative z-20">
            <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max px-2">
              {fiveChapters.map((ch) => (
                <button
                  key={`ch-btn-${ch.num}`}
                  type="button"
                  onClick={() => {
                    setActiveChapter(ch.num);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-cinzel font-semibold tracking-wider transition-all cursor-pointer border ${
                    activeChapter === ch.num
                      ? 'bg-[#ffd27d] text-[#140a06] border-[#ffd27d] shadow-[0_0_15px_#ffd27d]'
                      : 'bg-[#180e08]/90 text-[#d6b278] border-[#c5a059]/35 hover:border-[#ffd27d] hover:text-[#fffdf7]'
                  }`}
                >
                  <span>CH {ch.roman}</span>
                </button>
              ))}
              
              <button
                type="button"
                onClick={() => handleTransitionToChamber('deep-dive')}
                className="px-4 py-1.5 rounded-full text-[11px] font-cinzel font-semibold tracking-wider transition-all cursor-pointer border border-[#ffd27d]/60 bg-[#2b160b]/90 text-[#ffd27d] hover:bg-[#3d1d0c] flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,210,125,0.2)]"
              >
                <BookOpen className="w-3 h-3" />
                <span>RESEARCH ARCHIVE ↗</span>
              </button>
            </div>
          </div>

          {/* Active Story-First Narrative Chapter */}
          <div className="relative z-10 min-h-[580px]">
            {(() => {
              const currentChapter = fiveChapters.find((c) => c.num === activeChapter) || fiveChapters[0];
              return (
                <AnimatePresence mode="wait">
                  <motion.article 
                    key={`chapter-${currentChapter.num}`}
                    id={`chapter-${currentChapter.num}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative"
                  >
                    {/* Subtle feathered local readability haze */}
                    <div className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-4 rounded-3xl bg-gradient-to-b from-[#120904]/45 via-[#100703]/60 to-[#120904]/45 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Chapter Header with Badge & Ornament */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-[#c5a059]/30 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[#ffd27d] text-xs">◈</span>
                          <span className="font-cinzel text-xs font-bold text-[#ffd27d] tracking-[0.25em] uppercase">
                            CHAPTER {currentChapter.roman}
                          </span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel uppercase tracking-wider font-semibold border ${
                          currentChapter.badgeType === 'history' 
                            ? 'bg-[#16271c]/90 border-[#68b082]/70 text-[#a4ebb9]'
                            : currentChapter.badgeType === 'living'
                            ? 'bg-[#2b170c]/90 border-[#ffd27d]/70 text-[#ffd27d]'
                            : 'bg-[#3d180e]/90 border-[#d4af37]/70 text-[#ffd27d]'
                        }`}>
                          {currentChapter.badge}
                        </span>
                      </div>

                      {/* Chapter Title */}
                      <h2 
                        className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.05em] text-[#fffdf7] uppercase mb-1"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)' }}
                      >
                        {currentChapter.title}
                      </h2>

                      {/* Subtitle */}
                      <p 
                        className="font-marcellus text-xs sm:text-sm text-[#e5c58e] uppercase tracking-[0.16em] mb-6 font-semibold"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                      >
                        {currentChapter.sub}
                      </p>

                      {/* Narrative Body Paragraphs & Inline Supporting Image (75% Text / 25% Image) */}
                      <div className="space-y-4">
                        {/* Paragraph 1 */}
                        <p 
                          className="font-marcellus text-[15.5px] sm:text-[17px] text-[#f7eee1] leading-[1.85]"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                        >
                          <span className="font-cinzel text-2xl sm:text-3xl text-[#ffd27d] font-bold float-left mr-2.5 leading-none mt-1">
                            {currentChapter.paragraphs[0].charAt(0)}
                          </span>
                          {currentChapter.paragraphs[0].slice(1)}
                        </p>

                        {/* Paragraph 2 */}
                        <p 
                          className="font-marcellus text-[15.5px] sm:text-[17px] text-[#f7eee1] leading-[1.85]"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                        >
                          {currentChapter.paragraphs[1]}
                        </p>

                        {/* Small Supporting Archival Image (Neatly Contained, Not Dominating) */}
                        <div className="py-4 my-2 flex flex-col items-center">
                          <div 
                            onClick={() => setModalImage(currentChapter.img)}
                            className="relative rounded-lg overflow-hidden border border-[#c5a059]/40 shadow-[0_15px_35px_rgba(0,0,0,0.9)] max-w-[340px] sm:max-w-[420px] w-full cursor-pointer group"
                            title="Click to inspect photograph"
                          >
                            <img 
                              src={currentChapter.img} 
                              alt={currentChapter.title} 
                              className="w-full h-44 sm:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-cinzel text-[#ffd27d] tracking-wider uppercase">
                              <span>ARCHIVAL REFERENCE · CHAPTER {currentChapter.roman}</span>
                              <span>⊕ INSPECT</span>
                            </div>
                          </div>
                          <p className="font-marcellus text-xs text-[#d6b278] tracking-wide mt-2 text-center italic max-w-sm">
                            {currentChapter.imgCaption}
                          </p>
                        </div>

                        {/* Paragraph 3 */}
                        <p 
                          className="font-marcellus text-[15.5px] sm:text-[17px] text-[#f7eee1] leading-[1.85]"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(10, 5, 2, 0.7)' }}
                        >
                          {currentChapter.paragraphs[2]}
                        </p>
                      </div>

                      {/* Handwritten Marginal Note */}
                      <div className="border-l-2 border-[#ffd27d]/60 pl-4 py-2 mt-5 bg-[#140a06]/40 rounded-r-md">
                        <p 
                          className="font-handwriting text-xl sm:text-2xl text-[#fae1a6] italic leading-relaxed"
                          style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)' }}
                        >
                          {currentChapter.marginalNote}
                        </p>
                      </div>

                      {/* Chapter Navigation Pagination Bar */}
                      <div className="pt-10 mt-8 border-t border-[#c5a059]/25 flex items-center justify-between">
                        {currentChapter.num > 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveChapter(currentChapter.num - 1);
                            }}
                            className="flex items-center gap-2 text-xs font-cinzel text-[#d6b278] hover:text-[#ffd27d] transition-colors py-2 px-3.5 rounded-lg border border-[#c5a059]/30 bg-[#160b06]/80 cursor-pointer"
                          >
                            <span>← CH {fiveChapters[currentChapter.num - 2].roman}</span>
                          </button>
                        ) : <div />}

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#ffd27d]">❖</span>
                          <span className="font-cinzel text-[11px] text-[#e5c58e] tracking-widest uppercase font-semibold">
                            CHAPTER {currentChapter.roman} OF V
                          </span>
                          <span className="text-xs text-[#ffd27d]">❖</span>
                        </div>

                        {currentChapter.num < fiveChapters.length ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveChapter(currentChapter.num + 1);
                            }}
                            className="flex items-center gap-2 text-xs font-cinzel text-[#d6b278] hover:text-[#ffd27d] transition-colors py-2 px-3.5 rounded-lg border border-[#c5a059]/30 bg-[#160b06]/80 cursor-pointer"
                          >
                            <span>CH {fiveChapters[currentChapter.num].roman} →</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleTransitionToChamber('deep-dive')}
                            className="flex items-center gap-1.5 text-xs font-cinzel text-[#ffd27d] hover:text-[#fffdf7] transition-colors py-2 px-3.5 rounded-lg border border-[#ffd27d]/50 bg-[#2b160b]/90 cursor-pointer shadow-[0_0_12px_rgba(255,210,125,0.2)]"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>RESEARCH ARCHIVE ↗</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </motion.article>
                </AnimatePresence>
              );
            })()}
          </div>

          {/* ================================================================
              COMPACT IMMERSIVE CTA: STEP BEYOND INTO THE SCHOLARLY ARCHIVE
              ================================================================ */}
          <section className="mt-20 pt-16 border-t border-[#c5a059]/40 relative z-10 text-center">
            <div className="max-w-xl mx-auto py-8 px-6 sm:px-8 rounded-2xl bg-[#140a06]/85 border border-[#c5a059]/40 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
              
              <div className="flex items-center justify-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
                <span className="font-cinzel text-[11px] font-bold tracking-[0.28em] text-[#ffd27d] uppercase">
                  ACADEMIC ARCHIVE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]" />
              </div>

              <h2 
                className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.06em] text-[#fffdf7] uppercase mb-3"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
              >
                WANT TO GO DEEPER?
              </h2>

              <p 
                className="font-marcellus text-sm sm:text-base text-[#e5c58e] leading-relaxed mb-7 italic max-w-lg mx-auto"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
              >
                “Explore the historical records, archaeological evidence, literary sources, and academic research behind Sthaneshwar.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={() => handleTransitionToChamber('deep-dive')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#ffd27d] bg-[#d4af37]/25 hover:bg-[#d4af37]/40 text-[#fffdf7] text-xs sm:text-sm font-cinzel font-bold tracking-[0.20em] uppercase transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] cursor-pointer"
                >
                  <span>EXPLORE RESEARCH ARCHIVE ↗</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#ffd27d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => handleTransitionToChamber('walkthrough')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#c5a059]/40 bg-[#160b06]/90 hover:bg-[#2b170c] text-[#d6b278] hover:text-[#fffdf7] text-xs font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>RETURN TO SANCTUM</span>
                </button>
              </div>

            </div>
          </section>

        </motion.div>
      )}

      {/* ====================================================================
          CHAMBER 3: DEDICATED RESEARCH PAGE ("DEEPER INTO THE RECORDS")
          Separate dedicated page preserving temple interior atmosphere
          ==================================================================== */}
      {chamber === 'deep-dive' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full overflow-hidden pt-28 pb-32 px-4 sm:px-8 max-w-4xl mx-auto"
        >
          {/* Atmospheric Feathered Reading Corridor */}
          <div 
            className="absolute inset-0 -mx-8 sm:-mx-20 lg:-mx-28 pointer-events-none z-0"
            style={{
              background: `
                radial-gradient(ellipse 85% 90% at 50% 50%, rgba(12, 6, 3, 0.76) 0%, rgba(12, 6, 3, 0.58) 50%, rgba(12, 6, 3, 0.18) 85%, transparent 100%),
                linear-gradient(to right, transparent 0%, rgba(10, 5, 2, 0.60) 15%, rgba(10, 5, 2, 0.78) 50%, rgba(10, 5, 2, 0.60) 85%, transparent 100%)
              `,
              filter: 'blur(8px)',
            }}
          />

          <section id="deeper-records" className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#ffd27d]" />
                <span className="font-cinzel text-xs font-bold tracking-[0.28em] text-[#ffd27d] uppercase">
                  ACADEMIC & PRIMARY ARCHIVES
                </span>
                <ShieldCheck className="w-4 h-4 text-[#ffd27d]" />
              </div>
              <h1 
                className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#fffdf7] uppercase"
                style={{ textShadow: '0 3px 18px rgba(0,0,0,0.95)' }}
              >
                DEEPER INTO THE RECORDS
              </h1>
              <p 
                className="font-marcellus text-sm sm:text-base text-[#e5c58e] tracking-[0.14em] uppercase mt-2"
                style={{ textShadow: '0 1px 5px rgba(0,0,0,0.85)' }}
              >
                The Verified Archaeological, Literary & Historical Archives of Sthanvishvara
              </p>
              <p 
                className="font-marcellus text-sm text-[#f7eee1] leading-relaxed mt-4 max-w-xl mx-auto"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
              >
                Below are authenticated primary records, statutory government gazetteers, and archaeological publications. Sacred legends are distinguished from material excavation data.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'ALL', label: 'ALL SOURCES (6)' },
                { id: 'TRADITION', label: 'TEMPLE TRADITION' },
                { id: 'HISTORICAL RECORD', label: 'HISTORICAL RECORD' },
                { id: 'ARCHAEOLOGICAL EVIDENCE', label: 'ARCHAEOLOGICAL EVIDENCE' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRecordFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer border ${
                    selectedRecordFilter === tab.id
                      ? 'bg-[#ffd27d] text-[#140a06] border-[#ffd27d] shadow-[0_0_12px_#ffd27d]'
                      : 'bg-[#180e08]/90 text-[#d6b278] border-[#c5a059]/35 hover:border-[#ffd27d] hover:text-[#fffdf7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Clean Text-Based Source Cards */}
            <div className="space-y-6">
              {researchSources
                .filter(src => selectedRecordFilter === 'ALL' || src.type.includes(selectedRecordFilter) || (selectedRecordFilter === 'TRADITION' && src.id === 'kdb-parikrama'))
                .map((src, idx) => (
                  <div 
                    key={src.id}
                    className="p-6 sm:p-7 rounded-xl bg-[#140a06]/85 border border-[#c5a059]/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]/80 transition-all relative group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-[#c5a059]/25 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d]" />
                        <span className="font-cinzel text-xs font-bold tracking-widest text-[#ffd27d] uppercase">
                          RECORD {String(idx + 1).padStart(2, '0')} · {src.type}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#241309] border border-[#ffd27d]/40 text-[10px] font-cinzel font-semibold tracking-wider text-[#ffd27d] uppercase">
                        {src.confidence}
                      </span>
                    </div>

                    <h3 
                      className="font-cinzel text-lg sm:text-xl font-bold text-[#fffdf7] uppercase mb-1"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                    >
                      {src.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-marcellus text-xs text-[#e5c58e] uppercase tracking-wider mb-3 font-semibold">
                      <span>AUTHOR: {src.author}</span>
                      <span>•</span>
                      <span>INSTITUTION: {src.institution}</span>
                      <span>•</span>
                      <span>DATE: {src.year}</span>
                    </div>

                    <p 
                      className="font-marcellus text-sm sm:text-[15px] text-[#f7eee1] leading-[1.75] mb-4"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                    >
                      {src.description}
                    </p>

                    {/* Key Documentary Points */}
                    <div className="mb-5 pl-4 border-l-2 border-[#ffd27d]/40 space-y-1">
                      {src.keyPoints.map((pt, pIdx) => (
                        <p 
                          key={`pt-${pIdx}`} 
                          className="font-marcellus text-xs sm:text-sm text-[#faefe0] leading-relaxed"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                        >
                          • {pt}
                        </p>
                      ))}
                    </div>

                    {/* Direct External Link */}
                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c5a059]/60 bg-[#241309] hover:bg-[#381c0c] text-[#ffd27d] hover:text-[#fffdf7] text-xs font-cinzel font-bold tracking-[0.16em] uppercase transition-all shadow-md"
                      >
                        <span>READ SOURCE</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#ffd27d]" />
                      </a>

                      <span className="text-[10px] font-cinzel text-[#d6b278] uppercase tracking-widest hidden sm:inline">
                        VERIFIED HISTORICAL ARCHIVE
                      </span>
                    </div>
                  </div>
              ))}
            </div>

            {/* Bottom Return Controls */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleTransitionToChamber('explore-more')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#160b06]/90 hover:bg-[#2b170c] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>RETURN TO EXPLORE STORY</span>
              </button>

              <button
                onClick={() => handleTransitionToChamber('walkthrough')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#ffd27d] bg-[#d4af37]/20 hover:bg-[#d4af37]/35 text-[#fffdf7] text-xs font-cinzel font-bold tracking-[0.20em] uppercase transition-all cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              >
                <span>RETURN TO TEMPLE SANCTUM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

        </motion.div>
      )}

      {/* ====================================================================
          FULL-SCREEN HIGH-RESOLUTION PHOTOGRAPHIC INSPECTION MODAL
          ==================================================================== */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 bg-[#070402]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#160c07] p-3 sm:p-5 rounded-xl border border-[#c5a059]/50 shadow-2xl"
            >
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-[#241309] text-[#ffd27d] hover:bg-[#381c0c] transition-colors cursor-pointer z-10 border border-[#c5a059]/60"
                title="Close Image"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative overflow-hidden max-h-[75vh] flex items-center justify-center bg-[#0c0704] rounded-lg border border-[#543015] p-2">
                <img 
                  src={modalImage} 
                  alt="Sthaneshwar Mahadev High Resolution" 
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
              </div>
              
              <div className="mt-3 text-center">
                <p className="font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase text-[#ffd27d]">
                  STHANESHWAR MAHADEV TEMPLE · ARCHITECTURAL EVIDENCE
                </p>
                <p className="font-marcellus text-xs text-[#d6b278] uppercase tracking-wider mt-0.5">
                  Thanesar · Kurukshetra · Haryana
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
