'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  socialHandle: z.string().url({ message: 'Please provide a valid Instagram or TikTok profile link.' }),
  creativeField: z.string().min(2, { message: 'Please specify your creative field.' }),
  location: z.string().min(2, { message: 'Please specify your State/City.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface RsvpFormProps {
  onSuccess?: () => void;
}

export default function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      socialHandle: '',
      creativeField: '',
      location: '',
    },
  });

  async function onSubmit(values: FormValues) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Database not configured. Please try again later.',
        });
        return;
    }

    const rsvpData = {
        ...values,
        createdAt: serverTimestamp(),
    };

    startTransition(() => {
      addDoc(collection(firestore, 'rsvps'), rsvpData)
        .then(() => {
            toast({
              title: 'RSVP Received!',
              description: 'Thank you for your RSVP! We will be in touch.',
            });
            form.reset();
            if (onSuccess) onSuccess();
        })
        .catch((error) => {
            const permissionError = new FirestorePermissionError({
                path: 'rsvps',
                operation: 'create',
                requestResourceData: rsvpData,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'An error occurred. Please try again.',
            });
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
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
              <FormLabel>Instagram or TikTok Link</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com/username" {...field} />
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
                <Input placeholder="e.g. Photography, Sound Design" {...field} />
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
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isPending || !firestore}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Submitting...' : 'RSVP to join the table'}
        </Button>
      </form>
    </Form>
  );
}
