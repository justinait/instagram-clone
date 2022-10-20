import React, { useState } from 'react'
import { Button, createTheme, Modal, Input } from '@mui/material';
import { auth } from '../../firebase';

function ModalSignUp() {
    
    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (event) => {
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
            displayName: username
            })
        })
        .catch((error) => alert(error.message));   //create the message automatically 
        
        setOpen(false);
    }
  return (
    <div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div
                // style={modalStyle}  className={classes.paper}
                >
                <form className="signUp">
                    <center>
                        <img src='./instagramIcon.png' alt="Instagram" width="30"/>    
                    </center>
                    <Input
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />      

                    <Button type="submit" onClick={signUp}>     OK     </Button>

                </form>
            
            </div>
        </Modal>
    </div>
  )
}

export default ModalSignUp