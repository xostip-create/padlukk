
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="font-headline text-lg font-bold tracking-wide">PADLUCKK</span>
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Padluckk Inc. A long-term cultural project.</p>
        <div className="flex items-center gap-4">
            <Link href="/world" className="text-sm text-muted-foreground hover:text-foreground">World</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
