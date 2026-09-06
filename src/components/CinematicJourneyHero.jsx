import React, { useState, useEffect, useRef } from 'react';
import DiyaFlame from './DiyaFlame';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';
import BrandReveal from './BrandReveal';

/**
 * Cinematic Journey Hero (Heritage Archive Entrance)
 *
 * Sequence:
 * 1. Background image is preloaded and pre-positioned at its resting coordinates.
 * 2. Background transitions in smoothly with a subtle opacity fade.
 * 3. Atmospheric dark overlay, vignette, and ambient warmth fade in independently.
 * 4. Navbar/UI appears smoothly with subtle fade + upward movement after background stabilizes.
 * 5. Hero content appears smoothly without causing background re-render or jump.
 * 6. Resting state operates with gentle, GPU-accelerated 2.5D mouse parallax.
 */
export default function CinematicJourneyHero({
  isActive = true,
  onBeginJourneyNext,
  isNavbarVisible,
  setIsNavbarVisible,
}) {
  // Staged entrance states
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isHeroContentVisible, setIsHeroContentVisible] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Preload primary background image so it's already in browser cache before animation begins
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/heritage_hero_bg.jpg';
  }, []);

  // 2. Coordinated, non-competing cinematic entrance sequence (runs once per entry)
  useEffect(() => {
    if (!isActive) return;

    // Step 1: Background fades in smoothly (already pre-positioned at scale 1.02)
    const t1 = setTimeout(() => {
      setIsBgVisible(true);
    }, 60);

    // Step 2: Dark overlay, vignette & sanctum warmth fade in smoothly and independently
    const t2 = setTimeout(() => {
      setIsOverlayVisible(true);
    }, 420);

    // Step 3: Navbar appears smoothly with subtle fade + upward movement after background stabilizes
    const t3 = setTimeout(() => {
      if (setIsNavbarVisible) setIsNavbarVisible(true);
    }, 850);

    // Step 4: Hero content (BrandReveal) appears smoothly without background re-render
    const t4 = setTimeout(() => {
      setIsHeroContentVisible(true);
    }, 1150);

    // Step 5: Scene settles permanently into resting state; subtle mouse parallax gently activates
    const t5 = setTimeout(() => {
      setIsSettled(true);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, setIsNavbarVisible]);

  // 3. Smooth, throttled mouse movement for resting state parallax (active only after settling)
  useEffect(() => {
    if (!isSettled) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSettled]);

  const mx = isSettled ? mousePos.x * 0.5 : 0;
  const my = isSettled ? mousePos.y * 0.5 : 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0704] select-none">

      {/* ========================================================
          LAYER 1: DESTINATION HERITAGE WORLD (Pre-positioned Background)
          ======================================================== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/heritage_hero_bg.jpg')`,
          opacity: isBgVisible ? 1 : 0,
          transform: isSettled
            ? `translate3d(${mx * 5}px, ${my * 3}px, 0) scale(1.02)`
            : 'translate3d(0, 0, 0) scale(1.02)',
          transition: isSettled
            ? 'transform 0.4s ease-out, opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'opacity, transform',
          filter: 'brightness(1.02) contrast(1.02)',
        }}
      />

      {/* ========================================================
          LAYER 2: ATMOSPHERIC HORIZON MIST & WARM HAZE (Independent Fade)
          ======================================================== */}
      <div
        className="absolute top-[25%] left-0 right-0 h-48 pointer-events-none mix-blend-screen bg-gradient-to-t from-transparent via-[#ffd27d]/25 to-transparent transition-opacity duration-1000 ease-out"
        style={{
          opacity: isOverlayVisible ? 0.35 : 0,
          transform: `translate3d(${mx * 3}px, ${my * 2}px, 0)`,
          animation: 'floatGentle 8s ease-in-out infinite',
        }}
      />

      {/* ========================================================
          LAYER 3: SOARING BIRDS (Multi-layer sky movements)
          ======================================================== */}
      <div 
        className="transition-opacity duration-1000 ease-out pointer-events-none"
        style={{ opacity: isOverlayVisible ? 0.6 : 0 }}
      >
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
      </div>

      {/* ========================================================
          LAYER 4: SANCTUM DESTINATION DIYAS (Lamps in Temple Sanctum)
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out"
        style={{ opacity: isOverlayVisible ? 1 : 0 }}
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
          LAYER 5: LIVING ATMOSPHERE CANVAS ENGINE (Particles & Rays)
          ======================================================== */}
      <div
        className="transition-opacity duration-1000 ease-out pointer-events-none"
        style={{ opacity: isOverlayVisible ? 1 : 0 }}
      >
        <LivingAtmosphereCanvas
          mousePos={mousePos}
          progress={1.0}
          isArrival={true}
        />
      </div>

      {/* ========================================================
          LAYER 6: AMBIENT MORNING LIGHT BREATHING
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-gradient-radial from-[#ffe39f]/25 via-[#d4af37]/8 to-transparent transition-opacity duration-1000"
        style={{
          opacity: isOverlayVisible ? 0.55 : 0,
          animation: 'pulseHalo 10s ease-in-out infinite alternate',
        }}
      />

      {/* ========================================================
          LAYER 7: HERO CONTENT (BrandReveal — Smooth Staged Entrance)
          ======================================================== */}
      <div
        className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isHeroContentVisible ? 1 : 0,
          transform: isHeroContentVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
          pointerEvents: isHeroContentVisible ? 'auto' : 'none',
        }}
      >
        <BrandReveal onBeginJourney={onBeginJourneyNext} />
      </div>

      {/* ========================================================
          LAYER 8: VINTAGE PARCHMENT TEXTURE OVERLAY
          ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/assets/parchment_texture.jpg')`,
          opacity: isOverlayVisible ? 0.2 : 0,
        }}
      />
    </div>
  );
}
