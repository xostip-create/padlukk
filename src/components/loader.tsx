'use client';

import { cn } from "@/lib/utils";

const PadlockIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
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

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000 ease-in-out",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative">
        {/* Main Pulsing Icon */}
        <div className="animate-pulse relative z-10 text-primary">
          <PadlockIcon size={56} />
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse pointer-events-none" />
      </div>
    </div>
  );
}
