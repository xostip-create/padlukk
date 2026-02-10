
import Image from 'next/image';
import Link from 'next/link';

import { content, creators } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContentDisplay from '@/components/content-display';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wider leading-tight">
            Padluckk
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 font-body">
            A curated space where fashion, art, and music converge. Discover stories that inspire and creators that captivate.
          </p>
          <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#latest-stories">Explore Content</Link>
          </Button>
        </div>
      </section>

      <section id="latest-stories" className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-4xl md:text-5xl mb-12">Latest Stories</h2>
          <ContentDisplay content={content} creators={creators} />
        </div>
      </section>

      <section className="w-full bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-4xl md:text-5xl mb-12">Creator Spotlights</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {creators.map((creator) => {
                const creatorImage = PlaceHolderImages.find((img) => img.id === creator.avatarImageId);
                return (
                  <CarouselItem key={creator.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                          <Avatar className="h-24 w-24 border-4 border-primary">
                            <AvatarImage src={creatorImage?.imageUrl} alt={creator.name} data-ai-hint={creatorImage?.imageHint} />
                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="mt-4 font-headline text-2xl">{creator.name}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{creator.bio}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/creators">View All Creators</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
