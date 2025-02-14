import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Sidebar from "../components/sidebar";
import PostFeed from "../components/postfeed";
import TagFeed from "../components/tagfeed";
import RightSidebar from "../components/rightsidebar";
import BottomNavigationBar from "../components/bottomnavigationbar";
import Notification from "../components/notification";
import Explore from "../components/explore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DarkLogo from "../assets/black-x-logo.svg";
import LightLogo from "../assets/white-x-logo.svg";
import Messages from "../components/messages";

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="flex bg-white dark:bg-[var(--color-dark)] text-black dark:text-white w-full min-h-screen flex-col transition-colors duration-300">
        {/* Top Navbar for Mobile */}
        <div className="md:hidden top-0 left-0 w-full bg-white dark:bg-[var(--color-dark)] border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-4 py-4 z-50 transition-colors duration-300">
          {/* Left - Logo */}
          <img
            src={darkMode ? LightLogo : DarkLogo}
            alt="X Logo"
            className="w-8 h-8"
          />

          {/* Right - Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-10 w-10 flex items-center justify-center border border-black dark:border-gray-600 rounded-full"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-800" />
            )}
          </button>
        </div>

        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="hidden md:flex md:w-1/4 min-h-screen fixed left-0 top-0 p-4">
            <Sidebar />
          </div>

          {/* Main Content + Right Sidebar */}
          <div className="flex w-full md:ml-[25%] min-h-screen">
            {/* Main Content (Feed) */}
            <div className="w-full xl:w-4/4 lg:w-2/4 border-gray-300 dark:border-[#2f3336] border-1 transition-colors duration-300">
              <Routes>
                <Route path="/" element={<PostFeed />} />
                <Route path="/tag/:hashtag" element={<TagFeed />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </div>

            {/* Right Sidebar - Moves Based on Content Height */}
            <div className="hidden xl:block lg:flex lg:w-3/5 p-4 pt-0 self-start sticky top-1">
              <RightSidebar />
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[var(--color-dark)] border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
          <BottomNavigationBar />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Homepage;
