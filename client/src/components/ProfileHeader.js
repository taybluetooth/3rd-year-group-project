import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/Common";

function ProfileHeader() {
  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    const token = getToken();
    axios.get(`/api/user/${token}`).then((res) => {
      const user = res.data.user;
      console.log(user);
      setUsername(user.username);
      setDisplayName(user.displayName);
      setBio(user.bio);
    });
  }, []);

  return (
    <div className="md:w-8/12 mx-0 mx-3 text-white overflow-hidden">
      <div className="md:w-full container p-3">
        <div className="flex items-center justify-center container divider">
          <div className="md:flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              className="rounded-full w-40"
              src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4"
              alt="profilepic"
            ></img>
          </div>
          <div className="pt-4 ml-10">
            <div className="md:text-2xl text-md pt-5 pb-2">
              <span> {username} </span>
            </div>
            <button
              href="#"
              className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black"
            > EDIT
            </button>
            <div className="md:text-lg text-sm gap-5 sm:gap-10 grid grid-flow-col auto-cols-max">
              <div>0 posts</div>
              <div>0 followers</div>
              <div>0 following</div>
            </div>
            <div className="md:text-lg text-sm pb-8 pt-3">
              <span> {displayName} </span>
              <br />
              <span> {bio} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
