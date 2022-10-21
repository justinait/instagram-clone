import React from 'react'
import Post from '../Post/Post'
import './Posts.css'

function Posts({postsList}) {
  return (
    <div className="postsContainer">
      {
        postsList.map( ({id, post}) => (
          <Post
            key={`post-${id}`}
            avatarImgUrl = {post.avatarImgUrl}
            username = {post.username}
            imgUrl = {post.imgUrl}
            textDescription = {post.textDescription}
            postId = {id}
            // user = {user}
          />
        ))
      }
    </div>
  )
}

export default Posts