import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const trends = [
  { id: 1, title: "ReactJS", tweets: "120K" },
  { id: 2, title: "ShopifyDev", tweets: "85K" },
  { id: 3, title: "OpenAI", tweets: "95K" },
  { id: 4, title: "TailwindCSS", tweets: "60K" },
  { id: 5, title: "GraphQL", tweets: "40K" },
];

const Explore = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  const handleHashtagClick = (tag) => {
    navigate(`/tag/${tag}`);
  };

  return (
    <div className="w-full space-y-5 bg-white dark:bg-black text-black dark:text-white p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 text-black dark:text-white bg-white dark:bg-black rounded-full"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
          size={18}
        />
      </form>

      {/* Trending Section */}
      <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-3">Trending Now</h2>
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
    </div>
  );
};

export default Explore;
