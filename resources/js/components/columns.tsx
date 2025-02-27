/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmModal from '@/components/modal/confirm-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Trash } from 'lucide-react';

// Tipe data untuk konfigurasi kolom
type ColumnConfig<T> = {
  key: keyof T; // Key dari objek data
  label: string; // Nama yang ditampilkan di tabel
  sortable?: boolean; // Bisa di-sort atau tidak
};

// Function untuk membuat columns secara fleksibel
export function getColumns<T extends { id: string | number }>(
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
