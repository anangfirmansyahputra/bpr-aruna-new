/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface UseActionProps<T extends Record<string, any>> {
  initialData: T;
  routeName: string;
  itemId?: number | string;
}

export function useAction<T extends Record<string, any>>({ initialData, itemId, routeName }: UseActionProps<T>) {
  const { data, setData, post, put, errors, processing } = useForm(initialData);

  const submit = () => {
    if (itemId) {
      put(route(`${routeName}.update`, itemId), {
        preserveScroll: true,
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
    } else {
      post(route(`${routeName}.store`), {
        preserveScroll: true,
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
