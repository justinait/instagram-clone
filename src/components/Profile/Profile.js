import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';

function Profile() {

    const { postsList } = useContext(SessionContext)
    const { username } = useParams();

  return (
    <div>
        <h1>{username}</h1>
    </div>
  )
}

export default Profile