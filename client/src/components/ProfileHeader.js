import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getToken } from "../utils/Common";

function ProfileHeader() {

  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);


  useEffect(() => {
    const token = getToken();
    axios.get(`/api/user/${token}`)
      .then(res => {
        const user = res.data.user;
        console.log(user);
        setUsername(user.username);
        setDisplayName(user.displayName);
        setBio(user.bio);
    });
  }, []);

  return (
    <div className="text-white overflow-hidden w-full lg:w-6/12 md:w-6/12 mx-3 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <div className="flex container divider">
          <div className="md:w-40 flex items-center justify-center overflow-hidden">
            <img src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4" alt="profilepic"></img>
          </div>
          <div className="pt-4 ml-10 md:text-md sm:text-sm">
            <div className="pt-5 pb-5">
              <span class="md:text-2xl sm:text-xl"> {username} </span>
            </div>
            <div className="grid grid-flow-col auto-cols-max gap-20 text-md">
              <div>0 posts</div>
              <div>0 followers</div>
              <div>0 following</div>
            </div>
            <div className="pb-8 pt-3 md:text-md sm:text-sm">
              <span> {displayName} </span>
              <br />
              <span> {bio} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;
