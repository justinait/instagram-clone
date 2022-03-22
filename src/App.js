import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import {db, auth } from './firebase.js';
import { Button, createTheme, Modal, Input } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import ImageUpload from './ImageUpload.js'
import './ImageUpload.css';

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
    backgroundColor: 'white',
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    color: 'black',
  }
}))

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {

      if(authUser){   //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {    //guest mode
        setUser(null);
      }
    })

    return () => {
      //performe some cleanup actions //?
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {         //this is the posts inside the firebase.js

    db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(s => {
        
        setPosts(s.docs.map(d => ({
          id: d.id,
          post: d.data()
        })));
      
    })    //SNAPSHOT -> when there's a new document(post), the machine take a photo

  }, []);//it runs when the page loads or refresh, and every single time that a post change

  
  const signUp = (event) => {
    event.preventDefault();   //so it doesnt refresh

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username                         //i dont get the difference btwn displayname and username   //literally theres no difference but i've to have both cause displayname is a property from auth, wich value is username
        })
      })
      .catch((error) => alert(error.message));   //create the message automatically 
    
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    //que cheque si los datos son correctos y dependiendo de eso tira error o entra
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}                 //onClose={handleClose}         //const handleClose = () => {    setOpen(false);  } //    
      >
        <div style={modalStyle}  className={classes.paper}>
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
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle}  className={classes.paper}>
          <form className="signUp">
            <center>
              <img src='./instagramIcon.png' alt="Instagram" width="30"/>    
            </center>
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

      <div className="header">
        <img className="headerImg" src='instagram.png' alt="Instagram" />
        
        {user ? (
        <Button onClick={() => auth.signOut()}>Sign out</Button>
          ) : (
        <>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
        </>
        )   }         
      
      </div>

      <div className="posts">
        {
          posts.map( ({id, post}) => (
            <Post
              key={`post-${id}`}
              avatarImgUrl = {post.avatarImgUrl}
              username = {post.username}
              imgUrl = {post.imgUrl}
              textDescription = {post.textDescription}
              postId = {id}
              user = {user}
            />
          ))
        }  
      </div>
      
      { user ? (
        <ImageUpload          username={user.displayName}        />
      ): (
        <>
          <h3>Login to upload something</h3>
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
        </>
      )}

    </div>
  );
}

export default App;