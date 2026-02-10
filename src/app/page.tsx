
export default function Home() {
  return (
    <div className="bg-background font-body text-foreground">
      <div className="container mx-auto max-w-3xl py-24 px-4 space-y-20">

        {/* 1. Opening Statement (Hero) */}
        <section className="text-center">
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-none">
            Culture, Considered.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            A creative platform for the culturally aware.
          </p>
        </section>

        {/* 2. What Padluckk Is */}
        <section className="text-center max-w-2xl mx-auto">
           <p className="text-base md:text-lg leading-loose">
            Padluckk is a creative culture platform and working studio. It is a world connecting music, fashion, ideas, and the people who shape them—through our editorial lens, production house, and live events.
          </p>
        </section>

        {/* 3. The Three Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-b py-16">
          <div>
            <h2 className="font-headline text-2xl mb-3">Padluckk World</h2>
            <p className="text-muted-foreground">The cultural layer. A space for ideas, scenes, and creative communities to converge.</p>
          </div>
          <div>
            <h2 className="font-headline text-2xl mb-3">Padluckk Studios</h2>
            <p className="text-muted-foreground">The working arm. A production house for brand, cultural, and sound projects.</p>
          </div>
          <div>
            <h2 className="font-headline text-2xl mb-3">Events</h2>
            <p className="text-muted-foreground">The live expression. Gatherings that bring the Padluckk community together.</p>
          </div>
        </section>

        {/* 4. Tone-Setting Statement */}
        <footer className="text-center pt-8">
            <p className="text-muted-foreground font-headline text-lg">The first issue is always the quietest.</p>
        </footer>

      </div>
    </div>
  );
}
