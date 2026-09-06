import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../services/audioManager';

/**
 * SCRIPTURES SIGNATURE ENTRANCE ANIMATION: "THE SACRED ARCHIVE LIGHT REVEAL"
 * 
 * Cinematic Light Reveal Sequence:
 * Phase 1 (0.0s – 0.5s): Complete Darkness (#030201). No UI, no book, no text.
 * Phase 2 (0.5s – 1.2s): Warm antique-golden rays enter diagonally from top-right.
 * Phase 3 (1.2s – 1.8s): Rays intensify with volumetric temple atmosphere.
 * Phase 4 (1.8s – 2.4s): Sudden elegant warm golden light burst illuminates viewport.
 * Phase 5 (2.0s – 3.0s): Hundreds of tiny golden dust motes stream diagonally (Top-Right ↘ Lower-Left).
 * Phase 6 (2.5s – 3.8s): Existing Scriptures page smoothly emerges from the golden haze.
 * Phase 7 (3.8s): Settle and clean handoff.
 * 
 * NO floating manuscript. NO book opening. NO floating text.
 * Purely: Golden light shafts + volumetric temple atmosphere + illuminated sacred dust.
 */

// Web Audio synthesizer for ancient sanctum resonance and light illumination
function playSanctumAcoustics(type) {
  try {
    if (audioManager.isMuted) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'sanctum-silence') {
      // Very deep low-frequency archive room tone (54Hz & 108Hz harmonic)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(108, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(54, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.2);
    } else if (type === 'light-burst') {
      // Warm swelling harmonic chord as light expands (216Hz, 324Hz, 432Hz)
      const baseFreq = 216;
      [1, 1.5, 2].forEach((mult, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05 / (i + 1), ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.4);
      });
    }
  } catch (e) {
    // Non-critical audio fallback
  }
}

export default function ScripturesEntryTransition({ onComplete }) {
  // Stages: 'darkness' | 'rays' | 'intensify' | 'burst' | 'reveal' | 'settle'
  const [stage, setStage] = useState('darkness');
  const canvasRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Timeline orchestration
  useEffect(() => {
    playSanctumAcoustics('sanctum-silence');

    if (isReducedMotion) {
      const fastTimer = setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 600);
      return () => clearTimeout(fastTimer);
    }

    // 0.5s: Golden rays begin from top-right
    const tRays = setTimeout(() => {
      setStage('rays');
    }, 500);

    // 1.2s: Rays intensify
    const tIntensify = setTimeout(() => {
      setStage('intensify');
    }, 1200);

    // 1.8s: Golden light burst
    const tBurst = setTimeout(() => {
      setStage('burst');
      playSanctumAcoustics('light-burst');
    }, 1800);

    // 2.5s: Scriptures page begins emerging through the golden haze
    const tReveal = setTimeout(() => {
      setStage('reveal');
    }, 2500);

    // 3.4s: Rays and particles begin settling
    const tSettle = setTimeout(() => {
      setStage('settle');
    }, 3400);

    // 3.8s: Final completion callback
    const tComplete = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 3800);

    return () => {
      clearTimeout(tRays);
      clearTimeout(tIntensify);
      clearTimeout(tBurst);
      clearTimeout(tReveal);
      clearTimeout(tSettle);
      clearTimeout(tComplete);
    };
  }, [isReducedMotion]);

  // High-performance canvas particle system for illuminated sacred dust motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 160 tiny illuminated dust particles
    const particleCount = 160;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      // Stagger spawn positions with bias toward top-right
      const startBias = Math.random();
      const x = startBias > 0.4 ? width * (0.4 + Math.random() * 0.7) : Math.random() * width;
      const y = startBias > 0.4 ? height * (-0.1 + Math.random() * 0.5) : Math.random() * height;

      particles.push({
        x,
        y,
        size: 0.8 + Math.random() * 2.4,
        // Diagonal flow: moving left and down (Top-Right ↘ Center ↘ Lower-Left)
        vx: -(0.55 + Math.random() * 1.6),
        vy: 0.55 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.75,
        alpha: 0,
        twinkleSpeed: 1.5 + Math.random() * 3.5,
        phase: Math.random() * Math.PI * 2,
        isFlare: Math.random() > 0.82, // Some particles flare when crossing rays
      });
    }

    let startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Only draw particles once rays start entering (>0.6s)
      if (elapsed > 0.6) {
        // Global particle opacity ramps in nicely
        const globalRamp = Math.min(1, (elapsed - 0.6) / 1.0);
        // During settle phase (>3.3s), gently ease down
        const settleFade = elapsed > 3.3 ? Math.max(0, 1 - (elapsed - 3.3) / 0.5) : 1;

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];

          // Update position along diagonal vector
          p.x += p.vx;
          p.y += p.vy;

          // Subtle Brownian drift
          p.x += Math.sin(elapsed * 1.2 + p.phase) * 0.35;
          p.y += Math.cos(elapsed * 1.5 + p.phase) * 0.25;

          // Wrap around screen boundaries seamlessly
          if (p.x < -20) p.x = width + 20;
          if (p.y > height + 20) p.y = -20;

          // Check if particle is inside the diagonal beam zone (x + y approx center diagonal)
          // Diagonal line from (width, 0) to (0, height) is x/width + y/height ≈ 1
          const diagPos = p.x / width + p.y / height;
          const inBeam = diagPos > 0.45 && diagPos < 1.35;

          // Twinkle calculation
          const twinkle = 0.65 + 0.35 * Math.sin(elapsed * p.twinkleSpeed + p.phase);
          const flareBonus = p.isFlare && inBeam ? 1.6 : 1.0;
          const currentAlpha = p.baseAlpha * twinkle * globalRamp * settleFade * flareBonus;

          if (currentAlpha > 0.01) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (p.isFlare ? 1.2 : 1), 0, Math.PI * 2);

            // Warm antique gold palette
            if (p.isFlare && inBeam) {
              // Glowing sunlit mote
              const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
              grad.addColorStop(0, `rgba(255, 245, 205, ${Math.min(1, currentAlpha * 1.3)})`);
              grad.addColorStop(0.4, `rgba(240, 195, 95, ${currentAlpha * 0.8})`);
              grad.addColorStop(1, `rgba(180, 120, 30, 0)`);
              ctx.fillStyle = grad;
              ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            } else {
              ctx.fillStyle = `rgba(235, 195, 110, ${Math.min(1, currentAlpha)})`;
            }

            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden">
      {/* ====================================================================
          PHASE 1: COMPLETE OBSIDIAN DARKNESS BASE
          This veil starts at opacity 1 (pure black void) and smoothly dissolves
          at Phase 6 (2.5s) to reveal the Scriptures page already waiting underneath.
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === 'reveal' || stage === 'settle' ? 0 : 1,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 bg-[#030201]"
      />

      {/* ====================================================================
          PHASE 2 & 3: VOLUMETRIC GOLDEN RAYS ENTERING FROM TOP-RIGHT
          Soft sunlight entering dark ancient archive, spreading diagonally.
          Multiple thin and broad rays with soft atmospheric edges.
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: stage === 'darkness' ? 0 : stage === 'rays' ? 0.5 : stage === 'intensify' ? 0.88 : stage === 'burst' ? 1 : stage === 'reveal' ? 0.65 : 0,
        }}
        transition={{
          duration: stage === 'rays' ? 0.7 : stage === 'burst' ? 0.5 : 1.0,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Volumetric Beam Gradients (originating at top-right 1920,0 toward lower-left) */}
            <linearGradient id="rayBeamCore" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff2cf" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#f3c96a" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#c59232" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#5a3c10" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="rayBeamWide" x1="100%" y1="0%" x2="15%" y2="100%">
              <stop offset="0%" stopColor="#ffd982" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#d99f36" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#8a5717" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="rayBeamFine" x1="98%" y1="0%" x2="0%" y2="85%">
              <stop offset="0%" stopColor="#fff8e2" stopOpacity="0.7" />
              <stop offset="30%" stopColor="#e8b958" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#9c661d" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Soft Gaussian blur for atmospheric, dusty volumetric light */}
            <filter id="volumetricAtmosphere" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softRayGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="32" />
            </filter>
          </defs>

          {/* Group of volumetric beams with soft atmosphere filter */}
          <g filter="url(#volumetricAtmosphere)">
            {/* Primary Main Sunbeam Shaft (Cutting straight toward center-left) */}
            <polygon
              points="1920,-20 1850,-20 300,1100 750,1100"
              fill="url(#rayBeamCore)"
              opacity="0.9"
            />

            {/* Broad Secondary Atmospheric Shaft (Lower center illumination) */}
            <polygon
              points="1940,-10 1780,-10 650,1100 1250,1100"
              fill="url(#rayBeamWide)"
              opacity="0.65"
            />

            {/* Sharp Accent Beam 1 (Heading toward far lower-left) */}
            <polygon
              points="1900,-20 1870,-20 0,820 0,980"
              fill="url(#rayBeamFine)"
              opacity="0.75"
            />

            {/* Sharp Accent Beam 2 (Slanted high through center) */}
            <polygon
              points="1920,40 1920,110 400,1080 560,1080"
              fill="url(#rayBeamFine)"
              opacity="0.6"
            />

            {/* Slender Beam 3 */}
            <polygon
              points="1820,-20 1790,-20 120,1100 220,1100"
              fill="url(#rayBeamFine)"
              opacity="0.5"
            />

            {/* Broad Ambient Soft Wash */}
            <polygon
              points="1920,-50 1600,-50 0,600 0,1100 1100,1100"
              fill="url(#rayBeamWide)"
              opacity="0.35"
            />
          </g>

          {/* Secondary ambient glow layer for dusty temple illumination */}
          <g filter="url(#softRayGlow)" opacity="0.6">
            <polygon
              points="1920,-20 1750,-20 200,1100 900,1100"
              fill="url(#rayBeamCore)"
            />
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          PHASE 3: SUDDEN ELEGANT WARM GOLDEN LIGHT BURST
          Light expands outward from upper-right / center-right, softly
          illuminating the entire screen (deep brown + black + muted antique gold).
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: stage === 'burst' ? 0.95 : stage === 'reveal' ? 0.6 : stage === 'settle' ? 0 : 0,
          scale: stage === 'burst' || stage === 'reveal' ? 1.6 : 0.8,
        }}
        transition={{
          duration: stage === 'burst' ? 0.75 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -top-32 -right-32 w-[900px] h-[900px] sm:w-[1300px] sm:h-[1300px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 75% 25%, rgba(255, 235, 175, 0.65) 0%, rgba(220, 165, 60, 0.38) 32%, rgba(140, 85, 25, 0.18) 60%, transparent 78%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Overall Viewport Ambient Warm Tone Wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: stage === 'burst' ? 0.45 : stage === 'reveal' ? 0.25 : 0,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(200, 145, 55, 0.35) 0%, rgba(70, 40, 15, 0.2) 50%, transparent 80%)',
        }}
      />

      {/* ====================================================================
          PHASE 4 & 5: CANVAS PARTICLE SYSTEM FOR THOUSANDS OF GOLDEN DUST MOTES
          Floating and flowing: TOP-RIGHT ↘ CENTER ↘ LOWER-LEFT
          Illuminated dust in ancient archive atmosphere.
          ==================================================================== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Subtle archival atmosphere grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(rgba(215, 180, 100, 0.2) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
}
