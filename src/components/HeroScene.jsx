import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DiyaFlame from './DiyaFlame';
import DustParticlesCanvas from './DustParticlesCanvas';
import BrandReveal from './BrandReveal';

/**
 * 2.5D Parallax Illustrated Heritage Hero Scene
 * Flawlessly integrates layered depth, realistic flickering diyas, soaring birds,
 * canvas golden dust motes, and smooth scroll camera progression.
 */
export default function HeroScene({ onBeginJourney, scrollProgress }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth mouse move tracking for 2.5D parallax
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 30, -1), 1);
        const y = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Parallax offsets based on depth layers
  const bgOffsetX = mousePos.x * 6;
  const bgOffsetY = mousePos.y * 4;

  const midOffsetX = mousePos.x * 16;
  const midOffsetY = mousePos.y * 10;

  const fgOffsetX = mousePos.x * 28;
  const fgOffsetY = mousePos.y * 18;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0e0a07] select-none">
      
      {/* 1. BACKGROUND SKY & SUN LAYER (Furthest) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
        style={{
          backgroundImage: `url('/assets/heritage_hero_bg.jpg')`,
          transform: `translate3d(${bgOffsetX}px, ${bgOffsetY}px, 0) scale(${1.05 + (scrollProgress || 0) * 0.15})`,
        }}
      />

      {/* 2. ATMOSPHERIC SUNBEAMS & GOLDEN HAZE LAYER */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 bg-gradient-radial from-[#ffe39f]/40 via-[#d4af37]/10 to-transparent"
        style={{
          transform: `translate3d(${bgOffsetX * 1.5}px, ${bgOffsetY * 1.5}px, 0)`,
        }}
      />

      {/* 3. SOARING FLOCK OF BIRDS (Subtle Ambient Movement) */}
      <div className="absolute top-[18%] left-0 w-full pointer-events-none opacity-45">
        <div className="animate-bird-flight flex items-center gap-6">
          <svg className="w-5 h-3 text-[#2a1d13]" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-4 h-2.5 text-[#2a1d13] -mt-3" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-3.5 h-2 text-[#2a1d13] mt-2" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
          <svg className="w-4 h-2.5 text-[#2a1d13] -mt-1" viewBox="0 0 20 10" fill="currentColor">
            <path d="M0,5 Q5,0 10,5 Q15,0 20,5 Q15,2 10,7 Q5,2 0,5 Z" />
          </svg>
        </div>
      </div>

      {/* 4. CANVAS GOLDEN DUST PARTICLES & EMBERS */}
      <DustParticlesCanvas mousePos={mousePos} />

      {/* 5. LIVING DIYAS ALONG THE SACRED STONE PATHWAY */}
      {/* Foreground Left Diya on Stone Post */}
      <div 
        className="absolute bottom-[23%] left-[13%] sm:left-[17%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${fgOffsetX}px, ${fgOffsetY}px, 0)` }}
      >
        <DiyaFlame scale={1.2} />
      </div>

      {/* Foreground Right Diya on Stone Post */}
      <div 
        className="absolute bottom-[23%] right-[14%] sm:right-[18%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${fgOffsetX}px, ${fgOffsetY}px, 0)` }}
      >
        <DiyaFlame scale={1.2} />
      </div>

      {/* Bottom Center-Left Diya in Urli Bowl */}
      <div 
        className="absolute bottom-[5%] left-[23%] sm:left-[27%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${fgOffsetX * 1.2}px, ${fgOffsetY * 1.2}px, 0)` }}
      >
        <DiyaFlame scale={1.35} />
      </div>

      {/* Bottom Center-Right Diya in Urli Bowl */}
      <div 
        className="absolute bottom-[5%] right-[22%] sm:right-[26%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${fgOffsetX * 1.2}px, ${fgOffsetY * 1.2}px, 0)` }}
      >
        <DiyaFlame scale={1.35} />
      </div>

      {/* Middleground Left Stone Pillar Diya */}
      <div 
        className="absolute bottom-[35%] left-[30%] sm:left-[32%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${midOffsetX}px, ${midOffsetY}px, 0)` }}
      >
        <DiyaFlame scale={0.7} />
      </div>

      {/* Middleground Right Stone Pillar Diya */}
      <div 
        className="absolute bottom-[35%] right-[32%] sm:right-[34%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${midOffsetX}px, ${midOffsetY}px, 0)` }}
      >
        <DiyaFlame scale={0.7} />
      </div>

      {/* 6. BRAND REVEAL & TITLE CENTERED IN THE SKY VISTA */}
      <div 
        className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-4"
        style={{
          opacity: Math.max(0, 1 - (scrollProgress || 0) * 1.8),
          transform: `translateY(-${(scrollProgress || 0) * 120}px)`,
        }}
      >
        <BrandReveal onBeginJourney={onBeginJourney} />
      </div>

      {/* 7. VINTAGE PARCHMENT MANUSCRIPT TEXTURE OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/parchment_texture.jpg')` }}
      />
    </div>
  );
}
