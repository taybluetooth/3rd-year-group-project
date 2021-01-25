import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { getToken } from "../utils/Common";

function Profile() {

  const [_id, set_id] = useState(null);
  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    const token = getToken();
    axios.get(`/api/user/${token}`).then((res) => {
      const user = res.data.user;
      set_id(user._id);
      setUsername(user.username);
      setDisplayName(user.displayName);
      setBio(user.bio);
    });
  }, []);


  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="flex justify-center mx-auto">
        <ProfileHeader username={username} displayName={displayName} bio={bio}/>
      </div>
      <div className="profile-container">
        <ProfilePosts id={_id} username={username} />
      </div>
    </div>
  );
}

export default Profile;
