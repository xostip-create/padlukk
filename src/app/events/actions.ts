
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
      message: 'Invalid email address. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // TODO: Once database is set up, save the email here.
  console.log('New RSVP submission:', validatedFields.data.email);

  return {
    success: true,
    message: 'Thank you for your RSVP! We will be in touch.',
  };
}
