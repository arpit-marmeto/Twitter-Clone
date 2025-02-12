import React from "react";
import { Heart, MessageCircle, Repeat2 } from "lucide-react"; // Icons

const Post = ({ post }) => {
  return (
    <div className="border-b p-4 hover:bg-[var(--color-secondary)] transition">
      {/* User Info */}
      <div className="flex items-start gap-3">
        <img
          src={post.user.avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border border-gray-600"
        />
        <div className="w-full">
          {/* User Name & Handle */}
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-white">{post.user.name}</span>{" "}
              <span className="text-gray-400 text-sm">{post.user.handle}</span>
            </div>
          </div>

          {/* Post Content */}
          <p className="mt-1 text-white">{post.content}</p>

          {/* Post Image (if available) */}
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-3 rounded-lg w-full border"
            />
          )}

          {/* Actions: Like, Comment, Share */}
          <div className="flex justify-between text-gray-400 mt-3 text-sm">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <Repeat2 size={18} />
              <span>{post.shares}</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <Heart size={18} />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
