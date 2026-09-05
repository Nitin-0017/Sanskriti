import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, Calendar, Globe, Users, Flame, ChevronRight, Volume2, Compass, Award, Music, Coffee } from 'lucide-react';
import { SURAJKUND_EXPERIENCE } from '../data/folkArtsData';

/**
 * SurajkundMelaExperience
 * Chapter 03: Surajkund International Crafts Mela
 * 
 * An immersive editorial museum experience:
 * 1. Full-screen cinematic video hero with fallback poster
 * 2. Deep scroll-based narrative storytelling (no generic boxed cards)
 * 3. Authentic photography of mela grounds and chaupal performances
 * 4. 8-stage interactive archival milestone explorer
 * 5. Cohesive museum typography, generous whitespace, and warm antique gold accents
 */
// Clean Heritage Vector Divider (Archival SVG replacement for unicode glyphs)
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

export default function SurajkundMelaExperience({
  onBackToFolkArts,
  onExploreArchive,
  onNavigateToArtisans,
  onNavigateToToday,
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);
  const videoRef = useRef(null);
  const storyRef = useRef(null);

  // Video lifecycle: start playback, listen for ended, cleanup on unmount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEnded = () => {
      setIsPlayingIntro(false);
      document.body.style.overflow = originalOverflow;
    };

    const handleError = () => {
      setIsPlayingIntro(false);
      document.body.style.overflow = originalOverflow;
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser autoplay policy fallback
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.pause();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const stages = SURAJKUND_EXPERIENCE?.journeyStages || SURAJKUND_EXPERIENCE?.milestones || [];
  const current = stages[activeStage] || stages[0] || {
    num: '01',
    title: 'THE MELA',
    heading: 'Living Craft Village',
    desc: 'Celebration of Indian crafts and living traditions.',
    image: '/assets/surajkund_crafts_fair.jpg',
    quote: '“Where rural master craftspeople and world audiences meet.”',
  };

  const scrollToStory = () => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ====================================================================
          FULL-SCREEN CINEMATIC VIDEO INTRO OVERLAY
          Plays on chapter entry, covers 100vw x 100vh, object-fit: cover.
          On video completion, smoothly fades out to reveal the chapter page.
          ==================================================================== */}
      <AnimatePresence>
        {isPlayingIntro && (
          <motion.div
            key="surajkund-fullscreen-intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0a0503] overflow-hidden flex items-center justify-center pointer-events-auto"
          >
            <video
              ref={videoRef}
              src="/videos/surajkund.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover border-0 outline-none p-0 m-0"
              style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
            />
            {/* Subtle dark/earthy overlay matching heritage aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503]/50 via-transparent to-[#0a0503]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,5,3,0.6)_100%)] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-28 sm:space-y-40 pb-28 text-[#f3e7ce]">
        {/* ====================================================================
            TOP BREADCRUMB & CONTEXTUAL HEADER
            ==================================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c5a059]/25">
          <button
            onClick={onBackToFolkArts}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/40 bg-[#160c07]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel tracking-[0.2em] transition-all cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>← RETURN TO FOLK ARTS GATEWAY</span>
          </button>

          <div className="flex items-center gap-3 text-[11px] font-cinzel text-[#ffd27d]/90 tracking-widest">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40">
              <MapPin className="w-3 h-3 text-[#ffd27d]" />
              FARIDABAD, HARYANA
            </span>
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30">
              <Calendar className="w-3 h-3 text-[#ffd27d]" />
              ANNUALLY IN FEBRUARY
            </span>
          </div>
        </div>

        {/* ====================================================================
            CHAPTER HERO BANNER
            ==================================================================== */}
        <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.98)] min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between p-8 sm:p-14 lg:p-16 bg-[#0a0503]">
          {/* Authentic Surajkund Heritage Photograph */}
          <img
            src="/assets/surajkund_crafts_fair.jpg"
            alt="Surajkund International Crafts Mela Grounds"
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] filter brightness-[0.65] contrast-[1.1]"
          />

        {/* Multi-layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0d0704]/60 to-[#0a0503]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,5,3,0.7)_100%)] pointer-events-none" />

        {/* Top Hero Accents */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 sm:w-14 h-[1px] bg-[#ffd27d]" />
            <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.32em] uppercase font-semibold flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-[#e5a93c] animate-pulse" />
              CHAPTER 03 · THE LIVING CANVAS OF CRAFTS
            </span>
          </div>

          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#120804]/80 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
            10TH CENTURY SUN RESERVOIR
          </span>
        </div>

        {/* Central Hero Typography */}
        <div className="relative z-10 max-w-5xl space-y-6 my-auto pt-12 pb-8">
          <h1 
            className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-tight leading-[0.98]"
            style={{ filter: 'drop-shadow(0 4px 25px rgba(0,0,0,0.95))' }}
          >
            SURAJKUND INTERNATIONAL CRAFTS MELA
          </h1>

          <p className="font-cormorant italic text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d]">
            सूरजकुण्ड अंतर्राष्ट्रीय शिल्प मेला • The Lake of the Sun
          </p>

          <p className="text-xs sm:text-sm font-cinzel text-[#e8c46a] tracking-[0.28em] uppercase font-semibold">
            THE WORLD’S LARGEST CRAFTS CONGREGATION · WHERE TRADITION MEETS LIVING PATRONAGE
          </p>

          <blockquote className="border-l-2 border-[#c5a059] pl-6 sm:pl-8 py-2 font-cormorant italic text-2xl sm:text-3xl text-[#fff0d0] leading-relaxed max-w-4xl">
            “Where thousand-year-old sun-stone amphitheaters resonate with the clatter of handlooms, live potters’ kilns, and the unwritten songs of India’s master lineages.”
          </blockquote>
        </div>

        {/* Bottom Hero Call to Action */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#c5a059]/30">
          <div className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
            HELD IN THE CRADLE OF THE ARAVALLI HILLS · FARIDABAD
          </div>

          <button
            onClick={scrollToStory}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#c5a059]/70 bg-[#160c07]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-bold tracking-[0.25em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
          >
            <span>ENTER THE MELA GROUNDS</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-y-0.5 group-hover:rotate-90" />
          </button>
        </div>
      </div>

      {/* Story Entry Anchor */}
      <div ref={storyRef} />

      {/* ====================================================================
          SECTION 01: WHAT IS SURAJKUND & 10TH-CENTURY ANTIQUITY
          The ancient sun reservoir of King Suraj Pal of the Tomar dynasty
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              ORIGIN & SACRED GEOGRAPHY
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            Surya-Kunda: The 10th-Century Sun Lake
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            Born from Tomar Rajput solar reverence, revitalized as humanity’s living craft village.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Long before it became the epicentre of global handicraft commerce, <strong className="text-[#ffd27d] font-normal">Surajkund</strong> was an ancient stepped reservoir built in the 10th century CE by <strong className="text-[#ffd27d] font-normal">King Suraj Pal</strong> of the Tomar Rajput dynasty. Carved out of indigenous Aravalli quartzite, the stepped water amphitheatre was oriented toward the rising sun in deliberate geometric worship of Surya.
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Every year in the balmy post-winter weeks of February, these thousand-year-old sandstone tiers awaken. The rustic scrub forests surrounding the reservoir transform into a sprawling, thatched-hut rural hamlet where over a million visitors arrive to witness the unbroken continuity of Indian traditional arts.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6 border-l border-[#c5a059]/25 pl-8 sm:pl-10">
            <div className="space-y-2">
              <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.2em] uppercase font-semibold block">
                SACRED GEOMETRY
              </span>
              <h4 className="font-cinzel text-lg text-[#fff0d0]">
                Stepped Quartzite Sun Basin
              </h4>
              <p className="font-cormorant text-lg text-[#e8d8b8]/90 leading-relaxed">
                Constructed in the shape of a rising sun with stepped banks that channeled seasonal hill rivulets into a sacred pool of meditation.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#c5a059]/15">
              <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.2em] uppercase font-semibold block">
                FOUNDATIONAL YEAR
              </span>
              <h4 className="font-cinzel text-lg text-[#fff0d0]">
                Inaugurated 1987 CE
              </h4>
              <p className="font-cormorant text-lg text-[#e8d8b8]/90 leading-relaxed">
                Created to rescue languishing rural master crafts from obscurity and provide direct economic agency to rural village artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 02: CULTURAL IMPORTANCE & DIRECT ARTISAN PATRONAGE
          Eliminating middlemen; Apna Ghar Haryanvi lifestyle
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              ECONOMIC & SOCIAL SANCTUM
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            Direct Patronage: Erasing the Middleman
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            Where rural hands trade directly with global connoisseurs, preserving dignity and living heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              For centuries, rural craftspeople were subjected to exploitative intermediaries who captured profits while reducing master weavers and potters to subsistence poverty. Surajkund was designed with a radical socio-economic philosophy: <strong className="text-[#ffd27d] font-normal">pure, unmediated, direct patronage</strong>.
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Every stall is allotted strictly to authenticated master artisans, National Awardees, and Shilp Gurus. The craftsperson sits at their workspace, explaining the three months of hand-spinning, natural indigo fermentation, or double-cloth pit loom weaving directly to the person who will cherish the artifact in their home.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#180c07]/90 border border-[#c5a059]/35 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.85)] space-y-4">
              <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.24em] uppercase font-semibold block">
                THE ICONIC "APNA GHAR" EXPERIENCE
              </span>
              <h3 className="font-cinzel text-2xl text-[#fff0d0] font-normal">
                A Living Haryana Courtyard Homestead
              </h3>
              <p className="font-cormorant text-xl text-[#f0e2ca] leading-relaxed">
                At the heart of the fairgrounds stands <em>Apna Ghar</em> (Our Home)—an authentic full-scale traditional Haryana village household. Constructed with sun-baked mud plaster, hand-carved sheesham pillars, woven charpais, and stone grain bins, it allows visitors to step into the daily agrarian life of Haryana. Matriarchs churn white butter, weave phulkaris on sunken patios, and grind wheat on stone chakki mills while singing ancient blessing hymns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 03: THE CRAFTS & MASTER LINEAGES
          Visual plate using surajkund_crafts_fair.jpg
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              THE WORKSHOP GROUNDS
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            The Living Crafts: Earth, Fibre & Metal
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            A congregation of lineages carrying Harappan pottery, medieval loom patterns, and bronze alloys.
          </p>
        </div>

        {/* Panoramic Exhibition Plate */}
        <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/45 shadow-[0_25px_70px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] bg-[#140b07] group">
          <img
            src="/assets/surajkund_crafts_fair.jpg"
            alt="Surajkund Crafts Fairground"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/30 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
            <span>SURROUNDED BY THATCHED RURAL HUTS & LIVE HEARTHS</span>
            <span className="text-[#c5a059]">FARIDABAD CRAFT SANCTUARY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          <div className="space-y-3">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
              01 · EARTH & POTTERY
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0] font-semibold">
              Jhajjar Surahi & Rakhigarhi Terracotta
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              Potters throw porous desert clay on manually spinning wheels, crafting cooling water flasks imbued with natural herbal fragrance and ancient Harappan slip paintings.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
              02 · LOOM & DYES
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0] font-semibold">
              Panipat Panja & Reversible Khes
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              Heavy cast-iron Panja claws hammer thick cotton weft into indestructible floor durries alongside double-cloth checked blankets woven on pit looms.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
              03 · ALLOY & TIMBER
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0] font-semibold">
              Jagadhri Bell Metal & Rewari Carvings
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              Hand-beaten resonant bronze vessels tuned to harmonic notes alongside intricately chiselled mango and sheesham wood brackets for agrarian havelis.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 04: CHAUPAL LIVE FOLK PERFORMANCES
          Visual plate using surajkund_folk_performance.jpg
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              ACOUSTIC ORAL CONTINUUM
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            The Chaupal Amphitheatres: Songs Under the Sun
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            Open-air verse theatre, double-reed Been drones, and thunderous Dholak beats echoing through the dust.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c5a059]/45 shadow-[0_20px_60px_rgba(0,0,0,0.95)] aspect-[4/3] bg-[#140b07] group">
            <img
              src="/assets/surajkund_folk_performance.jpg"
              alt="Surajkund Folk Performance at the Chaupal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
              <span>CHAUPAL OPEN-AIR ENSEMBLE</span>
              <span>LIVE ORAL TRADITION</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              At Surajkund, performance is not confined to an elevated theatrical stage; it erupts spontaneously under the shade of ancient banyan trees at the <strong className="text-[#ffd27d] font-normal">Chaupals</strong>.
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Nomadic <strong className="text-[#ffd27d] font-normal">Been Jogis</strong> play hypnotic modal melodies on double-pipe gourds, their cheeks expanding with circular breathing. Nearby, a master <strong className="text-[#ffd27d] font-normal">Saang troupe</strong> delivers all-night verse theatre, while women in swirling pleated ghaghras perform the joyous <strong className="text-[#ffd27d] font-normal">Ghumar</strong> and <strong className="text-[#ffd27d] font-normal">Dhamal</strong> dances to syncopated brass cymbals and hand drums.
            </p>
            <blockquote className="border-l-2 border-[#e5a93c] pl-6 py-2 font-cormorant italic text-xl sm:text-2xl text-[#ffd27d]">
              “The music does not pause for applause. It belongs to the soil, rising into the sky like evening woodsmoke.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 05: REGIONAL & GLOBAL INTERCULTURAL EXCHANGE
          Theme State & Over 40 Partner Nations
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              GLOBAL HARMONY
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            Intercultural Confluence: Over 40 Nations
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            Bridging indigenous Indian craft guilds with Central Asian, African, and European folk traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Elevated to international status in 2013, Surajkund has grown into the world’s premier intercultural folk platform. Each year, a designated <strong className="text-[#ffd27d] font-normal">Theme State</strong> of India designs the monumental ceremonial entrance gates and central pavilion, while over forty <strong className="text-[#ffd27d] font-normal">Partner Nations</strong>—from Uzbekistan and Kazakhstan to Egypt, Zimbabwe, and the United Kingdom—bring their national master artisans.
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
              Sitting in adjacent thatched huts, a Kazakh felting master exchanges techniques with a Haryanvi Phulkari embroiderer. Without a common spoken tongue, they communicate through thread tension, vegetable dye formulas, and the universal geometry of human craft.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 border-l border-[#c5a059]/25 pl-8 sm:pl-10">
            <div className="space-y-2">
              <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.2em] uppercase font-semibold block">
                PARTNER NATION HORIZON
              </span>
              <h4 className="font-cinzel text-lg text-[#fff0d0]">
                Central Asia, Africa, Europe & SAARC
              </h4>
              <p className="font-cormorant text-lg text-[#e8d8b8]/90 leading-relaxed">
                Over 40 countries participate annually, transforming Surajkund into an unmediated dialogue of world folk heritage.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#c5a059]/15">
              <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.2em] uppercase font-semibold block">
                THEME STATE TRADITION
              </span>
              <h4 className="font-cinzel text-lg text-[#fff0d0]">
                Spotlight on Indian Diversity
              </h4>
              <p className="font-cormorant text-lg text-[#e8d8b8]/90 leading-relaxed">
                Rotating focus on regions such as Himachal Pradesh, Assam, Rajasthan, and Gujarat, recreating their architectural gates on Haryana soil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 06: WHAT VISITORS EXPERIENCE
          Sensory immersion: Tactile workshops, live wheels, authentic food
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              THE SENSORY JOURNEY
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            What the Senses Inhabit: Dust, Clay & Ghee
          </h2>
          <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
            Walking through Surajkund is not a visual glance; it is a total sensory awakening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="p-8 rounded-2xl bg-[#180c07]/90 border border-[#c5a059]/25 space-y-4">
            <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.2em] uppercase font-semibold block">
              TOUCH & PARTICIPATION
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0]">
              Hands on the Clay Wheel
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              Visitors don’t merely watch; they plunge their fingers into wet clay under the guidance of a master potter, feel silk filaments being wound on taklis, and try hand-stamping block prints.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#180c07]/90 border border-[#c5a059]/25 space-y-4">
            <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.2em] uppercase font-semibold block">
              TASTE OF THE AGRARIAN HEARTH
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0]">
              Bajra Khichdi & Desi Makhan
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              The air fills with the wholesome fragrance of woodsmoke, slow-cooked Bajra Khichdi served with mounds of fresh white churned butter, steaming Sarson ka Saag, and jalebis fried in pure desi ghee.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#180c07]/90 border border-[#c5a059]/25 space-y-4">
            <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.2em] uppercase font-semibold block">
              SOUNDS OF THE DUSK
            </span>
            <h3 className="font-cinzel text-xl text-[#fff0d0]">
              The Evening Chaupal Silence
            </h3>
            <p className="font-cormorant text-lg sm:text-xl text-[#e8d8b8] leading-relaxed">
              As the winter sun dips behind the Aravalli ridges, the clamour softens into the haunting single-string drone of the Ektara, drawing visitors to warm bonfires where old bards chant verses of Kabir and Gorakhnath.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 07: PRESERVING INDIAN FOLK CULTURE
          Living continuum manifesto
          ==================================================================== */}
      <section className="space-y-8 max-w-5xl mx-auto text-center">
        <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold block">
          HERITAGE PHILOSOPHY
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
          Not Relics in Glass Cases, But Living Truths
        </h2>
        <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
          In an era of industrial mass reproduction and algorithmic homogenisation, Surajkund stands as an unshakeable fortress of human authenticity. It reminds the world that craft is not a dead hobby or an archival specimen preserved inside museum glass. It is a sacred livelihood, an unwritten philosophy of life, and the beating heart of India’s living civilisation.
        </p>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          SECTION 08: THE 8 MILESTONES ARCHIVAL EXPLORER
          Interactive exploration across all 8 curated dimensions
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
              ARCHIVAL EXPLORATION
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            The 8 Living Dimensions of Surajkund
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed">
            Select an archival milestone below to examine its historical records, master artisan testimonials, and curatorial notes:
          </p>
        </div>

        {/* Milestone Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {stages.map((st, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStage(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#c5a059] text-[#140b07] border-[#ffd27d] shadow-[0_0_20px_rgba(197,160,89,0.5)] font-bold'
                    : 'bg-[#180d07]/90 text-[#ffd27d]/80 border-[#c5a059]/25 hover:border-[#ffd27d]/60 hover:bg-[#c5a059]/15'
                }`}
              >
                <span className="text-[10px] font-cinzel tracking-wider block opacity-75">
                  {st.num}
                </span>
                <span className="text-xs font-cinzel tracking-wide truncate block font-semibold">
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.num}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#160b06]/92 border border-[#c5a059]/40 backdrop-blur-md shadow-[0_16px_55px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left: Atmospheric Image Plate */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_12px_45px_rgba(0,0,0,0.85)] aspect-[4/3] bg-[#140b07]">
              <img
                src={current.image}
                alt={current.heading}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[11px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                <span>SURAJKUND ARCHIVAL RECORD</span>
                <span>MILESTONE {current.num} OF 08</span>
              </div>
            </div>

            {/* Right: Narrative Story & Quotes */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase inline-block">
                MILESTONE {current.num} · {current.title}
              </span>

              <h3 className="font-cinzel text-2xl sm:text-4xl text-[#ffd27d] font-normal leading-snug">
                {current.heading}
              </h3>

              <p className="font-cormorant text-xl text-[#f3e3c8] leading-relaxed">
                {current.desc}
              </p>

              <blockquote className="p-5 rounded-xl bg-[#1f1109]/90 border-l-2 border-[#e5a93c] font-cormorant italic text-lg sm:text-xl text-[#ffd27d]">
                {current.quote}
              </blockquote>

              {/* Next Milestone Interaction */}
              <div className="pt-2 flex items-center gap-4">
                {activeStage < stages.length - 1 ? (
                  <button
                    onClick={() => setActiveStage(activeStage + 1)}
                    className="group px-6 py-2.5 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                  >
                    <span>NEXT MILESTONE</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={onExploreArchive}
                    className="group px-6 py-2.5 rounded-full border border-[#ffd27d]/80 bg-[#c5a059] text-[#120a05] text-xs font-cinzel font-bold tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_25px_rgba(197,160,89,0.5)]"
                  >
                    <span>EXPLORE ALL FOLK TRADITIONS</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ====================================================================
          BOTTOM PATHWAY & CHAPTER SEQUENCING NAVIGATION
          ==================================================================== */}
      <div className="pt-12 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={onNavigateToArtisans || onBackToFolkArts}
          className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.22em] uppercase transition-colors flex items-center gap-2 cursor-pointer font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← 02 ARTISANS: LIVING MASTERS</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={onBackToFolkArts}
            className="px-6 py-2.5 rounded-full border border-[#c5a059]/40 bg-[#160c07]/80 hover:bg-[#1c0f08] text-[#c5a059] hover:text-[#ffd27d] text-xs font-cinzel tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            01 FOLK ARTS ARCHIVE
          </button>

          <button
            onClick={onNavigateToToday || onExploreArchive}
            className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#c5a059] hover:bg-[#ffd27d] text-[#140b07] font-bold text-xs font-cinzel tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(201,164,90,0.5)] flex items-center gap-3"
          >
            <span>CONTINUE TO 04 TODAY</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  </>
);
}
