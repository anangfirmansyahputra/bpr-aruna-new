import { getColumns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Kategori',
    href: '/categories',
  },
];

interface Props {
  categories: Category[];
}

export default function CategoryPage({ categories }: Props) {
  const { destroy } = useDeleteAction('categories');

  const columns = getColumns<Category>(
    [
      {
        key: 'name',
        label: 'Nama',
        sortable: true,
      },
      {
        key: 'created_at',
        label: 'Tanggal dibuat',
        sortable: true,
      },
    ],
    '/categories',
    destroy,
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kategori" />
      <div className="container mx-auto w-full px-4 py-6">
        <Heading title="Kategori" description="List data kategori" />
        <DataTable columns={columns} data={categories} name="kategori" url="categories/create" filter="name" filterTitle="nama" />
      </div>
    </AppLayout>
  );
}
