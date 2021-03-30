import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Appbar from "../components/Appbar";
import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import userService from "../services/userService";
import Loading from "../components/Loading";

const SuggestedUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!users) {
      getData();
    }
  });

  const getData = async () => {
    let res = await userService.getAll();
    setUsers(res);
  };

  const renderEntry = (user) => {
    return (
      <li
        key={user._id}
        className="flex justify-between border-b border-gray-200"
      >
        <div className="flex items-center challenges-left md:mr-3 mr-6">
          <div className="challenges-user flex items-center">
            <Image
              className="object-cover block"
              cloudName="bluetooth"
              alt="profilepic"
              publicId={user.profileImage}
              secure="true"
            ></Image>
            <div className="text-gray-500 ml-3 truncate w-24 sm:w-full">
              {user.username}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            className="px-3 py-2 mb-2 rounded-md text-md bg-black text-white"
            to={`/profile/${user.username}`}
          >
            View
          </Link>
        </div>
      </li>
    );
  };

  return (
    <div className="h-screen">
      <Appbar />
      <div className="flex justify-center mx-auto sm:p-4">
        <div className="md:w-3/5 mx-3 text-white overflow-hidden md:mt-6">
          <div className="md:w-full container p-3">
            <ul className="bg-white rounded-md text-black challenges-list">
              <div className="text-2xl text-gray-700 pb-1 font-semibold border-b border-gray-200">
                Discover Users
              </div>
              {users ? users.map((user) => renderEntry(user)) : <Loading />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUsers;
