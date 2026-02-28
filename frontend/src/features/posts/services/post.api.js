import axios from 'axios'

const postsApi = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true
})

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    if (err.request) {
        throw new Error("Network error. Check your connection.");
    }

    throw new Error(fallback);
};

export const getAllFeedApi = async (payload) => {
    try {
        const response = await postsApi.get('/posts/feed', payload)
        return response.data;
    } catch (error) {
        handleError(error, 'Failed to fetch feed. Please try again.')
    }
}