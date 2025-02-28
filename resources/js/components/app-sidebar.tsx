import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroupItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartBarStacked, Folder, Home, LayoutGrid, ShoppingCart } from 'lucide-react';
import AppLogo from './app-logo';

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
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
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
