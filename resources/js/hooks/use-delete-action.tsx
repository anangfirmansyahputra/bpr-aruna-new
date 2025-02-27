/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export function useDeleteAction(route: string) {
  const { delete: destroy } = useForm();

  const handleDelete = (id: string | number) => {
    destroy(`${route}/${id}`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page: { props: any }) => {
        if (page.props.flash?.success) {
          toast.success(page.props.flash.success);
        }
      },
      onError: (page: any) => {
        if (page.props.flash?.error) {
          toast.error(page.props.flash.error);
        }
      },
    });
  };

  return {
    destroy: handleDelete, // Pastikan ini dikembalikan dalam objek
  };
}
