import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

function Profile() {

    const { username } = useParams();

    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    const getUserPosts = () => {

        db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(s => {
          setPosts(s.docs.map(d => ({
            id: d.id,
            post: d.data()
        })));  
        })

        let aux = posts.filter( (e) => {
            return e.post.username == username;
        })

        setUserPosts(aux)
        
        return userPosts;
    }

    useEffect(() => {
        setUserPosts([]);
        getUserPosts();
    }, [username]);
    
  return (
    <div>
        <h1>{username}</h1>
        {
           userPosts.map((e)=> {
            return <img key={e.id} src={e.post.imgUrl} alt={e.post.textDescription} />
           })
        }
    </div>
  )
}

export default Profile