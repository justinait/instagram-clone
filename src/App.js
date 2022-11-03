import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PostsContainer from './components/PostsContainer/PostsContainer';
import Profile from './components/Profile/Profile';
import SessionProvider from './context/SessionContext';

function App() {

  return (

    <div>
      <SessionProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<PostsContainer />} />
            <Route path='/:username' element={ <Profile /> } />
          </Routes>
        
        </BrowserRouter>
      </SessionProvider>
      
    </div>
    
  );
}

export default App;