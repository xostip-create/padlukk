'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Asterisk, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/mixes', label: 'Mixes' },
  { href: '/events', label: 'Events' },
  { href: '/partner', label: 'Partner' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInfoMenuOpen, setInfoMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setMobileMenuOpen(false)}
      className={cn(
        'font-nav text-2xl uppercase tracking-widest transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-foreground'
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Asterisk className="h-10 w-10 text-foreground" />
          <span className="font-nav text-3xl font-bold tracking-widest">CULTUR</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/mixes" label="Mixes" />
          <NavLink href="/events" label="Events" />
          <DropdownMenu open={isInfoMenuOpen} onOpenChange={setInfoMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                onMouseEnter={() => setInfoMenuOpen(true)}
                className="flex items-center gap-1 font-nav text-2xl uppercase tracking-widest transition-colors hover:text-primary"
              >
                Info <ChevronDown className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onMouseLeave={() => setInfoMenuOpen(false)}
              className="bg-background border-foreground"
            >
              <DropdownMenuItem asChild><Link href="/world">About</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/studios">Studios</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink href="/partner" label="Partner" />
          <NavLink href="/contact" label="Contact" />
        </nav>
        <div className="flex items-center gap-2">
            <Link href="/dj" className="hidden sm:block bg-red-500 text-white font-nav px-3 py-1.5 text-xs tracking-wider">
                DJ FOR CULTUR FM
            </Link>
            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Open Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background">
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                        <Asterisk className="h-8 w-8 text-foreground" />
                        <span className="font-nav text-2xl font-bold tracking-wider">CULTUR</span>
                    </Link>
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                        'text-lg font-medium transition-colors hover:text-primary font-nav uppercase',
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                        )}
                    >
                        {link.label}
                    </Link>
                    ))}
                     <Link
                        href="/world"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                        'text-lg font-medium transition-colors hover:text-primary font-nav uppercase',
                        pathname === "/world" ? 'text-primary' : 'text-foreground'
                        )}
                    >
                        Info
                    </Link>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
