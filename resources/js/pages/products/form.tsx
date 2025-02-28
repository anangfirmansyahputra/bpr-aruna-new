import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import ConfirmModal from '@/components/modal/confirm-modal';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
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
  const { data, setData, errors, processing, submit } = useAction({
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
          <form className="space-y-8">
            {inputs.map((input) => (
              <div className="grid gap-2" key={input.name}>
                {input.type !== 'toggle' && <Label htmlFor={input.name}>{input.label}</Label>}

                {input.type === 'text' ? (
                  <Input
                    disabled={processing}
                    id={input.name}
                    name={input.name}
                    className="mt-1 block w-full"
                    value={data[input.name] as string | number}
                    onChange={(e) => setData(input.name, e.target.value)}
                    required={input.required ?? false}
                    // autoComplete="name"
                    placeholder={input.placeholder}
                  />
                ) : input.type === 'select' ? (
                  <Select value={(data[input.name] as number).toString()} onValueChange={(value) => setData(input.name, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={input.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {input.options?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : input.type === 'file' ? (
                  <FileUpload
                    onChange={(e) => setData(input.name, e ?? '')}
                    value={data[input.name] as string | File}
                    disabled={processing}
                    className="mt-1"
                  />
                ) : input.type === 'toggle' ? (
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>{input.label}</Label>
                      {input.helperText && <p className="text-muted-foreground text-[0.8rem]">{input.helperText}</p>}
                    </div>
                    <Switch checked={data[input.name] as boolean} onCheckedChange={(value) => setData(input.name, value)} aria-readonly />
                  </div>
                ) : null}

                {input.description && <p className="text-muted-foreground text-[0.8rem]">{input.description}</p>}

                <InputError className="mt-2" message={errors.name} />
              </div>
            ))}

            <ConfirmModal onClick={submit}>
              <Button>Submit</Button>
            </ConfirmModal>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
