import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase';
import ModalLogIn from '../ModalLogIn/ModalLogIn'
import ModalSignUp from '../ModalSignUp/ModalSignUp'
import Avatar from "@mui/material/Avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import '../Navbar/Navbar.css'
import { SessionContext } from '../../context/SessionContext';

function SessionContainer() {
    
    const [user, setUser] = useState(null);

    const { saveUser } = useContext(SessionContext)

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((authUser) => {

            if(authUser){
                setUser(authUser);
                saveUser(user)
            } else {
                setUser(null);
                saveUser(user)
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
                    <h3>
                        {console.log(user)}
                        {user.displayName}
                    </h3>

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