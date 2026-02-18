'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
  socialHandle: z.string().min(3, { message: 'Please provide an Instagram or TikTok handle.' }),
  creativeField: z.string().min(2, { message: 'Please specify your creative field.' }),
  location: z.string().min(2, { message: 'Please specify your State/City.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MembershipForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      socialHandle: '',
      creativeField: '',
      location: '',
    },
  });

  async function onSubmit(values: FormValues) {
    if (!firestore) return;

    startTransition(() => {
      const applicationData = {
        fullName: values.fullName,
        socialHandle: values.socialHandle,
        creativeField: values.creativeField,
        location: values.location,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(firestore, 'membershipApplications'), applicationData)
        .then(() => {
          toast({
            title: 'Success!',
            description: 'Thank you for your application! The community will review it shortly.',
          });
          form.reset();
        })
        .catch((error) => {
          const permissionError = new FirestorePermissionError({
            path: 'membershipApplications',
            operation: 'create',
            requestResourceData: applicationData,
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
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Sending Application...' : 'Apply for Membership'}
        </Button>
      </form>
    </Form>
  );
}
