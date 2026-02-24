import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
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

export const getAllFeed = async (payload) => {
    try {
        const res = await api.get("/posts/feed", payload);
        return res.data;
    } catch (err) {
        handleError(err, "Failed to fetch feed");
    }
};

export const likePost = async (postId) => {
    try {
        const res = await api.post(`/likes/${postId}/`);
        return res.data;
    } catch (err) {
        handleError(err, "Failed to like post");
    }
};

export const unlikePost = async (postId) => {
    try {
        const res = await api.delete(`/likes/${postId}/`);
        return res.data;
    } catch (err) {
        handleError(err, "Failed to unlike post");
    }
};