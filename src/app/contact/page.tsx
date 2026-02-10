
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="bg-background font-body">
      <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 space-y-12">
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl">Connection</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Padluckk is a community built over time through shared culture. For collaborations, content submissions, or general inquiries, please use the form below. We read everything. Your information is respected and will not be shared.
          </p>
        </section>

        <section>
          <div className="max-w-xl mx-auto bg-card p-8 rounded-lg border">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
