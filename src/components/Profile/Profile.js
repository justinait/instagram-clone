import { collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import './Profile.css'
import Avatar from "@mui/material/Avatar"

function Profile() {

    const { username } = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [avatar, setAvatar] = useState();
    const [amount, setAmount] = useState(0);

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

        setAmount(aux.length);
        setUserPosts(aux);
        setAvatar(aux[0].avatarImgUrl);

        return userPosts;
    }

    useEffect(() => {
        setUserPosts([]);//esto esta de mas, vd?
        getUserPosts();
        setAmount(0);
    }, [username]);
    
  return (
    <div className='profileContainer'>

        <div className='profileInfo'>
            <Avatar
                className="profileAvatar"
                alt={username}
                src= {avatar}
                sx={{ width: 256, height: 256 }}
            />    
            <h1>{username}</h1>
            <h3>{amount} publicaciones</h3>
        </div>
        
        <div className='profileFeed'>
        {
           userPosts.map((e)=> {
            return (
                <img className='profilePost' key={e.id} src={e.imgUrl} alt={e.textDescription} />
            )
           })
        }
        </div>
        
    </div>
  )
}

export default Profile