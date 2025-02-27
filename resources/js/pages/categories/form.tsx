import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import ConfirmModal from '@/components/modal/confirm-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAction } from '@/hooks/use-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  category?: Category;
}

export default function Form({ category }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Kategori',
      href: '/categories',
    },
    {
      title: category ? 'Update' : 'Create',
      href: '',
    },
  ];

  const { data, setData, errors, processing, submit } = useAction({
    initialData: {
      name: category ? category.name : '',
    },
    routeName: 'categories',
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kategori" />
      <div className="container mx-auto px-4 py-6">
        <Heading title="Kategori" description="Manage kategori kalian" />

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-sm space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>

            <Input
              disabled={processing}
              id="name"
              className="mt-1 block w-full"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              autoComplete="name"
              placeholder="Nama kategori"
            />

            <InputError className="mt-2" message={errors.name} />
          </div>
          <ConfirmModal onClick={submit}>
            <Button type="button" disabled={processing}>
              {category ? 'Update' : 'Submit'}
            </Button>
          </ConfirmModal>
        </form>
      </div>
    </AppLayout>
  );
}
