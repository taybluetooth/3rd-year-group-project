import React, { useState, useEffect } from "react";
import ProfilePostCard from "./ProfilePostCard";
import PostCard from "./PostCard";
import postService from "../services/postService";

function ProfilePosts(props) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  });

  const getPosts = async () => {
    let res = await postService.getUsersPosts(props.id);
    setposts(res);
  };

  const renderPost = (post, i) => {
    return <ProfilePostCard key={i} image={post.image} />;
  };

  return (
    <div className="profile-container">
      <div className="gallery">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => renderPost(post, i))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePosts;
