import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const SearchContext = createContext();

export default function SearchProvider({ paramName = "search", children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = useMemo(() => searchParams.get(paramName) || "", [searchParams]);
  const location = useLocation();

  const setSearchText = useCallback(value => {
    const prev = searchParams.get(paramName);

    if (value) {
      searchParams.set(paramName, value);
    } else {
      searchParams.delete(paramName);
    }

    setSearchParams(searchParams, { replace: !!(prev && value) });
  }, [location, searchParams]);

  const ctx = useMemo(() => ({
    searchText,
    setSearchText,
    showSearch,
    setShowSearch
  }), [searchText, setSearchText, showSearch]);

  return (
    <SearchContext.Provider value={ctx}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);

  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");

  useLayoutEffect(() => {
    ctx.setShowSearch(true);
    return () => ctx.setShowSearch(false);
  }, []);

  return ctx;
}