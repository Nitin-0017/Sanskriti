import React, { useEffect, useRef } from 'react';

/**
 * 60fps Canvas Particle Engine for Golden Dust Motes, Temple Embers & Floating Light Particles
 */
export default function DustParticlesCanvas({ mousePos }) {
  const canvasRef = useRef(null);

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

    // Particle pool
    const particleCount = Math.min(width < 768 ? 45 : 90, 110);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.6,
        speedX: (Math.random() - 0.5) * 0.35 + 0.15, // slight natural drift rightward
        speedY: (Math.random() - 0.5) * 0.3 - 0.2, // gentle upward float like warm air
        opacity: Math.random() * 0.7 + 0.2,
        baseOpacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseAngle: Math.random() * Math.PI * 2,
        hue: 38 + Math.random() * 12, // Golden amber to warm saffron
        glow: Math.random() > 0.6,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Mouse influence
      const mx = (mousePos?.x || 0) * 15;
      const my = (mousePos?.y || 0) * 15;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural pulse & float
        p.pulseAngle += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.pulseAngle) * 0.25;
        p.opacity = Math.max(0.1, Math.min(0.9, p.opacity));

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const drawX = p.x + mx * (p.size / 2.5);
        const drawY = p.y + my * (p.size / 2.5);

        // Draw particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);

        if (p.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, ${p.opacity})`;
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity * 0.7})`;
        }

        ctx.fill();
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
