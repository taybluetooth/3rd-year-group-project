import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard.js";
import Loading from "../components/Loading";
import { getUser } from "../utils/Common";

// SERVICES
import postService from "../services/postService";

// NOTIFICATIONS
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function Posts() {
  const [posts, setposts] = useState(null);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  });

  const createNotification = () => {
    if (posts.length === 0) {
      if (notification === false) {
        store.addNotification({
          title: "No Posts Found!",
          message: "Start following some users to see some posts!",
          type: "warning",
          insert: "top",
          container: "center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
        });
        setNotification(true);
      }
    }
  };

  const getPosts = async () => {
    const userID = getUser()._id;
    let res = await postService.getFeed(userID);
    console.log(res);
    setposts(res.post);
  };

  const renderPost = (post) => {
    return (
      <div
        key={post._id}
        className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0"
      >
        <PostCard
          _id={post._id}
          user={post.user.username}
          location={post.location}
          description={post.description}
          image={post.image}
          likes={post.likes}
          points={post.points}
          post={post}
          userImg={post.user.profileImage}
          event={post.event}
          eventID={post.eventID}
        />
      </div>
    );
  };

  return (
    <>
      {posts ? (
        <div className="flex items-center flex-col">
          {posts && posts.length > 0
            ? posts.map((post) => renderPost(post))
            : createNotification()}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Posts;
