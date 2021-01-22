import React from "react";
import { removeUserSession } from "../utils/Common";

export default () => {
  return (
    <nav>
      <div className="bg-white w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="px-3 py-2 text-xs">FLOCK</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="px-3 py-2 rounded-md text-xs">HOME</a>
              <a href="#" className="px-3 py-2 rounded-md text-xs">DISCOVER</a>
              <a href="#" className="px-3 py-2 rounded-md text-xs">NOTIFICATIONS</a>
              <a href="/profile" className="px-3 py-2 rounded-md text-xs">ACCOUNT</a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-xs"
                onClick={() => {
                  removeUserSession();
                  window.location.href = "/";
                }}
              > LOGOUT
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
