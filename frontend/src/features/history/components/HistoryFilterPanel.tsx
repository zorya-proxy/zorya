import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

import type { RequestSource } from "@/types/theme/analyze/request-source.type";
import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";
import type { RiskType } from "@/types/theme/analyze/risk-type.type";
import type { HistoryFiltersState } from "@/interfaces/history/history-filters-state.interface";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { SOURCES } from "@/constants/filter/filter-sources.constant";
import { RISK_LEVELS } from "@/constants/filter/filter-risk-levels.constant";
import { PII_TYPES } from "@/constants/filter/filter-pii-types.constant";
import { FilterField } from "./FilterField";

interface HistoryFilterPanelProps {
  filters?: HistoryFiltersState;
  onSearch: (filters: HistoryFiltersState) => void;
}

export function HistoryFilterPanel({ onSearch, filters = {} }: HistoryFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<HistoryFiltersState>(filters);

  const updateFilter = <K extends keyof HistoryFiltersState>(key: K, value: HistoryFiltersState[K]) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleReset = () => {
    const emptyFilters: HistoryFiltersState = {
      sources: [],
      riskLevels: [],
      piiTypes: [],
      startDate: undefined,
      endDate: undefined,
    };
    setLocalFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  const emptyFilters =
    !localFilters.sources?.length &&
    !localFilters.riskLevels?.length &&
    !localFilters.piiTypes?.length &&
    !localFilters.startDate &&
    !localFilters.endDate;

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-5 rounded-xl border p-5 text-card-foreground transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <FilterField label="Source">
          <MultiSelect
            options={SOURCES}
            selected={localFilters.sources || []}
            onChange={(vals) => updateFilter("sources", vals as RequestSource[])}
            placeholder="Select source"
          />
        </FilterField>

        <FilterField label="Risk Level">
          <MultiSelect
            options={RISK_LEVELS}
            selected={localFilters.riskLevels || []}
            onChange={(vals) => updateFilter("riskLevels", vals as RiskLevel[])}
            placeholder="Select risk level"
          />
        </FilterField>

        <FilterField label="Finding types">
          <MultiSelect
            options={PII_TYPES}
            selected={localFilters.piiTypes || []}
            onChange={(vals) => updateFilter("piiTypes", vals as RiskType[])}
            placeholder="Select finding types"
          />
        </FilterField>

        <FilterField label="Date from">
          <DatePicker
            value={localFilters.startDate}
            onChange={(date) => updateFilter("startDate", date)}
            placeholder="Pick date from"
          />
        </FilterField>

        <FilterField label="Date to">
          <DatePicker
            value={localFilters.endDate}
            onChange={(date) => updateFilter("endDate", date)}
            placeholder="Pick date to"
          />
        </FilterField>
      </div>

      <Separator className="md:hidden" />

      <div className="flex flex-col-reverse md:flex-row justify-end gap-3 border-border/50 select-none">
        {!emptyFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="gap-2 w-full sm:w-auto cursor-pointer"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}

        <Button type="submit" className="gap-2 w-full sm:w-auto cursor-pointer">
          <Search className="size-4" />
          Search
        </Button>
      </div>
    </form>
  );
}
