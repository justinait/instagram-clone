import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function PostDetail({post, comments}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <img className="postImg" src={post.imgUrl} alt="Foto" onClick={handleShow}/>

      <Modal 
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <div className="postHeader">
            <Avatar
                className="postAvatar"
                alt={post.username}
                src= {post.avatarImgUrl}
            />
            <h3 className="postUsername">{post.username}</h3>
            </div>
        </Modal.Header>
        <Modal.Body
        display="flex">
            <img className="postImg" src={post.imgUrl} alt="Foto"/>
            <div className='descriptionBox'>

                <h4 className="postDescription">
                    <strong>{post.username} </strong>
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

            </div>


        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostDetail