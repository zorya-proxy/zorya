import { DataTable } from "@/components/DataTable";
import { useHistory } from "@/features/history/hooks/useHistory";
import { historyTableColumns } from "@/features/history/utils/columns";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export default function History() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const sortParam = sorting.length ? `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}` : "timestamp,desc";

  const { data, isLoading, isFetching, isError, refetch } = useHistory({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    sort: sortParam,
  });

  return (
    <main className="flex flex-col">
      <DataTable
        columns={historyTableColumns}
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
    </main>
  );
}
