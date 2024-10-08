import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationContext = createContext();

export default function PaginationProvider({
  itemCount,
  perPage: defaultPerPage = 10,
  param = "page",
  perPageParam = "perPage",
  children
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = useMemo(() => {
    return Number(searchParams.get(perPageParam)) || defaultPerPage;
  }, [perPageParam, searchParams, defaultPerPage]);

  const setPerPage = useCallback(value => {
    searchParams.set(param, 1);
    searchParams.set(perPageParam, value);
    setSearchParams(searchParams);
  }, [param, perPageParam, searchParams]);

  const pageCount = useMemo(() => Math.ceil(itemCount / perPage), [itemCount, perPage]);

  const page = useMemo(() => {
    const pageParam = Number(searchParams.get(param)) || 1;
    return Math.min(pageParam, pageCount);
  }, [param, searchParams, pageCount]);

  const setPage = useCallback(value => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  }, [param, searchParams]);

  const start = useMemo(() => (page - 1) * perPage, [page, perPage]);

  const end = useMemo(() => start + perPage, [start, perPage]);

  const ctx = useMemo(() => ({
    start,
    end,
    page,
    setPage,
    perPage,
    setPerPage,
    pageCount
  }), [start, end, page, setPage, perPage, setPerPage, pageCount]);

  return (
    <PaginationContext.Provider value={ctx}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error("usePagination must be used within a PaginationProvider");
  return ctx;
}
