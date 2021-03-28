import React, { useState, useEffect } from "react";
import ProfilePostCard from "./ProfilePostCard";
// import PostCard from "./PostCard";
// import postService from "../services/postService";
import axios from "axios";
import { getUser } from "../utils/Common";

function ChannelPosts({ channelUsername, ...props }) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  }, []);

  const getPosts = async () => {
    console.log("hi");
    let res = await axios.get(
      `/api/post/channel/${channelUsername}/${getUser()._id}`
    );
    console.log(res);

    setposts(res.data);
  };

  const renderPost = (post, i) => {
    return (
      <ProfilePostCard
        key={i}
        id={post._id}
        image={post.image}
        likes={post.likes}
        points={post.points}
        post={post}
        username={post.user.username}
        profileImage={post.user.profileImage}
        isLoggedInUser={props.isLoggedInUser}
      />
    );
  };

  return (
    <div className="profile-container">
      <div className="gallery">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => renderPost(post, i))
        ) : (
          <p className="text-white">No posts found</p>
        )}
      </div>
    </div>
  );
}

export default ChannelPosts;
