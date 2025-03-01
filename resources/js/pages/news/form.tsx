import CustomForm from '@/components/custom-form';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InputName, News } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  news?: News;
}

type AllowedKeys = Extract<keyof News, 'title' | 'content' | 'image_url' | 'keywords' | 'slug' | 'meta_description'>;

export default function Form({ news }: Props) {
  const form = useAction({
    initialData: news ?? {
      title: '',
      content: '',
      image_url: '',
      keywords: '',
      slug: '',
      meta_description: '',
    },
    routeName: 'news',
    itemId: news?.id,
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
      title: news ? 'Update' : 'Create',
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
      col: 1,
    },
    {
      type: 'text',
      name: 'keywords',
      placeholder: 'ex. finance, bank',
      label: 'Kata kunci',
      required: true,
      col: 1,
      description: 'Isi kolom ini untuk menambahkan kata kunci di berita yang dibuat',
    },
    {
      type: 'textarea',
      name: 'meta_description',
      // placeholder: 'ex. finance, bank',
      label: 'Meta deskripsi',
      required: true,
      col: 1,
    },
    {
      type: 'file',
      name: 'image_url',
      label: 'Gambar',
      required: true,
      description: 'Upload gambar berita (JPG, PNG, GIF)',
      col: 1,
    },
    {
      type: 'rich editor',
      name: 'content',
      placeholder: '',
      label: 'Konten',
      required: true,
      // description: 'Ini merupakan nama kalkulator yang akan ditampilkan pada simulasi pengajuan',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Berita" />
      <div className="container mx-auto px-4 py-6">
        <Heading title="Berita" description="Manage berita kalian" />
        <div className="flex-1">
          <Separator className="mt-5 mb-8" />
          <CustomForm {...form} inputs={inputs} />
        </div>
      </div>
    </AppLayout>
  );
}
