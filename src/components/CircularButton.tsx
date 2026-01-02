'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircularTextProps {
  text?: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  showAfter?: number;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
});

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CircularText: React.FC<CircularTextProps> = ({
  text = "SCROLL TO TOP • ",
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  showAfter = 300
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // NEW: Track if animation has started
  const radius = 35;

  // Scroll Listener Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible && !hasStarted) {
      const start = rotation.get();
      controls.start({
        rotate: start + 360,
        transition: getTransition(spinDuration, start)
      });
      setHasStarted(true);
    }
    
    // Reset animation state when component hides
    if (!isVisible && hasStarted) {
      controls.stop();
      setHasStarted(false);
    }
  }, [isVisible, hasStarted, controls, spinDuration, rotation]);

  // Also restart animation when spinDuration changes while visible
  useEffect(() => {
    if (isVisible && hasStarted) {
      const start = rotation.get();
      controls.start({
        rotate: start + 360,
        transition: getTransition(spinDuration, start)
      });
    }
  }, [spinDuration, isVisible, hasStarted, controls, rotation]);

  const handleHoverStart = () => {
    setIsHovered(true);
    const start = rotation.get();
    
    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        controls.stop();
        return;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="circular-text-button" // Add key for proper animation reset
          onClick={handleScrollTop}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex items-center justify-center",
            "w-16 h-16 md:w-20 md:h-20",
            "rounded-full",
            "bg-background/80 backdrop-blur-md",
            "border border-border/50",
            "shadow-lg shadow-primary/10",
            "cursor-pointer group",
            "overflow-visible", // Ensure text isn't clipped
            className
          )}
        >
          {/* Spinning Text Ring - Now with explicit initial state */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full origin-center"
            style={{ rotate: rotation }}
            initial={{ rotate: 0 }}
            animate={controls}
          >
            {letters.map((letter, i) => {
              const angle = (360 / letters.length) * i;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const y = -Math.cos(rad) * radius;
              
              return (
                <span
                  key={i}
                  className={cn(
                    "absolute text-[10px] md:text-xs font-bold uppercase tracking-widest",
                    "text-primary/80 group-hover:text-primary",
                    "transition-colors duration-300 select-none",
                    "whitespace-nowrap"
                  )}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </motion.div>
          
          {/* Center Icon */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-20",
            "text-primary transition-transform duration-300",
            isHovered ? "-translate-y-1" : "translate-y-0"
          )}>
            <ArrowUp className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </div>
           
          <div className="absolute inset-2 rounded-full border border-primary/20 pointer-events-none"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CircularText;