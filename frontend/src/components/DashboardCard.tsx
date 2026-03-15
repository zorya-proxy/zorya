import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDelayedVisibility } from "@/hooks/use-delayed-visibility";
import { cn } from "@/lib/utils";

export type DashboardCardTone = "neutral" | "attention" | "critical";

const toneClasses: Record<DashboardCardTone, string> = {
  neutral: "bg-gradient-to-br from-card via-card to-muted/45",
  attention: "border-amber-500/30 bg-gradient-to-br from-card to-amber-500/8",
  critical: "border-red-500/30 bg-gradient-to-br from-card to-red-500/10",
};

interface DashboardCardProps {
  title: string;
  description?: string;
  badgeText?: string;
  icon?: LucideIcon;
  tone?: DashboardCardTone;
  isRefetching?: boolean;
  refetchSpinnerDelayMs?: number;
  className?: string;
  contentClassName?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

export function DashboardCard({
  title,
  description,
  badgeText,
  icon: Icon,
  tone = "neutral",
  isRefetching = false,
  refetchSpinnerDelayMs = 200,
  className,
  contentClassName,
  footer,
  children,
}: DashboardCardProps) {
  const showRefetchSpinner = useDelayedVisibility(isRefetching, refetchSpinnerDelayMs);

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden border-border/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        toneClasses[tone],
        className,
      )}
    >
      {showRefetchSpinner ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
          <Spinner className="size-8" />
        </div>
      ) : null}

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase text-muted-foreground/90">
              {title}
            </CardDescription>
            {description ? <p className="text-sm leading-5 text-muted-foreground">{description}</p> : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {badgeText ? (
              <Badge variant="outline" className="text-[10px] tracking-[0.08em] uppercase">
                {badgeText}
              </Badge>
            ) : null}

            {Icon ? (
              <span className="grid size-8 place-items-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground">
                <Icon className="size-4" />
              </span>
            ) : null}
          </div>
        </div>
      </CardHeader>

      {children ? <CardContent className={cn("space-y-4 pt-0", contentClassName)}>{children}</CardContent> : null}

      {footer ? <CardFooter className="pt-0 text-xs text-muted-foreground">{footer}</CardFooter> : null}
    </Card>
  );
}
