
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-background text-foreground font-body p-8">
      <div className="max-w-3xl w-full space-y-20 md:space-y-24 text-center">
        {/* 1. Opening Statement (Hero) */}
        <section>
          <h1 className="font-headline text-5xl md:text-7xl tracking-wider">
            Where Culture Connects
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            A platform for music, fashion, ideas, and the people who shape them.
          </p>
        </section>

        {/* 2. What Padluckk Is */}
        <section>
           <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            Padluckk is a creative culture platform. A world connecting music, fashion, ideas, and people. A space for studios, events, and community.
          </p>
        </section>

        {/* 3. The Three Pillars */}
        <section>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-headline text-2xl mb-2">Padluckk World</h3>
              <p className="text-muted-foreground">The cultural layer — exploring ideas, scenes, and creative communities.</p>
            </div>
            <div>
              <h3 className="font-headline text-2xl mb-2">Padluckk Studios</h3>
              <p className="text-muted-foreground">The working arm — offering services, production, and creative collaboration.</p>
            </div>
            <div>
              <h3 className="font-headline text-2xl mb-2">Events</h3>
              <p className="text-muted-foreground">The live expression of the culture. Physical and digital gatherings.</p>
            </div>
          </div>
        </section>

        {/* 4. Tone-Setting Statement */}
        <footer>
          <p className="text-lg text-muted-foreground font-headline">
            Issue One.
          </p>
        </footer>
      </div>
    </div>
  );
}
