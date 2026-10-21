import { useEffect, useState, type DependencyList } from 'react';

type UseAsyncQueryOptions<T> = {
  enabled?: boolean;
  initialData: T;
};

export function useAsyncQuery<T>(
  query: () => Promise<T>,
  deps: DependencyList,
  options: UseAsyncQueryOptions<T>,
) {
  const { enabled = true, initialData } = options;
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    query()
      .then((response) => {
        if (isMounted) setData(response);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, setData, isLoading, error };
}
