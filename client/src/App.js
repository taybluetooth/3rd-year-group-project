import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import PostCard from "./components/PostCard.js";

// SERVICES
import postService from './services/postService';

function App() {

  const [posts, setposts] = useState(null);

  useEffect(() => {
    if(!posts) {
      getPosts();
    }
  })

  // Getter functions for db data
  const getPosts = async () => {
    let res = await postService.getAll();
    console.log(res);
    setposts(res);
  };

  const renderPost = post => {
    return (
      <PostCard key={post._id} location={post.location} description={post.description} image={post.image}/>
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
