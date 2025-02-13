import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./post";

const TagFeed = () => {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts from localStorage or fetch from posts.json
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      fetch("/data/posts.json") // Adjust path if necessary
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error("Error loading posts:", error));
    }
  }, []);

  // Filter posts containing the hashtag
  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(`#${hashtag.toLowerCase()}`)
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Posts tagged with #{hashtag}</h2>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-400">No posts found with this hashtag.</p>
      )}
    </div>
  );
};

export default TagFeed;
