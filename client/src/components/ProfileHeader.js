import React from "react";

function ProfileHeader({
  username,
  isLoggedInUser,
  displayName,
  bio,
  numFollows,
  numFollowing,
}) {
  return (
    <div className="md:w-8/12 mx-3 text-white overflow-hidden md:mt-12">
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
            {/* change this later*/}
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
              >
                FOLLOW
              </button>
            )}
            <div className="md:text-lg text-sm gap-5 sm:gap-10 grid grid-flow-col auto-cols-max">
              <div>0 posts</div>
              <div>{numFollows} followers</div>
              <div>{numFollowing} following</div>
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
