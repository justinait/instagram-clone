import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import db from './firebase.js'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {         //this is the posts inside the firebase.js

    db.collection('posts').onSnapshot(s => {
      
      setPosts(s.docs.map(d => ({
        id: d.id,
        post: d.data()
      })));
      
      
    })    //SNAPSHOT -> when there's a new document(post), the machine take a photo

  }, []);//it runs when the page loads or refresh, and eery single time that a post change

  return (
    <div>
      <div className="header">
        <img className="headerImg" src='instagram.png' alt="Instagram" />
      </div>
      {
        posts.map( ({id, post}) => (
          <Post
            key={id}
            avatarImgUrl = {post.avatarImgUrl}
            username = {post.username}
            imgUrl = {post.imgUrl}
            textDescription = {post.textDescription}
          />
        ))
      }
      
    </div>
  );
}

export default App;