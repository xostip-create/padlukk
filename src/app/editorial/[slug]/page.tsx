
'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useParams } from 'next/navigation';
import { Loader2, ArrowLeft, Calendar, User, Share2, Bookmark, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditorialPost {
  id: string;
  title: string;
  slug: string;
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

  // Estimate reading time based on content length
  const readingTime = useMemo(() => {
    if (!post?.content) return '2 min';
    const words = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min read`;
  }, [post]);

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
    <article className="bg-background min-h-screen font-body pb-32 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] z-10">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover brightness-[0.6] grayscale-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 mb-16 container mx-auto px-4 max-w-6xl">
            <div className="max-w-4xl">
                <Link 
                    href="/editorial" 
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase opacity-60 hover:opacity-100 transition-opacity mb-8 border-b border-transparent hover:border-white/20 pb-1"
                >
                    <ArrowLeft className="h-3 w-3" /> Back to Archives
                </Link>
                <div className="mb-6 flex items-center gap-4">
                    <span className="bg-primary/10 backdrop-blur-md border border-primary/30 text-primary px-5 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold">
                        {post.category}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {readingTime}
                    </span>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter drop-shadow-2xl">
                    {post.title}
                </h1>
            </div>
        </div>
      </div>

      {/* Layout with Side Content */}
      <div className="container mx-auto px-4 max-w-7xl mt-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Vertical Decorative Text (Hidden on small) */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-32 flex flex-col items-center">
              <div className="vertical-text text-[10px] tracking-[0.8em] uppercase opacity-20 whitespace-nowrap font-headline origin-center rotate-180" style={{ writingMode: 'vertical-rl' }}>
                CULTURE CONSIDERED &bull; PADLUCKK EDITORIAL &bull; EST 2024
              </div>
              <div className="w-px h-32 bg-gradient-to-b from-border/40 to-transparent mt-8" />
            </div>
          </div>

          {/* Center: Main Content */}
          <div className="lg:col-span-7 space-y-16">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-[10px] tracking-widest uppercase opacity-60 border-b border-border/20 pb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border/40">
                        <User className="h-4 w-4" />
                    </div>
                    <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4" />
                    <span>{post.publishedAt ? format(new Date(post.publishedAt.seconds * 1000), 'MMMM d, yyyy') : ''}</span>
                </div>
            </div>

            <div 
              className="prose prose-invert max-w-none text-muted-foreground leading-[1.8] text-xl rich-text-content first-letter:text-7xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="pt-24 mt-24 border-t border-border/10">
                <div className="text-center space-y-8">
                    <p className="text-muted-foreground font-headline text-3xl tracking-tight">The narrative remains open.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button variant="outline" asChild className="h-14 px-8 font-headline tracking-widest uppercase border-primary/20 hover:bg-primary/5">
                            <Link href="/editorial">Explore Archives</Link>
                        </Button>
                        <Button asChild className="h-14 px-8 font-headline tracking-widest uppercase bg-accent text-accent-foreground shadow-lg shadow-accent/20">
                            <Link href="/contact">Join the Collective</Link>
                        </Button>
                    </div>
                </div>
            </footer>
          </div>

          {/* Right Side: Metadata & Actions Box */}
          <div className="lg:col-span-4 lg:pl-12">
            <div className="sticky top-32 space-y-12">
              
              {/* Context Box */}
              <div className="p-8 rounded-2xl bg-card/30 border border-border/40 backdrop-blur-xl space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Context</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This story is part of the <span className="text-foreground">{post.category}</span> issue. We explore ideas that define the current cultural landscape through a considered lens.
                  </p>
                </div>

                <div className="pt-6 border-t border-border/20 flex items-center justify-between">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase opacity-40">Share Story</div>
                </div>
              </div>

              {/* Decorative Brand Element */}
              <div className="hidden lg:block pt-8 text-center space-y-4">
                 <div className="flex justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-primary/20">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" />
                    </svg>
                 </div>
                 <p className="text-[10px] tracking-[0.5em] uppercase opacity-30 font-headline">Padluckk Studios</p>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                 <h4 className="text-[10px] tracking-[0.3em] uppercase opacity-40">Next Chapter</h4>
                 <Link href="/world" className="group block space-y-2">
                    <p className="font-headline text-lg group-hover:text-primary transition-colors">The World of Padluckk</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Explore the scenes and communities defining our nights.</p>
                 </Link>
                 <Link href="/studios" className="group block space-y-2">
                    <p className="font-headline text-lg group-hover:text-primary transition-colors">Our Creative Practice</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Inside the production house for culture and sound.</p>
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
