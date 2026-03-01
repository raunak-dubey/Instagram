import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import usePost from "../hooks/usePost";
import "../styles/createPost.scss";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }

    await handleCreatePost(caption, file);
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        e.target.value = "";
        setSelectedFileName("");
        return;
      }

      setSelectedFileName(file.name);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>creating post</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="post-form-container">
        <h1>Create post</h1>
        <form onSubmit={handleSubmit} className="post-form">
          <label htmlFor="caption">Caption</label>
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
          />
          <label className="post-image-label" htmlFor="postImage">
            {selectedFileName
              ? `Selected: ${selectedFileName}`
              : "Click to Browse your computer"}
          </label>
          <input
            ref={postImageInputFieldRef}
            onChange={handleFileChange}
            hidden
            type="file"
            name="postImage"
            id="postImage"
            accept="image/*"
          />
          <div className="button-container">
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button type="submit" className="btn">
              create post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
