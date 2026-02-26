import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    if (err.request) {
        throw new Error("Network error. Check your connection.");
    }

    throw new Error(fallback);
};

export const loginApi = async (identifier, password) => {
    try {
        const response = await api.post("/login", {
            identifier,
            password,
        });

        return response.data;
    } catch (err) {
        handleError(err, "Login failed. Please try again.");
    }
};

export const registerApi = async (username, email, password, bio, isPrivate) => {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password,
            bio,
            isPrivate
        });

        return response.data;
    } catch (err) {
        handleError(err, "Registration failed. Please try again.");
    }
};