import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DATE_RANGE_OPTIONS } from "@/constants/date-range/date-range-options.constant";
import type { DateRangePreset } from "@/types/date-range/date-range-preset.type";

interface DashboardFilterPanelProps {
  selectedPreset: DateRangePreset;
  onPresetChange: (preset: DateRangePreset) => void;
}

export function DashboardFilterPanel({ selectedPreset, onPresetChange }: DashboardFilterPanelProps) {
  const handlePresetChange = (value: DateRangePreset) => {
    onPresetChange(value);
  };

  return (
    <div className="flex justify-end select-none">
      <div className="w-full md:w-72 space-y-2">
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom">
            {DATE_RANGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
