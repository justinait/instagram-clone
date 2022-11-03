import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../context/SessionContext';
import { db } from '../../firebase';
import Posts from '../Posts/Posts';

function PostsContainer() {

  const {savePostsList} = useContext(SessionContext);
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
    savePostsList(posts)
  }, []);

  return (
    <div>
      <Posts postsList={posts}/>
    </div>
  )
}

export default PostsContainer