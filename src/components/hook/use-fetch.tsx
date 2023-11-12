import { EventsData } from "@/types";
import { useEffect, useState } from "react";

type UseFetch = {
  url: string;
  options?: RequestInit;
};

export const useFetch = ({ url, options }: UseFetch) => {
  const [data, setData] = useState<EventsData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const eventsData: EventsData[] = await response.json();
        if (response.ok) {
          setData(eventsData);
          setIsLoaded(true);
        }
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoaded };
};
