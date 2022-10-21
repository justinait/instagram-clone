import React, {useState, useEffect} from 'react'
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import './Post.css'
import Avatar from "@mui/material/Avatar"   //import Avatar from "@babel/core"
import { Button, Input } from '@mui/material';
import { db } from '../../firebase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function Post(props) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  let postId = props.postId;

  useEffect(()=> {
    let unsubscribe;
      
    if(postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot( s => {
          setComments(s.docs.map((d)=> d.data() ) );
        })
      }
    
    return () => {   unsubscribe();  }

  }, [postId])

  const postComment = (e) => {
    e.preventDefault();

    db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
       text: comment,
       username: props.user.displayName,       //username: props.username//noo, not the poster username, the username from who logged in
       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setComment('');
  }
  
  return (
    <div className="post">

      <div className="postHeader">
        <Avatar
          className="postAvatar"
          alt={props.username}
          src= {props.avatarImgUrl}
        />
        <h3 className="postUsername">{props.username}</h3>
      </div>

      <img className="postImg" src={props.imgUrl} alt="Foto" />


      {props.user &&      
        <div className="likeAndComment">
          < FavoriteBorderIcon fontSize="large" />
          < ChatBubbleOutlineIcon fontSize="large" />
        </div>
      }
      <h4 className="postDescription">
        <strong>{props.username} </strong>
        {props.textDescription}
      </h4>

      <div className='comments'>
        
        {comments.map((comment) => (
          <p> 
            <strong>            {comment.username}            </strong>
            {comment.text}
          </p>
        ))}
      </div>

      {props.user && (    
        <form className="addCommentContainer">
          <Input
            className="addComment"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
          />
          <Button
            className="postCommentButton"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Send
          </Button>
        </form>
      )}

    </div>
  )
}

export default Post