
'use client';
import { useCollection } from '@/firebase/firestore/use-collection';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Loader2, Inbox, User } from 'lucide-react';
import { unparse } from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface MembershipApplication {
  id: string;
  fullName: string;
  socialHandle: string;
  creativeField: string;
  location: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function MembershipsAdminPage() {
  const { data: applications, loading, error } = useCollection<MembershipApplication>('membershipApplications', { orderBy: ['createdAt', 'desc'] });

  const exportToCsv = () => {
    if (!applications) return;
    const csvData = applications.map(a => ({
      name: a.fullName,
      social: a.socialHandle,
      field: a.creativeField,
      location: a.location,
      date: a.createdAt ? format(new Date(a.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'N/A',
    }));
    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'membership-applications.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPdf = () => {
    if (!applications) return;
    const doc = new jsPDF();
    doc.text('Membership Applications', 14, 16);
    (doc as any).autoTable({
        head: [['Name', 'Social', 'Field', 'Location', 'Date']],
        body: applications.map(a => [
            a.fullName,
            a.socialHandle,
            a.creativeField,
            a.location,
            a.createdAt ? format(new Date(a.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'N/A'
        ]),
        startY: 20
    });
    doc.save('membership-applications.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Membership Applications</h1>
        <div className="flex gap-2">
            <Button onClick={exportToCsv} disabled={!applications || applications.length === 0} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button onClick={exportToPdf} disabled={!applications || applications.length === 0} variant="outline">
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

      {error && <p className="text-destructive text-center">Error loading applications: {error.message}</p>}

      {!loading && !error && (!applications || applications.length === 0) && (
        <div className="text-center py-16 px-4 bg-card border rounded-lg shadow-sm mt-8">
            <div className="flex justify-center mb-4">
                <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No Applications Yet</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Once someone applies for membership, their details will appear here.
            </p>
        </div>
      )}

      {!loading && !error && applications && applications.length > 0 && (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Social Handle</TableHead>
                        <TableHead>Creative Field</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Submitted</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.fullName}</TableCell>
                            <TableCell>{app.socialHandle}</TableCell>
                            <TableCell>{app.creativeField}</TableCell>
                            <TableCell>{app.location}</TableCell>
                            <TableCell className="text-muted-foreground">
                                {app.createdAt ? format(new Date(app.createdAt.seconds * 1000), 'MMM d, yyyy') : 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      )}
    </div>
  );
}
