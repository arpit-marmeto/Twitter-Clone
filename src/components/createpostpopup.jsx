import { useState } from "react";
import PropTypes from "prop-types";
import { X, Image } from "lucide-react";

const CreatePostPopup = ({ onClose, onSubmit, user }) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePostSubmit = () => {
    if (!content.trim() && !selectedImage) return;
    onSubmit({ text: content, image: selectedImage });
    setContent("");
    setSelectedImage(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-3"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0d0d] w-full max-w-[500px] rounded-2xl p-4 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <X
          className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-white"
          onClick={onClose}
        />

        <div className="flex space-x-3 items-start">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-600"
          />
          <div className="w-full">
            <textarea
              className="w-full bg-transparent text-white text-lg placeholder-gray-500 border-none focus:outline-none resize-none"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
            />
            {selectedImage && (
              <div className="mt-2 relative">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
                <X
                  className="absolute top-1 right-1 bg-gray-700 p-1 rounded-full text-white cursor-pointer"
                  size={18}
                  onClick={() => setSelectedImage(null)}
                />
              </div>
            )}
            <div className="flex items-center justify-between mt-3 border-t border-gray-700 pt-3">
              <label className="cursor-pointer hover:text-white text-gray-400">
                <Image size={20} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </label>
              <button
                className="bg-blue-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50"
                onClick={handlePostSubmit}
                disabled={!content.trim() && !selectedImage}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatePostPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreatePostPopup;
