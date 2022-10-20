import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import ModalLogIn from '../ModalLogIn/ModalLogIn'
import ModalSignUp from '../ModalSignUp/ModalSignUp'

function SessionContainer() {
    
    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((authUser) => {

            if(authUser){
                setUser(authUser);
            } else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }
        
    }, [user])

    return (
        <div>
            {
            user ? 
                <Button onClick={() => auth.signOut()}>Log out</Button>
            :
                <div> 
                    <Button onClick=<ModalLogIn />>Sign up</Button>
                    <Button onClick={() => <ModalSignUp />}>Log in</Button> 
                </div>
            }  
        </div>
    )
}

export default SessionContainer