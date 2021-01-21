import React from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import { removeUserSession } from "../utils/Common";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center container mx-auto p-3">
        <ProfileHeader />
      </div>
      <div className="flex justify-center container mx-auto p-3">
        <span className="font-bold"> Posts Here </span>
      </div>
      <button
        onClick={() => {
          removeUserSession();
          window.location.href = "/";
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
