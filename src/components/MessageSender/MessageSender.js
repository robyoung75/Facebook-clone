import { Avatar } from "@material-ui/core";
import React, { useState } from "react";

import firebase from "firebase";
import db from "../../firebase";

import "./MessageSender.css";

import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

import { useStateValue } from "../../StateProvider";

function MessageSender() {
  // State, useState() hooks
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // handler functions
  const handleSubmit = (event) => {
    event.preventDefault();

    // database info
    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: imageUrl,
    });

    setInput("");
    setImageUrl("");
  };

  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    console.log(input);
  };

  const handleImageInput = (event) => {
    event.preventDefault();
    setImageUrl(event.target.value);
    console.log(imageUrl);
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={handleInput}
            className="messageSender__input"
            placeholder={`What's on your mind ${user.displayName}`}
          />

          <input
            value={imageUrl}
            onChange={handleImageInput}
            placeholder="image URL (optional)"
          />

          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
      </div>

      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>

        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>

        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
