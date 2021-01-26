import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faCompass, faUser, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { removeUserSession } from "../utils/Common";

const home = <FontAwesomeIcon icon={faHome} />
const heart = <FontAwesomeIcon icon={faHeart} />
const compass = <FontAwesomeIcon icon={faCompass} />
const user = <FontAwesomeIcon icon={faUser} />
const plus = <FontAwesomeIcon icon={faPlus} />
const logout = <FontAwesomeIcon icon={faSignOutAlt} />

export default () => {
  return (
    <nav className="app-hide">
      <div className="bg-white w-full bottom-0 fixed px-6">
        <div className="flex items-center justify-center h-16">
          <div className="block">
            <div className="flex items-baseline mx-auto space-x-2">
              <Link to="/feed">
                <button className="w-1/4 px-3 py-2 rounded-md text-xl">{home}</button>
              </Link>
              <Link to="/upload_post">
                <button className="w-1/4 px-3 py-2 rounded-md text-xl">{plus}</button>
              </Link>
                <button className="w-1/4 px-3 py-2 rounded-md text-xl text-pink">{heart}</button>
              <Link to="/profile">
                <button className="px-3 py-2 rounded-md text-xl">{user}</button>
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
