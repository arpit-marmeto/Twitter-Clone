import React from "react";
import logo from "../assets/xx.svg";
import { Home, Search, Bell, Mail, List, User, MoreHorizontal, Feather } from "lucide-react";

const menuItems = [
  { id: 1, label: "Home", icon: <Home size={28} />, link: "#" },
  { id: 2, label: "Explore", icon: <Search size={28} />, link: "#" },
  { id: 3, label: "Notifications", icon: <Bell size={28} />, link: "#" },
  { id: 4, label: "Messages", icon: <Mail size={28} />, link: "#" },
  { id: 5, label: "Lists", icon: <List size={28} />, link: "#" },
  { id: 6, label: "Profile", icon: <User size={28} />, link: "#" },
  { id: 7, label: "More", icon: <MoreHorizontal size={28} />, link: "#" },
];

const Sidebar = () => {
  return (
    <>
      {/* Sidebar for Desktop & Tablet */}
      <div className="sidebar md:flex fixed left-0 top-0 h-full md:w-1/4 bg-[var(--color-dark)] border-r border-[#2f3336] flex-col p-4">
        {/* Logo */}
        <div className="sidebar__logo mb-6 flex justify-start size-10 ml-2">
          <img src={logo} alt="X Logo" className="w-full h-full" />
        </div>
        {/* Navigation */}
        <nav className="sidebar__nav flex flex-col space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="sidebar__nav-item flex items-center space-x-4 p-3 rounded-full transition hover:bg-gray-800 text-white text-lg"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Post Button */}
        <button className="sidebar__post-btn mt-6 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full w-full hover:bg-blue-600">
          Post
        </button>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="sidebar__bottom-nav fixed bottom-0 left-0 w-full bg-[var(--color-dark)] border-t border-gray-700 flex justify-around p-3 md:hidden">
        {menuItems.slice(0, 5).map((item) => (
          <a key={item.id} href={item.link} className="sidebar__bottom-nav-item text-white p-2">
            {item.icon}
          </a>
        ))}
      </div>
    </>
  );
};

export default Sidebar;