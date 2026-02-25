import { Home, History, LayoutDashboard, Play } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "@/interfaces/sidebar/sidebar-item.interface";

const items: SidebarItem[] = [
  {
    title: "Playground",
    url: "/",
    icon: Play,
  },
  {
    title: "Dashboard",
    url: "/home",
    icon: Home,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="z-50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="flex gap-4">
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="">
                  <span className="truncate font-bold text-lg bg-linear-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                    Zorya Proxy
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="text-xs text-muted-foreground text-center opacity-50">v{__APP_VERSION__}</div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
