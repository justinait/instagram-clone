import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from '@mui/material'
import {db, storage} from '../../firebase.js';
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

function ImageUploadModal({username}) {
    
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState('');

  const handleChange = (event) => {
    if(event.target.files[0]){
      setImage(event.target.files[0]);
    }
  }
  
  const handleUpload = (event) => {
    //push to firebase
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress);
      },

      (error) => {
        alert(error.message)
      },

      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            //post the image inside the db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              textDescription: description,
              imgUrl: url,
              username: username
          
            });

          setProgress(0);
          setDescription('');
          setImage('');

        })
      }
    )
    handleClose();
  }
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        < AddIcon fontSize="large" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <progress className="uploadProgress" value={progress} max="100"/>

          <Input
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value) }
          />
          {/* file picker */}
          <Input type="file" onChange={handleChange} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageUploadModal;