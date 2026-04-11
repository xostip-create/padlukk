
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
  author: z.string().min(2, { message: 'Author is required.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditorialPost extends FormValues {
    id: string;
}

type EditorialFormProps = {
  initialData?: EditorialPost | null;
  onFinished: () => void;
};

export default function EditorialForm({ initialData, onFinished }: EditorialFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      category: initialData?.category || '',
      author: initialData?.author || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  // Update form if initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        content: initialData.content,
        category: initialData.category,
        author: initialData.author,
        imageUrl: initialData.imageUrl,
      });
    }
  }, [initialData, form]);

  async function onSubmit(values: FormValues) {
    if (!firestore) return;

    const slug = values.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const postData = {
        ...values,
        slug,
        updatedAt: serverTimestamp(),
    };

    startTransition(() => {
      if (initialData?.id) {
        // Update existing post
        const docRef = doc(firestore, 'editorialPosts', initialData.id);
        updateDoc(docRef, postData)
          .then(() => {
              toast({
                title: 'Post Updated!',
                description: 'Changes have been saved successfully.',
              });
              onFinished();
          })
          .catch((error) => {
              const permissionError = new FirestorePermissionError({
                  path: `editorialPosts/${initialData.id}`,
                  operation: 'update',
                  requestResourceData: postData,
              });
              errorEmitter.emit('permission-error', permissionError);
              toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while updating.',
              });
          });
      } else {
        // Create new post
        const newPostData = {
            ...postData,
            publishedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        };
        addDoc(collection(firestore, 'editorialPosts'), newPostData)
          .then(() => {
              toast({
                title: 'Post Published!',
                description: 'Your editorial post is now live.',
              });
              form.reset();
              onFinished();
          })
          .catch((error) => {
              const permissionError = new FirestorePermissionError({
                  path: 'editorialPosts',
                  operation: 'create',
                  requestResourceData: newPostData,
              });
              errorEmitter.emit('permission-error', permissionError);
              toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while publishing.',
              });
          });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="The Silent Narrative" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. Fashion, Ideas" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                    <Input placeholder="Author Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your story here..." className="min-h-[200px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://images.unsplash.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isPending || !firestore}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? (initialData ? 'Updating...' : 'Publishing...') : (initialData ? 'Update Post' : 'Publish Post')}
        </Button>
      </form>
    </Form>
  );
}
