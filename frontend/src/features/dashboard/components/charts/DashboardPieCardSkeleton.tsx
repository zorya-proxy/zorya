import { Skeleton } from "@/components/ui/skeleton";

export function DashboardPieCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="mx-auto h-55 w-full max-w-80 rounded-xl" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
