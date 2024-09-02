import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchContext = createContext();

export default function SearchProvider({ paramName = "search", children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = useMemo(() => searchParams.get(paramName) || "", [searchParams]);

  const setSearchText = useCallback(value => {
    searchParams.set(paramName, value);
    setSearchParams(searchParams);
  }, [searchParams]);

  const ctx = useMemo(() => ({
    searchText,
    setSearchText,
  }), [searchText]);

  return (
    <SearchContext.Provider value={ctx}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchContext");
  return ctx;
}