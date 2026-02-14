
'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, type Firestore, type DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export function useDoc<T extends DocumentData>(collectionName: string, docId: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore || !docId) {
        setLoading(false);
        return
    };

    const docRef = doc(firestore, collectionName, docId);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId, firestore]);

  return { data, loading, error };
}
