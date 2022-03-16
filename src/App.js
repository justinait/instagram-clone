import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import {db, auth, storage} from './firebase.js';
import { Button, createTheme, Modal, Input } from '@mui/material';
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

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsuscribe = auth.onAuthStateChanged((authUser) => {

      if(authUser){   //user has logged in
        
        console.log(authUser);
        setUser(authUser)

      } else {    //guest mode
        setUser(null);
      }
    })

    return () => {
      //performe some cleanup actions //?
      unsuscribe();
    }
  }, [user, username])

  useEffect(() => {         //this is the posts inside the firebase.js

    db.collection('posts').onSnapshot(s => {
      
      setPosts(s.docs.map(d => ({
        id: d.id,
        post: d.data()
      })));
      
    })    //SNAPSHOT -> when there's a new document(post), the machine take a photo

  }, []);//it runs when the page loads or refresh, and eery single time that a post change

  
  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username                         //i dont get the difference btwn displayname and username   //literally theres no difference but i've to have both cause displayname is a property from auth, wich value is username
      })
    })
    .catch((error) => alert(error.message))   //create the message automatically 
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
            
            <Button type="submit" onClick={signUp}>     Sign Up     </Button>

          </form>
          
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