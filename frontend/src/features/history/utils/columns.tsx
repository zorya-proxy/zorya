import { DataTableSortingColumnHeader } from "@/components/DataTableSortingColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RISK_STYLES } from "@/constants/risk-styles.constant";
import type { AnalyzeHistoryItem } from "@/interfaces/history/analyze-history-item.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const locale = (typeof navigator !== "undefined" && navigator.language) || "en-US";

export const historyTableColumns: ColumnDef<AnalyzeHistoryItem>[] = [
  {
    accessorKey: "analysisId",
    header: "ID",
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableSortingColumnHeader
        title="Timestamp"
        isSorted={column.getIsSorted()}
        onToggleSorting={() => column.toggleSorting()}
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.timestamp);
      return date.toLocaleString(locale);
    },
  },
  {
    accessorKey: "riskLevel",
    header: ({ column }) => (
      <DataTableSortingColumnHeader
        title="Risk Level"
        isSorted={column.getIsSorted()}
        onToggleSorting={() => column.toggleSorting()}
      />
    ),
    cell: ({ row }) => {
      const riskLevel = row.original.riskLevel;
      const riskBg = RISK_STYLES[riskLevel];

      return <Badge className={riskBg}>{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1).toLowerCase()}</Badge>;
    },
  },
  {
    accessorKey: "findingsLabels",
    header: "Findings",
    cell: ({ row }) => {
      const findingsLabels = row.original.findingsLabels;

      return (
        <div className="flex flex-wrap gap-1">
          {findingsLabels.length ? (
            findingsLabels.map((label) => {
              return <Badge key={label}>{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</Badge>;
            })
          ) : (
            <span className="text-sm text-muted-foreground">No findings</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Preview</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
