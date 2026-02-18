import MembershipForm from "@/components/contact-form";

export default function MembershipPage() {
  return (
    <div className="bg-background font-body">
      <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 space-y-12">
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl">Membership</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Padluckk is a world shaped by its inhabitants. We are seeking creators who bring singular vision to the table. Apply to join our collective and contribute to the narrative.
          </p>
        </section>

        <section>
          <div className="max-w-xl mx-auto bg-card p-8 rounded-lg border">
            <MembershipForm />
          </div>
        </section>
      </div>
    </div>
  );
}
