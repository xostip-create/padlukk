
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setShowConsent(true);
      }
    } catch (e) {
      // localStorage is not available, so we can't store consent.
      // We will not show the banner in this case.
      console.error('Could not access localStorage:', e);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
      setShowConsent(false);
    } catch (e) {
      console.error('Could not access localStorage:', e);
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[60] border-t border-border/40 bg-card',
        'transition-opacity duration-300 ease-in-out',
        showConsent ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Padluckk uses cookies to ensure you get the best experience on our website.
        </p>
        <Button onClick={handleAccept} variant="default" size="sm" className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
          Accept
        </Button>
      </div>
    </div>
  );
}
