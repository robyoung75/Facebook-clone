import React, { useState, useEffect } from "react";

import "./Feed.css";
import MessageSender from "../MessageSender/MessageSender";
import StoryReel from "../StoryReel/StoryReel";
import Post from "../Post/Post";
import "./Feed.css";


import db from "../../firebase";

function Feed() {
  // State
  const [posts, setPosts] = useState([]);
  // useEffect fires on load or reload. In this case we take a snapshot ofthe datebase collection posts.
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />

      {posts.map((post) => (
        <Post
          key={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
        />
      ))}
    </div>
  );
}

export default Feed;
