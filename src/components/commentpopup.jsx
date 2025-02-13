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
    onClose();
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] p-5 rounded-lg w-[400px] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-white text-lg font-semibold">Add a Comment</h3>
          <X className="text-gray-400 cursor-pointer hover:text-white" onClick={onClose} />
        </div>

        {/* Text Input */}
        <textarea
          className="w-full bg-transparent border border-gray-600 rounded-md p-2 text-white mt-2 resize-none"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
        />

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="mt-2 relative">
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full rounded-md" />
            <X className="absolute top-1 right-1 bg-gray-700 p-1 rounded-full text-white cursor-pointer" size={18} onClick={() => setSelectedImage(null)} />
          </div>
        )}

        {/* Actions: Image Upload & Emoji Picker */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-3">
            <label className="cursor-pointer text-blue-500 hover:bg-gray-800 p-2 rounded-full">
              <Image size={22} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>

            <button className="text-blue-500 hover:bg-gray-800 p-2 rounded-full" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile size={22} />
            </button>
          </div>

          <button
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim() && !selectedImage}
          >
            Reply
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute mt-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPopup;
