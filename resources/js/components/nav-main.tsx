import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavGroupItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Props {
  items: NavGroupItem[];
}

export function NavMain({ items = [] }: Props) {
  const page = usePage();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <SidebarGroup className="space-y-2 px-2 py-4">
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openGroup === item.group || item.children.some((child) => page.url.includes(child.url));

          return (
            <Collapsible
              open={isOpen}
              key={item.group}
              asChild
              className="group/collapsible"
              onOpenChange={(open) => {
                if (open || item.children.some((child) => page.url.includes(child.url))) {
                  setOpenGroup(item.group);
                } else {
                  setOpenGroup(null);
                }
              }}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span>{item.group}</span>
                    <ChevronRight className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((subItem, i) => (
                      <SidebarMenuSubItem key={i}>
                        <SidebarMenuSubButton asChild isActive={page.url.includes(subItem.url)}>
                          <Link href={subItem.url} onClick={() => setOpenGroup(item.group)}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
