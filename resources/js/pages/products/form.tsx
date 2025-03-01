import CustomForm from '@/components/custom-form';
import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  product?: Product;
  categories: Category[];
}

type AllowedKeys = Extract<keyof Product, 'name' | 'category_id' | 'image_url' | 'is_credit' | 'calculator_name'>;

interface Input {
  type: 'text' | 'select' | 'textarea' | 'file' | 'toggle';
  name: AllowedKeys;
  placeholder?: string;
  label: string;
  options?: Record<string, string>[];
  description?: string;
  required?: boolean;
  helperText?: string;
}

export default function Form({ product, categories }: Props) {
  const form = useAction({
    initialData: product ?? {
      name: '',
      calculator_name: '',
      image_url: '' as string | File,
      category_id: '',
      is_credit: false,
    },
    routeName: 'products',
    itemId: product?.id,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Produk',
      href: '/dashboard/products',
    },
    {
      title: product ? 'Update' : 'Create',
      href: '',
    },
  ];

  const inputs: Input[] = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Nama produk',
      label: 'Nama',
      description: 'Ini adalah nama produk yang akan ditampilkan',
      required: true,
    },
    {
      type: 'select',
      name: 'category_id',
      label: 'Kategori',
      placeholder: 'Pilih kategori',
      options: categories.map((category) => ({
        name: category.name,
        id: category.id.toString(),
      })),
      required: true,
      description: 'Pilih kategori sesuai dengan produk',
    },
    {
      type: 'text',
      name: 'calculator_name',
      placeholder: 'Nama kalkulator',
      label: 'Nama kalkulator',
      required: true,
      description: 'Ini merupakan nama kalkulator yang akan ditampilkan pada simulasi pengajuan',
    },
    {
      type: 'toggle',
      name: 'is_credit',
      label: 'Kredit',
      helperText: 'Jika kredit, maka produk ini akan dapat dipilih di pengajuan kredit',
    },
    {
      type: 'file',
      name: 'image_url',
      label: 'Gambar Produk',
      required: true,
      description: 'Upload gambar produk (JPG, PNG, GIF)',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />
      <div className="container mx-auto px-4 py-6">
        <Heading title="Produk" description="Manage produk kalian" />
        <div className="flex-1 lg:max-w-2xl">
          <Separator className="mt-5 mb-8" />
          <CustomForm inputs={inputs} {...form} />
        </div>
      </div>
    </AppLayout>
  );
}
