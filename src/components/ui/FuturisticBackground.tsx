'use client';

import { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  /** 0–1 parallax layer weight (lower = slower = further away) */
  layer: number;
  rotation: number;
  rotationSpeed: number;
  baseOpacity: number;
  opacityPhase: number;
  opacitySpeed: number;
}

interface ScanLine {
  /** 0–1 progress along its travel axis */
  progress: number;
  y: number;         // vertical position (0–1 of canvas height)
  speed: number;     // intrinsic animation speed when scroll-driven === false
  opacity: number;
  width: number;     // line stroke width
  diagonal: number;  // slope applied for diagonal look
  color: string;
  scrollWeight: number; // how much scroll displacement maps to this line
  glowStrength: number;
}

// ─── Deterministic seeded-random helpers (avoids hydration mismatches) ────────

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildParticles(count: number, w: number, h: number): Particle[] {
  const rng = seededRng(42);
  return Array.from({ length: count }, () => {
    const layer = rng() * 0.8 + 0.2; // 0.2..1.0
    const baseOpacity = rng() * 0.28 + 0.04;
    return {
      x: rng() * w,
      y: rng() * h,
      size: rng() * 5 + 1.5,         // 1.5–6.5 px
      opacity: baseOpacity,
      vx: (rng() - 0.5) * 0.18,
      vy: (rng() - 0.5) * 0.18,
      layer,
      rotation: rng() * Math.PI * 2,
      rotationSpeed: (rng() - 0.5) * 0.004,
      baseOpacity,
      opacityPhase: rng() * Math.PI * 2,
      opacitySpeed: rng() * 0.008 + 0.002,
    };
  });
}

function buildScanLines(): ScanLine[] {
  const palette = [
    'rgba(204, 32, 14, ALPHA)',   // brand red
    'rgba(204, 32, 14, ALPHA)',
    'rgba(204, 32, 14, ALPHA)',
    'rgba(204, 32, 14, ALPHA)',
    'rgba(204, 32, 14, ALPHA)',
    'rgba(204, 32, 14, ALPHA)',
  ];
  const rng = seededRng(99);
  return Array.from({ length: 6 }, (_, i) => ({
    progress: rng(),
    y: 0.12 + rng() * 0.76,          // between 12%–88% vertically
    speed: rng() * 0.0004 + 0.0002,  // very slow idle drift
    opacity: rng() * 0.55 + 0.25,
    width: rng() * 1.2 + 0.4,
    diagonal: (rng() - 0.5) * 0.35,  // slight slope
    color: palette[i % palette.length],
    scrollWeight: rng() * 0.7 + 0.3,
    glowStrength: rng() * 10 + 4,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 80;

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scanLinesRef = useRef<ScanLine[]>([]);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const frameRef = useRef(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  // ── init particles & scan lines ──────────────────────────────────────────
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    dimensionsRef.current = { w, h };
    particlesRef.current = buildParticles(PARTICLE_COUNT, w, h);
    scanLinesRef.current = buildScanLines();
  }, []);

  // ── draw frame ───────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = dimensionsRef.current;
    frameRef.current++;

    // smooth scroll interpolation
    smoothScrollRef.current += (scrollYRef.current - smoothScrollRef.current) * 0.06;
    const scrollProgress = smoothScrollRef.current /
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    ctx.clearRect(0, 0, w, h);

    // ── Ambient gradient background ──────────────────────────────────────
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#050505');
    bg.addColorStop(0.5, '#07050a');
    bg.addColorStop(1, '#050505');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // ── Subtle radial glow (top-left and bottom-right) ───────────────────
    const glow1 = ctx.createRadialGradient(w * 0.15, h * 0.22, 0, w * 0.15, h * 0.22, w * 0.38);
    glow1.addColorStop(0, 'rgba(204,32,14,0.045)');
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, w, h);

    const glow2 = ctx.createRadialGradient(w * 0.82, h * 0.65, 0, w * 0.82, h * 0.65, w * 0.32);
    glow2.addColorStop(0, 'rgba(204,32,14,0.015)');
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);

    // ── Particles ────────────────────────────────────────────────────────
    const particles = particlesRef.current;
    const t = performance.now() * 0.001;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // parallax: deeper layers move less with scroll
      const parallaxOffset = smoothScrollRef.current * (1 - p.layer) * 0.12;

      // move
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // wrap
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      // breathe opacity
      const opacityMod = 0.5 + 0.5 * Math.sin(t * p.opacitySpeed * 30 + p.opacityPhase);
      p.opacity = p.baseOpacity * (0.6 + 0.4 * opacityMod);

      const drawY = p.y - parallaxOffset;

      ctx.save();
      ctx.translate(p.x, drawY);
      ctx.rotate(p.rotation);

      // glow for closer (higher layer) particles
      if (p.layer > 0.7) {
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = `rgba(204,32,14,${p.opacity * 0.6})`;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.layer > 0.65
        ? `rgba(255,255,255,1)`
        : `rgba(180,180,200,1)`;

      const half = p.size / 2;
      ctx.fillRect(-half, -half, p.size, p.size);
      ctx.restore();
    }

    // ── Scan lines ───────────────────────────────────────────────────────
    const lines = scanLinesRef.current;
    ctx.save();

    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i];

      // drive progress via scroll + idle drift
      ln.progress = (ln.progress + ln.speed + scrollProgress * ln.scrollWeight * 0.0025) % 1;

      const x = ln.progress * (w + 200) - 100;            // left → right travel
      const yBase = ln.y * h;
      const slope = ln.diagonal * h;

      // start & end of line with diagonal slope
      const x0 = x - w * 0.22;
      const y0 = yBase - slope * 0.22;
      const x1 = x + w * 0.22;
      const y1 = yBase + slope * 0.22;

      // line colour with alpha substituted
      const col = ln.color.replace('ALPHA', String(ln.opacity));

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      grad.addColorStop(0, ln.color.replace('ALPHA', '0'));
      grad.addColorStop(0.35, col);
      grad.addColorStop(0.5, ln.color.replace('ALPHA', String(ln.opacity * 1.4 > 1 ? 1 : ln.opacity * 1.4)));
      grad.addColorStop(0.65, col);
      grad.addColorStop(1, ln.color.replace('ALPHA', '0'));

      ctx.shadowBlur = ln.glowStrength;
      ctx.shadowColor = col;
      ctx.strokeStyle = grad;
      ctx.lineWidth = ln.width;
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    ctx.restore();

    // ── Fine grid overlay (very subtle) ──────────────────────────────────
    ctx.save();
    ctx.globalAlpha = 0.025;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 0.5;
    const gridSize = 80;
    for (let gx = 0; gx < w; gx += gridSize) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.stroke();
    }
    for (let gy = 0; gy < h; gy += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }
    ctx.restore();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── lifecycle ────────────────────────────────────────────────────────────
  useEffect(() => {
    init();

    const onResize = () => {
      init();
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [init, draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
        // GPU-accelerate the canvas element itself
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
}
