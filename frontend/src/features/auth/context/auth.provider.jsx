import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth.context";
import { getMeApi } from "../services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getMeApi();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      setUser,
      setLoading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
