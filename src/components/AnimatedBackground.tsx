import React, { useEffect, useRef, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
  color: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  d: number;
  delay: number;
}

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'subtle' | 'none';
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'hero',
  className = ''
}) => {
  const colors = [
    'rgba(27, 166, 155, 0.7)',
    'rgba(52, 211, 153, 0.5)',
    'rgba(114, 219, 208, 0.6)',
    'rgba(16, 185, 129, 0.5)',
    'rgba(6, 182, 212, 0.4)',
  ];

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 4 + 4,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    })),
  []);

  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })),
  []);

  if (variant === 'none') return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Twinkling stars */}
      {stars.map((star) => (
        <span
          key={`star-${star.id}`}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            '--d': `${star.d}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Rising particles */}
      {variant === 'hero' && particles.map((p) => (
        <span
          key={`particle-${p.id}`}
          className="particle"
          style={{
            left: `${p.x}%`,
            bottom: '0',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            '--x': `${p.x}%`,
            '--duration': `${p.speed}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Animated mesh orbs */}
      <div
        className="orb absolute w-[500px] h-[500px] -top-40 -right-40 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(27,166,155,0.8) 0%, transparent 70%)',
          '--duration': '8s',
          '--delay': '0s',
        } as React.CSSProperties}
      />
      <div
        className="orb absolute w-[400px] h-[400px] -bottom-32 -left-32 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.6) 0%, transparent 70%)',
          '--duration': '11s',
          '--delay': '2s',
        } as React.CSSProperties}
      />
      <div
        className="orb absolute w-[250px] h-[250px] top-1/2 left-1/3 -translate-y-1/2 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
          '--duration': '6s',
          '--delay': '1s',
        } as React.CSSProperties}
      />
    </div>
  );
};

export default AnimatedBackground;
