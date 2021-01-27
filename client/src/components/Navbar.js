import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image } from "cloudinary-react";
import { faHome, faHeart, faUser, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { removeUserSession } from "../utils/Common";

const home = <FontAwesomeIcon icon={faHome} />
const heart = <FontAwesomeIcon icon={faHeart} />
const user = <FontAwesomeIcon icon={faUser} />
const plus = <FontAwesomeIcon icon={faPlus} />
const logout = <FontAwesomeIcon icon={faSignOutAlt} />

export default () => {
  return (
    <nav className="nav-hide">
      <div className="fixed bg-black w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="w-20 h-10 flex items-center">
            <Image
              cloudName="bluetooth"
              className="bg-cover"
              publicId="flock-logo-nav"
              secure="true"
            ></Image>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link to="/feed">
                <button className="w-1/4 px-3 py-2 rounded-md text-xl text-white">{home}</button>
              </Link>
              <Link to="/upload_post">
                <button className="w-1/4 px-3 py-2 rounded-md text-xl text-white">{plus}</button>
              </Link>
                <button className="w-1/4 px-3 py-2 rounded-md text-xl text-pink-500">{heart}</button>
              <Link to="/profile">
                <button className="px-3 py-2 rounded-md text-xl text-white">{user}</button>
              </Link>
              <Link to="/">
                <button
                  href="#"
                  className="w-1/4 px-3 py-2 rounded-md text-xl text-red-500"
                  onClick={() => {
                    removeUserSession();
                    window.location.href = "/";
                  }}
                > {logout}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
