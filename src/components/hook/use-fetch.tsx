import { useEffect, useState } from "react";

interface UseFetchProps<T> {
  url: string;
  options?: RequestInit;
}

export const useFetch = <T,>({ url, options }: UseFetchProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status ${response.status}`);
        }
        const responseData: T[] = await response.json();
        setData(responseData);
        setIsLoaded(true);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoaded };
};
