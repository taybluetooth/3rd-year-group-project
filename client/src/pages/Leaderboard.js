import React from "react";
import Appbar from "../components/Appbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

function Leaderboard() {
  return (
    <div className="h-screen">
      <Appbar />
      <div className="flex justify-center mx-auto p-1">
        <div className="md:w-8/12 mx-3 text-white overflow-hidden md:mt-6">
          <div className="md:w-full container p-3">
            <ul className="bg-white challenges-list">
              <div className="text-2xl text-gray-700 pb-1 font-semibold border-b border-gray-200">
                Points Leader
              </div>
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
                    <span className="text-gray-500 ml-3">Jack</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-gray-700 mr-3">1000</span>
                  <span className="text-gray-500">Points</span>
                </div>
              </li>
              <li className="flex justify-between border-b border-gray-200">
                <div className="flex items-center challenges-left">
                  <div className="challenges-user flex items-center">
                    <div className="mr-2 rounded-md text-xl bg-gray-300 p-2 text-white">
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <img
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429809569,3776980323&fm=26&gp=0.jpg"
                      alt=""
                    />
                    <span className="text-gray-500 ml-3">Tom</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-gray-700 mr-3">1000</span>
                  <span className="text-gray-500">Points</span>
                </div>
              </li>
              <li className="flex justify-between border-b border-gray-200">
                <div className="flex items-center challenges-left">
                  <div className="challenges-user flex items-center">
                    <div
                      className="mr-2 rounded-md text-xl p-2 text-white"
                      style={{ backgroundColor: "#907659" }}
                    >
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <img
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429809569,3776980323&fm=26&gp=0.jpg"
                      alt=""
                    />
                    <span className="text-gray-500 ml-3">Lucy</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-gray-700 mr-3">1000</span>
                  <span className="text-gray-500">Points</span>
                </div>
              </li>
              <li className="flex justify-between border-b border-gray-200">
                <div className="flex items-center challenges-left">
                  <div className="challenges-user flex items-center">
                    <div className="mr-2 bg-pink-300 rounded-md text-xl p-2 text-white">
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <img
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429809569,3776980323&fm=26&gp=0.jpg"
                      alt=""
                    />
                    <span className="text-gray-500 ml-3">Lucy</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-gray-700 mr-3">1000</span>
                  <span className="text-gray-500">Points</span>
                </div>
              </li>
              <li className="flex justify-between border-b border-gray-200">
                <div className="flex items-center challenges-left">
                  <div className="challenges-user flex items-center">
                    <div className="mr-2 bg-pink-300 rounded-md text-xl p-2 text-white">
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <img
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429809569,3776980323&fm=26&gp=0.jpg"
                      alt=""
                    />
                    <span className="text-gray-500 ml-3">Lucy</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-gray-700 mr-3">1000</span>
                  <span className="text-gray-500">Points</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
