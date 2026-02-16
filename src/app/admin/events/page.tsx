'use client';
import { useState } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, PlusCircle, Calendar, Image as ImageIcon, Inbox } from 'lucide-react';
import Image from 'next/image';
import EventForm from '@/components/event-form';

interface Event {
  id: string;
  title: string;
  description: string;
  date: { seconds: number; nanoseconds: number; };
  imageUrl: string;
}

export default function EventsAdminPage() {
  const { data: events, loading, error } = useCollection<Event>('events', { orderBy: ['date', 'desc'] });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Events</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new event. It will be displayed on the public events page.
                    </DialogDescription>
                </DialogHeader>
                <EventForm onFinished={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-destructive text-center">Error loading events: {error.message}</p>}

      {!loading && !error && (!events || events.length === 0) && (
        <div className="text-center py-16 px-4 bg-card border rounded-lg shadow-sm mt-8">
            <div className="flex justify-center mb-4">
                <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No Events Created</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Click the "Add Event" button to create your first event.
            </p>
        </div>
      )}

      {!loading && !error && events && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                  <Card key={event.id} className="flex flex-col">
                      <CardHeader>
                          <div className="relative w-full h-40 mb-4">
                              <Image 
                                  src={event.imageUrl}
                                  alt={event.title}
                                  fill
                                  className="rounded-md object-cover"
                              />
                          </div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription className="line-clamp-3 flex-grow">{event.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                          <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>{format(new Date(event.date.seconds * 1000), 'MMMM d, yyyy')}</span>
                          </div>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      )}
    </div>
  );
}
