
import ContactForm from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="font-headline text-5xl md:text-6xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We'd love to hear from you. Whether it's a content request, a question, or just a hello, don't hesitate to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="font-headline text-3xl mb-6">Contact Us</h2>
            <ContactForm />
          </div>
          <div className="space-y-8 mt-4 md:mt-0">
            <h3 className="font-headline text-3xl">Our Info</h3>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-muted-foreground">hello@padluckk.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Office</h4>
                <p className="text-muted-foreground">123 Design Lane, Art City, 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
