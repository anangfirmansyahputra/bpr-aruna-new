import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './column';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Props {
    categories: Category[];
}

export default function CategoryPage({ categories }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="container mx-auto w-full px-4 py-6">
                <Heading title="Categories" description="List of the categories" />
                <DataTable columns={columns} data={categories} />
            </div>
        </AppLayout>
    );
}
