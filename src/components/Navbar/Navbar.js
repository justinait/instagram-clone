import React, { useContext } from 'react'
import './Navbar.css'
import SessionContainer from '../SessionContainer/SessionContainer.js';
import { SessionContext } from '../../context/SessionContext';
import ImageUpload from '../ImageUpload/ImageUpload';

function Navbar() {

  const {localUser} = useContext(SessionContext)

  return (
    <div>
      <div className="navbar">
        
        <img className="titleImg" src='instagram.png' alt="Instagram" />    
        < SessionContainer />
        {/* <Gif /> */}
        
      </div>
      
      { 
        localUser && <ImageUpload username={localUser.displayName} />
      }
    </div>
    
  )
}

export default Navbar