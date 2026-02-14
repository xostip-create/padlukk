
'use client';
import React, { useMemo } from 'react';
import { initializeFirebase, FirebaseProvider } from '.';

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const firebaseInstances = useMemo(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    return { firebaseApp, auth, firestore };
  }, []);

  return (
    <FirebaseProvider value={firebaseInstances}>{children}</FirebaseProvider>
  );
};
