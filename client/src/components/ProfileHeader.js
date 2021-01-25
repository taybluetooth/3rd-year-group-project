import React from "react";

function ProfileHeader(props) {
  return (
    <div className="md:w-8/12 mx-3 text-white overflow-hidden">
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
              <span> {props.username} </span>
            </div>
            <button
              href="#"
              className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black"
            >
              EDIT
            </button>
            <div className="md:text-lg text-sm gap-5 sm:gap-10 grid grid-flow-col auto-cols-max">
              <div>0 posts</div>
              <div>0 followers</div>
              <div>0 following</div>
            </div>
            <div className="md:text-lg text-sm pb-8 pt-3">
              <span> {props.displayName} </span>
              <br />
              <span> {props.bio} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
