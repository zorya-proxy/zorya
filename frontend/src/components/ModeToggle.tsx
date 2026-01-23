import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useAppContext } from "../context/AppContext";

export function ModeToggle() {
  const { mode, toggleMode } = useAppContext();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={toggleMode} className="cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{mode === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny"}</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{mode === "dark" ? "Tryb jasny" : "Tryb ciemny"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
