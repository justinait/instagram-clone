import React from 'react'
import Post from '../Post/Post'
import './Posts.css'

function Posts({postsList}) {
  return (
    <div className="postsContainer">
      {
        postsList.map( ({id, post}) => (
          <Post
            post = {post}
            key={`post-${id}`}
            postId = {id}
          />
        ))
      }
    </div>
  )
}

export default Posts