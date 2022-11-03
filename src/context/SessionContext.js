import React, { useState } from 'react'
import { createContext } from 'react';

const SessionContext = createContext();

function SessionProvider({children}) {

    const [localUser, setLocalUser] = useState('')
    const [postsList, setPostsList] = useState([])

    const saveUser = (user) => {
        setLocalUser(user);
    }

    const savePostsList = (posts) => {
        setPostsList(posts)
    }
    
    return (
        <SessionContext.Provider value={ {saveUser, localUser, savePostsList, postsList} } >
            { children }
        </SessionContext.Provider>
    )
}

export default SessionProvider

export { SessionContext }