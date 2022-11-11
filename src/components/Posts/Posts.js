import React from 'react'
import Post from '../Post/Post'
import './Posts.css'

function Posts({postsList}) {
  return (
    <div className="postsContainer">
      {
        postsList.map( ({id, post}, index) => (
          <Post
            key={`post-${id}`}
            post = {post}
            postId = {id}
            index={index}
          />
        ))
      }
    </div>
  )
}

export default Posts