import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import timeAgo from "../utils/formatTime";
import CommentPopup from "./commentPopup";

const Post = ({ post, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentPopup, setShowCommentPopup] = useState(false);

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

  return (
    <div className="border-b-[0.2px] border-[#2f3336] p-4 transition hover:bg-gray-800">
      <div className="flex items-start gap-3">
        <img src={post.user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full border border-gray-600" />
        <div className="w-full">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">{post.user.name}</span>
            <span className="text-gray-400 text-sm">{post.user.handle}</span>
            <span className="text-gray-500 text-sm">• {timeAgo(post.timestamp)}</span>
          </div>

          <p className="mt-1 text-white">{post.content}</p>

          {post.image && <img src={post.image} alt="Post" className="mt-3 rounded-lg w-full border-1 border-[#2f3336]" />}

          <div className="flex justify-between text-gray-400 mt-3 text-sm">
            <div
              className={`flex items-center gap-2 cursor-pointer hover:text-white ${isLiked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? "red" : "none"} />
              <span>{likes}</span>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentPopup(true);
              }}
            >
              <MessageCircle size={18} />
              <span>{comments.length}</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <Repeat2 size={18} />
              <span>{post.shares || 0}</span>
            </div>
          </div>

          {comments.length > 0 && (
            <div className="mt-3 p-2 border-t-2 border-[#2f3336]">
              <h4 className="text-white text-sm mb-2">Comments</h4>
              {comments.map((comment, index) => (
                <div key={index} className="p-2 border-1 border-[#2f3336]">
                  <span className="text-gray-300 font-semibold">{comment.user}</span>:{" "}
                  <span className="text-white">{comment.text}</span>
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
            setComments([...comments, newComment]);
            onComment(post.id, [...comments, newComment]);
          }}
        />
      )}
    </div>
  );
};
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      handle: PropTypes.string.isRequired,
    }).isRequired,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    shares: PropTypes.number,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default Post;
