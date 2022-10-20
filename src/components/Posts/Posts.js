import React from 'react'
import Post from '../Post/Post'

function Posts({postsList}) {
  return (
    <div className="posts">
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