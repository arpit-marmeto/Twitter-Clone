/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Heart, MessageCircle, Repeat2, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import timeAgo from "../utils/formatTime";
import CommentPopup from "./commentPopup";

const PostCard = ({ post, onLike, onComment, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    setIsLiked(likedPosts.includes(post.id));
  }, [post.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    const updatedLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);
    setIsLiked(!isLiked);
    onLike(post.id, updatedLikes);

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (!isLiked) {
      localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, post.id]));
    } else {
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts.filter(id => id !== post.id)));
    }
  };

  const renderContentWithHashtags = (text) => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("#")) {
        const tag = word.slice(1);
        return (
          <Link key={index} to={`/tag/${tag}`} className="text-blue-500 dark:text-blue-400 hover:underline">
            {word}
          </Link>
        );
      }
      return word;
    });
  };

  return (
    <div className="border-b border-black dark:border-[#2f3336] p-4 transition hover:bg-gray-100 dark:hover:bg-gray-800 relative bg-white dark:bg-[var(--color-dark)] text-black dark:text-white">
      <button
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        onClick={() => setShowMenu(!showMenu)}
      >
        <MoreHorizontal size={18} />
      </button>
      
      {showMenu && (
        <div className="absolute top-8 right-2 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-lg p-2 border border-black dark:border-gray-600">
          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left"
            onClick={() => {
              onDelete(post.id);
              setShowMenu(false);
            }}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <img src={post.user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full border border-gray-400 dark:border-gray-600" />
        <div className="w-full">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-black dark:text-white">{post.user.name}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{post.user.handle}</span>
            <span className="text-gray-600 dark:text-gray-500 text-sm">• {timeAgo(post.timestamp)}</span>
          </div>

          <p className="mt-1 text-black dark:text-white">{renderContentWithHashtags(post.content)}</p>

          {post.image && <img src={post.image} alt="Post" className="mt-3 rounded-lg w-full border border-black dark:border-[#2f3336]" />}

          <div className="flex justify-between text-gray-500 dark:text-gray-400 mt-3 text-sm">
            <div
              className={`flex items-center gap-2 cursor-pointer hover:text-black dark:hover:text-white ${isLiked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? "red" : "none"} />
              <span>{likes}</span>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:text-black dark:hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentPopup(true);
              }}
            >
              <MessageCircle size={18} />
              <span>{comments.length}</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-black dark:hover:text-white">
              <Repeat2 size={18} />
              <span>{post.shares || 0}</span>
            </div>

          </div>
            {comments.length > 0 && (
            <div className="mt-3 p-2 border-t-2 border-[#2f3336]">
              <h4 className="dark:text-white text-sm mb-2">Comments</h4>
              {comments.map((comment, index) => (
                <div key={index} className="p-2 border-1 border-[#2f3336]">
                  <span className="dark:text-gray-300 font-semibold">{comment.user}</span>:{" "}
                  <span className="dark:text-white">{comment.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCommentPopup && (
        <CommentPopup
          onClose={() => setShowCommentPopup(false)}
          onSubmit={(newComment) => {
            const updatedComments = [...comments, newComment];
            setComments(updatedComments);
            onComment(post.id, updatedComments);
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
