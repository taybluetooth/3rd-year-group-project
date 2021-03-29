import React, { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import userService from "../services/userService";
import Loading from "../components/Loading";

const Leaderboard = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!users) {
      getData();
    }
  });

  const getData = async () => {
    let res = await userService.getAll();
    res.sort((a, b) =>
      a.points < b.points ? 1 : b.points < a.points ? -1 : 0
    );
    setUsers(res.slice(0, 5));
  };

  const renderEntry = (user) => {
    return (
      <li
        key={user._id}
        className="flex justify-between border-b border-gray-200"
      >
        <div className="flex items-center challenges-left md:mr-3 mr-6">
          <div className="challenges-user flex items-center">
            <div className="hidden sm:block mr-2 rounded-md md:text-xl text-sm trophyBg p-2 text-white">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <Image
              className="object-cover hidden rounded-full sm:block"
              cloudName="bluetooth"
              alt="profilepic"
              publicId={user.profileImage}
              secure="true"
            ></Image>
            <div className="text-gray-500 ml-3 truncate w-24 sm:w-32">
              {user.username}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-2xl text-gray-700 mr-3">{user.points}</span>
          <span className="text-gray-500">Points</span>
        </div>
      </li>
    );
  };

  return (
    <div className="h-screen">
      <Appbar />
      <div className="flex justify-center mx-auto p-4">
        <div className="mx-3 text-white overflow-hidden md:mt-6">
          <div className="md:w-full container p-3">
            <ul className="bg-white rounded-md text-black challenges-list">
              <div className="text-2xl text-gray-700 pb-1 font-semibold border-b border-gray-200">
                Top 5 Users
              </div>
              {users ? users.map((user) => renderEntry(user)) : <Loading />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
