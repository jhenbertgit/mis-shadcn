import { useEffect, useState } from "react";

interface UseFetchProps<T> {
  fetchFn: () => Promise<T>;
  initData: T;
}

export const useFetch = <T,>({ fetchFn, initData }: UseFetchProps<T>) => {
  const [data, setData] = useState<T>(initData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error as Error);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);
  return { data, error, isLoaded };
};
