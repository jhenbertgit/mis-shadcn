import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type Events = {
  unit_reported: string;
  enemy_unit: string;
  date_of_activity: string;
  activity: string;
  location: string;
  bdp_status: string;
  rpsb_deployment_status: string;
};

export const columns: ColumnDef<Events>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "unit_reported",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Source of Information
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "enemy_unit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Threat Group
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "date_of_activity", header: "Date of Activity" },
  { accessorKey: "activity", header: "Activity" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "bdp_status", header: "BDP Benefeciary Status" },
  { accessorKey: "rpsb_deployment_status", header: "R-PSB Deployment Status" },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.location)}
            >
              Copy location
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex-1 space-x-1">
                <Button variant="ghost" size="sm" onClick={() => alert("edit")}>
                  <PencilLine size={18} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => alert("view")}>
                  <Eye size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => alert("delete")}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>View details of activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
