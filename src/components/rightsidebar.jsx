import React from "react";
import { Search } from "lucide-react";

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
  return (
    <div className="w-full space-y-5 bg-[var(--color-dark)] text-white">
      {/* Search Bar */}
      <div className="relative p-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 pl-10 border-1 text-white rounded-full"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 " size={18} />
      </div>

      {/* Trending Section */}
      <div className="border-1 p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-3">What's happening</h2>
        <ul className="space-y-3">
          {trends.map((trend) => (
            <li key={trend.id} className="cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition">
              <p className="font-medium">#{trend.title}</p>
              <p className="text-sm text-gray-400">{trend.tweets} Tweets</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Who to Follow Section */}
      <div className="border-1 p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-3">Who to follow</h2>
        <ul className="space-y-3">
          {suggestions.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.username}</p>
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
