import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Spinner } from "./ui/spinner";
import { useEffect, useState } from "react";
import { DataTablePagination } from "./DataTablePagination";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  onPaginationChange: (pagination: PaginationState) => void;
  isInitialLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  sorting,
  onSortingChange,
  onPaginationChange,
  isInitialLoading = false,
  isRefetching = false,
  isError = false,
  onRetry,
}: DataTableProps<TData, TValue>) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isRefetching) {
      timeout = setTimeout(() => {
        setShowOverlay(true);
      }, 200);
    } else {
      setShowOverlay(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isRefetching]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        onPaginationChange(updater(pagination));
      } else {
        onPaginationChange(updater);
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        onSortingChange(updater(sorting));
      } else {
        onSortingChange(updater);
      }
      onPaginationChange({ ...pagination, pageIndex: 0 });
    },
  });

  return (
    <div>
      <div className="relative overflow-hidden rounded-md border">
        {showOverlay && !isInitialLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
            <Spinner className="size-8" />
          </div>
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                    <AlertCircle className="size-8 text-destructive" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-foreground">
                        An error occurred while loading data. Please try again later.
                      </span>
                    </div>
                    {onRetry && (
                      <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
                        Try again
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : isInitialLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <Spinner className="size-6" />
                    <span>Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isError && (
        <DataTablePagination
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPageIndexChange={(index) => table.setPageIndex(index)}
          onPageSizeChange={(size) => {
            onPaginationChange({ pageSize: size, pageIndex: 0 });
          }}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
        />
      )}
    </div>
  );
}
