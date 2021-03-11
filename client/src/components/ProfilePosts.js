import React, { useState, useEffect } from "react";
import ProfilePostCard from "./ProfilePostCard";
import postService from "../services/postService";

function ProfilePosts(props) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      let res = await postService.getUsersPosts(props.id);
      setposts(res);
    };

    if (!posts) {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderPost = (post, i) => {
    return (
      <ProfilePostCard
        key={i}
        id={post._id}
        image={post.image}
        likes={post.likes}
        points={post.points}
        post={post}
        username={props.userName}
        profileImage={props.profileImage}
      />
    );
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
