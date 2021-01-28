import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";
import Appbar from "../components/Appbar";
import Loading from "../components/Loading";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/Common";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);
  const [profileUserError, setProfileUserError] = useState(null);

  // is null initially and if the user is not logged in
  // is true when the user is looking at own their own profile
  // is false when the user is not looking at their own profile
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);

  const [isFollowing, setIsFollowing] = useState(null); // true if the user is following the profile they are looking at

  let { username: userName } = useParams();
  const token = getToken();

  useEffect(() => {
    axios
      .get(`/api/user/username/${userName}`)
      .then((res) => {
        const user = res.data.user;
        // set_id(user._id);
        // setUsername(user.username);
        // setDisplayName(user.displayName);
        // setBio(user.bio);
        setProfileUser(user);
        setProfileUserError(false);
      })
      .catch((error) => {
        setProfileUserError(true);
        setProfileUser(null);
        console.error(error);
        alert("Sorry, something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (profileUser !== null && token !== null) {
      axios
        .get(`/api/follow/${token}/${profileUser.username}`)
        .then((res) => {
          console.dir(res);
          setIsFollowing(res.data.isFollowing);
        })
        .catch((error) => console.error(error));
    }
    // console.log({ token, profileUser });
  }, [profileUser]);

  useEffect(() => {
    if (profileUser !== null)
      setIsLoggedInUser(
        getUser() === null ? null : getUser()._id === profileUser._id
      );
  }, [profileUser]);

  return loading ? (
    <Loading />
  ) : profileUserError === true ? (
    <Redirect to="/" />
  ) : (
    <div className="h-screen">
      <div>
        <div className="flex justify-center mx-auto p-1">
          {profileUser ? (
            <ProfileHeader
              username={profileUser.username}
              displayName={profileUser.displayName}
              bio={profileUser.bio}
              isLoggedInUser={isLoggedInUser}
              numFollows={profileUser.numFollows}
              numFollowing={profileUser.numFollowing}
              isFollowing={isFollowing}
            />
          ) : null}
        </div>
        <div className="justify-center mx-auto p-1">
          {profileUser ? <ProfilePosts id={profileUser._id} /> : null}
        </div>
      </div>
      <Appbar />
    </div>
  );
}

export default Profile;
