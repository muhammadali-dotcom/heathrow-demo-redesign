'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

// Fixed array of particles to avoid hydration mismatches
const STATIC_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed1 = Math.sin(i * 432.23) * 0.5 + 0.5;
  const seed2 = Math.cos(i * 123.45) * 0.5 + 0.5;
  const seed3 = Math.sin(i * 987.65) * 0.5 + 0.5;

  return {
    id: i,
    left: `${seed1 * 100}%`,
    top: `${seed2 * 100}%`,
    size: seed3 * 4 + 2, // 2px to 6px
    delay: seed1 * 4,
    duration: seed2 * 10 + 6, // 6s to 16s
    opacity: seed3 * 0.5 + 0.15,
  };
});

export default function RoadGridBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth scroll velocity to prevent sudden jumps
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Calculate grid scroll translation (looping every 60px)
  const gridY = useTransform(scrollY, (val) => {
    // Scroll down moves the grid forward (towards user)
    return val % 60;
  });

  // Tracking mouse movement for interactive headlight glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* 3D Perspective Road Grid */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ perspective: '800px', perspectiveOrigin: '50% 30%' }}
      >
        <motion.div
          className="absolute inset-0 origin-top opacity-55"
          style={{
            transform: 'rotateX(72deg) translateY(-25%) scale(1.4)',
            backgroundImage: `
              linear-gradient(to right, rgba(229, 9, 20, 0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229, 9, 20, 0.09) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            y: gridY,
          }}
        />
        {/* Soft grid fade out towards horizon */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/65 to-transparent pointer-events-none" />
      </div>

      {/* Floating Ambient Glows (Car Taillights/Neon Reflections) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left red glow */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -70, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[15%] top-[25%] w-[350px] h-[350px] rounded-full bg-[#e50914] opacity-[0.08] blur-[110px]"
        />
        {/* Center vertical glow */}
        <motion.div
          animate={{
            y: [0, -120, 60, 0],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[50%] top-[30%] -translate-x-1/2 w-[150px] h-[400px] rounded-full bg-[#e50914] opacity-[0.16] blur-[90px]"
        />
        {/* Right glow */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[10%] top-[45%] w-[300px] h-[300px] rounded-full bg-[#e50914] opacity-[0.07] blur-[100px]"
        />
      </div>

      {/* Interactive Cursor Headlight Spotlight */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          x: mousePos.x - 225,
          y: mousePos.y - 225,
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, rgba(229, 9, 20, 0.03) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Curved Red Road Light Trails (Wavy lines like the reference image) */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e50914" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff2b24" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e50914" stopOpacity="0.0" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Wavy road light paths */}
        <motion.path
          d="M -50,550 C 300,500 450,700 800,600 C 1150,500 1300,750 1980,650"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="2.5"
          filter="url(#neonGlow)"
        />

        <motion.path
          d="M -50,450 C 250,520 600,380 900,480 C 1200,580 1500,420 1980,500"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="1.5"
          filter="url(#neonGlow)"
        />
      </svg>

      {/* Floating Square Dust/Particles */}
      <div className="absolute inset-0">
        {STATIC_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-sm bg-[#ff2b24]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -350],
              opacity: [0, particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}
