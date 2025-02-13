import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../utils/formatTime";
import CommentPopup from "./commentPopup";

const Post = ({ post, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const navigate = useNavigate();

  // Load like state from localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    setIsLiked(likedPosts.includes(post.id));
  }, [post.id]);

  // Handle Like Click
  const handleLike = () => {
    const updatedLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);
    setIsLiked(!isLiked);
    onLike(post.id, updatedLikes);

    // Update localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (!isLiked) {
      localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, post.id]));
    } else {
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts.filter(id => id !== post.id)));
    }
  };

  // Handle New Comment Submission
  const handleNewComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onComment(post.id, updatedComments);
  };

  // Function to make hashtags clickable
  const formatContentWithHashtags = (content) => {
    return content.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={index}
            onClick={() => navigate(`/tag/${word.substring(1)}`)}
            className="text-blue-400 cursor-pointer"
          >
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  return (
    <div className="border-b-[0.2px] border-[#2f3336] p-4 transition">
      {/* User Info */}
      <div className="flex items-start gap-3">
        <img src={post.user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full border border-gray-600" />
        <div className="w-full">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">{post.user.name}</span>
            <span className="text-gray-400 text-sm">{post.user.handle}</span>
            <span className="text-gray-500 text-sm">• {timeAgo(post.timestamp)}</span>
          </div>

          {/* Post Content with Clickable Hashtags */}
          <p className="mt-1 text-white">{formatContentWithHashtags(post.content)}</p>

          {/* Post Image (if available) */}
          {post.image && <img src={post.image} alt="Post" className="mt-3 rounded-lg w-full border-1 border-[#2f3336]" />}

          {/* Actions: Like, Comment, Share */}
            
          <div className="flex justify-between text-gray-400 mt-3 text-sm">
            {/* Like Button */}
            <div
              className={`flex items-center gap-2 cursor-pointer hover:text-white ${isLiked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? "red" : "none"} />
              <span>{likes}</span>
            </div>
            {/* Comment Button */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => setShowCommentPopup(true)}>
              <MessageCircle size={18} />
              <span>{comments.length}</span>
            </div>

            {/* Retweet Button (Placeholder) */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <Repeat2 size={18} />
              <span>{post.shares || 0}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Comment Popup */}
      {showCommentPopup && (
        <CommentPopup
          onClose={() => setShowCommentPopup(false)}
          onSubmit={handleNewComment}
        />
      )}
    </div>
  );
};

export default Post;
