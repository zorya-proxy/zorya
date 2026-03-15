import { Outlet, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const MainLayout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Playground";
      case "/dashboard":
        return "Dashboard";
      case "/history":
        return "History";
      default:
        return "Page";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center justify-between px-4 border-b bg-background z-49">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="cursor-pointer" />

            <span className="font-medium text-sm">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-4">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        <footer className="border-t py-1 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zorya Proxy. All rights reserved.</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
};
