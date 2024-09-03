import { Pagination } from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationContext = createContext();

export default function PaginationProvider({ itemCount, perPage = 24, paramName = "page", children }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = useMemo(() => Math.ceil(itemCount / perPage), [itemCount, perPage]);
  const page = useMemo(() => {
    const pageParam = Number(searchParams.get(paramName)) || 1;
    return Math.min(pageParam, pageCount);
  }, [paramName, searchParams, pageCount]);
  const start = useMemo(() => (page - 1) * perPage, [page, perPage]);
  const end = useMemo(() => start + perPage, [start]);

  const paginate = useCallback(page => {
    searchParams.set(paramName, page);
    setSearchParams(searchParams);
  }, [paramName, searchParams]);

  const ctx = useMemo(() => ({ start, end }), [start]);

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
      {
        pageCount > 1 &&
        <Pagination sx={{ my: 2, paddingBottom: 1.5, display: "flex", justifyContent: "center" }}
          count={pageCount}
          page={page}
          onChange={(_, value) => paginate(value)}
          shape="rounded"
          size="large"
        />
      }
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error("usePagination must be used within a PaginationContext");
  return ctx;
}