'use server';

import { z } from 'zod';

const membershipSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  socialHandle: z.string().min(3, { message: 'Please provide an Instagram or TikTok handle.' }),
  creativeField: z.string().min(2, { message: 'Please specify your creative field.' }),
  location: z.string().min(2, { message: 'Please specify your State/City.' }),
  captcha: z.string().refine((val) => val === 'true', { message: 'Incorrect captcha answer.' }),
});

export async function handleMembershipSubmission(formData: {
    fullName: string;
    socialHandle: string;
    creativeField: string;
    location: string;
    captcha: string;
}) {
  const validatedFields = membershipSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate storing membership application
  console.log('New Membership Application:');
  console.log(validatedFields.data);

  // In a real app, you would save this to Firestore or use an email service.

  return {
    success: true,
    message: 'Thank you for your application! The community will review it shortly.',
  };
}
