import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseServiceOptions<G> {
  method?: HttpMethod;
  body?: G;
  headers?: Record<string, string>;
}

interface UseServiceResult<T, G> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (overrideOptions?: UseServiceOptions<G>) => void;
}

export function useService<T, G = unknown>(
  url: string,
  options?: UseServiceOptions<G>
): UseServiceResult<T, G> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const execute = useCallback(
    async (overrideOptions?: UseServiceOptions<G>) => {
      const finalOptions = { ...options, ...overrideOptions };
      const { method = "GET", body, headers } = finalOptions;
      try {
        setLoading(true);
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          credentials: "include",
        });
        if (!response.ok) {
            let message = "Something went wrong";

          try {
            const errorData = await response.json();
            message = errorData.message || message;
          } catch {
            setError(new Error("Request failed. Could not parse error response."));
          }

          throw new Error(message);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Something unknown occurred!"));
        }
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, execute };
}
