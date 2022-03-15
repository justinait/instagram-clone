import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import db from './firebase.js';
import { Button, createTheme, Modal } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';


function getModalStyle(){
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: 'black',
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    color: 'white'
  }
}))

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {         //this is the posts inside the firebase.js

    db.collection('posts').onSnapshot(s => {
      
      setPosts(s.docs.map(d => ({
        id: d.id,
        post: d.data()
      })));
      
      
    })    //SNAPSHOT -> when there's a new document(post), the machine take a photo

  }, []);//it runs when the page loads or refresh, and eery single time that a post change

  
  const signUp = (event) => {

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}                 //onClose={handleClose}         //const handleClose = () => {    setOpen(false);  } //    
      >
        <div style={modalStyle}  className={classes.paper}>
          <h2>im a modal</h2>
        </div>
      </Modal>

      <div className="header">
        <img className="headerImg" src='instagram.png' alt="Instagram" />
      </div>

      <Button onClick={() => setOpen(true)}>Sign up</Button>

      {
        posts.map( ({id, post}) => (
          <Post
            key={id}
            avatarImgUrl = {post.avatarImgUrl}
            username = {post.username}
            imgUrl = {post.imgUrl}
            textDescription = {post.textDescription}
          />
        ))
      }
      
    </div>
  );
}

export default App;