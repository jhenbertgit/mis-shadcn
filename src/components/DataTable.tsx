import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ColumnSelector from "./ColumnSelector";
import ShowSelectedRows from "./ShowSelectedRows";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: TData) => void;
  }
}

const useSkipper = () => {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  }, []);

  return [shouldSkip, skip] as const;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [updatedData, setUpdatedData] = useState<TData[]>(data);

  //make table to be editable
  const defaultColumn: Partial<ColumnDef<TData>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();

      const [value, setValue] = useState<TData>(initialValue as TData);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      useEffect(() => {
        setValue(initialValue as TData);
      }, [initialValue]);

      return (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value as TData)}
          onBlur={onBlur}
        />
      );
    },
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        const newData = updatedData.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        });
        setUpdatedData(newData);

        // const editedRow = newData[rowIndex];
        // try {
        //   const response = await fetch(
        //     `http://192.168.68.239:5000/api/v1/events/${editedRow.id}`,
        //     {
        //       method: "PUT",
        //       mode: "cors",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(editedRow),
        //     }
        //   );
        //   if (response.ok) {
        //     const { message } = await response.json();
        //     console.log(message);
        //   } else {
        //     console.log("Failed to update data");
        //   }
        // } catch (error) {
        //   console.error("Error updating data: ", error);
        // }
      },
    },
  });

  return (
    <>
      <div className="flex items-center space-x-2 py-3">
        <ColumnSelector table={table} />
        <ShowSelectedRows table={table} />
      </div>
      <div className="rounded-md border mt-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className="flex flex-col justify-evenly items-baseline space-y-2 py-1">
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
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
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex item-center justify-end space-x-1 py-4">
        <Pagination table={table} />
      </div>
    </>
  );
};

export default DataTable;
