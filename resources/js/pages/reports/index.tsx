import { getColumns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Report } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  reports: Report[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Berita',
    href: '/dashboard/news',
  },
];

export default function NewsPage({ reports }: Props) {
  const { destroy } = useDeleteAction('reports');

  const columns = getColumns<Report>(
    [
      {
        key: 'title',
        label: 'Judul',
        sortable: true,
      },
      {
        key: 'file',
        label: 'File',
      },
      {
        key: 'created_at',
        label: 'Tanggal dibuat',
        sortable: true,
      },
    ],
    '/dashboard/reports',
    destroy,
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan keuangan" />
      <div className="container mx-auto w-full px-4 py-6">
        <Heading title="Laporan keuangan" description="List data laporan keuangan" />
        <DataTable columns={columns} data={reports} name="laporan" url="reports/create" filter="title" filterTitle="judul" />
      </div>
    </AppLayout>
  );
}
