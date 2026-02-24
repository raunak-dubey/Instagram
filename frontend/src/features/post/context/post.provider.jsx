import { useState } from "react";
import { PostContext } from "./post.context";

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [feed, setFeed] = useState(null);
    const [post, setPost] = useState(null);

    return (
        <PostContext.Provider value={{ feed, setFeed, post, setPost, loading, setLoading }}>
            {children}
        </PostContext.Provider>
    );
}