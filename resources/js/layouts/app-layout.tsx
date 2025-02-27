import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      <Toaster />
      {children}
    </AppLayoutTemplate>
  );
};
