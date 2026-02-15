
'use client';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

/**
 * A custom error class that provides detailed context about a Firestore
 * security rule denial. When thrown during development, it will appear
 * in the Next.js error overlay.
 */
export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(
      context,
      null,
      2
    )}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    
    // Ensure the stack trace is captured to make it a "real" error for Next.js
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, FirestorePermissionError);
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}
