<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import ProfilePostCard from "./ProfilePostCard";
=======
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
>>>>>>> 7cbd5f2f965562136d33d047a03c1c2e4826798d
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

  const renderPost = (post) => {
    return (
      <ProfilePostCard image={post.image} />
    );
  };

  return (
<<<<<<< HEAD
    <div className="profile-container">
  		<div className="gallery flex-row flex-col md:flex-row">
        {posts && posts.length > 0 ? (
          posts.map((post) => renderPost(post))
        ) : (
          <p>No posts found</p>
        )}
      </div>
=======
    <div className="container mx-auto p-3 text-black">
      {posts && posts.length > 0
        ? posts.map((post) => renderPost(post))
        : // <p>No posts found</p>
          null}
>>>>>>> 7cbd5f2f965562136d33d047a03c1c2e4826798d
    </div>
  );
}

export default ProfilePosts;
