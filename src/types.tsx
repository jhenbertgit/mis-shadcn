import { Table } from "@tanstack/react-table";

export type Theme = "dark" | "light" | "system";

export type EventsData = {
  id: number;
  unit_reported: string;
  source_of_report: string;
  date_of_report: string;
  date_of_activity: string;
  evaluation: string;
  type_of_activity: string;
  activity: string;
  enemy_unit: string;
  strength: string;
  leader: string;
  position: string;
  sitio: string;
  brgy: string;
  municipality: string;
  province: string;
  details_of_activity: string;
  mgrs: string;
  latitude: string;
  longitude: string;
  bdp_status: string;
  gf_vertical_units: string;
  type: string;
  rpsb_deployment_status: string;
};

export type TableProps<TData> = {
  table: Table<TData>;
};
