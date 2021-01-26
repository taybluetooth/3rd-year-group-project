import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faCompass, faUser, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { removeUserSession } from "../utils/Common";

const home = <FontAwesomeIcon icon={faHome} />
const heart = <FontAwesomeIcon icon={faHeart} />
const compass = <FontAwesomeIcon icon={faCompass} />
const user = <FontAwesomeIcon icon={faUser} />
const bars = <FontAwesomeIcon icon={faBars} />
const logout = <FontAwesomeIcon icon={faSignOutAlt} />

export default () => {
  return (
    <nav className="nav-hide">
      <div className="fixed bg-white w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="px-3 py-2 text-xs">FLOCK</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <a href="#" className="px-3 py-2 rounded-md text-lg">{home}</a>
              <a href="#" className="px-3 py-2 rounded-md text-lg">{compass}</a>
              <a href="#" className="px-3 py-2 rounded-md text-lg text-pink">{heart}</a>
              <a href="/profile" className="px-3 py-2 rounded-md text-lg">{user}</a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-lg text-red-500"
                onClick={() => {
                  removeUserSession();
                  window.location.href = "/";
                }}
              > {logout}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
