import React, { useEffect, useState } from "react";
import { Home, Search, Bell, Mail, SquarePen } from "lucide-react";

const menuItems = [
  { id: 1, icon: <Home size={24} />, link: "#" },
  { id: 2, icon: <Search size={24} />, link: "#" },
  { id: 3, icon: <SquarePen size={24} />, link: "#", special: true },
  { id: 4, icon: <Bell size={24} />, link: "#" },
  { id: 5, icon: <Mail size={24} />, link: "#" },
];

const BottomNavigationBar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full flex justify-around items-center py-2 transition-all duration-300 backdrop-blur-md ${
        isScrolling ? "bg-[rgba(0,0,0,0.5)] opacity-50" : "bg-[var(--color-dark)] opacity-100"
      }`}
    >
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className={`p-3 flex items-center justify-center ${
            item.special
              ? "bg-blue-500 text-white w-12 h-12 rounded-full"
              : "text-white"
          }`}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
};

export default BottomNavigationBar;
