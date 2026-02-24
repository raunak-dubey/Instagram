import { useState } from 'react';
import usePost from '../hooks/usePost';
import '../styles/post-card.scss';

const PostCard = ({ post }) => {
  const { handleLikePost, handleUnlikePost } = usePost();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      if (isLiked) {
        await handleUnlikePost(post._id);
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        await handleLikePost(post._id);
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      console.error("Error updating like:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="post-card">
      {/* Post Header with Avatar and Username */}
      <div className="post-card__header">
        <img 
          src={post.user?.avatar}
          alt={post.user?.username}
          className="post-card__avatar"
        />
        <h3 className="post-card__username">{post.user?.username}</h3>
      </div>

      {/* Post Image */}
      <div className="post-card__image-wrapper">
        <img src={post.imgUrl} alt="Post" className="post-card__image" />
      </div>

      {/* Post Actions */}
      <div className="post-card__actions">
        <button
          className={`post-card__action post-card__like ${isLiked ? 'post-card__like--active' : ''}`}
          onClick={handleLike}
          disabled={isLoading}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button className="post-card__action post-card__comment" title="Comment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <button className="post-card__action post-card__save" title="Save">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          </svg>
        </button>
      </div>

      {/* Like Count and Caption */}
      <div className="post-card__content">
        <p className="post-card__likes">
          <span className="post-card__likes-count">{likeCount}</span> likes
        </p>
        {post.caption && (
          <p className="post-card__caption">
            <span className="post-card__caption-author">{post.user?.username}</span> {post.caption}
          </p>
        )}
      </div>
    </article>
  );
};

export default PostCard;
