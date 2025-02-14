import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Post from "./postcard";
import CreatePost from "./createpost";

const POSTS_PER_PAGE = 10;

// Default dummy posts
const defaultPosts = [
  {
    id: 1,
    user: {
      name: "Elon Musk",
      handle: "@elonmusk",
      avatar: "https://hips.hearstapps.com/hmg-prod/images/elon-musk-gettyimages-2147789844-web-675b2c17301ea.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*",
    },
    content: "Excited to start this new journey! 🚀 #openai #tech #tesla",
    image: 'https://placedog.net/400/336?id=3',
    likes: 12,
    comments: [
      { user: null, text: "Wow! Nature is amazing. 🌍" },
      { user: null, text: "Where was this taken?" },
    ],
    shares: 2,
    timestamp: "2025-02-14T10:00:00Z",
  },
  {
    id: 2,
    user: {
      name: "Jane Doe",
      handle: "@janedoe",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    content: "What a beautiful sunset! 🌅",
    image: "https://res.cloudinary.com/tourhq/image/upload/fl_progressive,f_auto,h_507,w_900,g_auto,c_fill,q_auto/c1ujlot1ybrzuptlx16k",
    likes: 45,
    comments: [
      { user: null, text: "Still skeptical, but let’s see. 👀" },
      { user: null, text: "This is going to be revolutionary!" },
    ],
    shares: 8,
    timestamp: "2025-02-13T15:30:00Z",
  },
  {
    id: 3,
    user: {
      name: "Mark Zuckerberg",
      handle: "@zuck",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content: "Metaverse is the future. Are you ready? #ai #reactjs #metaverse #tech",
    image: 'https://media.istockphoto.com/id/1382275016/photo/metaverse-city-concept-3d-render.jpg?s=612x612&w=0&k=20&c=-AuMFzEX67f1xKm0pcpcREsTvxNMJ2SH5zyyTjnPzLs=',
    likes: 78,
    comments: [
      { user: null , text: "Wishing you all the best! 🚀🔥" },
      { user: null , text: "Looking forward to it!" },
    ],
    shares: 15,
    timestamp: "2025-02-12T12:00:00Z",
  }
];

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract page number from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // Load posts from localStorage or fallback to defaultPosts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));

    if (savedPosts) {
      setPosts(savedPosts);
    } else {
      setPosts(defaultPosts);
      localStorage.setItem("posts", JSON.stringify(defaultPosts));
    }
  }, []);

  // Update localStorage when posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  // Handle Like
  const handleLike = (postId, updatedLikes) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: updatedLikes } : post
      )
    );
  };

  // Handle Comment
  const handleComment = (postId, updatedComments) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: updatedComments } : post
      )
    );
  };

  // Handle Delete
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  // Calculate pagination indexes
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // Memoize paginated posts for performance
  const currentPosts = useMemo(() => posts.slice(startIndex, endIndex), [posts, currentPage]);

  // Handle page navigation
  const goToPage = (page) => {
    navigate(`/?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full mx-auto bg-white dark:bg-[var(--color-dark)] text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-[#0000005c] bg-opacity-90 backdrop-blur-md text-black dark:text-white font-bold text-lg py-4 px-6 border-b border-black dark:border-[#2f3336] shadow-md z-10 text-center transition-colors duration-300">
        For You
      </div>

      {/* Create Post */}
      <CreatePost setPosts={setPosts} />

      {/* Posts List */}
      <div className="flex flex-col mb-[4rem] md:mb-0">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No posts available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-4 mb-16 md:mb-0">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center p-2 border border-gray-400 dark:border-gray-600 text-black dark:text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </button>

          <span className="text-black dark:text-white text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center p-2 border border-gray-400 dark:border-gray-600 text-black dark:text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
