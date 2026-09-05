import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiyaFlame from './DiyaFlame';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';
import BrandReveal from './BrandReveal';

/**
 * Cinematic Journey Hero (3D World Travel & Persistent Atmosphere)
 *
 * Sequence:
 * 0.0 - 0.35: Ground-level corridor with close carved pillars, fallen leaves, and ground diyas.
 * 0.35 - 0.85: Camera travels forward, corridor opens up, revealing the vast temple city & elephant.
 * 0.85 - 1.0: Camera smoothly decelerates and comes to a peaceful stop.
 * 1.0 (Arrival): Calm breathing space, then SANSKRITI title & navbar are revealed!
 *
 * All atmospheric effects, light rays, and particles persist and respond continuously to forward travel velocity.
 */
export default function CinematicJourneyHero({
  isActive = true,
  onBeginJourneyNext,
  isNavbarVisible,
  setIsNavbarVisible,
}) {
  // Journey progress from 0.0 (start of road) to 1.0 (arrival at hero composition)
  const [progress, setProgress] = useState(0);
  const [hasArrived, setHasArrived] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const progressRef = useRef(0);
  const animFrameRef = useRef(null);
  const autoPlaySpeedRef = useRef(0.0016); // ~10.5 seconds for complete journey

  // Track mouse for refined subtle 2.5D spatial parallax
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

  // Automatic smooth cinematic journey loop (runs seamlessly when active)
  useEffect(() => {
    if (!isActive) return;

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (progressRef.current < 1.0) {
        // Natural easing: gentle start, steady cruise, gradual deceleration into destination
        let speedMultiplier = 1.0;
        const p = progressRef.current;
        if (p < 0.2) speedMultiplier = 0.7 + p * 2.0; // gentle ramp up
        else if (p > 0.75) speedMultiplier = Math.max(0.2, (1.0 - p) * 3.5); // smooth braking

        const nextP = Math.min(1.0, progressRef.current + autoPlaySpeedRef.current * speedMultiplier * (delta * 60));
        progressRef.current = nextP;
        setProgress(nextP);

        if (nextP >= 1.0) {
          setHasArrived(true);
          setIsNavbarVisible(true);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isActive, setIsNavbarVisible]);

  // Handle scroll & trackpad scrubbing through the journey
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      const delta = e.deltaY * 0.00085;
      const nextP = Math.min(Math.max(progressRef.current + delta, 0), 1.0);
      progressRef.current = nextP;
      setProgress(nextP);

      if (nextP >= 0.96) {
        setHasArrived(true);
        setIsNavbarVisible(true);
      } else {
        setHasArrived(false);
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, setIsNavbarVisible]);

  // Parallax offsets (Restrained & refined within a few pixels)
  const p = progress;
  const mx = mousePos.x * (hasArrived ? 0.7 : 0.3);
  const my = mousePos.y * (hasArrived ? 0.7 : 0.3);

  // Depth transforms
  // 1. Initial close-up corridor (fades and expands outwards past camera)
  const corridorScale = 1.0 + p * 1.6;
  const corridorOpacity = Math.max(0, 1.0 - p * 1.9);
  const corridorTranslateY = p * 150;

  // 2. Pillars frame overlay (moves wide and sweeps past camera)
  const pillarsScale = 1.0 + p * 2.2;
  const pillarsOpacity = Math.max(0, 1.0 - p * 2.6);

  // 3. Destination Heritage World (scales from distant into crisp final composition)
  const destScale = 0.84 + p * 0.21; // starts at 0.84 scale and expands to 1.05
  const destOpacity = Math.min(1.0, 0.4 + p * 0.9);
  const destTranslateY = (1.0 - p) * 40;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0704] select-none">

      {/* ========================================================
          LAYER 1: DESTINATION HERITAGE WORLD (Arriving Landscape)
          ======================================================== */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('/assets/heritage_hero_bg.jpg')`,
          opacity: destOpacity,
          transform: `translate3d(${mx * 5}px, ${my * 3 + destTranslateY}px, 0) scale(${destScale})`,
          filter: `brightness(${0.86 + p * 0.18}) contrast(${0.96 + p * 0.08})`,
        }}
      />

      {/* ========================================================
          LAYER 2: ATMOSPHERIC HORIZON MIST & WARM HAZE (Continuous)
          ======================================================== */}
      <div
        className="absolute top-[25%] left-0 right-0 h-48 pointer-events-none opacity-30 mix-blend-screen bg-gradient-to-t from-transparent via-[#ffd27d]/25 to-transparent transition-transform duration-300"
        style={{
          transform: `translate3d(${mx * 3}px, ${my * 2}px, 0)`,
          animation: 'floatGentle 8s ease-in-out infinite',
        }}
      />

      {/* ========================================================
          LAYER 3: CLOSE-UP STARTING CORRIDOR & GROUND ROAD
          ======================================================== */}
      {corridorOpacity > 0.01 && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url('/assets/pathway_start_closeup.jpg')`,
            opacity: corridorOpacity,
            transform: `translate3d(${mx * 12}px, ${my * 8 + corridorTranslateY}px, 0) scale(${corridorScale})`,
            filter: `blur(${p * 4}px)`,
          }}
        />
      )}

      {/* ========================================================
          LAYER 4: CARVED STONE PILLARS FRAMING (Sweeps past camera)
          ======================================================== */}
      {pillarsOpacity > 0.01 && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `url('/assets/pillars_frame.jpg')`,
            opacity: pillarsOpacity * 0.85,
            transform: `scale(${pillarsScale}) translate3d(${mx * 18}px, ${my * 10}px, 0)`,
            filter: `blur(${p * 8}px)`,
          }}
        />
      )}

      {/* ========================================================
          LAYER 5: SOARING BIRDS (Multi-layer sky movements)
          ======================================================== */}
      {/* Distant Slow Flock */}
      <div className="absolute top-[14%] left-0 w-full pointer-events-none opacity-50">
        <div className="animate-bird-flight flex items-center gap-9">
          <svg className="w-4 h-2.5 text-[#24180f]" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-3 h-2 text-[#24180f] -mt-2" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-3.5 h-2 text-[#24180f] mt-2" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
        </div>
      </div>

      {/* Mid-Sky Flock */}
      <div className="absolute top-[21%] left-0 w-full pointer-events-none opacity-60">
        <div
          className="animate-bird-flight flex items-center gap-6"
          style={{ animationDuration: '38s', animationDelay: '-15s' }}
        >
          <svg className="w-4.5 h-3 text-[#1f140c]" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-3.5 h-2.5 text-[#1f140c] mt-2" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
        </div>
      </div>

      {/* ========================================================
          LAYER 6: PASS-BY STARTING CORRIDOR DIYAS (0.0 -> 0.45)
          ======================================================== */}
      {corridorOpacity > 0.05 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: corridorOpacity }}
        >
          {/* Close Ground Left Diya - sweeps past bottom left */}
          <div
            className="absolute bottom-[10%] left-[12%]"
            style={{
              transform: `translate3d(${-p * 180 + mx * 15}px, ${p * 120 + my * 8}px, 0) scale(${1.3 + p * 1.5})`
            }}
          >
            <DiyaFlame scale={1.4} delay={0.1} duration={1.6} />
          </div>

          {/* Close Ground Right Diya - sweeps past bottom right */}
          <div
            className="absolute bottom-[10%] right-[12%]"
            style={{
              transform: `translate3d(${p * 180 + mx * 15}px, ${p * 120 + my * 8}px, 0) scale(${1.3 + p * 1.5})`
            }}
          >
            <DiyaFlame scale={1.4} delay={0.7} duration={2.0} />
          </div>

          {/* Mid-Corridor Left Step Diya */}
          <div
            className="absolute bottom-[28%] left-[28%]"
            style={{
              transform: `translate3d(${-p * 120 + mx * 10}px, ${p * 90 + my * 6}px, 0) scale(${0.9 + p * 1.2})`
            }}
          >
            <DiyaFlame scale={0.9} delay={0.4} duration={1.8} />
          </div>

          {/* Mid-Corridor Right Step Diya */}
          <div
            className="absolute bottom-[28%] right-[28%]"
            style={{
              transform: `translate3d(${p * 120 + mx * 10}px, ${p * 90 + my * 6}px, 0) scale(${0.9 + p * 1.2})`
            }}
          >
            <DiyaFlame scale={0.9} delay={1.1} duration={1.7} />
          </div>
        </div>
      )}

      {/* ========================================================
          LAYER 7: SANCTUM DESTINATION DIYAS (0.35 -> 1.0)
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: Math.min(1.0, Math.max(0.1, p * 1.2)) }}
      >
        {/* Foreground Left Diya on Stone Post */}
        <div
          className="absolute bottom-[22%] left-[16%] sm:left-[17%]"
          style={{ transform: `translate3d(${mx * 12}px, ${my * 7}px, 0)` }}
        >
          <DiyaFlame scale={1.15} delay={0.2} duration={1.7} />
        </div>

        {/* Foreground Right Diya on Stone Post */}
        <div
          className="absolute bottom-[22%] right-[17%] sm:right-[18%]"
          style={{ transform: `translate3d(${mx * 12}px, ${my * 7}px, 0)` }}
        >
          <DiyaFlame scale={1.15} delay={0.9} duration={2.1} />
        </div>

        {/* Bottom Urli Bowl Diyas */}
        <div
          className="absolute bottom-[4%] left-[26%]"
          style={{ transform: `translate3d(${mx * 15}px, ${my * 9}px, 0)` }}
        >
          <DiyaFlame scale={1.3} delay={0.4} duration={1.9} />
        </div>
        <div
          className="absolute bottom-[4%] right-[25%]"
          style={{ transform: `translate3d(${mx * 15}px, ${my * 9}px, 0)` }}
        >
          <DiyaFlame scale={1.3} delay={1.2} duration={1.6} />
        </div>

        {/* Midground Flanking Pillar Diyas */}
        <div
          className="absolute bottom-[35%] left-[31%]"
          style={{ transform: `translate3d(${mx * 7}px, ${my * 4}px, 0)` }}
        >
          <DiyaFlame scale={0.7} delay={0.6} duration={2.3} showPedestalGlow={false} />
        </div>
        <div
          className="absolute bottom-[35%] right-[33%]"
          style={{ transform: `translate3d(${mx * 7}px, ${my * 4}px, 0)` }}
        >
          <DiyaFlame scale={0.7} delay={1.4} duration={1.8} showPedestalGlow={false} />
        </div>
      </div>

      {/* ========================================================
          LAYER 8: LIVING ATMOSPHERE CANVAS ENGINE (3D Travel Physics)
          Persists continuously throughout entire travel journey!
          ======================================================== */}
      <LivingAtmosphereCanvas
        mousePos={mousePos}
        progress={progress}
        isArrival={hasArrived}
      />

      {/* ========================================================
          LAYER 9: AMBIENT MORNING LIGHT BREATHING
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-gradient-radial from-[#ffe39f]/25 via-[#d4af37]/8 to-transparent transition-opacity duration-1000"
        style={{
          opacity: 0.35 + p * 0.35,
          animation: 'pulseHalo 10s ease-in-out infinite alternate',
        }}
      />

      {/* ========================================================
          LAYER 10: THE ARRIVAL MOMENT — SANSKRITI TITLE REVEAL
          ======================================================== */}
      <AnimatePresence>
        {hasArrived && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-4"
          >
            <BrandReveal onBeginJourney={onBeginJourneyNext} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          LAYER 11: VINTAGE PARCHMENT TEXTURE OVERLAY
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/parchment_texture.jpg')` }}
      />
    </div>
  );
}
