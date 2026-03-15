import type { DateRangeOption } from "@/interfaces/date-range/date-range-option.interface";

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Current month", value: "currentMonth" },
  { label: "Current week", value: "currentWeek" },
  { label: "Last 2 weeks", value: "last2Weeks" },
  { label: "Last month", value: "lastMonth" },
  { label: "Last 3 months", value: "last3Months" },
  { label: "Last 6 months", value: "last6Months" },
  { label: "Last 12 months", value: "last12Months" },
  { label: "Current year", value: "currentYear" },
];
