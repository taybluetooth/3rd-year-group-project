import React from "react";
import { Link } from "react-router-dom";
import "../bodystyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faUser,
  faSignOutAlt,
  faPlus,
  faTv,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { removeUserSession, getUser } from "../utils/Common";
import { Image } from "cloudinary-react";

const home = <FontAwesomeIcon icon={faHome} />;
const user = <FontAwesomeIcon icon={faUser} />;
const plus = <FontAwesomeIcon icon={faPlus} />;
const channel = <FontAwesomeIcon icon={faTv} />;
const logout = <FontAwesomeIcon icon={faSignOutAlt} />;
const events = <FontAwesomeIcon icon={faCalendar} />;
const map = <FontAwesomeIcon icon={faMapMarkerAlt} />;

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
              <Link to="/feed">
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {home}
                </button>
              </Link>
              <Link to="/upload-post">
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {plus}
                </button>
              </Link>
              <Link to="/create-channel" className="text-white">
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {channel}
                </button>
              </Link>
              <Link to="/events" className="text-white hidden md:block">
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {events}
                </button>
              </Link>
              <Link to="/map-feed" className="text-white hidden md:block">
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {map}
                </button>
              </Link>
              <a
                href={
                  getUser() === null
                    ? `/login`
                    : `/profile/${getUser().username}`
                }
              >
                <button className="mx-5 my-2 rounded-md text-xl text-white">
                  {user}
                </button>
              </a>
              <button
                className="mx-5 my-2 rounded-md text-xl text-red-500"
                onClick={() => {
                  removeUserSession();
                  window.location.href = "/";
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
