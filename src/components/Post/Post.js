import React, {useState, useEffect, useContext} from 'react'
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import './Post.css'
import Avatar from "@mui/material/Avatar"
import { Button, Input } from '@mui/material';
import { db } from '../../firebase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { SessionContext } from '../../context/SessionContext';
import { Link } from 'react-router-dom';

function Post({post, postId}) {

  const { localUser } = useContext(SessionContext)

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

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
       username: localUser.displayName,
       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setComment('');
  }
  
  return (
    <div className="post">

      <Link to={`/${post.username}`}>
        <div className="postHeader">
          <Avatar
            className="postAvatar"
            alt={post.username}
            src= {post.avatarImgUrl}
          />
          <h3 className="postUsername">{post.username}</h3>
        </div>
      </Link>

      <img className="postImg" src={post.imgUrl} alt="Foto" />
      <div className='descriptionBox'>

      {
      localUser &&      
        <div className="likeAndComment">
          < FavoriteBorderIcon fontSize="large" />
          < ChatBubbleOutlineIcon fontSize="large" />
        </div>
      }
      <h4 className="postDescription">
        <strong>{post.username} </strong>
        {post.textDescription}
      </h4>

      <div className='comments'>
        
        {comments.map((comment) => (
          <p> 
            <strong>            {comment.username}            </strong>
            {comment.text}
          </p>
        ))}
      </div>

      {localUser && (    
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

    </div>
  )
}

export default Post