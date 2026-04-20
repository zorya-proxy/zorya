export interface DateRange {
  dateFrom: Date;
  dateTo: Date;
}

export interface BuildDateRangeQueryParamsInput {
  dateFrom?: Date;
  dateTo?: Date;
}

export interface DateRangeQueryParams {
  startDate?: string;
  endDate?: string;
}
