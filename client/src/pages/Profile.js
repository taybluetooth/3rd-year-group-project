import React from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from '../components/ProfileHeader'

function Profile() {

  return (
    <div>
      <Navbar />
      <div class="flex justify-center container mx-auto p-3">
        <ProfileHeader />
      </div>
      <div class="flex justify-center container mx-auto p-3">
        <span class="font-bold"> Posts Here </span>
      </div>
    </div>
  )

}

export default Profile;
