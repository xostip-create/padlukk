'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useCollection } from '@/firebase/firestore/use-collection';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Loader2, Inbox } from 'lucide-react';
import { unparse } from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Rsvp {
  id: string;
  email: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function RsvpsAdminPage() {
  const { data: rsvps, loading, error } = useCollection<Rsvp>('rsvps', { orderBy: ['createdAt', 'desc'] });

  const groupedRsvps = useMemo(() => {
    if (!rsvps) return {};
    return rsvps.reduce((acc, rsvp) => {
      const date = rsvp.createdAt ? format(new Date(rsvp.createdAt.seconds * 1000), 'yyyy-MM-dd') : 'No Date';
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(rsvp);
      return acc;
    }, {} as Record<string, Rsvp[]>);
  }, [rsvps]);

  const exportToCsv = () => {
    if (!rsvps) return;
    const csvData = rsvps.map(r => ({
      email: r.email,
      date: r.createdAt ? format(new Date(r.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'N/A',
    }));
    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'rsvps.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPdf = () => {
    if (!rsvps) return;
    const doc = new jsPDF();
    doc.text('RSVP Submissions', 14, 16);
    (doc as any).autoTable({
        head: [['Email', 'Date']],
        body: rsvps.map(r => [
            r.email,
            r.createdAt ? format(new Date(r.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'N/A'
        ]),
        startY: 20
    });
    doc.save('rsvps.pdf');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">RSVP Submissions</h1>
        <div className="flex gap-2">
            <Button onClick={exportToCsv} disabled={!rsvps || rsvps.length === 0} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button onClick={exportToPdf} disabled={!rsvps || rsvps.length === 0} variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export PDF
            </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-destructive text-center">Error loading RSVPs: {error.message}</p>}

      {!loading && !error && (!rsvps || rsvps.length === 0) && (
        <div className="text-center py-16 px-4 bg-card border rounded-lg shadow-sm mt-8">
            <div className="flex justify-center mb-4">
                <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No Submissions</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Once an RSVP is submitted, it will appear here.
            </p>
            <Button asChild className="mt-6">
                <Link href="/events">Go to Events Page</Link>
            </Button>
        </div>
      )}

      {!loading && !error && rsvps && rsvps.length > 0 && (
        <Accordion type="multiple" defaultValue={Object.keys(groupedRsvps)} className="w-full">
          {Object.entries(groupedRsvps).map(([date, rsvpsOnDate]) => (
            <AccordionItem key={date} value={date}>
              <AccordionTrigger className="font-headline text-xl">
                {format(new Date(date), 'MMMM d, yyyy')} ({rsvpsOnDate.length})
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rsvpsOnDate.map((rsvp) => (
                      <TableRow key={rsvp.id}>
                        <TableCell>{rsvp.email}</TableCell>
                        <TableCell>
                          {rsvp.createdAt ? format(new Date(rsvp.createdAt.seconds * 1000), 'HH:mm:ss') : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
