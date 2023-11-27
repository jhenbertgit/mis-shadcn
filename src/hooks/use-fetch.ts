import { useCallback, useEffect, useState } from "react";

interface UseFetch<T> {
  fetchFn: () => Promise<T>;
  initData: T;
}

export const useFetch = <T>({ fetchFn, initData }: UseFetch<T>) => {
  const [data, setData] = useState<T>(initData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchFn();
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoaded(true);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoaded };
};
