import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Home, Search, Bell, Mail, SquarePen } from "lucide-react";
import CreatePostPopup from "./createpostpopup";

const menuItems = [
  { id: 1, icon: <Home size={24} />, link: "#" },
  { id: 2, icon: <Search size={24} />, link: "#" },
  { id: 3, icon: <SquarePen size={24} />, link: "#", special: true },
  { id: 4, icon: <Bell size={24} />, link: "#" },
  { id: 5, icon: <Mail size={24} />, link: "#" },
];

const BottomNavigationBar = ({ user, onPostSubmit }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);

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
    <>
      <nav
        className={`fixed bottom-0 left-0 w-full flex justify-around items-center py-2 transition-all duration-300 backdrop-blur-md 
          ${isScrolling ? "opacity-50" : "opacity-100"} 
          bg-white dark:bg-[var(--color-dark)] border-t border-gray-300 dark:border-gray-700`}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.special) {
                setShowCreatePostPopup(true);
              }
            }}
            className={`p-3 flex items-center justify-center transition-colors duration-300 
              ${
                item.special
                  ? "bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600"
                  : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg"
              }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Render CreatePostPopup */}
      {showCreatePostPopup && (
        <CreatePostPopup
          onClose={() => setShowCreatePostPopup(false)}
          onSubmit={onPostSubmit}
          user={user}
        />
      )}
    </>
  );
};

BottomNavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  onPostSubmit: PropTypes.func.isRequired,
};

export default BottomNavigationBar;
