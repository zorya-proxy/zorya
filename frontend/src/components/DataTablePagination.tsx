import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

interface DataTablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPageIndexChange,
  onPageSizeChange,
  onPreviousPage,
  onNextPage,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4 select-none">
      <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => onPageIndexChange(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={onPreviousPage} disabled={!canPreviousPage}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={onNextPage} disabled={!canNextPage}>
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => onPageIndexChange(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
