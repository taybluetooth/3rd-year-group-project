import axios from "axios";
import React from "react";
import { getToken } from "../utils/Common";

function ProfileHeader({
  username,
  isLoggedInUser,
  displayName,
  bio,
  numFollows,
  numFollowing,
  isFollowing,
  isChannel,
}) {
  const followOrUnfollow = () => {
    axios
      .post(
        `/api/${isFollowing ? "unfollow" : "follow"}/${
          isChannel ? "channel/" : ""
        }`,
        {
          token: getToken(),
          followingUsername: username,
        }
      )
      .then((res) => {
        console.dir(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Sorry, something went wrong. Please try again");
      });
  };

  return (
    <div className="md:w-8/12 mx-3 text-white overflow-hidden md:mt-6">
      <div className="md:w-full container p-3">
        <div className="md:flex items-center justify-center container divider md:py-4">
          <div className="flex items-center justify-center overflow-hidden">
            <img
              className="rounded-full w-40 md:w-48"
              src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4"
              alt="profilepic"
            ></img>
          </div>
          <div className="pt-4 md:pt-0 md:ml-10">
            <div className="md:text-2xl text-md pt-5 pb-2">
              <span> {username} </span>
            </div>
            {isLoggedInUser === null ? null : isLoggedInUser ? (
              <button
                href="#"
                className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black"
              >
                EDIT
              </button>
            ) : (
              <button
                href="#"
                className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black"
                onClick={() => {
                  followOrUnfollow();
                }}
              >
                {isFollowing ? "UNFOLLOW" : "FOLLOW"}
              </button>
            )}
            <div className="md:text-lg text-sm gap-5 sm:gap-10 grid grid-flow-col auto-cols-max">
              <div>0 posts</div>
              <div>{numFollows} follower(s)</div>
              {numFollowing === null ? null : (
                <div>{numFollowing} following</div>
              )}
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
