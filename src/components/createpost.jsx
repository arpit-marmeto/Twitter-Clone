import React, { useState } from "react";
import { Image, Smile } from "lucide-react"; // Icons for media & emoji

const CreatePost = ({ setPosts }) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim() === "") return;
    setPosts((prev) => [{ id: Date.now(), content, likes: [] }, ...prev]);
    setContent("");
  };

  return (
    <div className="border-b p-4 bg-[var(--color-dark)] flex space-x-3">
      {/* Profile Picture */}
      <div className="w-12 h-12 rounded-full bg-gray-500"></div>

      {/* Post Input Area */}
      <div className="flex-1">
        <textarea
          className="w-full bg-transparent text-white text-lg p-2 outline-none resize-none placeholder-gray-400"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />

        {/* Actions */}
        <div className="flex justify-between items-center mt-2">
          {/* Icons for media & emoji */}
          <div className="flex space-x-4 text-blue-500">
            <button className="hover:bg-gray-800 p-2 rounded-full">
              <Image size={22} />
            </button>
            <button className="hover:bg-gray-800 p-2 rounded-full">
              <Smile size={22} />
            </button>
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
