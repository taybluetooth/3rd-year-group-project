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
    <nav className="app-hide">
      <div className="bg-white w-full bottom-0 fixed px-6">
        <div className="flex items-center justify-center h-16">
          <div className="block">
            <div className="flex items-baseline mx-auto space-x-2">
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
