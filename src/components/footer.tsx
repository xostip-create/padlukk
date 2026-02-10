
import Link from 'next/link';
import { Asterisk } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-10 sm:flex-row sm:justify-center sm:gap-12">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Asterisk className="h-8 w-8 text-foreground" />
          <span className="font-nav text-2xl font-bold tracking-widest">CULTUR</span>
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cultur Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
