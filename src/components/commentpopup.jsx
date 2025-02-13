import React, { useState } from "react";
import { Image, Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const CommentPopup = ({ onClose, onSubmit }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0d0d0d] w-[500px] rounded-2xl p-4 shadow-lg relative">
        {/* Close Button */}
        <X className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-white" onClick={onClose} />

        {/* Comment Header */}
        <div className="flex space-x-3 items-start">
          {/* Profile Picture Placeholder */}
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>

          {/* Comment Input Section */}
          <div className="w-full">
            <textarea
              className="w-full bg-transparent text-white text-lg placeholder-gray-500 border-none focus:outline-none resize-none"
              placeholder="Post your reply"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="2"
            />

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-2 relative">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full rounded-lg" />
                <X className="absolute top-1 right-1 bg-gray-700 p-1 rounded-full text-white cursor-pointer" size={18} onClick={() => setSelectedImage(null)} />
              </div>
            )}

            {/* Action Icons */}
            <div className="flex items-center justify-between mt-3 border-t border-gray-700 pt-3">
              <div className="flex space-x-4 text-gray-400">
                <label className="cursor-pointer hover:text-white">
                  <Image size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </label>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="hover:text-white">
                  <Smile size={20} />
                </button>
              </div>

              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-600 disabled:opacity-50"
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
          <div className="absolute bottom-16 left-12">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPopup;
