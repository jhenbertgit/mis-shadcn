import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import { EventsData } from "@/types";
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

export const columns: ColumnDef<EventsData>[] = [
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

  {
    accessorKey: "date_of_activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Activity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const opt: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "Asia/Manila",
      };
      const dte: string = row.getValue("date_of_activity");
      const formatted = new Intl.DateTimeFormat("en-US", opt).format(
        new Date(dte)
      );
      return formatted;
    },
  },

  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorFn: (row) => {
      return `${typeof row.brgy === "string" ? row.brgy : ""}, ${
        typeof row.municipality === "string" ? row.municipality : ""
      }, ${typeof row.province === "string" ? row.province : ""}`;
    },
    header: "Location",
  },

  { accessorKey: "bdp_status", header: "BDP Benefeciary Status" },

  {
    accessorKey: "rpsb_deployment_status",
    header: "R-PSB Deployment Status",
    cell: ({ row }) => {
      const rpsbDepStatus = row.getValue("rpsb_deployment_status");
      const formatted =
        rpsbDepStatus && typeof rpsbDepStatus === "string"
          ? rpsbDepStatus
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          : "";
      return formatted;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const events = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(
                  `lat: ${events.latitude} lng: ${events.longitude}`
                )
              }
            >
              Copy latlong
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex-1 space-x-1">
                <Button variant="ghost" size="sm">
                  <PencilLine size={18} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    alert(`id: ${events.id} ${events.details_of_activity}`)
                  }
                >
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
