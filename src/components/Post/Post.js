import React, {useState, useEffect, useContext} from 'react'
import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import './Post.css'
import Avatar from "@mui/material/Avatar"
import { Button, Input } from '@mui/material';
import { db } from '../../firebase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { SessionContext } from '../../context/SessionContext';
import { Link } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import PostDetail from '../PostDetail/PostDetail';
import DeleteModal from '../DeleteModal/DeleteModal';

function Post({post, postId}) {

  const { localUser } = useContext(SessionContext)

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [selected, setSelected] = useState(false);

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

      <Link to={`/${post.username}`} style={{textDecoration: "none", color: 'black'}}>
        <div className="postHeader">
          <Avatar
            className="postAvatar"
            alt={post.username}
            src= {post.avatarImgUrl}
          />
          <h3 className="postUsername">{post.username}</h3>
        </div>
      </Link>

      < PostDetail post={post} comments={comments}/>

      <div className='descriptionBox'>

      {
      localUser &&      
        <div className='postsOptions'>
          <div className="likeAndComment">
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              < FavoriteBorderIcon fontSize="large" />
            </ToggleButton>

            < ChatBubbleOutlineIcon fontSize="large" />
          
          </div>
          <div>
            {
              post.username == localUser.displayName &&  < DeleteModal id={postId} />
            }
          </div>
        </div>
      }

      <h4 className="postDescription">
        <Link to={`/${post.username}`} style={{textDecoration: "none", color: 'black'}}>
          <strong> {post.username}</strong>
        </Link>
        {post.textDescription}
      </h4>

      <div className='comments'>
        
        {comments.map((comment, i) => (
          <p key={`comment-${i}`}> 
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