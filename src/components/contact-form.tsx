'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition, useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleMembershipSubmission } from '@/app/contact/actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  socialHandle: z.string().min(3, { message: 'Please provide an Instagram or TikTok handle.' }),
  creativeField: z.string().min(2, { message: 'Please specify your creative field.' }),
  location: z.string().min(2, { message: 'Please specify your State/City.' }),
  captcha: z.string().min(1, { message: 'Please solve the captcha.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MembershipForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: 0 });

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: a + b });
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      socialHandle: '',
      creativeField: '',
      location: '',
      captcha: '',
    },
  });

  async function onSubmit(values: FormValues) {
    startTransition(async () => {
      const isCaptchaCorrect = parseInt(values.captcha, 10) === captcha.answer;
      
      const result = await handleMembershipSubmission({
        ...values,
        captcha: String(isCaptchaCorrect)
      });

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        form.reset();
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setCaptcha({ a, b, answer: a + b });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.errors?.captcha ? 'Incorrect captcha answer.' : 'An error occurred. Please try again.',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram or TikTok Handle</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creativeField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creative Field</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Photography, Sound Design, Fashion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State / City</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New York, NY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captcha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Security Question: What is {captcha.a} + {captcha.b}?</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Your answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Sending Application...' : 'Apply for Membership'}
        </Button>
      </form>
    </Form>
  );
}
