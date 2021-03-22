import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard.js";
import Loading from "../components/Loading";
import { getUser } from "../utils/Common";

// SERVICES
import postService from "../services/postService";
import userService from "../services/userService";

function Posts() {
  const [posts, setposts] = useState(null);
  const [users, setusers] = useState(null);

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  });

  // Get all posts from backend
  const getPosts = async () => {
    const userID = getUser()._id;
    let res = await postService.getFeed(userID);
    console.log(res);
    setposts(res.post);
  };

  const renderPost = (post) => {
    return (
      <div className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
        <PostCard
          key={post._id}
          _id={post._id}
          // user={getUsername(post).username}
          user={post.user.username}
          location={post.location}
          description={post.description}
          image={post.image}
          likes={post.likes}
          points={post.points}
          post={post}
          // userImg={getUsername(post).profileImage}
          userImg={post.user.profileImage}
        />
    </div>
    );
  };

  return (
    <>
      {posts ? (
        <div className="flex items-center flex-col">
          {posts && posts.length > 0 ? (
            posts.map((post) => renderPost(post))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Posts;
