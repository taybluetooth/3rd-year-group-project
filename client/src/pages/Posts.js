import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard.js";
import Loading from "../components/Loading";

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
    if (!users) {
      getUsers();
    }
  });

  // Get all posts from backend
  const getPosts = async () => {
    let res = await postService.getAll();
    console.log(res);
    setposts(res);
  };
  // Get all users from backend
  const getUsers = async () => {
    let res = await userService.getAll();
    console.log(res);
    setusers(res);
  };
  // Get username from post.user foreign key
  const getUsername = (post) => {
    var user;
    if (users && users.length > 0) {
      for (let postuser of users) {
        if (postuser._id === post.userID) {
          user = postuser;
        }
      }
    }

    return user;
  };

  const renderPost = (post) => {
    return (
      <PostCard
        key={post._id}
        _id={post._id}
        user={getUsername(post).username}
        location={post.location}
        description={post.description}
        image={post.image}
        likes={post.likes}
        points={post.points}
        post={post}
        userImg={getUsername(post).profileImage}
      />
    );
  };

  return (
    <>
      {users && posts ? (
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
