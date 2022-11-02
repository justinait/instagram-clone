import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import Posts from '../Posts/Posts';

function PostsContainer() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
  
      db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(s => {
          setPosts(s.docs.map(d => ({
            id: d.id,
            post: d.data()
        })));  
      })
  
    }, []);

  return (
    <div>
        <Posts postsList={posts}/>
    </div>
  )
}

export default PostsContainer