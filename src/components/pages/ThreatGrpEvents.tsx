import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { columns } from "../Columns";
import { EventsData } from "@/types";
import Container from "../ui/Container";

const url = import.meta.env.VITE_URL;

const ThreatGrpEvents = () => {
  const [data, setData] = useState<EventsData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${url}:5000/api/v1/events`);
        const eventsData: EventsData[] = await response.json();
        if (response.ok) {
          setData(eventsData);
        }
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <Container>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  );
};

export default ThreatGrpEvents;
