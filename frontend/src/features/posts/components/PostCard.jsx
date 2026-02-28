const PostCard = ({ post }) => {
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
        <span>30 Likes</span>
        <span>12 Saves</span>
        <span>5 Shares</span>
      </div>
    </div>
  );
};

export default PostCard;
