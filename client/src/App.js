import React /*,{ useState, useEffect }*/ from "react";
import Button from "./components/Button.js";
import Navbar from "./components/Navbar.js";

/* SERVICES
import userService from './services/userService';
import postService from './services/postService';
*/

function App() {
  /* Async functions for future reference
  const [users, setusers] = useState(null);
  const [posts, setposts] = useState(null);

  useEffect(() => {
    if(!users) {
      getUsers();
    }
    if(!posts) {
      getPosts();
    }
  })

  const getUsers = async () => {
    let res = await userService.getAll();
    console.log(res);
    setusers(res);
  }

  const getPosts = async () => {
    let res = await postService.getAll();
    console.log(res);
    setposts(res);
  }*/

  /* Rendering functions to refer to later
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
  */

  return (
    <div className="App">
      <Navbar />
      <Button />
    </div>
  );
}

export default App;
