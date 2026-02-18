import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="https://i.postimg.cc/s2vRfP1f/PNG-Padluckk-type-face.png"
            alt="Padluckk logo"
            width={120}
            height={33}
            className="invert brightness-200 opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Padluckk Inc. A long term cultural project.</p>
        <div className="flex items-center gap-4">
            <Link href="/world" className="text-sm text-muted-foreground hover:text-foreground">World</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Membership</Link>
        </div>
      </div>
    </footer>
  );
}
