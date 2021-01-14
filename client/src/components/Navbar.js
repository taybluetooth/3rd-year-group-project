import React from "react";

export default () => {
  return (
    <nav class="bg-green-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-white px-3 py-2 test-sm font-medium"> Flock </h1>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="bg-green-400	 text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" class="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Discover</a>
              <a href="#" class="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Notifications</a>
              <a href="#" class="text-gray-300 hover:bg-green-400	 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Account</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
