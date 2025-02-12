import React from "react";
import Sidebar from "../components/sidebar";
import Feed from "../components/feed"; // Component for posts/timeline
import RightSidebar from "../components/rightsidebar"; // Suggested trends, users, etc.

const Homepage = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-dark)] text-white w-full">
      {/* Left Sidebar */}
      <div className="hidden md:flex md:w-1/4 min-h-screen fixed left-0 top-0 border-r p-4">
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex min-h-screen bg-[var(--color-dark)] text-white w-full">
        {/* Left Sidebar */}
        <div className="hidden md:flex md:w-1/4 min-h-screen fixed left-0 top-0 border-r p-4">
          <Sidebar />
        </div>

        {/* Main Content + Right Sidebar */}
        <div className="flex w-full md:ml-[25%]">
          <div className="w-full lg:w-3/4 xl:w-3/5 border-x">
            <Feed />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:flex lg:w-1/4 xl:w-2/5 h-full min-h-full border-l border-gray-700 p-4">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
