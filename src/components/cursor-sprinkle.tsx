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
    strokeWidth="2" 
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
    // Wider spread for the drifting effect
    const tx = (Math.random() - 0.5) * 120;
    const ty = (Math.random() - 0.5) * 120;
    // Larger size range
    const size = 10 + Math.random() * 18;
    const color = Math.random() > 0.5 ? 'text-primary' : 'text-accent';
    
    const newParticle = { id, x, y, tx, ty, size, color };
    
    // Increased limit to accommodate longer lifespan
    setParticles((prev) => [...prev.slice(-40), newParticle]);
    
    // Matched timeout to the 2s animation duration
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Increased frequency from 15% to 35% for a bolder trail
      if (Math.random() > 0.65) {
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
          className={`absolute pointer-events-none animate-cursor-particle ${p.color} opacity-70`}
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
