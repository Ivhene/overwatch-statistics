"use client";

import {
  flexRender,
  stockFeatures,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Match } from "@/lib/types";
import { DataTableFilters } from "./data-table-filters";
import { useRouter } from "next/navigation";
import type { StockFeatures } from "@tanstack/table-core";

interface DataTableProps {
  columns: ColumnDef<StockFeatures, Match>[];
  data: Match[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const router = useRouter();

  const table = useTable<StockFeatures, Match>({
    features: stockFeatures,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  function rowClick(event: React.MouseEvent, id: number) {
    // Ensure event.target is a valid HTMLElement and check if it's a button with role="checkbox"
    const target = event.target as HTMLElement;

    if (target && target.closest('button[role="checkbox"]')) {
      return;
    }

    router.push("/mypage/matches/" + id);
  }
  return (
    <div>
      <DataTableFilters table={table} />
      <div className="rounded-md border bg-main_background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-extra_background"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(evt) => rowClick(evt, row.original.matchID)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
