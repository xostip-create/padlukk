
'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useParams } from 'next/navigation';
import { Loader2, ArrowLeft, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

interface EditorialPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  publishedAt: { seconds: number; nanoseconds: number; } | null;
}

export default function EditorialPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: posts, loading, error } = useCollection<EditorialPost>('editorialPosts', { where: ['slug', '==', slug], limit: 1 });

  const post = useMemo(() => posts?.[0] || null, [posts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <h1 className="font-headline text-4xl mb-4">Story Not Found</h1>
        <p className="text-muted-foreground mb-8">The editorial you are looking for has faded into the archives.</p>
        <Button asChild>
            <Link href="/editorial">Return to Editorial</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="bg-background min-h-screen font-body pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] min-h-[400px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 mb-12 container mx-auto px-4 max-w-4xl text-center">
            <Link 
                href="/editorial" 
                className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-70 hover:opacity-100 transition-opacity mb-8"
            >
                <ArrowLeft className="h-3 w-3" /> Back to Editorial
            </Link>
            <div className="mb-4">
                <span className="bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary px-4 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
                    {post.category}
                </span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl leading-tight">
                {post.title}
            </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-3xl mt-16 space-y-12">
        <div className="flex flex-wrap justify-center gap-8 border-b border-border/20 pb-8 text-xs tracking-widest uppercase opacity-60">
            <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Written by {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? format(new Date(post.publishedAt.seconds * 1000), 'MMMM d, yyyy') : ''}</span>
            </div>
        </div>

        <div className="space-y-8">
            <p className="text-xl md:text-2xl font-headline italic text-foreground/90 leading-relaxed border-l-4 border-primary pl-6">
                {post.excerpt}
            </p>

            <div 
              className="prose prose-invert max-w-none text-muted-foreground leading-loose text-lg rich-text-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>

        <footer className="pt-16 mt-16 border-t border-border/20 text-center">
            <p className="text-muted-foreground font-headline text-xl mb-8">The narrative continues.</p>
            <div className="flex justify-center gap-4">
                <Button variant="outline" asChild className="font-headline tracking-widest uppercase">
                    <Link href="/editorial">All Stories</Link>
                </Button>
                <Button asChild className="font-headline tracking-widest uppercase bg-accent text-accent-foreground">
                    <Link href="/contact">Become a Member</Link>
                </Button>
            </div>
        </footer>
      </div>
    </article>
  );
}
