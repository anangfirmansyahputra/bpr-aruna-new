/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmModal from '@/components/modal/confirm-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download, MoreHorizontal, Trash } from 'lucide-react';

type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};

export function getColumns<T extends Record<string, any>>(
  columnsConfig: ColumnConfig<T>[],
  basePath: string, // Path untuk edit
  onDelete: (id: string | number) => void,
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [
    // Checkbox untuk seleksi
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
    },
    // Generate columns berdasarkan konfigurasi
    ...columnsConfig.map(({ key, label, sortable }) => ({
      accessorKey: key,
      header: ({ column }: any) =>
        sortable ? (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          label
        ),
      cell: ({ row }: any) => {
        const value = row.original[key];

        // Jika value adalah objek (relasi), coba tampilkan `name` atau `title`
        if (typeof value === 'object' && value !== null) {
          return value.name || value.title || JSON.stringify(value);
        }

        // Jika value adalah URL gambar, tampilkan preview
        if (typeof value === 'string' && /\.(jpeg|jpg|gif|png|webp)$/i.test(value)) {
          return <img src={value} alt={label} className="h-12 w-12 rounded-md object-cover shadow-sm" />;
        }

        // Jika key adalah 'file', tampilkan tombol download
        if (key === 'file' && typeof value === 'string' && value) {
          return (
            <a href={value} download className="inline-flex items-center gap-2">
              <Button variant="outline" size="sm">
                Download
                <Download className="ml-1 h-4 w-4" />
              </Button>
            </a>
          );
        }

        return value ?? '-';
      },
    })),
    // Actions (Edit & Delete)
    {
      id: 'action',
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`${basePath}/${item.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <ConfirmModal onClick={() => onDelete(item.id)}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                  Delete
                  <Trash className="ml-auto h-4 w-4" />
                </DropdownMenuItem>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
