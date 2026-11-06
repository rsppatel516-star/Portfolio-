import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Global Interactive Background
 * Features:
 * - Fluid aurora glow orbs with smooth motion
 * - Responsive cursor spotlight with bounded collision box
 * - Batched tech grid matrix with distance-based illumination
 * - Energy data pulses on grid axes
 * - Ambient starfield dust with twinkling
 * - Automatic visibility-based pause (zero CPU/battery when tab is hidden)
 * - Screen-size adaptive particle density
 */
export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let isVisible = !document.hidden;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive canvas resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Visibility change handler to save battery & CPU
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationFrameId && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Mouse tracking with smooth lerp
    const mouse = {
      targetX: width / 2,
      targetY: height / 2,
      x: width / 2,
      y: height / 2,
      active: false,
      lastMove: performance.now()
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.lastMove = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Ambient Floating Aurora Orbs
    const orbs = [
      {
        x: width * 0.2,
        y: height * 0.25,
        radius: Math.max(width, height) * 0.35,
        vx: 0.25,
        vy: 0.18,
        colorStart: 'rgba(99, 102, 241, 0.15)', // Indigo
        colorMid: 'rgba(124, 58, 237, 0.06)',
        phase: 0
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        radius: Math.max(width, height) * 0.38,
        vx: -0.2,
        vy: 0.2,
        colorStart: 'rgba(168, 85, 247, 0.12)', // Purple
        colorMid: 'rgba(192, 132, 252, 0.05)',
        phase: Math.PI / 2
      },
      {
        x: width * 0.45,
        y: height * 0.75,
        radius: Math.max(width, height) * 0.36,
        vx: 0.18,
        vy: -0.16,
        colorStart: 'rgba(139, 92, 246, 0.10)', // Violet
        colorMid: 'rgba(167, 139, 250, 0.04)',
        phase: Math.PI
      },
      {
        x: width * 0.85,
        y: height * 0.82,
        radius: Math.max(width, height) * 0.32,
        vx: -0.18,
        vy: -0.14,
        colorStart: 'rgba(236, 72, 153, 0.10)', // Magenta
        colorMid: 'rgba(244, 114, 182, 0.03)',
        phase: (Math.PI * 3) / 2
      }
    ];

    // 2. Star dust particles (adaptive count)
    let stars = [];
    const isMobile = width < 768;
    const maxStars = isMobile ? 30 : 60;
    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 22000), maxStars);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.4 + 0.4,
          alpha: Math.random() * 0.4 + 0.2,
          baseAlpha: Math.random() * 0.3 + 0.12,
          vy: -(Math.random() * 0.12 + 0.04)
        });
      }
    };
    initStars();

    // 3. Grid Data Energy Pulses
    const gridSpacing = 64;
    const dataPulses = [
      { axis: 'x', pos: 0, coord: gridSpacing * 3, speed: 3.0, length: 130, color: 'rgba(168, 85, 247, 0.65)' },
      { axis: 'y', pos: 0, coord: gridSpacing * 6, speed: 2.4, length: 110, color: 'rgba(99, 102, 241, 0.65)' },
      { axis: 'x', pos: width, coord: gridSpacing * 9, speed: -2.8, length: 140, color: 'rgba(6, 182, 212, 0.65)' },
      { axis: 'y', pos: height, coord: gridSpacing * 12, speed: -2.2, length: 120, color: 'rgba(236, 72, 153, 0.55)' }
    ];

    let time = 0;
    let lastTime = performance.now();

    const render = (now) => {
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += dt;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      const hasRecentMouse = (now - mouse.lastMove) < 3000;
      if (hasRecentMouse || mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // ── Step 1: Draw Moving Aurora Gradient Orbs ──
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (!prefersReducedMotion) {
          orb.x += orb.vx + Math.sin(time * 0.35 + orb.phase) * 0.3;
          orb.y += orb.vy + Math.cos(time * 0.45 + orb.phase) * 0.3;

          if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
          if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        gradient.addColorStop(0, orb.colorStart);
        gradient.addColorStop(0.5, orb.colorMid);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Step 2: Draw Cursor Spotlight Aura ──
      if (mouse.active || hasRecentMouse) {
        const spotRadius = Math.min(width, height) * 0.30;
        const spotGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, spotRadius
        );
        spotGrad.addColorStop(0, 'rgba(129, 140, 248, 0.20)');
        spotGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.08)');
        spotGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.02)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Step 3: Draw Batched Grid Lines ──
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1;

      // Base faint grid lines (batched single path for 10x faster stroke)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.025)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Bounded Glowing intersections only within spotlight radius
      const maxSpotDist = 260;
      const maxSpotDistSq = maxSpotDist * maxSpotDist;
      const crossSize = 3;

      if (mouse.active || hasRecentMouse) {
        const startX = Math.max(gridSpacing, Math.floor((mouse.x - maxSpotDist) / gridSpacing) * gridSpacing);
        const endX = Math.min(width - gridSpacing, Math.ceil((mouse.x + maxSpotDist) / gridSpacing) * gridSpacing);
        const startY = Math.max(gridSpacing, Math.floor((mouse.y - maxSpotDist) / gridSpacing) * gridSpacing);
        const endY = Math.min(height - gridSpacing, Math.ceil((mouse.y + maxSpotDist) / gridSpacing) * gridSpacing);

        for (let x = startX; x <= endX; x += gridSpacing) {
          for (let y = startY; y <= endY; y += gridSpacing) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxSpotDistSq) {
              const factor = 1 - Math.sqrt(distSq) / maxSpotDist;
              const alpha = 0.05 + factor * 0.35;
              const size = 1 + factor * 1.5;

              ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();

              if (factor > 0.45) {
                ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.75})`;
                ctx.beginPath();
                ctx.moveTo(x - crossSize, y);
                ctx.lineTo(x + crossSize, y);
                ctx.moveTo(x, y - crossSize);
                ctx.lineTo(x, y + crossSize);
                ctx.stroke();
              }
            }
          }
        }
      }

      // ── Step 4: Animated Grid Data Energy Pulses ──
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < dataPulses.length; i++) {
        const pulse = dataPulses[i];
        if (!prefersReducedMotion) {
          pulse.pos += pulse.speed;
          const limit = pulse.axis === 'x' ? width : height;
          if (pulse.speed > 0 && pulse.pos > limit + pulse.length) pulse.pos = -pulse.length;
          if (pulse.speed < 0 && pulse.pos < -pulse.length) pulse.pos = limit + pulse.length;
        }

        let pGrad;
        if (pulse.axis === 'x') {
          pGrad = ctx.createLinearGradient(pulse.pos, 0, pulse.pos + pulse.length, 0);
          pGrad.addColorStop(0, 'rgba(0,0,0,0)');
          pGrad.addColorStop(0.5, pulse.color);
          pGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pGrad;
          ctx.fillRect(pulse.pos, pulse.coord - 1, pulse.length, 2);
        } else {
          pGrad = ctx.createLinearGradient(0, pulse.pos, 0, pulse.pos + pulse.length);
          pGrad.addColorStop(0, 'rgba(0,0,0,0)');
          pGrad.addColorStop(0.5, pulse.color);
          pGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pGrad;
          ctx.fillRect(pulse.coord - 1, pulse.pos, 2, pulse.length);
        }
      }

      // ── Step 5: Twinkling Ambient Star Field Dust ──
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.y += star.vy;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
          star.alpha = star.baseAlpha + Math.sin(time * 2.5 + star.x) * 0.12;
        }

        ctx.fillStyle = `rgba(224, 231, 255, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
