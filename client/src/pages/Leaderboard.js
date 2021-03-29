import React, {useEffect, useState} from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import userService from "../services/userService";
import Loading from "../components/Loading";

const Leaderboard = () => {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if(!users) {
      getData();
    }
  });

  const getData = async () => {
    let res = await userService.getAll();
    console.log(res);
    res.sort((a,b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0));
    console.log(res);
    setUsers(res);
  }

  const renderEntry = (user) => {
    return (
      <li className="flex justify-between border-b border-gray-200">
        <div className="flex items-center challenges-left">
          <div className="challenges-user flex items-center">
            <div className="mr-2 rounded-md text-xl bg-yellow-200 p-2 text-white">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429809569,3776980323&fm=26&gp=0.jpg"
              alt=""
            />
          <span className="text-gray-500 ml-3">{user.username}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-2xl text-gray-700 mr-3">{user.points}</span>
          <span className="text-gray-500">Points</span>
        </div>
      </li>
    )
  };

  return (
    <div className="h-screen">
      <Appbar />
      <div className="flex justify-center mx-auto p-1">
        <div className="md:w-8/12 mx-3 text-white overflow-hidden md:mt-6">
          <div className="md:w-full container p-3">
            <ul className="bg-white text-black challenges-list">
              <div className="text-2xl text-gray-700 pb-1 font-semibold border-b border-gray-200">
                Leaderboard
              </div>
              {
                users ? (
                  users.map((user) => renderEntry(user))
                )
                : (
                  <Loading />
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
