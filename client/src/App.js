import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
// SERVICES
import userService from './services/userService';
import postService from './services/postService';
import achievementService from './services/achievementService';

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


  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
