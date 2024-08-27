import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserModel from "../models/UserModel";
import { jwtDecode } from "jwt-decode";
import API from "../services/API";
import UsersAPI from "../services/UsersAPI";

const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(API.storedToken);
  const [user, setUser] = useState();

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    const token = await UsersAPI.login({ email, password });
    setToken(token);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => setToken(null), []);

  const ctx = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    API.storedToken = token;

    if (token) {
      const { _id } = jwtDecode(token);
      UserModel.load(_id).then(user => {
        setUser(user);
        setIsLoading(false);
      });
    } else {
      setUser(null);
      setIsLoading(false);
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