import { Search, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const trends = [
  { id: 1, title: "ReactJS", tweets: "120K" },
  { id: 2, title: "ShopifyDev", tweets: "85K" },
  { id: 3, title: "OpenAI", tweets: "95K" },
  { id: 4, title: "TailwindCSS", tweets: "60K" },
  { id: 5, title: "GraphQL", tweets: "40K" },
];

const suggestions = [
  { id: 1, name: "Mark S. Charan", username: "@charan_mer8875" },
  { id: 2, name: "Wes Bos", username: "@wesbos" },
  { id: 3, name: "Donald J. Trump", username: "@realDonaldTrump" },
];

const RightSidebar = () => {
  const navigate = useNavigate();
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

  const handleHashtagClick = (tag) => {
    navigate(`/tag/${tag}`);
  };

  return (
    <div className="w-full space-y-5 bg-white dark:bg-black text-black dark:text-white">
      {/* Search Bar and Toggle Button */}
      <div className="flex items-center justify-between p-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border border-black dark:border-gray-600 text-black dark:text-white bg-white dark:bg-black rounded-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
            size={18}
          />
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-3 h-10 w-10 flex items-center justify-center border border-black dark:border-gray-600 rounded-full"
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Trending Section */}
      <div className="border border-black dark:border-gray-600 p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-3">What is happening?</h2>
        <ul className="space-y-3">
          {trends.map((trend) => (
            <li
              key={trend.id}
              onClick={() => handleHashtagClick(trend.title)}
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition"
            >
              <p className="font-medium">#{trend.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {trend.tweets} Tweets
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Who to Follow Section */}
      <div className="border border-black dark:border-gray-600 p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-3">Who to follow</h2>
        <ul className="space-y-3">
          {suggestions.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.username}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
