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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body>
          
          <div className="postHeader">
            <Avatar
              className="postAvatar"
              alt={post.username}
              src={post.avatarImgUrl}
            />
            <h3 className="postUsername">{post.username}</h3>
          </div>
          <img className="postImg" src={post.imgUrl} alt="Foto"/>  
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostDetail