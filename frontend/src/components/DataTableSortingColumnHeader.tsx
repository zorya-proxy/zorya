import { Button } from "@/components/ui/button";
import type { SortDirection } from "@tanstack/react-table";
import { ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableColumnSortingHeaderProps {
  title: string;
  isSorted: false | SortDirection;
  onToggleSorting: () => void;
}

export function DataTableSortingColumnHeader({ title, isSorted, onToggleSorting }: DataTableColumnSortingHeaderProps) {
  return (
    <Button variant="ghost" onClick={onToggleSorting}>
      {title}
      {isSorted ? (
        isSorted === "asc" ? (
          <ArrowUp className="ml-2 size-4" />
        ) : (
          <ArrowUp className="ml-2 size-4 rotate-180" />
        )
      ) : (
        <ArrowUpDown className="ml-2 size-4" />
      )}
    </Button>
  );
}
