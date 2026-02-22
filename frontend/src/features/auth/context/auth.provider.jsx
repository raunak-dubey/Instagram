import { useState } from "react";
import { AuthContext } from "./auth.context";
import { login, register } from "../services/auth.api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (payload) => {
        setLoading(true);
        try {
            const data = await login(payload);
            setUser(data.user);
            return data;
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
            const data = await register(payload);
            setUser(data.user);
            return data;
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
}