import React from "react";

export default () => {
  return (
    <nav className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white px-3 py-2 test-sm font-medium">Flock</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="bg-indigo-400	 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Notifications
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
