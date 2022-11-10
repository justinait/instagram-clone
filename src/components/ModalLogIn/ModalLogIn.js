import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SessionContext } from '../../context/SessionContext';
import { auth, signInWithGoogle } from '../../firebase';

function ModalLogIn() {

  const { user } = useContext(SessionContext)

  const [show, setShow] = useState(false);

  
  const handleClose = () => {
    
    setShow(false);
    
    setEmail('');
    setPassword('');
    
  }
  const handleShow = () => setShow(true);    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (event) => {
    event.preventDefault();
    
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        SIGN IN
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src='./instagramIcon.png' alt="Instagram" width="30"/>    
        </Modal.Header>
        <Modal.Body>
          {/* <button onClick={signInWithGoogle}>
            Sign In with Google
          </button> */}
            
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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
        <Button type="submit" onClick={signIn}>     OK     </Button>
      </Modal.Footer>
      </Modal>
    </>
      
  )
}

export default ModalLogIn