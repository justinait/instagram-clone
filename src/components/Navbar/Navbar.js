import React from 'react'
import SessionContainer from '../SessionContainer/SessionContainer.js';

function Navbar() {

  return (
    
    <div className="header">
        
        <img className="headerImg" src='instagram.png' alt="Instagram" />    
        < SessionContainer />
      {/* <Gif /> */}
    </div>
  )
}

export default Navbar