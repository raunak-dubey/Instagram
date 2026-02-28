import { useContext, useCallback } from "react";
import { PostContext } from '../context/post.context';
import { getAllFeedApi } from '../services/post.api'

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

    return { feed, handleGetFeed, loading, post}
}

export default usePost;