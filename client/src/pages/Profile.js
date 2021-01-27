import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";
import Appbar from "../components/Appbar";
import Loading from "../components/Loading";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/Common";

function Profile() {
  const [_id, set_id] = useState(null);
  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { username: userName } = useParams();

  useEffect(() => {
    const token = getToken();
    axios
      .get(`/api/user/username/${userName}`)
      .then((res) => {
        const user = res.data.user;
        set_id(user._id);
        setUsername(user.username);
        setDisplayName(user.displayName);
        setBio(user.bio);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        alert("Sorry, something went wrong, please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading />
  ) : error === true ? (
    <Redirect to="/feed" />
  ) : (
    <div className="h-screen">
      <div>
        <div className="flex justify-center mx-auto p-1">
          {username ? (
            <ProfileHeader
              username={username}
              displayName={displayName}
              bio={bio}
              isLoggedInUser={getUser()._id === _id}
            />
          ) : null}
        </div>
        <div className="justify-center mx-auto p-1">
          {_id && username ? (
            <ProfilePosts id={_id} username={username} />
          ) : null}
        </div>
      </div>
      <Appbar />
    </div>
  );
}

export default Profile;
