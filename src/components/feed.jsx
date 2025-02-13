import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import icons
import Post from "./post";
import CreatePost from "./createpost";

const POSTS_PER_PAGE = 10;

const Feed = () => {
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

  // Load posts from JSON or localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));

    if (savedPosts) {
      setPosts(savedPosts);
    } else {
      fetch("/data/posts.json")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          localStorage.setItem("posts", JSON.stringify(data)); // Store in localStorage
        })
        .catch((error) => console.error("Error loading posts:", error));
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
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: updatedLikes } : post
      );

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  // Handle Comment
  const handleComment = (postId, updatedComments) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: updatedComments } : post
      );

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  // Calculate pagination indexes
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Handle page navigation
  const goToPage = (page) => {
    navigate(`/?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <div className="flex flex-col w-full mx-auto bg-[var(--color-dark)]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0000005c] bg-opacity-90 backdrop-blur-md text-white font-bold text-lg py-4 px-6 border-b border-[#2f3336] shadow-md z-10 text-center">
        For You
      </div>

      {/* Create Post */}
      <CreatePost setPosts={setPosts} />

      {/* Posts List */}
      <div className="flex flex-col space-y-4">
        {currentPosts.map((post) => (
          <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center p-2 border border-gray-600 text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </button>

          <span className="text-white text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center p-2 border border-gray-600 text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
