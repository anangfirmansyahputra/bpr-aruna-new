/* eslint-disable @typescript-eslint/no-explicit-any */
import { router, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface UseActionProps<T extends Record<string, any>> {
  initialData: T;
  routeName: string;
  itemId?: number | string;
}

export function useAction<T extends Record<string, any>>({ initialData, itemId, routeName }: UseActionProps<T>) {
  const { data, setData, errors, processing, post } = useForm(initialData);

  const submit = () => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]); // Jika file, tambahkan ke FormData
      } else {
        formData.append(key, data[key] as string); // Jika bukan file, tambahkan sebagai string
      }
    });

    if (itemId) {
      formData.append('_method', 'PUT');

      router.visit(route(`${routeName}.update`, itemId), {
        method: 'post', // HARUS 'POST', karena 'PUT' tidak mendukung FormData
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        preserveScroll: true,
        onSuccess: (page: { props: any }) => {
          const flash = page.props?.flash;
          if (flash?.success) {
            toast.success(flash.success);
          }
        },
        onError: (page: any) => {
          const flash = page.props?.flash;
          if (flash?.error) {
            toast.error(flash.error);
          }
        },
      });
    } else {
      post(route(`${routeName}.store`), {
        preserveScroll: true,
        onSuccess: (page: { props: any }) => {
          const flash = page.props?.flash;
          if (flash?.success) {
            toast.success(flash.success);
          }
        },
        onError: (page: any) => {
          const flash = page.props?.flash;
          if (flash?.error) {
            toast.error(flash.error);
          }
        },
      });
    }
  };

  return {
    data,
    setData,
    errors,
    processing,
    submit,
  };
}
