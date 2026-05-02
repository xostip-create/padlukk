'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useParams } from 'next/navigation';
import { Loader2, ArrowLeft, Calendar, User, Share2, Bookmark, Clock, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const { data: posts, loading, error } = useCollection<EditorialPost>('editorialPosts', { where: ['slug', '==', slug], limit: 1 });

  const post = useMemo(() => posts?.[0] || null, [posts]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (post) {
      const bookmarks = JSON.parse(localStorage.getItem('padluckk_bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(post.id));
    }
  }, [post]);

  // Process content to create horizontal galleries
  useEffect(() => {
    if (!post || !contentRef.current) return;

    const content = contentRef.current;
    const children = Array.from(content.children);
    
    let currentGroup: HTMLElement[] = [];
    const groups: HTMLElement[][] = [];

    // Identify consecutive images for gallery grouping
    children.forEach((child) => {
      const hasImage = child.querySelector('img') || child.tagName === 'IMG';
      if (hasImage) {
        currentGroup.push(child as HTMLElement);
      } else {
        if (currentGroup.length > 1) {
          groups.push([...currentGroup]);
        }
        currentGroup = [];
      }
    });
    
    if (currentGroup.length > 1) {
      groups.push([...currentGroup]);
    }

    groups.forEach((group) => {
      const container = document.createElement('div');
      container.className = 'editorial-gallery-container group/gallery';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'editorial-gallery-wrapper';
      
      const leftBtn = document.createElement('button');
      leftBtn.className = 'gallery-nav-button left-arrow';
      leftBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      
      const rightBtn = document.createElement('button');
      rightBtn.className = 'gallery-nav-button right-arrow';
      rightBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      const firstItem = group[0];
      firstItem.parentNode?.insertBefore(container, firstItem);
      container.appendChild(wrapper);
      container.appendChild(leftBtn);
      container.appendChild(rightBtn);

      group.forEach((item) => {
        const img = item.querySelector('img') || (item.tagName === 'IMG' ? item : null);
        if (img) {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'editorial-gallery-item';
          galleryItem.appendChild(img.cloneNode(true));
          wrapper.appendChild(galleryItem);
        }
        item.remove();
      });

      leftBtn.onclick = () => {
        wrapper.scrollBy({ left: -wrapper.clientWidth * 0.8, behavior: 'smooth' });
      };
      rightBtn.onclick = () => {
        wrapper.scrollBy({ left: wrapper.clientWidth * 0.8, behavior: 'smooth' });
      };

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          wrapper.scrollLeft += e.deltaY;
        }
      };

      wrapper.addEventListener('wheel', handleWheel as any, { passive: false });
    });
  }, [post, loading]);

  const handleBookmark = () => {
    if (!post) return;
    const bookmarks = JSON.parse(localStorage.getItem('padluckk_bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: string) => id !== post.id);
      toast({
        title: 'Removed from Library',
        description: 'The story has been removed from your bookmarks.',
      });
    } else {
      newBookmarks = [...bookmarks, post.id];
      toast({
        title: 'Saved to Library',
        description: 'You can find this story in your bookmarks later.',
      });
    }
    localStorage.setItem('padluckk_bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (!post) return;
    const shareData = {
      title: post.title,
      text: `Check out this story on Padluckk: ${post.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link Copied',
          description: 'The story URL has been copied to your clipboard.',
        });
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const readingTime = useMemo(() => {
    if (!post?.content) return '2 min';
    const words = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min read`;
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF9F6]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] p-4 text-[#1A1A1A]">
        <h1 className="font-headline text-4xl mb-4">Story Not Found</h1>
        <p className="text-stone-500 mb-8">The editorial you are looking for has faded into the archives.</p>
        <Button asChild>
            <Link href="/editorial">Return to Editorial</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-body pb-32 relative overflow-hidden transition-colors duration-500">
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
          className="object-cover brightness-[0.8] grayscale-[0.1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-90" />
        
        <div className="absolute inset-x-0 bottom-0 mb-16 container mx-auto px-4 max-w-6xl">
            <div className="max-w-4xl">
                <Link 
                    href="/editorial" 
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-white/70 hover:text-white transition-opacity mb-8 border-b border-transparent hover:border-white/20 pb-1"
                >
                    <ArrowLeft className="h-3 w-3" /> Back to Archives
                </Link>
                <div className="mb-6 flex items-center gap-4">
                    <span className="bg-primary/20 backdrop-blur-md border border-primary/40 text-white px-5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold shadow-sm">
                        {post.category}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 flex items-center gap-2 font-bold">
                        <Clock className="h-3 w-3" /> {readingTime}
                    </span>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-white drop-shadow-lg">
                    {post.title}
                </h1>
            </div>
        </div>
      </div>

      {/* Layout with Side Content */}
      <div className="container mx-auto px-4 max-w-7xl mt-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Vertical Decorative Text */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-32 flex flex-col items-center">
              <div className="vertical-text text-[10px] tracking-[0.8em] uppercase opacity-20 whitespace-nowrap font-headline origin-center rotate-180 text-stone-900" style={{ writingMode: 'vertical-rl' }}>
                CULTURE CONSIDERED &bull; PADLUCKK EDITORIAL &bull; EST 2024
              </div>
              <div className="w-px h-32 bg-gradient-to-b from-stone-300 to-transparent mt-8" />
            </div>
          </div>

          {/* Center: Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-[10px] tracking-widest uppercase text-stone-500 font-bold border-b border-stone-200 pb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                        <User className="h-4 w-4 text-stone-400" />
                    </div>
                    <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-stone-400" />
                    <span>{post.publishedAt ? format(new Date(post.publishedAt.seconds * 1000), 'MMMM d, yyyy') : ''}</span>
                </div>
            </div>

            <div 
              ref={contentRef}
              className="prose prose-neutral max-w-none text-stone-950 leading-[1.45] text-xl rich-text-content text-justify hyphens-auto first-letter:text-7xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-primary first-letter:leading-none [&_p]:mb-1 [&_p:has(strong)]:mt-12 [&_p:has(strong)]:mb-4 [&_p]:block"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="pt-24 mt-24 border-t border-stone-200">
                <div className="text-center space-y-8">
                    <p className="text-stone-900 font-headline text-3xl tracking-tight">The narrative remains open.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button variant="outline" asChild className="h-14 px-8 font-headline tracking-widest uppercase border-stone-300 hover:bg-stone-50 text-stone-900">
                            <Link href="/editorial">Explore Archives</Link>
                        </Button>
                        <Button asChild className="h-14 px-8 font-headline tracking-widest uppercase bg-accent text-accent-foreground shadow-lg shadow-accent/10">
                            <Link href="/contact">Join the Collective</Link>
                        </Button>
                    </div>
                </div>
            </footer>
          </div>

          {/* Right Side: Metadata & Actions Box */}
          <div className="lg:col-span-4 lg:pl-12">
            <div className="sticky top-32 space-y-12">
              <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Context</h4>
                  <p className="text-sm text-stone-600 leading-relaxed font-medium">
                    This story is part of the <span className="text-stone-900 font-bold">{post.category}</span> issue. We explore ideas that define the current cultural landscape through a considered lens.
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-stone-100 text-stone-400"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "rounded-full transition-colors",
                        isBookmarked ? "bg-primary/10 text-primary" : "hover:bg-stone-100 text-stone-400"
                      )}
                      onClick={handleBookmark}
                    >
                      {isBookmarked ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-stone-300 font-bold">Share Story</div>
                </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-300 font-bold">Check out</h4>
                 <Link href="/world" className="group block space-y-2">
                    <p className="font-headline text-lg group-hover:text-primary transition-colors text-stone-900">The World of Padluckk</p>
                    <p className="text-xs text-stone-500 leading-relaxed font-medium">Explore the scenes and communities defining our nights.</p>
                 </Link>
                 <Link href="/studios" className="group block space-y-2">
                    <p className="font-headline text-lg group-hover:text-primary transition-colors text-stone-900">Our Creative Practice</p>
                    <p className="text-xs text-stone-500 leading-relaxed font-medium">Inside the production house for culture and sound.</p>
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
