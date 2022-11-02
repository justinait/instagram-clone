import React, { useState } from 'react'
import { createContext } from 'react';

const SessionContext = createContext();

function SessionProvider({children}) {

    const [localUser, setLocalUser] = useState('')

    const saveUser = (user) => {
        setLocalUser(user);
    }

    return (
        <SessionContext.Provider value={ {saveUser, localUser} } >
            { children }
        </SessionContext.Provider>
    )
}

export default SessionProvider

export { SessionContext }