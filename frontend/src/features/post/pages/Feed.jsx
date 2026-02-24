import { useEffect } from 'react';
import usePost from '../hooks/usePost';
import PostCard from '../components/PostCard';
import '../styles/feed.scss';

const Feed = () => {
  const { feed, loading, handleGetAllFeed } = usePost();

  useEffect(() => {
    handleGetAllFeed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="feed">
      <div className="feed__container">
        {loading ? (
          <div className="feed__loader">
            <p>Loading posts...</p>
          </div>
        ) : feed && feed.length > 0 ? (
          feed.map((post) => (
            <PostCard key={post._id} user={post.user} post={post} />
          ))
        ) : (
          <div className="feed__empty">
            <p>No posts yet. Follow users to see their posts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
