import { Pagination } from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationContext = createContext();

export default function PaginationProvider({
  itemCount,
  perPage: defaultPerPage = 5,
  paramName = "page",
  children
}) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [perPage, setPerPage] = useState(defaultPerPage);

  const pageCount = useMemo(() => Math.ceil(itemCount / perPage), [itemCount, perPage]);

  const page = useMemo(() => {
    const pageParam = Number(searchParams.get(paramName)) || 1;
    return Math.min(pageParam, pageCount);
  }, [paramName, searchParams, pageCount]);

  const start = useMemo(() => (page - 1) * perPage, [page, perPage]);

  const end = useMemo(() => start + perPage, [start, perPage]);

  const setPage = useCallback(value => {
    searchParams.set(paramName, value);
    setSearchParams(searchParams);
  }, [paramName, searchParams]);

  const ctx = useMemo(() => ({
    start,
    end,
    page,
    setPage,
    perPage,
    setPerPage,
    pageCount
  }), [start, end, page, perPage, pageCount]);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  return (
    <PaginationContext.Provider value={ctx}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error("usePagination must be used within a PaginationContext");
  return ctx;
}