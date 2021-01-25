import React, { useState, useEffect } from "react";
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

  const renderPost = (post) => {
    return (
      <PostCard
        key={post._id}
        user={props.username}
        location={post.location}
        description={post.description}
        image={post.image}
        likes="0" //static for now
        points="0" // static for now
      />
    );
  };

  return (
    <div className="container mx-auto p-3 text-black">
      {posts && posts.length > 0
        ? posts.map((post) => renderPost(post))
        : // <p>No posts found</p>
          null}
    </div>
  );
}

export default ProfilePosts;
