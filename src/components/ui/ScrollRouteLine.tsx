'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useIsMounted } from '@/hooks/useIsMounted';

const ROUTE_PATH =
  'M 15,0 C 40,60 -5,120 20,190 C 45,260 85,300 60,380 C 35,460 5,500 30,580 ' +
  'C 55,660 90,700 65,780 C 40,860 10,900 35,980 C 60,1050 85,1000 70,1000';

interface ScrollRouteLineProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollRouteLine({ containerRef }: ScrollRouteLineProps) {
  const isMounted = useIsMounted();
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
            <stop offset="0%" stopOpacity="0.9" style={{ stopColor: 'var(--color-accent-hover)' }} />
            <stop offset="100%" stopOpacity="0.9" style={{ stopColor: 'var(--color-accent)' }} />
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
          stroke="var(--color-line)"
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
          style={{ background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.9) 0%, rgba(var(--color-accent-rgb), 0) 70%)' }}
        />
        <svg
          viewBox="0 0 24 24"
          className="relative w-4 h-4"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </motion.div>
    </div>
  );
}
