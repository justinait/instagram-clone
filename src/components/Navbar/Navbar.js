import React from 'react'
import './Navbar.css'
import SessionContainer from '../SessionContainer/SessionContainer.js';

function Navbar() {

  return (
    
    <div className="navbar">
        
      <img className="titleImg" src='instagram.png' alt="Instagram" />    
      < SessionContainer />
      {/* <Gif /> */}
      
    </div>
  )
}

export default Navbar