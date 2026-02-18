'use server';

import { z } from 'zod';

const membershipSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  socialHandle: z.string().url({ message: 'Please provide a valid Instagram or TikTok profile link.' }),
  creativeField: z.string().min(2, { message: 'Please specify your creative field.' }),
  location: z.string().min(2, { message: 'Please specify your State/City.' }),
});

export async function handleMembershipSubmission(formData: {
    fullName: string;
    socialHandle: string;
    creativeField: string;
    location: string;
}) {
  const validatedFields = membershipSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Note: Data is currently handled client-side via Firestore addDoc in membership-form.tsx
  console.log('New Membership Application:', validatedFields.data);

  return {
    success: true,
    message: 'Thank you for your application! The community will review it shortly.',
  };
}
