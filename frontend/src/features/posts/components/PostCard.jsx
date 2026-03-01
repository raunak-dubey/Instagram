const PostCard = ({ post, handleLike, handleUnlike }) => {
  return (
    <div className="post-card card">
      <div className="post-header">
        <div className="avatar">
          <img src={post.user?.avatar} alt={post.user?.username} />
        </div>
        <div>
          <h4>{post.user?.username}</h4>
        </div>
      </div>

      <div className="post-image">
        <img src={post.imgUrl} alt="Post" />
      </div>

      {post.caption && (
        <p className="post-caption">
          <span className="post-username">{post.user?.username}</span>{" "}
          {post.caption}
        </p>
      )}

      <div className="post-actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={ () => post.isLiked ? handleUnlike(post._id) : handleLike(post._id) }
          className={
            post.isLiked
              ? "like lucide lucide-heart-icon lucide-heart"
              : "lucide lucide-heart-icon lucide-heart"
          }
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send-icon lucide-send"
        >
          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
          <path d="m21.854 2.147-10.94 10.939" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bookmark-icon lucide-bookmark"
        >
          <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
        </svg>
      </div>
    </div>
  );
};

export default PostCard;
