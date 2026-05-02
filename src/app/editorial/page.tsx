'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
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

export default function EditorialPage() {
  const { data: posts, loading, error } = useCollection<EditorialPost>('editorialPosts', { orderBy: ['publishedAt', 'desc'] });

  const getSnippet = (html: string) => {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-body transition-colors duration-500">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#1A1A1A]">Editorial</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 leading-relaxed font-medium">
            Considered stories, visual essays, and dialogues from the heart of our community. Exploring the quiet intersections of culture.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {error && (
            <div className="text-center py-24">
                <p className="text-destructive">Failed to load editorial content. Please try again later.</p>
            </div>
        )}

        {!loading && !error && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {posts.map((post, index) => (
              <Link 
                key={post.id} 
                href={`/editorial/${post.slug}`}
                className={cn(
                    "group flex flex-col space-y-6",
                    index % 3 === 0 && "md:col-span-2 md:flex-row md:space-y-0 md:space-x-12"
                )}
              >
                <div className={cn(
                    "relative overflow-hidden aspect-[16/10] bg-stone-200 shadow-sm",
                    index % 3 === 0 ? "md:w-3/5" : "w-full"
                )}>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1 text-[10px] tracking-[0.2em] uppercase font-bold border border-black/5 text-black">
                        {post.category}
                    </span>
                  </div>
                </div>
                
                <div className={cn(
                    "flex flex-col justify-center space-y-4",
                    index % 3 === 0 ? "md:w-2/5" : "w-full"
                )}>
                   <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase opacity-60 text-stone-500 font-bold">
                      <span>{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-400" />
                      <span>{post.publishedAt ? format(new Date(post.publishedAt.seconds * 1000), 'MMMM d, yyyy') : ''}</span>
                   </div>
                   
                   <div className="space-y-3">
                     <h2 className="font-headline text-3xl md:text-4xl leading-tight transition-colors group-hover:text-primary text-[#1A1A1A]">
                      {post.title}
                     </h2>
                     <p className="text-stone-600 line-clamp-3 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                       {getSnippet(post.content)}
                     </p>
                   </div>
                   
                   <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-headline tracking-widest uppercase opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary">
                        Read Story <ArrowRight className="h-4 w-4" />
                      </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && !error && (!posts || posts.length === 0) && (
            <div className="text-center py-32 border-t border-stone-200">
                <p className="text-stone-400 font-headline text-2xl italic">The archives are quiet. Content follows the moment.</p>
            </div>
        )}
      </div>
    </div>
  );
}
