'use client';

import { useState } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2, PlusCircle, Inbox, User, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import EditorialForm from '@/components/editorial-form';
import { doc, deleteDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface EditorialPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  publishedAt: { seconds: number; nanoseconds: number; } | null;
}

export default function EditorialAdminPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { data: posts, loading, error } = useCollection<EditorialPost>('editorialPosts', { orderBy: ['publishedAt', 'desc'] });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<EditorialPost | null>(null);

  const handleEdit = (post: EditorialPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (postId: string) => {
    if (!firestore) return;

    deleteDoc(doc(firestore, 'editorialPosts', postId))
      .then(() => {
        toast({
          title: 'Post Deleted',
          description: 'The editorial post has been removed.',
        });
      })
      .catch((err) => {
        const permissionError = new FirestorePermissionError({
          path: `editorialPosts/${postId}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Delete Failed',
          description: 'Could not delete the post. Please try again.',
        });
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Editorial Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editingPost ? 'Edit Editorial Post' : 'Create Editorial Post'}</DialogTitle>
                    <DialogDescription>
                        {editingPost ? 'Update your story, interview, or visual essay.' : 'Publish a new story, interview, or visual essay to the editorial section.'}
                    </DialogDescription>
                </DialogHeader>
                <EditorialForm 
                    initialData={editingPost} 
                    onFinished={() => {
                        setIsDialogOpen(false);
                        setEditingPost(null);
                    }} 
                />
            </DialogContent>
        </Dialog>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-destructive text-center">Error loading posts: {error.message}</p>}

      {!loading && !error && (!posts || posts.length === 0) && (
        <div className="text-center py-16 px-4 bg-card border rounded-lg shadow-sm mt-8">
            <div className="flex justify-center mb-4">
                <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No Posts Published</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Start building the Padluckk world by publishing your first editorial post.
            </p>
        </div>
      )}

      {!loading && !error && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                  <Card key={post.id} className="flex flex-col overflow-hidden bg-card/50">
                      <div className="relative w-full h-56">
                          <Image 
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover"
                          />
                          <div className="absolute top-4 left-4">
                             <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-headline tracking-widest uppercase">
                                {post.category}
                             </span>
                          </div>
                          <div className="absolute top-4 right-4 flex gap-2">
                              <Button 
                                variant="secondary" 
                                size="icon" 
                                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                                onClick={() => handleEdit(post)}
                              >
                                  <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                      <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full bg-destructive/80 backdrop-blur-sm hover:bg-destructive"
                                      >
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                      <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                              This action cannot be undone. This will permanently delete the editorial post "{post.title}".
                                          </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                              Delete
                                          </AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                          </div>
                      </div>
                      <CardHeader>
                          <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-2 text-sm">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto border-t pt-4">
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  <span>{post.author}</span>
                              </div>
                              <span>
                                  {post.publishedAt ? format(new Date(post.publishedAt.seconds * 1000), 'MMM d, yyyy') : 'Draft'}
                              </span>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      )}
    </div>
  );
}
