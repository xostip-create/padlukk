
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-10 sm:flex-row sm:justify-center sm:gap-12">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold tracking-wider">Padluckk</span>
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Padluckk Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
