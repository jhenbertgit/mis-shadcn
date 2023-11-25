import DataTable from "../DataTable";
import { columns } from "../Columns";
// import { useFetch } from "@jhenbertnpm/use-fetch";

import Icons from "../ui/icons";
import { useFetch } from "@/hooks/use-fetch";

const url = import.meta.env.VITE_URL_EVENTS;

const ThreatGrpEvents = () => {
  const { data, isLoaded, error } = useFetch({
    fetchFn: async () => {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    },
    initData: [],
  });

  if (!isLoaded) {
    return (
      <Icons.spinner className="h-7 w-7 animate-[spin_2s_linear_infinite] mr-3" />
    );
  }

  if (error) {
    return (
      <p>
        {error.name}: {error.message}
      </p>
    );
  }

  return (
    <>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ThreatGrpEvents;
