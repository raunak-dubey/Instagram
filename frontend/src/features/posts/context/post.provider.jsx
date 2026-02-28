import {useMemo, useState } from 'react';
import { PostContext } from './post.context';

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useState(null)
    const [post, setPost] = useState(null)

    const value = useMemo(
        () => ({
          feed,
          loading,
          post,
          setFeed,
          setLoading,
          setPost
        }),
        [feed, loading, post],
      );

    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    )
}