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

export const register = async (payload) => {
    try {
        const res = await api.post("/register", payload);
        return res.data;
    } catch (err) {
        handleError(err, "Registration failed");
    }
};

export const login = async (payload) => {
    try {
        const res = await api.post("/login", payload);
        return res.data;
    } catch (err) {
        handleError(err, "Login failed");
    }
};

export const getMe = async () => {
    try {
        const res = await api.get("/get-me");
        return res.data;
    } catch (err) {
        handleError(err, "Session restore failed");
    }
};