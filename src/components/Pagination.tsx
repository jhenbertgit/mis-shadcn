import { TableProps } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Pagination = <TData,>({ table }: TableProps<TData>) => {
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <Input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(event) => {
            const page = event.target.value
              ? Number(event.target.value) - 1
              : 0;
            table.setPageIndex(page);
          }}
          className="w-16"
        />
      </span>
      <div className="w-30">
        <Select
          defaultValue={table.getState().pagination.pageSize.toString()}
          onValueChange={(selectedValue) => {
            const pageSize = Number(selectedValue);
            table.setPageSize(pageSize);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Show rows per page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Pagination;
