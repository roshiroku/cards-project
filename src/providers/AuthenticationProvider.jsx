import { createContext, useCallback, useContext, useMemo, useState } from "react";
import UserModel from "../models/UserModel";
import { jwtDecode } from "jwt-decode";
import API from "../services/API";
import UsersAPI from "../services/UsersAPI";
import { useLoadEffect } from "./PageUIProvider";
import LoginService from "../services/LoginService";

const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(API.storedToken);
  const [banTime, setBanTime] = useState(LoginService.banTime);
  const [user, setUser] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = useCallback(async (email, password) => {
    if (!LoginService.isBanned) {
      try {
        setIsLoggingIn(true);
        const token = await UsersAPI.login({ email, password });
        setToken(token);
        LoginService.onSuccess();
      } catch (e) {
        LoginService.onFail();
        throw e;
      } finally {
        setIsLoggingIn(false);
        setBanTime(LoginService.banTime);
      }
    }
  }, []);

  const logout = useCallback(() => setToken(null), []);

  const ctx = useMemo(() => ({
    user,
    login,
    logout,
    banTime,
    isLoggingIn,
    setIsLoggingIn
  }), [user, banTime, isLoggingIn]);

  useLoadEffect(async () => {
    API.storedToken = token;
    setIsLoggingIn(true);

    try {
      if (token) {
        const { _id } = jwtDecode(token);
        const user = await UserModel.load(_id);
        setUser(user);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoggingIn(false);
    }
  }, [token]);

  return (
    <AuthenticationContext.Provider value={ctx}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const ctx = useContext(AuthenticationContext);
  if (!ctx) throw new Error("useAuthentication must be used within a AuthenticationProvider");
  return ctx;
}