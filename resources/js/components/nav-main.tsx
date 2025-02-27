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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Props {
  items: NavGroupItem[];
}

export function NavMain({ items = [] }: Props) {
  const page = usePage();
  return (
    <SidebarGroup className="space-y-2 px-2 py-4">
      {/* {items.map((item) => (
        <>
          <SidebarGroupLabel>{item.group}</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible defaultOpen={page.url.includes(item.children[0].url)} key={item.group} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.group}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton isActive={page.url.includes(subItem.url)} asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {/* {item.children.map((child) => (
              <SidebarMenuItem key={child.title}>
                <SidebarMenuButton asChild isActive={child.url === page.url}>
                  <Link href={child.url} prefetch>
                    {child.icon && <child.icon />}
                    <span>{child.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))} */}
      </SidebarMenu>
      {/* </> */}
      {/* ))} */}
    </SidebarGroup>
  );
}
