import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col transition-colors duration-300">
      <header className="sticky top-0 z-999 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="bg-linear-to-r from-primary to-chart-1 bg-clip-text text-transparent">Zorya Proxy</span>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t py-2 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Zorya Proxy. All rights reserved.</p>
      </footer>
    </div>
  );
};
