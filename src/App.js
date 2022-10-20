import './App.css';
import React, { useState} from 'react';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Navbar from './components/Navbar/Navbar';
import PostsContainer from './components/PostsContainer/PostsContainer';
import ImageUpload from './components/ImageUpload/ImageUpload.js'

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
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle)

  const [user, setUser] = useState(null);

  return (
    <div>

      <Navbar user={user} setUser={setUser}/>
      <PostsContainer />
      
      { 
        // user && <ImageUpload username={user.displayName} />
      }

    </div>
  );
}

export default App;