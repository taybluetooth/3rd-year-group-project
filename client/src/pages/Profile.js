import React from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";

function Profile() {
  return (
    <div className="bg-color-custom-grey w-full h-screen">
      <Navbar />
      <div className="flex justify-center mx-auto p-3">
        <ProfileHeader />
      </div>
      <div className="text-white flex justify-center mx-auto p-3">
        <span> Posts </span>
      </div>
    </div>
  );
}

export default Profile;
