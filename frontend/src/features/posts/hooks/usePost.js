import { useContext, useCallback } from "react";
import { PostContext } from '../context/post.context';
import { createPostApi, getAllFeedApi, likePost, unlikePost } from '../services/post.api'

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

    const handleCreatePost = useCallback(async (caption, imgUrl) => {
        setLoading(true);

        try {
            const response = await createPostApi(caption, imgUrl);
            setFeed([ response.post, ...feed]);
        } finally {
            setLoading(false)
        }
    }, [setFeed, setLoading, feed])

    return { feed, handleGetFeed, loading, post, handleLike, handleUnlike, handleCreatePost }
}

export default usePost;