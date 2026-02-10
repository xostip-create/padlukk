
export default function StudiosPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4 space-y-16">

        {/* 1. Opening Statement */}
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl mb-6">Padluckk Studios</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            The working arm of Padluckk. Where ideas rooted in culture become tangible, executed with quiet confidence.
          </p>
        </section>

        {/* 2. Areas of Practice */}
        <section className="space-y-12">
          <div>
            <h2 className="font-headline text-3xl mb-3">Creative Direction</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Guiding the singular vision of a project from concept to completion.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Brand & Cultural Strategy</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Positioning brands within their cultural context through insight and narrative.
            </p>
          </div>
          
          <div>
            <h2 className="font-headline text-3xl mb-3">Music & Sound Projects</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Developing sonic identities and curated audio experiences.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Visual Identity & Design</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Creating considered visual systems that communicate with clarity.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Experiential & Event Concepts</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Designing gatherings that give form to a community or an idea.
            </p>
          </div>
        </section>

        {/* 3. How Studios Works */}
        <section className="text-center border-t pt-12">
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projects are selective. Work is collaborative. The output varies by context.
          </p>
        </section>

        {/* 4. Closing Line */}
        <footer className="text-center pt-8">
            <p className="text-muted-foreground font-headline">Work is shown when it’s ready.</p>
        </footer>

      </div>
    </div>
  );
}
