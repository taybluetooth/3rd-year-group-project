import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
// SERVICES
import userService from './services/userService';
import postService from './services/postService';
import achievementService from './services/achievementService';

function App() {

  const [users, setusers] = useState(null);
  const [posts, setposts] = useState(null);
  const [achievements, setachievements] = useState(null);

  useEffect(() => {
    if(!users) {
      getUsers();
    }
    if(!posts) {
      getPosts();
    }
    if(!achievements) {
      getAchievements();
    }
  })

  // Getter functions for db data
  const getUsers = async () => {
    let res = await userService.getAll();
    console.log(res);
    setusers(res);
  };

  const getPosts = async () => {
    let res = await postService.getAll();
    console.log(res);
    setposts(res);
  };

  const getAchievements = async () => {
    let res = await achievementService.getAll();
    console.log(res);
    setachievements(res);
  };

  // Rendering functions to refer to later
  const renderUser = user => {
    return (
      <li key={user._id} className="list__item user">
        <h3 className="user__username">{user.username}</h3>
        <p className="user__email">{user.email}</p>
      </li>
    );
  };

  const renderPost = post => {
    return (
      <li key={post._id} className="list__item post">
        <h3 className="post__description">{post.description}</h3>
        <p className="post__location">{post.location}</p>
      </li>
    );
  };

  const renderAchievement = achievement => {
    return (
      <li key={achievement._id} className="list__item achievement">
        <h3 className="achievement__name">{achievement.name}</h3>
        <p className="achievement__points">{achievement.points}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <Navbar />
      <ul className="list">
        {(users && users.length > 0) ? (
          users.map(user => renderUser(user))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      <ul className="list">
        {(posts && posts.length > 0) ? (
          posts.map(post => renderPost(post))
        ) : (
          <p>No posts found</p>
        )}
      </ul>

      <ul className="list">
        {(achievements && achievements.length > 0) ? (
          achievements.map(achievement => renderAchievement(achievement))
        ) : (
          <p>No achievements found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
