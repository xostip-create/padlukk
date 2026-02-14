
'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAt,
  endAt,
  type Firestore,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface UseCollectionOptions {
  where?: [string, any, any];
  orderBy?: [string, 'asc' | 'desc'];
  limit?: number;
  startAt?: any;
  endAt?: any;
}

export function useCollection<T extends DocumentData>(
  collectionName: string,
  options: UseCollectionOptions = {}
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) {
        setLoading(false);
        return;
    }

    try {
      let q: Query = collection(firestore, collectionName);

      if (options.where) {
        q = query(q, where(...options.where));
      }
      if (options.orderBy) {
        q = query(q, orderBy(...options.orderBy));
      }
      if (options.limit) {
        q = query(q, limit(options.limit));
      }
      if (options.startAt) {
        q = query(q, startAt(options.startAt));
      }
      if (options.endAt) {
        q = query(q, endAt(options.endAt));
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(docs);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
        console.error(err);
        setError(err);
        setLoading(false);
    }
  }, [collectionName, firestore, JSON.stringify(options)]); // Deep compare options

  return { data, loading, error };
}
