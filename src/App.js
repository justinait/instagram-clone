import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import PostsContainer from './components/PostsContainer/PostsContainer';
import ImageUpload from './components/ImageUpload/ImageUpload.js'
import SessionProvider from './context/SessionContext';

function App() {

  return (

    <div>
      <SessionProvider>

        <Navbar/>
        <PostsContainer />

      </SessionProvider>

    </div>
    
  );
}

export default App;