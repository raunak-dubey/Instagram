import { useMemo, useState } from "react";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
