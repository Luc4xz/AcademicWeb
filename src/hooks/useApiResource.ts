import { useEffect, useState } from "react";

interface ApiResourceState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApiResource<T>(loader: () => Promise<T>): ApiResourceState<T> {
  const [state, setState] = useState<ApiResourceState<T>>({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    let active = true;

    setState((current) => ({ ...current, loading: true, error: null }));

    loader()
      .then((data) => {
        if (active) {
          setState({ data, error: null, loading: false });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          const message = error instanceof Error ? error.message : "Unable to load this section.";
          setState({ data: null, error: message, loading: false });
        }
      });

    return () => {
      active = false;
    };
  }, [loader]);

  return state;
}
