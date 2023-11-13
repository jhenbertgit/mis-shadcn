import DataTable from "../DataTable";
import { columns } from "../Columns";
import { useFetch } from "../hook/use-fetch";
import Icons from "../ui/icons";
import { EventsData } from "@/types";

const url = import.meta.env.VITE_URL_EVENTS;

const ThreatGrpEvents = () => {
  const { data, isLoaded, error } = useFetch<EventsData>({ url });
  return (
    <>
      {isLoaded ? (
        <div className="py-10">
          <DataTable columns={columns} data={data} />
        </div>
      ) : error ? (
        <p>
          {error.name}: {error.message}
        </p>
      ) : (
        <Icons.spinner className="h-7 w-7 animate-[spin_2s_linear_infinite] mr-3" />
      )}
    </>
  );
};

export default ThreatGrpEvents;
