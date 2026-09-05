import React, { useEffect, useRef } from 'react';

/**
 * Living Atmosphere Canvas Engine (3D Forward-Travel Particle Physics & Volumetric Light)
 *
 * Persists continuously from START -> TRAVEL -> ARRIVAL -> FINAL HERO.
 *
 * Features:
 * 1. 3D Z-Depth Golden Dust: Particles have real Z-depth. As the camera travels forward,
 *    near particles rush past the lens with radial expansion & motion blur.
 * 2. Foreground Pass-By Elements: Blurred peepal leaves & petals sweeping past camera edges during travel.
 * 3. Volumetric Golden God-Rays: Shifting perspective & radiance tied to world coordinates.
 * 4. Continuous Rising Diya Embers: Saffron sparks wafting up from lamps throughout the journey.
 * 5. Morning Water & Road Shimmer: Dawn reflections undulating on the flagstones & river.
 */
export default function LivingAtmosphereCanvas({ mousePos, progress = 0, isArrival = false }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);
  const prevProgressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;

    // =========================================================================
    // 1. 3D Z-DEPTH GOLDEN DUST PARTICLES POOL
    // =========================================================================
    const dustCount = isMobile ? 45 : 95;
    const dustParticles = [];

    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 900 + 50, // 50 (close) to 950 (far)
        baseSize: Math.random() * 2.2 + 0.8,
        driftX: (Math.random() - 0.45) * 0.3 + 0.08,
        driftY: -Math.random() * 0.3 - 0.05,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseAngle: Math.random() * Math.PI * 2,
        baseOpacity: Math.random() * 0.55 + 0.25,
        hue: 36 + Math.random() * 12,
      });
    }

    // =========================================================================
    // 2. FOREGROUND PASS-BY ELEMENTS (Blurred Leaves, Petals & Lens Motes)
    // =========================================================================
    const passByCount = isMobile ? 3 : 6;
    const passByElements = [];

    for (let i = 0; i < passByCount; i++) {
      const isLeaf = Math.random() > 0.5;
      passByElements.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 500 + 100,
        size: isLeaf ? Math.random() * 12 + 10 : Math.random() * 8 + 6,
        type: isLeaf ? 'leaf' : 'petal',
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        color: isLeaf ? 'rgba(195, 140, 50, ' : (Math.random() > 0.5 ? 'rgba(235, 140, 25, ' : 'rgba(180, 35, 45, '),
      });
    }

    // =========================================================================
    // 3. RISING DIYA EMBERS POOL (Continuous throughout journey)
    // =========================================================================
    const emberCount = isMobile ? 8 : 16;
    const embers = [];

    const getDiyaSpawnX = (p) => {
      // Diyas spread wider as camera travels forward into the wide sanctum
      const spreadFactor = 0.22 + p * 0.12;
      const isLeft = Math.random() > 0.5;
      const spread = (Math.random() - 0.5) * 50;
      return isLeft ? width * (0.5 - spreadFactor) + spread : width * (0.5 + spreadFactor) + spread;
    };

    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: getDiyaSpawnX(0.5),
        y: height * 0.72 + Math.random() * (height * 0.22),
        size: Math.random() * 1.6 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.3,
        opacity: 0,
        maxOpacity: Math.random() * 0.65 + 0.3,
        life: Math.random() * 120 + 60,
        maxLife: Math.random() * 120 + 100,
        hue: 32 + Math.random() * 14,
      });
    }

    // =========================================================================
    // 4. VOLUMETRIC GOD-RAYS DEFINITION
    // =========================================================================
    const rays = [
      { baseAngle: 0.95, width: 0.18, speed: 0.0007, length: 1.1, baseAlpha: 0.05 },
      { baseAngle: 1.25, width: 0.24, speed: 0.0009, length: 1.2, baseAlpha: 0.065 },
      { baseAngle: 1.62, width: 0.20, speed: 0.0006, length: 1.0, baseAlpha: 0.045 },
      { baseAngle: 2.05, width: 0.26, speed: 0.0008, length: 1.15, baseAlpha: 0.055 },
    ];

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const p = progressRef.current || 0;
      const prevP = prevProgressRef.current || 0;
      // Calculate travel velocity
      const forwardVelocity = Math.max(0.6, Math.abs(p - prevP) * 350 + (p < 0.98 ? 1.4 : 0.3));
      prevProgressRef.current = p;

      const mx = (mousePos?.x || 0) * 10;
      const my = (mousePos?.y || 0) * 6;

      // Sun origin shifts with travel progress
      const sunX = width * (0.68 + p * 0.05) + mx * 0.3;
      const sunY = height * (0.18 - p * 0.03) + my * 0.3;

      // Global sunlight breathing
      const sunlightBreath = (0.88 + Math.sin(frame * 0.008) * 0.12) * (0.75 + p * 0.35);

      // -------------------------------------------------------------
      // A. SOFT VOLUMETRIC GOD-RAYS (CONTINUOUS THROUGHOUT JOURNEY)
      // -------------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      rays.forEach((ray, idx) => {
        const sway = Math.sin(frame * ray.speed + idx * 1.5) * 0.06;
        const currentAngle = ray.baseAngle + sway - (1.0 - p) * 0.12;
        const rayLength = height * (ray.length + p * 0.2);
        const currentAlpha = ray.baseAlpha * sunlightBreath * (0.8 + p * 0.4);

        const leftAngle = currentAngle - ray.width * 0.5;
        const rightAngle = currentAngle + ray.width * 0.5;

        const x1 = sunX + Math.cos(leftAngle) * rayLength;
        const y1 = sunY + Math.sin(leftAngle) * rayLength;
        const x2 = sunX + Math.cos(rightAngle) * rayLength;
        const y2 = sunY + Math.sin(rightAngle) * rayLength;

        const rayGrad = ctx.createRadialGradient(sunX, sunY, 15, (x1 + x2) * 0.5, (y1 + y2) * 0.5, rayLength * 0.9);
        rayGrad.addColorStop(0, `rgba(255, 235, 170, ${currentAlpha * 1.8})`);
        rayGrad.addColorStop(0.35, `rgba(224, 182, 75, ${currentAlpha})`);
        rayGrad.addColorStop(0.75, `rgba(180, 130, 45, ${currentAlpha * 0.35})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
      });

      // -------------------------------------------------------------
      // B. STONE ROAD DAWN SPECULAR HIGHLIGHTS
      // -------------------------------------------------------------
      const roadGrad = ctx.createRadialGradient(
        width * 0.5 + mx * 0.5,
        height * 0.88 + my * 0.5,
        15,
        width * 0.5,
        height * 0.88,
        width * (0.28 + p * 0.12)
      );
      const roadPulse = (0.065 + Math.sin(frame * 0.02) * 0.02) * sunlightBreath;
      roadGrad.addColorStop(0, `rgba(255, 225, 140, ${roadPulse * 1.4})`);
      roadGrad.addColorStop(0.5, `rgba(197, 160, 89, ${roadPulse * 0.4})`);
      roadGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(width * 0.18, height * 0.65, width * 0.64, height * 0.35);

      ctx.restore();

      // -------------------------------------------------------------
      // C. 3D Z-DEPTH GOLDEN DUST (EXPANDS RADIALLY AS CAMERA TRAVELS)
      // -------------------------------------------------------------
      const focalLength = 350;
      const centerX = width * 0.5;
      const centerY = height * 0.52;

      for (let i = 0; i < dustParticles.length; i++) {
        const dp = dustParticles[i];

        // Move particle forward in Z space based on forward travel velocity
        dp.z -= forwardVelocity * 1.2;
        dp.x += dp.driftX;
        dp.y += dp.driftY;

        // When particle passes behind camera, loop to back of 3D volume
        if (dp.z <= 10) {
          dp.z = 900;
          dp.x = (Math.random() - 0.5) * width * 1.8;
          dp.y = (Math.random() - 0.5) * height * 1.8;
        }

        // Perspective 3D projection
        const scale = focalLength / dp.z;
        const screenX = centerX + dp.x * scale + mx * (scale * 0.4);
        const screenY = centerY + dp.y * scale + my * (scale * 0.4);

        if (screenX >= -30 && screenX <= width + 30 && screenY >= -30 && screenY <= height + 30) {
          dp.pulseAngle += dp.pulseSpeed;
          let renderOpacity = (dp.baseOpacity + Math.sin(dp.pulseAngle) * 0.15) * Math.min(1.0, scale * 1.2);
          renderOpacity = Math.max(0.06, Math.min(0.85, renderOpacity)) * sunlightBreath;

          // Keep central title area clean when arrived
          if (p >= 0.95 && screenX > width * 0.28 && screenX < width * 0.72 && screenY > height * 0.28 && screenY < height * 0.60) {
            renderOpacity *= 0.35;
          }

          const drawSize = Math.max(0.6, dp.baseSize * scale);

          ctx.beginPath();
          ctx.arc(screenX, screenY, drawSize, 0, Math.PI * 2);

          if (scale > 1.2) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsla(${dp.hue}, 90%, 65%, ${renderOpacity * 0.8})`;
            ctx.fillStyle = `hsla(${dp.hue}, 95%, 85%, ${renderOpacity})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = `hsla(${dp.hue}, 80%, 75%, ${renderOpacity * 0.75})`;
          }

          ctx.fill();
        }
      }

      // -------------------------------------------------------------
      // D. FOREGROUND PASS-BY ELEMENTS (RUSH PAST CAMERA ON TRAVEL)
      // -------------------------------------------------------------
      for (let i = 0; i < passByElements.length; i++) {
        const el = passByElements[i];
        el.z -= forwardVelocity * 2.2;
        el.rot += el.rotSpeed;

        if (el.z <= 8) {
          el.z = 600;
          el.x = (Math.random() - 0.5) * width * 1.4;
          el.y = (Math.random() - 0.5) * height * 1.4;
        }

        const scale = focalLength / el.z;
        const screenX = centerX + el.x * scale + mx * 0.6;
        const screenY = centerY + el.y * scale + my * 0.6;

        if (screenX >= -50 && screenX <= width + 50 && screenY >= -50 && screenY <= height + 50) {
          const drawSize = el.size * scale;
          const passOpacity = Math.min(0.6, scale * 0.45) * (0.8 + (1.0 - p) * 0.4);

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(el.rot);

          // Near camera pass-by blur
          if (scale > 1.5) {
            ctx.filter = `blur(${Math.min(6, (scale - 1.5) * 4)}px)`;
          }

          ctx.beginPath();
          ctx.moveTo(0, -drawSize);
          ctx.bezierCurveTo(drawSize * 0.8, -drawSize * 0.5, drawSize * 0.8, drawSize * 0.5, 0, drawSize);
          ctx.bezierCurveTo(-drawSize * 0.8, drawSize * 0.5, -drawSize * 0.8, -drawSize * 0.5, 0, -drawSize);

          ctx.fillStyle = `${el.color}${passOpacity})`;
          ctx.fill();
          ctx.restore();
          ctx.filter = 'none';
        }
      }

      // -------------------------------------------------------------
      // E. RISING DIYA EMBERS (CONTINUOUS SPARK STREAM)
      // -------------------------------------------------------------
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;

        if (e.life < 25) {
          e.opacity = (e.life / 25) * e.maxOpacity;
        } else {
          e.opacity = Math.max(0, (1 - e.life / e.maxLife) * e.maxOpacity);
        }

        e.x += e.speedX + Math.sin(frame * 0.03 + i) * 0.2;
        e.y += e.speedY;

        if (e.life >= e.maxLife || e.y < height * 0.28) {
          e.life = 0;
          e.x = getDiyaSpawnX(p);
          e.y = height * 0.74 + Math.random() * (height * 0.2);
          e.opacity = 0;
        }

        if (e.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(e.x + mx * 0.6, e.y + my * 0.6, e.size * (0.9 + p * 0.2), 0, Math.PI * 2);
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${e.hue}, 95%, 60%, ${e.opacity * sunlightBreath})`;
          ctx.fillStyle = `hsla(${e.hue}, 100%, 75%, ${e.opacity * sunlightBreath})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
