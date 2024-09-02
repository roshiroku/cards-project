import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const PageUIContext = createContext();

export default function PageUIProvider({ children }) {
  const [error, setError] = useState();
  const [loadingCount, setLoadingCount] = useState(0);

  const isLoading = useMemo(() => loadingCount > 0, [loadingCount]);
  const setIsLoading = useCallback(value => {
    if (value) {
      setLoadingCount(prev => prev + 1);
    } else {
      setLoadingCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  const ctx = useMemo(() => ({
    isLoading,
    setIsLoading,
    setLoadingCount,
    error,
    setError
  }), [isLoading, error]);

  return (
    <PageUIContext.Provider value={ctx}>
      {children}
    </PageUIContext.Provider>
  );
}

export function usePageUI() {
  const ctx = useContext(PageUIContext);
  if (!ctx) throw new Error("usePageUI must be used within a PageUIProvider");
  return ctx;
}

export function useLoadCallback(callback, deps) {
  const { setError, setIsLoading } = usePageUI();

  return useCallback(async (...args) => {
    setIsLoading(true);

    try {
      // todo see whether requires return
      await callback(...args);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }, deps);
}

export function useLoadEffect(effect, deps) {
  const callback = useLoadCallback(effect, deps);

  useEffect(() => {
    callback();
  }, deps);
}
