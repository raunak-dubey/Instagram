import { useContext } from "react";
import { PostContext } from "../context/post.context";
import { getAllFeed, likePost, unlikePost } from "../services/post.api";

const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }

    const { feed, setFeed, loading, setLoading, post } = context;

    const handleGetAllFeed = async () => {
        setLoading(true);
        try {
            const res = await getAllFeed();
            setFeed(res.post);
        } catch (err) {
            console.error("Error fetching feed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            await likePost(postId);
            // Update the feed to reflect the like
            setFeed(feed.map(p => 
                p._id === postId 
                    ? { ...p, isLiked: true, likes: [...(p.likes || []), { user: "current" }] }
                    : p
            ));
        } catch (err) {
            console.error("Error liking post:", err);
            throw err;
        }
    };

    const handleUnlikePost = async (postId) => {
        try {
            await unlikePost(postId);
            // Update the feed to reflect the unlike
            setFeed(feed.map(p => 
                p._id === postId 
                    ? { ...p, isLiked: false, likes: (p.likes || []).slice(0, -1) }
                    : p
            ));
        } catch (err) {
            console.error("Error unliking post:", err);
            throw err;
        }
    };

    return { feed, loading, handleGetAllFeed, handleLikePost, handleUnlikePost, post };
}

export default usePost;