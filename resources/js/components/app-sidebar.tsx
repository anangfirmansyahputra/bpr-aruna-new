import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroupItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartBarStacked, Folder, Home, LayoutGrid, Newspaper, ReceiptPoundSterling, ShoppingCart } from 'lucide-react';
import logo from '../../../public/assets/logo.png';

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    url: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    url: 'https://laravel.com/docs/starter-kits',
    icon: BookOpen,
  },
];

const navMainItems: NavGroupItem[] = [
  {
    group: 'Home',
    icon: Home,
    children: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
      },
    ],
  },
  {
    group: 'Product',
    icon: ShoppingCart,
    children: [
      {
        title: 'Kategori',
        url: '/dashboard/categories',
        icon: ChartBarStacked,
      },
      {
        title: 'Product',
        url: '/dashboard/products',
        icon: ShoppingCart,
      },
    ],
  },
  {
    group: 'News',
    icon: ShoppingCart,
    children: [
      {
        title: 'Berita',
        url: '/dashboard/news',
        icon: Newspaper,
      },
      {
        title: 'Laporan Keuangan',
        url: '/dashboard/reports',
        icon: ReceiptPoundSterling,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <img src={logo} className="mx-auto" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* <NavMain items={mainNavItems} /> */}
        <NavMain items={navMainItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
