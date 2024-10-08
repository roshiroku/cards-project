import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageUIContext = createContext();

export default function PageUIProvider({ children }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [notification, setNotification] = useState();
  const [popup, setPopup] = useState();
  const [loadingCount, setLoadingCount] = useState(0);

  const location = useLocation();

  const isLoading = useMemo(() => loadingCount > 0, [loadingCount]);

  const setIsLoading = useCallback(value => {
    if (value) {
      setLoadingCount(prev => prev + 1);
    } else {
      setLoadingCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  const alert = useCallback((title, text) => {
    return new Promise(resolve => {
      setPopup({ title: text && title, text: text || title, actions: ["confirm"], resolve });
    });
  }, []);

  const confirm = useCallback((title, text) => {
    return new Promise(resolve => {
      setPopup({ title: text && title, text: text || title, actions: ["cancel", "confirm"], resolve });
    });
  }, []);

  const setNotificationMessage = useCallback((message, severity = "success") => {
    setNotification({ message, severity });
  }, []);

  const ctx = useMemo(() => ({
    isLoading,
    setIsLoading,
    setLoadingCount,
    notification,
    setNotification,
    setNotificationMessage,
    popup,
    confirm,
    alert,
  }), [isLoading, notification, popup]);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      setLoadingCount(0);
    }
  }, [location]);

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

export function useErrorCallback(callback, deps) {
  const { setNotificationMessage } = usePageUI();

  return useCallback(async (...args) => {
    try {
      await callback(...args);
    } catch (e) {
      setNotificationMessage(e.message, "error");
    }
  }, deps);
}

export function useLoadCallback(callback, deps) {
  const { setIsLoading } = usePageUI();
  const errorCallback = useErrorCallback(callback, deps);

  return useCallback(async (...args) => {
    setIsLoading(true);
    await errorCallback(...args);
    setIsLoading(false);
  }, deps);
}

export function useLoadEffect(effect, deps) {
  const callback = useLoadCallback(effect, [effect]);

  useLayoutEffect(() => {
    callback();
  }, deps);
}
