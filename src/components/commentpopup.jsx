import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const CommentPopup = ({ onClose, onSubmit }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    // Disable scrolling when the popup is open
    document.body.style.overflow = "hidden";

    // Event listener to close popup on outside click
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCommentSubmit = () => {
    if (!newComment.trim() && !selectedImage) return;
    onSubmit({ text: newComment, image: selectedImage });
    setNewComment("");
    setSelectedImage(null);
    setShowEmojiPicker(false);
    onClose();
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-50 px-3">
      <div
        ref={popupRef}
        className="bg-white dark:bg-[#0d0d0d] w-full max-w-[500px] rounded-2xl p-3 md:p-4 shadow-lg relative transition-all"
      >
        {/* Close Button */}
        <X
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white"
          onClick={onClose}
        />

        {/* Comment Header */}
        <div className="flex space-x-3 items-start">
          {/* Profile Picture Placeholder */}
          <img
            src="https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face-1024x1024.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />

          {/* Comment Input Section */}
          <div className="w-full">
            <textarea
              className="w-full bg-transparent text-black dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 border-none focus:outline-none resize-none"
              placeholder="Post your reply"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="2"
            />

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-2 relative">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full rounded-lg" />
                <X
                  className="absolute top-1 right-1 bg-gray-300 dark:bg-gray-700 p-1 rounded-full text-black dark:text-white cursor-pointer"
                  size={18}
                  onClick={() => setSelectedImage(null)}
                />
              </div>
            )}

            {/* Action Icons */}
            <div className="flex items-center justify-between mt-3 border-t border-gray-300 dark:border-gray-700 pt-3">
              <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="hover:text-black dark:hover:text-white">
                  <Smile size={20} />
                </button>
              </div>

              <button
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim() && !selectedImage}
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 md:bottom-16 md:left-12">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

CommentPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentPopup;
