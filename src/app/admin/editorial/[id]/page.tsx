
'use client';

import { useState, useTransition, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import EditorialEditor from '@/components/editorial-editor';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function EditEditorialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isPending, startTransition] = useTransition();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: '',
    imageUrl: '',
    content: '',
  });

  useEffect(() => {
    if (!firestore || !id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(firestore, 'editorialPosts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            category: data.category || '',
            imageUrl: data.imageUrl || '',
            content: data.content || '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [firestore, id]);

  const handleUpdate = async () => {
    if (!firestore || !id) return;

    const postData = {
      ...formData,
      updatedAt: serverTimestamp(),
    };

    startTransition(() => {
      updateDoc(doc(firestore, 'editorialPosts', id), postData)
        .then(() => {
          toast({
            title: 'Story Refined',
            description: 'Your changes have been preserved.',
          });
          router.push('/admin/editorial');
        })
        .catch((error) => {
          const permissionError = new FirestorePermissionError({
            path: `editorialPosts/${id}`,
            operation: 'update',
            requestResourceData: postData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/editorial">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
        <Button onClick={handleUpdate} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Preserve Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Refine the Narrative</CardTitle>
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
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea 
                  placeholder="Briefly set the scene..." 
                  className="h-24"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
