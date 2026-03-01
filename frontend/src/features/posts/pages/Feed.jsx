import "../styles/feed.scss";
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { handleGetFeed, loading, feed, handleLike, handleUnlike } = usePost();

  useEffect(() => {
    handleGetFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="feed-layout">
      <header className="navbar">
        <div className="logo">Social Media</div>
        <input className="search" placeholder="Search" />
        <div className="navbar-right">
          <div className="profile-mini">
            <div className="avatar-sm"></div>
            <span>@jakobbsh</span>
          </div>
        </div>
      </header>

      <main className="home-page">
        <aside className="sidebar-left">
          <div className="profile-card">
            <div className="user-info">
              <div className="avatar"></div>
              <p className="handle">@jakobbsh</p>
            </div>

            <div className="stats">
              <div>
                <strong>2.3k</strong>
                <span>Follower</span>
              </div>
              <div>
                <strong>235</strong>
                <span>Following</span>
              </div>
              <div>
                <strong>80</strong>
                <span>Post</span>
              </div>
            </div>
          </div>

          <nav className="menu">
            <ul>
              <li className="active">Feed</li>
              <li>Message</li>
              <li>Explore</li>
              <li>Create</li>
              <li>Saved</li>
              <li>Liked</li>
            </ul>
          </nav>
        </aside>

        <section className="feed-section">
          {loading ? (
            <div className="feed-loader">
              <p>Loading posts...</p>
            </div>
          ) : feed && feed.length > 0 ? (
            feed.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                loading={loading}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            ))
          ) : (
            <div className="feed-empty">
              <p>No posts yet. Follow users to see their posts!</p>
            </div>
          )}
        </section>

        <aside className="sidebar-right">
          <div className="suggestedUser card">
            <h3>Suggested For you</h3>
            {["Roger", "Terry", "Angel", "Emerson", "Zain"].map((m, i) => (
              <div key={i} className="user-item">
                <div className="avatar-xs"></div>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Feed;
