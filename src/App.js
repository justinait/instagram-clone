import './App.css';
import React, { useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import PostsContainer from './components/PostsContainer/PostsContainer';
import ImageUpload from './components/ImageUpload/ImageUpload.js'

function App() {

  return (
    
    <div>

      <Navbar/>
      <PostsContainer />
      
      { 
        // user && <ImageUpload username={user.displayName} />
      }

    </div>

  );
}

export default App;