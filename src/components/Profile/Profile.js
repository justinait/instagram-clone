import { collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

function Profile() {

    const { username } = useParams();

    const [userPosts, setUserPosts] = useState([]);

    const getUserPosts = async () => {

        const postCollection = collection(db, 'posts');
        const postSnapshot = await getDocs(postCollection);

        const postList = postSnapshot.docs.map( (e) => {
            let post = e.data();
            post.id = e.id;

            return post;
        })

        let aux = postList.filter( (e) => {
            return e.username == username;
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
            return <img key={e.id} src={e.imgUrl} alt={e.textDescription} />
           })
        }
    </div>
  )
}

export default Profile