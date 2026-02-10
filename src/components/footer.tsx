
import Link from 'next/link';
import { BookOpen, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:gap-0">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold tracking-wider">Padluckk</span>
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Padluckk Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
