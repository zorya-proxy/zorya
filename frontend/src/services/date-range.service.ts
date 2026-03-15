import { endOfDay, format, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths } from "date-fns";
import type {
  BuildDateRangeQueryParamsInput,
  DateRange,
  DateRangeQueryParams,
} from "@/interfaces/date-range/date-range.interface";
import type { DateRangePreset } from "@/types/date-range/date-range-preset.type";

const dayRange = (date: Date): DateRange => ({
  dateFrom: startOfDay(date),
  dateTo: endOfDay(date),
});

export const getDateRangeByPreset = (preset: DateRangePreset, referenceDate = new Date()): DateRange => {
  const now = new Date(referenceDate);

  switch (preset) {
    case "today":
      return dayRange(now);

    case "yesterday": {
      const yesterday = subDays(now, 1);
      return dayRange(yesterday);
    }

    case "currentMonth":
      return {
        dateFrom: startOfMonth(now),
        dateTo: endOfDay(now),
      };

    case "currentWeek":
      return {
        dateFrom: startOfWeek(now, { weekStartsOn: 1 }),
        dateTo: endOfDay(now),
      };

    case "last2Weeks":
      return {
        dateFrom: startOfDay(subDays(now, 13)),
        dateTo: endOfDay(now),
      };

    case "lastMonth":
      return {
        dateFrom: startOfDay(subMonths(now, 1)),
        dateTo: endOfDay(now),
      };

    case "last3Months":
      return {
        dateFrom: startOfDay(subMonths(now, 3)),
        dateTo: endOfDay(now),
      };

    case "last6Months":
      return {
        dateFrom: startOfDay(subMonths(now, 6)),
        dateTo: endOfDay(now),
      };

    case "last12Months":
      return {
        dateFrom: startOfDay(subMonths(now, 12)),
        dateTo: endOfDay(now),
      };

    case "currentYear":
      return {
        dateFrom: startOfYear(now),
        dateTo: endOfDay(now),
      };

    default: {
      throw new Error(`Unsupported date range preset: ${preset}`);
    }
  }
};

export const buildDateRangeQueryParams = ({
  dateFrom,
  dateTo,
}: BuildDateRangeQueryParamsInput = {}): DateRangeQueryParams => {
  return {
    startDate: dateFrom ? `${format(dateFrom, "yyyy-MM-dd")}T00:00:00Z` : undefined,
    endDate: dateTo ? `${format(dateTo, "yyyy-MM-dd")}T23:59:59Z` : undefined,
  };
};
