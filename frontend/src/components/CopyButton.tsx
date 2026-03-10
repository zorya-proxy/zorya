import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string | null;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleCopy = () => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setIsTooltipOpen(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleCopy} disabled={!textToCopy} size="icon" className="cursor-pointer">
          {copied ? <Check /> : <Copy />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>{copied ? "Copied!" : "Copy result"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
