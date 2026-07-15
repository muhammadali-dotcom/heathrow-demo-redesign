'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ROUTE_PATH =
  'M 15,0 C 40,60 -5,120 20,190 C 45,260 85,300 60,380 C 35,460 5,500 30,580 ' +
  'C 55,660 90,700 65,780 C 40,860 10,900 35,980 C 60,1050 85,1000 70,1000';

interface ScrollRouteLineProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollRouteLine({ containerRef }: ScrollRouteLineProps) {
  const [isMounted, setIsMounted] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.3,
  });

  const dashOffset = useTransform(smoothProgress, (progress) => pathLength * (1 - progress));

  const markerLeft = useTransform(smoothProgress, (progress) => {
    const point = pathRef.current?.getPointAtLength(pathLength * progress);
    return `${point?.x ?? 0}%`;
  });
  const markerTop = useTransform(smoothProgress, (progress) => {
    const point = pathRef.current?.getPointAtLength(pathLength * progress);
    return `${(point?.y ?? 0) / 10}%`;
  });
  const markerOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff2b24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cc200e" stopOpacity="0.9" />
          </linearGradient>
          <filter id="routeLineGlow" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          ref={pathRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="url(#routeLineGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#routeLineGlow)"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>

      {/* Car marker riding the tip of the drawn route */}
      <motion.div
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2"
        style={{ left: markerLeft, top: markerTop, opacity: markerOpacity }}
      >
        <div
          className="absolute inset-[-8px] rounded-full blur-[6px]"
          style={{ background: 'radial-gradient(circle, rgba(255,43,36,0.9) 0%, rgba(255,43,36,0) 70%)' }}
        />
        <svg viewBox="0 0 24 24" className="relative w-4 h-4" fill="#ffffff">
          <path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 8.5 5 6h11l3 4.5 2 1v3h-2a3.5 3.5 0 0 0-7 0h-4a3.5 3.5 0 0 0-7 0H1v-3l2.5-3Z" />
        </svg>
      </motion.div>
    </div>
  );
}
