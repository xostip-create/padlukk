
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@/firebase';

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  // Hide the public header on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/world', label: 'World' },
    { href: '/studios', label: 'Studios' },
    { href: '/events', label: 'Events' },
    { href: '/editorial', label: 'Editorial' },
    { href: '/contact', label: 'Membership' },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setMobileMenuOpen(false)}
      className={cn(
        'font-body text-sm uppercase tracking-wider transition-colors hover:text-primary',
        pathname.startsWith(href) && href !== '/' ? 'text-primary' : pathname === href ? 'text-primary' : 'text-foreground'
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="https://i.postimg.cc/s2vRfP1f/PNG-Padluckk-type-face.png"
            alt="Padluckk logo"
            width={140}
            height={38}
            priority
            className="invert brightness-200"
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="mb-4 flex items-center gap-2" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="https://i.postimg.cc/s2vRfP1f/PNG-Padluckk-type-face.png"
                    alt="Padluckk logo"
                    width={140}
                    height={38}
                    priority
                    className="invert brightness-200"
                  />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'font-body text-lg font-medium uppercase transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
