
export default function EventsPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4 space-y-16">

        {/* 1. Opening Context */}
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl mb-6">Gatherings</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Events are the live expression of the Padluckk world—carefully produced moments where our community can connect in physical and digital spaces.
          </p>
        </section>

        {/* 2. Upcoming Events Section */}
        <section className="space-y-8 text-center">
            <h2 className="font-headline text-3xl">Upcoming</h2>
            <div className="border-t border-b divide-y">
                <div className="py-6">
                    <p className="text-lg text-muted-foreground">The first events are currently in development.</p>
                </div>
            </div>
        </section>


        {/* 3. Future Growth Hint */}
        <footer className="text-center pt-8">
            <p className="text-muted-foreground font-headline">Documentation will follow the moment.</p>
        </footer>

      </div>
    </div>
  );
}
