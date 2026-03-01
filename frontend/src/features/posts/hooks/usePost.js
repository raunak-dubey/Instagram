import { useContext, useCallback } from "react";
import { PostContext } from '../context/post.context';
import { getAllFeedApi, likePost, unlikePost } from '../services/post.api'

const usePost = () => {
    const { feed, setLoading, setFeed, post, loading } = useContext(PostContext);

    const handleGetFeed = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getAllFeedApi();
            setFeed(response.post);
        } finally {
            setLoading(false)
        }
    }, [setLoading, setFeed]);

    const handleLike = useCallback(async (postId) => {
        try {
            await likePost(postId)

            setFeed(prev =>
                prev.map(post =>
                    post._id === postId
                        ? { ...post, isLiked: true }
                        : post
                )
            );
        } catch (error) {
            console.error(error.message);
        }
    }, [setFeed])

    const handleUnlike = useCallback(async (postId) => {
        try {
            await unlikePost(postId)

            setFeed(prev =>
                prev.map(post =>
                    post._id === postId
                        ? { ...post, isLiked: false }
                        : post
                )
            );
        } catch (error) {
            console.error(error.message);
        }
    }, [setFeed])

    return { feed, handleGetFeed, loading, post, handleLike, handleUnlike }
}

export default usePost;