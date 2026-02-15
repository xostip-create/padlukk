
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
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RsvpForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
        email: values.email,
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
        })
        .catch((error) => {
            const permissionError = new FirestorePermissionError({
                path: 'rsvps',
                operation: 'create',
                requestResourceData: {
                  email: values.email,
                  createdAt: '(server timestamp)',
                },
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
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
