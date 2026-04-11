
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, Mail, CalendarDays, LogOut, Users, Settings, User, Bell, PenTool } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/');
    }
  };

  const navItems = [
    { href: '/admin/rsvps', label: 'RSVPs', icon: Mail },
    { href: '/admin/memberships', label: 'Memberships', icon: Users },
    { href: '/admin/events', label: 'Events', icon: CalendarDays },
    { href: '/admin/editorial', label: 'Editorial', icon: PenTool },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 mb-4 p-2">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="shrink-0 text-primary"
            >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="font-headline text-lg group-data-[collapsible=icon]:hidden">
                Padluckk Admin
            </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mt-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                    <LogOut />
                    <span>Sign Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const AdminHeader = () => {
  const { user } = useUser();
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes('/admin/rsvps')) return 'RSVP Submissions';
    if (pathname.includes('/admin/memberships')) return 'Membership Applications';
    if (pathname.includes('/admin/events')) return 'Events Management';
    if (pathname.includes('/admin/editorial')) return 'Editorial Posts';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1 mr-2" />
      <div className="flex flex-1 items-center gap-4">
        <h2 className="text-lg font-semibold font-headline tracking-tight">{getPageTitle()}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
           {user?.photoURL ? (
             <Avatar className="h-full w-full">
               <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
               <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
             </Avatar>
           ) : (
             <User className="h-5 w-5 text-muted-foreground" />
           )}
        </div>
      </div>
    </header>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
            <AdminHeader />
            <div className="p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
