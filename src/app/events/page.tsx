
import Image from 'next/image';
import RsvpForm from '@/components/rsvp-form';

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
            <div className="border-t border-b py-12 space-y-8">
              <div className="max-w-md mx-auto">
                <Image
                  src="https://i.postimg.cc/wxb4gKLV/Padluckk-event-1-no-web.png"
                  alt="Creating while uncertain event"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-headline text-2xl tracking-tight">Theme: Creating while uncertain</h3>
                <p className="text-muted-foreground">Limited entry. RSVP required.</p>
                <div className="pt-4">
                  <RsvpForm />
                </div>
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
