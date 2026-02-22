import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register } from "../services/auth.api";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, loading, setUser, setLoading } = context;

    const handleLogin = async (payload) => {
        setLoading(true);
        try {
            const res = await login(payload);
            setUser(res.user);
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (payload) => {
        setLoading(true);
        try {
            const res = await register(payload);
            setUser(res.user);
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister };
}

export default useAuth;