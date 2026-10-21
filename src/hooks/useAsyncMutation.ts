import { useState } from 'react';

export function useAsyncMutation<TPayload, TResponse>(
  mutation: (payload: TPayload) => Promise<TResponse>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = async (payload: TPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      return await mutation(payload);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
