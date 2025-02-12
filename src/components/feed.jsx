import React from "react";
import Post from "./post"; // Reusable Post component
import CreatePost from "./createpost";

const posts = [
  {
    id: 1,
    user: {
      name: "Arpit",
      handle: "@arpitdev",
      avatar: "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face-1024x1024.jpg", 
    },
    content: "Building my portfolio with React! 🚀",
    image: "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg", 
    likes: 120,
    comments: 45,
    shares: 10,
  },
  {
    id: 2,
    user: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "https://via.placeholder.com/50",
    },
    content: "Just launched a new project! Check it out.",
    image: "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
    likes: 200,
    comments: 60,
    shares: 20,
  },
];

const Feed = () => {
  return (
    <div className="flex flex-col w-full mx-auto bg-[var(--color-dark)]">
      
      {/* Header */}
      <div className="sticky top-0 bg-[var(--color-dark)] bg-opacity-90 backdrop-blur-md text-white font-bold text-lg py-4 px-6 border-b shadow-md">
        Home
      </div>

      {/* Create Post */}
      <CreatePost />

      {/* Posts List */}
      <div className="flex flex-col space-y-4 py-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
