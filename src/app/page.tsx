
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-background text-foreground font-body p-4">
      <div className="max-w-4xl w-full space-y-16 text-center">
        <section>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-none uppercase">
            <span className="bg-highlight px-4 py-1">Signup to attend</span>
            <br />
            <span className="bg-highlight px-4 py-1">Cultur FM events</span>
          </h1>
        </section>

        <section>
          <form className="w-full max-w-lg mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-0 border-b-2 border-foreground rounded-none placeholder:text-foreground/70 text-lg p-2 focus:outline-none focus:ring-0 text-center"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="city" className="sr-only">City</label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City (e.g. Lagos)"
                  className="w-full bg-transparent border-0 border-b-2 border-foreground rounded-none placeholder:text-foreground/70 text-lg p-2 focus:outline-none focus:ring-0 text-center"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full font-nav text-2xl py-8 tracking-widest">
              LET ME KNOW
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
