import type { DashboardCardTone } from "@/types/dashboard/dashboard-card-tome.type";

export const TONE_CLASSES: Record<DashboardCardTone, string> = {
  neutral: "bg-gradient-to-br from-card via-card to-muted/45",
  attention: "border-amber-500/30 bg-gradient-to-br from-card to-amber-500/8",
  critical: "border-red-500/30 bg-gradient-to-br from-card to-red-500/10",
};
