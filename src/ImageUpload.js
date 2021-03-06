import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import {db, auth, storage} from './firebase.js';
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

function ImageUpload(props) {//
  
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
              imgUrl: url,  //i got the image and i add it here, its part of the post
              username: props.username    //all the data from the post is created here, except from username, i bring it here with props
            });

            setProgress(0);
            setDescription('');
            setImage('');

          })
          //why not set(0) here ?
        }

    )
    //lease onStateChanged ... as it keep changing, as it keep updating, u keep giving me snapshots so i can see the process
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