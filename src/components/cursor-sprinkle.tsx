'use client';

import { useState, useEffect, useCallback } from 'react';

const PadlockIcon = ({ size = 12, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
}

export default function CursorSprinkle() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const addParticle = useCallback((x: number, y: number) => {
    const id = Math.random();
    const tx = (Math.random() - 0.5) * 80;
    const ty = (Math.random() - 0.5) * 80;
    const size = 6 + Math.random() * 10;
    const color = Math.random() > 0.5 ? 'text-primary' : 'text-accent';
    
    const newParticle = { id, x, y, tx, ty, size, color };
    
    setParticles((prev) => [...prev.slice(-15), newParticle]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only add a particle 15% of the time to create a "sprinkle" rather than a solid trail
      if (Math.random() > 0.85) {
        addParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute pointer-events-none animate-cursor-particle ${p.color} opacity-40`}
          style={{
            left: p.x,
            top: p.y,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          } as React.CSSProperties}
        >
          <PadlockIcon size={p.size} />
        </div>
      ))}
    </div>
  );
}
