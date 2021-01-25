import React, {useState, useEffect} from "react";
import ProfilePostCard from "./ProfilePostCard";
import postService from "../services/postService";

function ProfilePosts(props) {

  const [posts, setposts] = useState(null);

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  });

  const getPosts = async () => {
    let res = await postService.getUsersPosts(props.id);
    setposts(res);
  };

  const renderPost = (post) => {
    return (
      <ProfilePostCard image={post.image} />
    );
  };

  return (
    <div className="profile-container">
  		<div className="gallery flex-row flex-col md:flex-row">
        {posts && posts.length > 0 ? (
          posts.map((post) => renderPost(post))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePosts;
