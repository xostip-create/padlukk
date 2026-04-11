
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import EditorialEditor from '@/components/editorial-editor';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function NewEditorialPage() {
  const [isPending, startTransition] = useTransition();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    imageUrl: '',
    content: '',
  });

  const handleSave = async () => {
    if (!firestore) return;

    if (!formData.title || !formData.content) {
      toast({
        variant: 'destructive',
        title: 'Required Fields',
        description: 'Please provide a title and some content.',
      });
      return;
    }

    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const postData = {
      ...formData,
      slug,
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    startTransition(() => {
      addDoc(collection(firestore, 'editorialPosts'), postData)
        .then(() => {
          toast({
            title: 'Story Published',
            description: 'Your narrative has been woven into the archives.',
          });
          router.push('/admin/editorial');
        })
        .catch((error) => {
          const permissionError = new FirestorePermissionError({
            path: 'editorialPosts',
            operation: 'create',
            requestResourceData: postData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/editorial">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Publish Narrative
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">The Narrative</CardTitle>
            </CardHeader>
            <CardContent>
              <EditorialEditor 
                content={formData.content} 
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} 
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="The Silent Space..." 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input 
                  placeholder="Creative Name" 
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input 
                  placeholder="e.g. Fashion, Sound" 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input 
                  placeholder="https://..." 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
