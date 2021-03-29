import React, { useState, useEffect } from "react";
import ProfilePostCard from "./ProfilePostCard";
import postService from "../services/postService";
import { getUser } from "../utils/Common";

function ProfilePosts(props) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      let res = await postService.getProfileUsersPosts(props.id, getUser()._id);
      setposts(res);
    };

    if (!posts) {
      getPosts();
    }
  }, []);

  const renderPost = (post, i) => {
    console.log(post);
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
        isLoggedInUser={props.isLoggedInUser}
        event={post.event}
        eventID={post.eventID}
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

export default ProfilePosts;
