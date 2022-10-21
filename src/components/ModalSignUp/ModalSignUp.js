import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { auth } from '../../firebase';

function ModalSignUp() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    
    handleClose();
  }
    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        SIGN UP
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <img src='./instagramIcon.png' alt="Instagram" width="30"/>    
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
           
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" onClick={signUp}>     OK     </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSignUp

