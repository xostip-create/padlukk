
'use server';

import { z } from 'zod';

const rsvpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export async function handleRsvpSubmission(formData: { email: string }) {
  const validatedFields = rsvpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid email. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving the RSVP
  console.log('New RSVP Submission:');
  console.log(validatedFields.data);

  // In a real app, you would save this to a database or a mailing list.
  // For example, using Firestore:
  // await addDoc(collection(db, "rsvps"), { email: validatedFields.data.email, event: "creating-while-uncertain", timestamp: serverTimestamp() });

  return {
    success: true,
    message: 'Thank you for your RSVP. We will be in touch with details.',
  };
}
