
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  captcha: z.string().refine((val) => val === 'true', { message: 'Incorrect captcha answer.' }),
});

export async function handleContactSubmission(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    captcha: string;
}) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate sending an email
  console.log('New Contact Form Submission:');
  console.log(validatedFields.data);

  // In a real app, you would use a service like Resend, SendGrid, or Nodemailer here.
  // await sendEmail({
  //   to: 'content-team@padluckk.com',
  //   from: 'contact-form@padluckk.com',
  //   subject: validatedFields.data.subject,
  //   html: `<p>Name: ${validatedFields.data.name}</p><p>Email: ${validatedFields.data.email}</p><p>Message: ${validatedFields.data.message}</p>`,
  // });

  return {
    success: true,
    message: 'Thank you for your message! We will get back to you shortly.',
  };
}
