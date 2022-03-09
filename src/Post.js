import React from 'react'
import './Post.css'
import Avatar from "@mui/material/Avatar"   //import Avatar from "@babel/core"

function Post(props) {
  return (
    <div className="post">

        <div className="postHeader">
            
            <Avatar
                className="postAvatar"
                alt={"Username"}
                src= {props.avatarImgUrl}
            />

            <h3 className="postUsername">{props.username}</h3>

        </div>

        <img className="postImg" src={props.imgUrl} alt="Foto" />
        
        <h4 className="postDescription">
            <strong>{props.username} </strong>
            {props.textDescription}
        </h4>

    </div>
  )
}

export default Post