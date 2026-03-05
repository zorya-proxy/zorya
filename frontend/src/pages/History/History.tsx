import { DataTable } from "@/components/DataTable";
import { HistoryFilterPanel } from "@/features/history/components/HistoryFilterPanel";
import { HistoryPreviewDialog } from "@/features/history/components/HistoryPreviewDialog";
import { useHistory } from "@/features/history/hooks/useHistory";
import { getHistoryTableColumns } from "@/features/history/utils/columns";
import type { AnalyzeHistoryItem } from "@/interfaces/history/analyze-history-item.interface";
import type { HistoryFiltersState } from "@/interfaces/history/history-filters-state.interface";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { format } from "date-fns";
import isEqual from "lodash/isEqual";

export default function History() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [previewItem, setPreviewItem] = useState<AnalyzeHistoryItem | null>(null);
  const [filters, setFilters] = useState<HistoryFiltersState>({});

  const sortParam = sorting.length ? `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}` : "timestamp,desc";

  const columns = getHistoryTableColumns({ onPreview: setPreviewItem });

  const buildQueryParams = () => {
    return {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      sort: sortParam,
      sources: filters.sources ? filters.sources.join(",") : undefined,
      riskLevels: filters.riskLevels ? filters.riskLevels.join(",") : undefined,
      piiTypes: filters.piiTypes ? filters.piiTypes.join(",") : undefined,
      startDate: filters.startDate ? `${format(filters.startDate, "yyyy-MM-dd")}T00:00:00Z` : undefined,
      endDate: filters.endDate ? `${format(filters.endDate, "yyyy-MM-dd")}T23:59:59Z` : undefined,
    };
  };

  const { data, isLoading, isFetching, isError, refetch } = useHistory(buildQueryParams());

  const handleSearch = (newFilters: HistoryFiltersState) => {
    // setFilters(newFilters);
    // setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    const isStateSame = isEqual(filters, newFilters) && pagination.pageIndex === 0;

    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));

    if (isStateSame) {
      refetch();
    }
  };

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-2">
        <HistoryFilterPanel filters={filters} onSearch={handleSearch} />
        <DataTable
          columns={columns}
          data={data?.content || []}
          pageCount={data?.page?.totalPages ?? -1}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          onPaginationChange={setPagination}
          isInitialLoading={isLoading}
          isRefetching={isFetching && !isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </div>

      <HistoryPreviewDialog
        item={previewItem}
        open={previewItem !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewItem(null);
        }}
      />
    </main>
  );
}
