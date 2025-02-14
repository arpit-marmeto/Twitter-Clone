import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import PropTypes from "prop-types";

const CreatePost = ({ setPosts }) => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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
        name: "Elon Musk",
        handle: "@elonmusk",
        avatar: "https://hips.hearstapps.com/hmg-prod/images/elon-musk-gettyimages-2147789844-web-675b2c17301ea.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*",
      },
      content,
      image: imagePreview || null,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
    };

    setPosts((prev) => {
      const updatedPosts = [newPost, ...prev];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });

    // Clear input fields
    setContent("");
    removeImage();
    setShowEmojiPicker(false);

    // Redirect to page 1 of the feed
    navigate("/");
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
    <div className="border-b border-black dark:border-[#2f3336] p-4 bg-white dark:bg-[var(--color-dark)] text-black dark:text-white flex space-x-3 transition-colors duration-300">
      {/* Profile Picture */}
      <img
        src="https://hips.hearstapps.com/hmg-prod/images/elon-musk-gettyimages-2147789844-web-675b2c17301ea.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*"
        alt="Profile"
        className="w-12 h-12 rounded-full"
      />

      {/* Post Input Area */}
      <div className="flex-1 relative">
        <textarea
          className="w-full bg-transparent text-black dark:text-white text-lg p-2 outline-none resize-none placeholder-gray-500 dark:placeholder-gray-400 min-h-[2rem] max-h-[18rem] overflow-y-auto transition-colors duration-300"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-2">
            <img src={imagePreview} alt="Preview" className="w-full rounded-lg" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-800 transition"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-2 relative">
          <div className="flex space-x-4 text-blue-500">
            {/* Upload Image */}
            <label className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition">
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
              className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition relative"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile size={22} />
            </button>
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition"
            disabled={!content.trim()}
          >
            Post
          </button>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute top-12 left-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-50 border border-black dark:border-gray-600"
            >
              <EmojiPicker onEmojiClick={addEmoji} theme="auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  setPosts: PropTypes.func.isRequired,
};

export default CreatePost;
