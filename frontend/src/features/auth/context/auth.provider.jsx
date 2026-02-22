import { useState } from "react";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}