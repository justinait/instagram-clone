import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import ModalLogIn from '../ModalLogIn/ModalLogIn'
import ModalSignUp from '../ModalSignUp/ModalSignUp'
import Avatar from "@mui/material/Avatar"
import LogoutIcon from '@mui/icons-material/Logout';

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
                <div className='rightNavbar'>
                    <Avatar
                        className="postAvatar"
                        alt={user.username}
                        src= {user.avatarImgUrl}
                    />
                    <Button onClick={() => auth.signOut()}>
                        <LogoutIcon fontSize="large" color="dark" />
                    </Button>
                </div>
            :
                <div className='rightNavbar'>
                    <ModalSignUp />
                    <ModalLogIn />
                </div>
            }  
        </div>
    )
}

export default SessionContainer