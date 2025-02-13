import React from "react";
import Sidebar from "../components/sidebar";
import Feed from "../components/feed";
import TagFeed from "../components/tagfeed"; // Import component to handle filtered posts
import RightSidebar from "../components/rightsidebar";
import BottomNavigationBar from "../components/bottomnavigationbar"; // Import Bottom Navigation Bar
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Homepage = () => {
  return (
    <BrowserRouter>
      <div className="flex bg-[var(--color-dark)] text-white w-full min-h-screen flex-col">
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="hidden md:flex md:w-1/4 min-h-screen fixed left-0 top-0 p-4">
            <Sidebar />
          </div>

          {/* Main Content + Right Sidebar */}
          <div className="flex w-full md:ml-[25%] min-h-screen">
            {/* Main Content (Feed) */}
            <div className="w-full xl:w-4/4 lg:w-2/4 border-[#2f3336] border-1">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/tag/:hashtag" element={<TagFeed />} /> {/* Route for hashtag filtering */}
              </Routes>
            </div>

            {/* Right Sidebar - Moves Based on Content Height */}
            <div className="hidden xl:block lg:flex lg:w-3/5 p-4 pt-0 self-start sticky top-1">
              <RightSidebar />
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation Bar for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-dark)] border-t border-gray-700">
          <BottomNavigationBar />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Homepage;
