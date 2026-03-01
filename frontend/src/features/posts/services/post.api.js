import axios from 'axios'

const postsApi = axios.create({
    baseURL: "http://localhost:3000/api/posts",
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

// ? ===================== Get All Feed =================== //
export const getAllFeedApi = async (payload) => {
    try {
        const response = await postsApi.get('/feed', payload)
        return response.data;
    } catch (error) {
        handleError(error, 'Failed to fetch feed. Please try again.')
    }
}

// ? ===================== Like Posts Api =================== //
export const likePost = async (postId) => {
    try {
        const response = await postsApi.post('/like/' + postId)
        return response.data;
    } catch (error) {
        handleError(error, 'Failed to like the post. Please try again')
    }
}

// ? ===================== Unlike posts Api =================== //
export const unlikePost = async (postId) => {
    try {
        const response = await postsApi.delete('/unlike/' + postId)
        return response.data;
    } catch (error) {
        handleError(error, 'Failed to unlike the post. Please try again')
    }
}

// ? ===================== Create Posts =================== //
export const createPostApi = async (caption, imgUrl) => {
    try {
        const formData = new FormData()

        formData.append('caption', caption)
        formData.append('image', imgUrl)

        const response = await postsApi.post('/', formData)
        return response.data;
    } catch (error) {
        handleError(error, 'Failed to create the post. Please try again')
    }
}