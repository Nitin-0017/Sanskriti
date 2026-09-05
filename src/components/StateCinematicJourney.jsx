import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';

/**
 * Immersive Cinematic State Journey Experience
 * Smooth multi-phase voyage from the antique Bhārata Varṣa map into the
 * golden-hour countryside of Haryana, traveling forward along rural pathways
 * revealing cultural motifs, approaching a carved heritage pavilion doorway,
 * and stepping through the portal into the State Heritage Atlas.
 */
export default function StateCinematicJourney({ 
  stateExperience, 
  onJourneyComplete,
  onCancelReturnToMap 
}) {
  // Journey phases: 'descent' (0-2.5s) -> 'countryside' (2.5-7.5s) -> 'gateway' (7.5-11s) -> complete
  const [phase, setPhase] = useState('descent');
  const [isMuted, setIsMuted] = useState(true);
  const [activeMotifIndex, setActiveMotifIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for gentle camera parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Automated cinematic timeline
  useEffect(() => {
    // Phase 1 -> Phase 2 (Descent to Countryside)
    const t1 = setTimeout(() => {
      setPhase('countryside');
      if (!isMuted && window.playTempleChime) window.playTempleChime();
    }, 2400);

    // Rotate through cultural motifs during countryside journey
    const tMotif1 = setTimeout(() => setActiveMotifIndex(1), 3800);
    const tMotif2 = setTimeout(() => setActiveMotifIndex(2), 5200);
    const tMotif3 = setTimeout(() => setActiveMotifIndex(3), 6400);

    // Phase 2 -> Phase 3 (Approach Pavilion Gateway)
    const t2 = setTimeout(() => {
      setPhase('gateway');
      if (!isMuted && window.playTempleChime) window.playTempleChime();
    }, 7600);

    // Phase 3 -> Arrive at Heritage Atlas Archive
    const t3 = setTimeout(() => {
      onJourneyComplete();
    }, 11400);

    return () => {
      clearTimeout(t1);
      clearTimeout(tMotif1);
      clearTimeout(tMotif2);
      clearTimeout(tMotif3);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onJourneyComplete, isMuted]);

  const motifs = stateExperience.culturalMotifs || [];
  const currentMotif = motifs[activeMotifIndex] || motifs[0];

  const mx = mousePos.x * 12;
  const my = mousePos.y * 8;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0604] text-[#f7e6c4] font-manuscript select-none">
      
      {/* ========================================================
          PHASE 1: DESCENT FROM ANTIQUE PARCHMENT MAP (0s - 2.5s)
          ======================================================== */}
      <AnimatePresence>
        {phase === 'descent' && (
          <motion.div
            key="phase-descent"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Blurring Antique Parchment Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
              style={{ backgroundImage: `url('/assets/map_background.png')` }}
            />
            <div className="absolute inset-0 bg-[#160d07]/75" />

            {/* Descending Compass / Portal Mandala */}
            <motion.div
              animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
              transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 2.2, repeat: Infinity } }}
              className="relative w-24 h-24 rounded-full border border-[#d4af37]/60 p-1 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.45)]"
            >
              <img src="/assets/sacred_mandala.jpg" alt="Descent Mandala" className="w-full h-full object-cover rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 text-center mt-6 px-4"
            >
              <span className="text-[10px] font-marcellus tracking-[0.35em] text-[#d4af37] uppercase block mb-1">
                Descending from the Royal Atlas
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.22em] text-[#fff4d0] uppercase">
                Entering {stateExperience.name}
              </h2>
              <p className="font-marcellus text-xs sm:text-sm text-[#e8cba0] italic mt-1.5 max-w-md mx-auto">
                {stateExperience.poeticIntro}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          PHASE 2: GOLDEN-HOUR COUNTRYSIDE PARALLAX JOURNEY
          ======================================================== */}
      <motion.div
        animate={{
          opacity: phase === 'countryside' ? 1 : (phase === 'gateway' ? 0 : 0.4),
          scale: phase === 'countryside' ? 1.08 : (phase === 'gateway' ? 1.15 : 1.0),
        }}
        transition={{ duration: 5.2, ease: 'linear' }}
        className="absolute inset-0 z-10"
        style={{
          transform: `translate3d(${-mx * 0.4}px, ${-my * 0.4}px, 0)`,
        }}
      >
        <img
          src={stateExperience.landscape?.hero || '/assets/haryana_countryside.jpg'}
          alt="Haryana Countryside"
          className="w-full h-full object-cover object-center"
        />

        {/* Golden Hour Sunlight & Atmospheric Haze Grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/85 via-transparent to-[#1a0f08]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a170a]/40 via-transparent to-[#2a170a]/40" />
        <div className="absolute inset-0 parchment-vignette opacity-75" />
      </motion.div>

      {/* ========================================================
          PHASE 3: CARVED SANDSTONE HERITAGE PAVILION PORTAL
          ======================================================== */}
      <motion.div
        animate={{
          opacity: phase === 'gateway' ? 1 : 0,
          scale: phase === 'gateway' ? 1.12 : 1.0,
        }}
        transition={{ duration: 4.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          transform: `translate3d(${-mx * 0.6}px, ${-my * 0.6}px, 0)`,
        }}
      >
        <img
          src={stateExperience.landscape?.gateway || '/assets/haryana_heritage_pavilion.jpg'}
          alt="Heritage Pavilion Portal"
          className="w-full h-full object-cover object-center"
        />

        {/* Warm Lantern Glow & Portal Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140b06]/90 via-transparent to-[#140b06]/45" />
        <div className="absolute inset-0 parchment-vignette opacity-80" />

        {/* Approaching the Doorway Subtitle */}
        {phase === 'gateway' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            className="absolute bottom-16 inset-x-0 text-center px-4 z-30"
          >
            <span className="font-marcellus text-xs tracking-[0.3em] text-[#ffd27d] uppercase block mb-1">
              Entering the Royal Heritage Pavilion
            </span>
            <h3 className="font-cinzel text-xl sm:text-3xl font-bold tracking-[0.2em] text-[#fff6d8] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Opening {stateExperience.name} Heritage Archive
            </h3>
          </motion.div>
        )}
      </motion.div>

      {/* Living Atmospheric Dust & Golden Sunlight Motes */}
      <LivingAtmosphereCanvas mousePos={mousePos} progress={1} isArrival={true} />

      {/* ========================================================
          CENTRAL STATE INTRODUCTION & EMERGING CULTURAL MOTIFS
          (Displayed gracefully during Phase 2 Countryside Travel)
          ======================================================== */}
      <AnimatePresence>
        {phase === 'countryside' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-25 flex flex-col justify-between p-6 sm:p-12 pointer-events-none"
          >
            {/* Top State Announcement Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.0 }}
              className="text-center pt-8 sm:pt-12"
            >
              <span className="font-rozha text-sm sm:text-base text-[#d4af37] tracking-widest block mb-1">
                {stateExperience.devanagari}
              </span>
              <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.25em] text-[#fff6d8] uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                {stateExperience.name}
              </h1>
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#ffd27d] uppercase mt-1 font-semibold">
                {stateExperience.subtitle}
              </p>
              <p className="font-manuscript text-xs sm:text-base text-[#f0dfc2] italic max-w-xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                "{stateExperience.poeticIntro}"
              </p>
            </motion.div>

            {/* Emerging Cultural Motif Card (Revealing Haryana's cultural identity along the journey) */}
            <div className="flex justify-center pb-8 sm:pb-12">
              <AnimatePresence mode="wait">
                {currentMotif && (
                  <motion.div
                    key={currentMotif.id}
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full px-5 py-3.5 rounded-sm border border-[#c5a059]/70 bg-[#1e120a]/88 backdrop-blur-md text-center shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-[#ffd27d] text-xs">{currentMotif.glyph}</span>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#ffd27d] uppercase">
                        {currentMotif.title}
                      </h4>
                      <span className="text-[#ffd27d] text-xs">{currentMotif.glyph}</span>
                    </div>
                    <p className="font-marcellus text-[10px] sm:text-xs text-[#d8c29d] leading-relaxed">
                      {currentMotif.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          LAYER 7: PERSISTENT CONTROLS & HUD
          ======================================================== */}
      {/* Top-Left: Return to Map */}
      <div className="absolute top-5 left-5 sm:left-8 z-40 flex items-center gap-3">
        <button
          onClick={onCancelReturnToMap}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/40 bg-[#1a1008]/85 hover:bg-[#2b170c] text-[#ffd27d] text-xs font-marcellus tracking-wider transition-colors cursor-pointer backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
        >
          <span>← Bhārata Varṣa Atlas</span>
        </button>

        {/* Ambient Sound Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#1a1008]/85 hover:bg-[#2b170c] flex items-center justify-center text-[#ffd27d] transition-colors cursor-pointer backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
          title={isMuted ? "Unmute Ambiance" : "Mute Ambiance"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Top-Right: Skip Journey Direct Gateway */}
      <div className="absolute top-5 right-5 sm:right-8 z-40">
        <button
          onClick={onJourneyComplete}
          className="btn-antique-journey flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-cinzel font-bold text-[#fff4d0] tracking-[0.18em] uppercase cursor-pointer"
        >
          <span>Skip Journey</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#ffd27d]" />
        </button>
      </div>

      {/* Bottom Progress Bar: Subtle Antique Gold Hairline */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-[#1a1008]/60 z-40">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 11.2, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#9c7a4b] via-[#d4af37] to-[#ffd27d]"
        />
      </div>

    </div>
  );
}
