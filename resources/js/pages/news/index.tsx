import { getColumns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, News } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  news: News[];
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

export default function NewsPage({ news }: Props) {
  const { destroy } = useDeleteAction('news');

  const columns = getColumns<News>(
    [
      {
        key: 'image_url',
        label: 'Gambar',
      },
      {
        key: 'title',
        label: 'Judul',
        sortable: true,
      },
      {
        key: 'keywords',
        label: 'Kata kunci',
        sortable: true,
      },
      {
        key: 'created_at',
        label: 'Tanggal dibuat',
        sortable: true,
      },
    ],
    '/dashboard/news',
    destroy,
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Berita" />
      <div className="container mx-auto w-full px-4 py-6">
        <Heading title="Berita" description="List data berita" />
        <DataTable columns={columns} data={news} name="berita" url="news/create" filter="title" filterTitle="judul" />
      </div>
    </AppLayout>
  );
}
