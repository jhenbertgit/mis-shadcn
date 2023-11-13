import { EventsData } from "@/types";
import { useEffect, useState } from "react";
import { UseFetch } from "@/types";

export const useFetch = ({ url }: UseFetch) => {
  const [data, setData] = useState<EventsData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status ${response.status}`);
        }
        const eventsData: EventsData[] = await response.json();
        setData(eventsData);
        setIsLoaded(true);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, []);

  return { data, error, isLoaded };
};
