import { TableProps } from "@/types";

const ShowSelectedRows = <TData,>({ table }: TableProps<TData>) => {
  return (
    <div className="text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} rows selected.
    </div>
  );
};

export default ShowSelectedRows;
