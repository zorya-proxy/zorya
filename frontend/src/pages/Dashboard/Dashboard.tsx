import { DashboardFilterPanel } from "@/features/dashboard/components/DashboardFilterPanel";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { useState } from "react";
import { buildDateRangeQueryParams, getDateRangeByPreset } from "@/services/date-range.service";
import type { DateRangePreset } from "@/types/date-range/date-range-preset.type";
import type { DateRange } from "@/interfaces/date-range/date-range.interface";

export default function Dashboard() {
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>("currentMonth");

  const selectedDateRange: DateRange = getDateRangeByPreset(selectedPreset);

  const buildQueryParams = () =>
    buildDateRangeQueryParams({
      dateFrom: selectedDateRange.dateFrom,
      dateTo: selectedDateRange.dateTo,
    });

  useDashboardSummary(buildQueryParams());

  return (
    <main className="flex flex-col gap-4">
      <DashboardFilterPanel selectedPreset={selectedPreset} onPresetChange={setSelectedPreset} />
    </main>
  );
}
