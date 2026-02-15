
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: Error) => {
      if (error instanceof FirestorePermissionError) {
        // In development, Next.js will show this error in an overlay.
        // This is much more helpful than a silent console error.
        throw error;
      }
    };

    errorEmitter.on('permission-error', handleError);

    // This component is mounted once and for the lifetime of the app,
    // so we don't need a cleanup function to remove the listener.
  }, []);

  return null; // This component doesn't render anything.
}
