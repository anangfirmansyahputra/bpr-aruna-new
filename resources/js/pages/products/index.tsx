/* eslint-disable @typescript-eslint/no-explicit-any */
import { getColumns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

interface Props {
  products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Produk',
    href: '/dashboard/products',
  },
];

export default function ProductPage({ products }: Props) {
  const { destroy } = useDeleteAction('products');

  console.log(products);

  const columns = getColumns<
    Product & {
      category: Category;
    }
  >(
    [
      {
        key: 'image_url',
        label: 'Gambar',
      },
      {
        key: 'name',
        label: 'Nama',
        sortable: true,
      },
      {
        key: 'category',
        label: 'Kategori',
        sortable: true,
      },
      {
        key: 'is_credit',
        label: 'Kredit',
      },
      {
        key: 'created_at',
        label: 'Tanggal dibuat',
        sortable: true,
      },
    ],
    '/dashboard/products',
    destroy,
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />

      <div className="container mx-auto w-full px-4 py-6">
        <Heading title="Produk" description="List data produk" />
        <DataTable columns={columns as ColumnDef<any, any>[]} data={products} name="produk" url="products/create" filter="name" filterTitle="nama" />
      </div>
    </AppLayout>
  );
}
