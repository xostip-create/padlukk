
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="bg-background font-body text-foreground">
      {/* 1. Video Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        {/* Video Background Container */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dhm0jszr9&public_id=Padluckk_web_video_1_awpfzg&autoplay=true&loop=true&muted=true&controls=false"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 pointer-events-none brightness-50 grayscale-[0.2]"
            style={{ 
              aspectRatio: '16 / 9',
              width: '177.77777778vh',
              height: '100vh',
              minWidth: '100vw',
              minHeight: '56.25vw',
              border: 'none'
            }}
            allow="autoplay; fullscreen"
          ></iframe>
          {/* Overlay for readability and atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Culture, Considered.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed font-headline max-w-2xl mx-auto drop-shadow-md">
            A creative platform for the culturally aware.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl py-24 px-4 space-y-24">
        {/* 2. What Padluckk Is */}
        <section className="text-center max-w-3xl mx-auto">
           <p className="text-xl md:text-2xl leading-loose font-headline opacity-90">
            Padluckk is a creative culture platform and working studio. It is a world connecting music, fashion, ideas, and the people who shape them - through our editorial lens, production house, and live events.
          </p>
        </section>

        {/* 3. The Three Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/30 backdrop-blur-sm border-border/40 group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Padluckk World</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-lg leading-relaxed">The cultural layer. A space for ideas, scenes, and creative communities to converge.</p>
                </CardContent>
            </Card>
             <Card className="bg-card/30 backdrop-blur-sm border-border/40 group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Padluckk Studios</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-lg leading-relaxed">The working arm. A production house for brand, cultural, and sound projects.</p>
                </CardContent>
            </Card>
             <Card className="bg-card/30 backdrop-blur-sm border-border/40 group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-lg leading-relaxed">The live expression. Gatherings that bring the Padluckk community together.</p>
                </CardContent>
            </Card>
        </section>

        {/* 4. Tone-Setting Statement */}
        <footer className="text-center pt-16 border-t border-border/20">
            <p className="text-muted-foreground font-headline text-2xl italic">The first issue is always the quietest.</p>
        </footer>

      </div>
    </div>
  );
}
