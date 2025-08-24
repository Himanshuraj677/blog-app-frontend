import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseServiceOptions<G> {
  method?: HttpMethod;           // default: GET
  body?: G;                      // request payload
  headers?: Record<string, string>;
  immediate?: boolean;           // run immediately or not
}

interface UseServiceResult<T, G> {
  data: T | null;
  loading: boolean;
  error: string | null;
  call: (overrideOptions?: UseServiceOptions<G>) => Promise<void>;
}

export function useService<T, G = unknown>(
  url: string,
  options?: UseServiceOptions<G>
): UseServiceResult<T, G> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (overrideOptions?: UseServiceOptions<G>) => {
      const finalOptions = { ...options, ...overrideOptions };
      const { method = "GET", body, headers } = finalOptions;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const result: T = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, call };
}
