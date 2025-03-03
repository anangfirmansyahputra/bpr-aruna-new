import CustomForm from '@/components/custom-form';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InputName, Report } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  report?: Report;
}

type AllowedKeys = Extract<keyof Report, 'title' | 'file'>;

export default function Form({ report }: Props) {
  const form = useAction({
    initialData: report ?? {
      title: '',
      file: '',
    },
    routeName: 'reports',
    itemId: report?.id,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Laporan keuangan',
      href: '/dashboard/reports',
    },
    {
      title: report ? 'Update' : 'Create',
      href: '',
    },
  ];

  const inputs: InputName<AllowedKeys>[] = [
    {
      type: 'text',
      name: 'title',
      placeholder: 'Judul',
      label: 'Judul',
      description: 'Ini adalah judul yang akan ditampilkan',
      required: true,
      col: 2,
    },
    {
      type: 'file',
      name: 'file',
      label: 'Dokumen',
      required: true,
      description: 'Upload gambar berita (JPG, PNG, GIF)',
      col: 2,
      accept: 'application/pdf',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan keuangan" />
      <div className="container mx-auto px-4 py-6">
        <Heading title="Laporan keuangan" description="Manage laporan keuangan kalian" />
        <div className="flex-1">
          <div className="grid grid-cols-2">
            <Separator className="mt-5 mb-8" />
          </div>
          <div className="grid grid-cols-2">
            <CustomForm {...form} inputs={inputs} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
