
'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/loader';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      {children}
    </>
  );
}
