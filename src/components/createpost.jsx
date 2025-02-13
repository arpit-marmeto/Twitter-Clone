import React, { useState, useRef, useEffect } from "react";
import { Image, Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker

const CreatePost = ({ setPosts }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null); // Reference for emoji picker

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview URL
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle emoji selection
  const addEmoji = (emojiObject) => {
    setContent((prev) => prev + emojiObject.emoji);
  };

  // Handle post submission
  const handlePost = () => {
    if (content.trim() === "") return;

    const newPost = {
      id: Date.now(),
      user: {
        name: "Arpit",
        handle: "@arpitdev",
        avatar: "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face-1024x1024.jpg"
      },
      content,
      image: imagePreview || null,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    };

    setPosts((prev) => {
      const updatedPosts = [newPost, ...prev];
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Persist to localStorage
      return updatedPosts;
    });

    // Clear input fields
    setContent("");
    removeImage();
    setShowEmojiPicker(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b border-[#2f3336] p-4 bg-[var(--color-dark)] flex space-x-3">
      {/* Profile Picture */}
      <img
        src="https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face-1024x1024.jpg"
        alt="Profile"
        className="w-12 h-12 rounded-full"
      />

      {/* Post Input Area */}
      <div className="flex-1 relative">
        <textarea
          className="w-full bg-transparent text-white text-lg p-2 outline-none resize-none placeholder-gray-400 min-h-[2rem] max-h-[18rem] overflow-y-auto"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-2 z-2">
            <img src={imagePreview} alt="Preview" className="w-full rounded-lg" />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-gray-700 text-white p-1 rounded-full"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-2 relative">
          <div className="flex space-x-4 text-blue-500">
            {/* Upload Image */}
            <label className="cursor-pointer hover:bg-gray-800 p-2 rounded-full">
              <Image size={22} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Emoji Picker Button */}
            <button
              className="hover:bg-gray-800 p-2 rounded-full relative"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
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

          {/* Emoji Picker Popup (Now Appears Below Button) */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute top-full left-0 mt-2 bg-gray-800 p-2 rounded-lg shadow-lg z-50"
            >
              <EmojiPicker onEmojiClick={addEmoji} theme="auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
