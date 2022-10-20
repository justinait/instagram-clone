import { Button, createTheme, Modal, Input } from '@mui/material';
import React, { useState } from 'react'
import { auth } from '../../firebase';

function ModalLogIn() {

    const [open, setOpen] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (event) => {
        event.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));

        setOpen(false);
    }

    return (
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

            {/* <button onClick={signInWithGoogle}>
              Sign In with Google
            </button> */}

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

            <Button type="submit" onClick={signIn}>     OK     </Button>
            
          </form>
          
        </div>
      </Modal>
    )
}

export default ModalLogIn