import { useCallback, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router";
import { loginApi, registerApi } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, setLoading, loading, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = useCallback(async ({ identifier, password }) => {
    setLoading(true);

    try {
      const response = await loginApi(identifier, password);
      setUser(response.user);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, navigate]);

  const handleRegister = useCallback(async ({ username, email, password, bio, isPrivate }) => {
    setLoading(true);

    try {
      const response = await registerApi(
        username,
        email,
        password,
        bio,
        isPrivate
      );

      setUser(response.user);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, navigate]);

  return { user, handleLogin, handleRegister, loading, isAuthenticated };
}