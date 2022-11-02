import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import {db, auth, storage} from '../../firebase.js';
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

function ImageUpload({username}) {//
  
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
    //acces to storage in firebase, get a reference to this img. we r also creating a folder rn
    //image.name is the filename selected
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
            db.collection('posts').add({    //this is the posts inside the firebase.js
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
  }
  
  return (
    <div className="imageUploadContainer">
      <progress className="uploadProgress" value={progress} max="100"/>
      
      <Input 
        type="text"
        placeholder="Enter a description"
        value={description}
        onChange={(e) => setDescription(e.target.value) }
      />
      {/* file picker */}
      <Input type="file" onChange={handleChange} />   {/* handlechanges saids what happen when you pick a FILE (el boton abrir dentro de la vetnanita dnd elegis)*/}

      <Button onClick={handleUpload}>        POST      </Button>
    </div>
  )
}

export default ImageUpload