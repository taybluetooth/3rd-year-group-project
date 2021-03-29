import React from "react";
import { Link } from "react-router-dom";
import "../bodystyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faBars,
  faUser,
  faSignOutAlt,
  faPlus,
  faTv,
  faCalendar,
  faMapMarkerAlt,
  faTrophy,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { removeUserSession, getUser } from "../utils/Common";
import Dropdown from "./Dropdown";
import { Image } from "cloudinary-react";

const home = <FontAwesomeIcon icon={faHome} />;
const user = <FontAwesomeIcon icon={faUser} />;
const plus = <FontAwesomeIcon icon={faPlus} />;
const channel = <FontAwesomeIcon icon={faTv} />;
const logout = <FontAwesomeIcon icon={faSignOutAlt} />;
const events = <FontAwesomeIcon icon={faCalendar} />;
const map = <FontAwesomeIcon icon={faMapMarkerAlt} />;
const leaderboard = <FontAwesomeIcon icon={faTrophy} />;
const suggestedUsers = <FontAwesomeIcon icon={faCompass} />;

function Appbar() {
  return (
    <nav>
      <div className="bg-black w-full bottom-0 md:top-0 fixed md:bottom-auto px-6 md:px-8 z-10">
        <div className="flex items-center justify-center md:justify-between h-16">
          <div className="w-20 h-10 hidden md:flex items-center">
            <Image
              cloudName="bluetooth"
              className="bg-cover"
              publicId="flock-logo-nav"
              secure="true"
            ></Image>
          </div>
          <div className="">
            <div className="flex items-baseline mx-auto">
              <button className="mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/feed">{home}</Link>
              </button>
              <button className="mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/map-feed">{map}</Link>
              </button>
              <button className="mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/upload-post">{plus}</Link>
              </button>
              <button className="hidden md:block mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/create-channel">{channel}</Link>
              </button>
              <button className="hidden md:block mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/leaderboard">{leaderboard}</Link>
              </button>
              <button className="hidden md:block mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/events">{events}</Link>
              </button>
              <button className="hidden md:block mx-5 my-2 rounded-md text-xl text-white">
                <Link to="/suggested-users">{suggestedUsers}</Link>
              </button>
              <a
                href={
                  getUser() === null
                    ? `/login`
                    : `/profile/${getUser().username}`
                }
                className="md:block hidden"
              >
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {user}
                </button>
              </a>
              <Dropdown
                color="black"
                buttonIcon={faBars}
                outerClasses="md:hidden"
              >
                <Link
                  to="/create-channel"
                  className={
                    "text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent text-white "
                  }
                >
                  Create Channel
                  {channel}
                </Link>
                <Link
                  to="/leaderboard"
                  className={
                    "text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent text-white "
                  }
                >
                  Leaderboard
                  {leaderboard}
                </Link>
                <Link
                  to="/events"
                  className={
                    "text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent text-white "
                  }
                >
                  Events
                  {events}
                </Link>
                <Link
                  to="/suggested-users"
                  className={
                    "text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent text-white "
                  }
                >
                  Discover Users
                  {suggestedUsers}
                </Link>
                <a
                  href={
                    getUser() === null
                      ? `/login`
                      : `/profile/${getUser().username}`
                  }
                  className={
                    "text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent text-white "
                  }
                >
                  Profile
                  {user}
                </a>
              </Dropdown>
              <button
                className="mx-5 my-2 rounded-md text-xl text-red-500"
                onClick={() => {
                  if(window.confirm("Are you sure you wish to logout?")) {
                    removeUserSession();
                    window.location.href = "/";
                  }
                }}
              >
                {logout}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Appbar;
