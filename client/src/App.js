import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import PostCard from "./components/PostCard.js";

// SERVICES
import postService from './services/postService';
import userService from './services/userService';

function App() {

  const [posts, setposts] = useState(null);
  const [users, setusers] = useState(null);

  useEffect(() => {
    if(!posts) {
      getPosts();
    }
    if(!users) {
      getUsers();
    }
  })

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
  const getUsername = post => {
    var username = "";
    if(users && users.length > 0) {
      for(let user of users) {
        if(user._id === post.user) {
          username = user.username;
        };
      };
    };

    return username;
  }

  const renderPost = post => {
    return (
      <PostCard key={post._id} user={getUsername(post)} location={post.location} description={post.description} image={post.image}/>
    );
  };


  return (
    <div className="App">
      <Navbar />
      <ul className="list">
        {(posts && posts.length > 0) ? (
          posts.map(post => renderPost(post))
        ) : (
          <p>No posts found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
