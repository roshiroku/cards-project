import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const SortContext = createContext();

export default function SortProvider({
  param = "sortBy",
  dirParam = "sortDir",
  sortBy: defaultSortBy,
  sortDir: defaultSortDir = "asc",
  children
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = useMemo(() => {
    return searchParams.get(param) || defaultSortBy;
  }, [param, searchParams, defaultSortBy]);

  const setSortBy = useCallback(value => {
    searchParams.set(param, value);
    searchParams.set(dirParam, "asc");
    setSearchParams(searchParams);
  }, [param, dirParam, searchParams]);

  const sortDir = useMemo(() => {
    return searchParams.get(dirParam) || defaultSortDir;
  }, [dirParam, searchParams, defaultSortDir]);

  const setSortDir = useCallback(value => {
    searchParams.set(dirParam, value);
    setSearchParams(searchParams);
  }, [dirParam, searchParams]);

  const ctx = useMemo(() => ({
    sortBy,
    setSortBy,
    sortDir,
    setSortDir
  }), [sortBy, setSortBy, sortDir, setSortDir]);

  return (
    <SortContext.Provider value={ctx}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error("useSort must be used within a SortProvider")
  return ctx;
}
