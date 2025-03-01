import CustomForm from '@/components/custom-form';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, InputName } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  category?: Category;
}

type AllowedKeys = Extract<keyof Category, 'name'>;

export default function Form({ category }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Kategori',
      href: '/dashboard/categories',
    },
    {
      title: category ? 'Update' : 'Create',
      href: '',
    },
  ];

  const form = useAction({
    initialData: {
      name: category ? category.name : '',
    },
    routeName: 'categories',
    itemId: category?.id,
  });

  const inputs: InputName<AllowedKeys>[] = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Judul',
      label: 'Judul',
      description: 'Ini adalah judul yang akan ditampilkan',
      required: true,
      col: 1,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kategori" />
      <div className="container mx-auto px-4 py-6">
        <Heading title="Kategori" description="Manage kategori kalian" />
        <div className="flex-1">
          <Separator className="mt-5 mb-8" />
          <CustomForm {...form} inputs={inputs} />
        </div>
      </div>
    </AppLayout>
  );
}
