import React from "react";
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
      <div className="hidden md:flex fixed left-0 top-0 h-full md:w-20 xl:w-1/4 bg-[var(--color-dark)] border-r flex-col p-4">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <h1 className="text-xl font-bold text-white">X</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="flex items-center md:justify-center xl:justify-start space-x-4 p-3 rounded-full transition hover:bg-gray-800 text-white text-lg"
            >
              <span>{item.icon}</span>
              <span className="hidden xl:inline">{item.label}</span> {/* Show text only on xl */}
            </a>
          ))}
        </nav>

        {/* Post Button */}
        <button className="mt-6 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full w-full hidden xl:block hover:bg-blue-600">
          Post
        </button>

        {/* Floating Post Button for Tablet */}
        <button className="mt-auto bg-blue-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center xl:hidden">
          <Feather size={24} />
        </button>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-[var(--color-dark)] border-t border-gray-700 flex justify-around p-3 md:hidden">
        {menuItems.slice(0, 5).map((item) => (
          <a key={item.id} href={item.link} className="text-white p-2">
            {item.icon}
          </a>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
