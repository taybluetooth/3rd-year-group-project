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
} from "@fortawesome/free-solid-svg-icons";
import { removeUserSession, getUser } from "../utils/Common";
import { Image } from "cloudinary-react";

const home = <FontAwesomeIcon icon={faHome} />;
const heart = <FontAwesomeIcon icon={faHeart} />;
const user = <FontAwesomeIcon icon={faUser} />;
const plus = <FontAwesomeIcon icon={faPlus} />;
const logout = <FontAwesomeIcon icon={faSignOutAlt} />;

function Appbar() {
  return (
    <nav>
      <div className="bg-black w-full bottom-0 md:top-0 fixed md:bottom-auto px-6 md:px-8">
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
                <button className="px-3 py-2 rounded-md text-xl text-white">
                  {home}
                </button>
              </Link>
              <Link to="/upload_post">
                <button className="px-3 py-2 rounded-md text-xl text-white">
                  {plus}
                </button>
              </Link>
              <button className="px-3 py-2 rounded-md text-xl text-pink-500">
                {heart}
              </button>
              {/* find icon for this later */}
              <Link to="/create_channel" className="text-white">
                Create Channel
              </Link>
              <a
                href={
                  getUser() === null
                    ? `/login`
                    : `/profile/${getUser().username}`
                }
              >
                <button className="px-3 py-2 rounded-md text-xl text-white">
                  {user}
                </button>
              </a>
              <button
                className="px-3 py-2 rounded-md text-xl text-red-500"
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
