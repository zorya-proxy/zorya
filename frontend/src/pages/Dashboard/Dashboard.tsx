import { DashboardFilterPanel } from "@/features/dashboard/components/DashboardFilterPanel";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { useState } from "react";
import { buildDateRangeQueryParams, getDateRangeByPreset } from "@/services/date-range.service";
import type { DateRangePreset } from "@/types/date-range/date-range-preset.type";
import type { DateRange } from "@/interfaces/date-range/date-range.interface";
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

export default function Dashboard() {
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>(
    (localStorage.getItem("dashboard-summary-date") as DateRangePreset) ?? "currentMonth",
  );

  const selectedDateRange: DateRange = getDateRangeByPreset(selectedPreset);

  const buildQueryParams = () =>
    buildDateRangeQueryParams({
      dateFrom: selectedDateRange.dateFrom,
      dateTo: selectedDateRange.dateTo,
    });

  const onSelectedPresetChange = (preset: DateRangePreset) => {
    localStorage.setItem("dashboard-summary-date", preset);

    setSelectedPreset(preset);
  };

  const { data, isLoading, isFetching, isError } = useDashboardSummary(buildQueryParams());

  return (
    <main className="flex flex-col gap-4">
      <DashboardFilterPanel selectedPreset={selectedPreset} onPresetChange={onSelectedPresetChange} />
      <DashboardContent data={data} isLoading={isLoading} isFetching={isFetching} isError={isError} />
    </main>
  );
}
