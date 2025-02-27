import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroupItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    items: NavGroupItem[];
}

export function NavMain({ items = [] }: Props) {
    const page = usePage();
    return (
        <SidebarGroup className="space-y-2 px-2 py-4">
            {items.map((item) => (
                <>
                    <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
                    <SidebarMenu>
                        {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                                <SidebarMenuButton asChild isActive={child.url === page.url}>
                                    <Link href={child.url} prefetch>
                                        {child.icon && <child.icon />}
                                        <span>{child.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </>
            ))}
        </SidebarGroup>
    );
}
