import React from 'react'
import {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () =>{
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = response.blob();

        return new File([data], 'userPhoto.jpg', {type:'image/jpeg'});
    }
    
    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
  
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "25549201-c7a1-4386-8afc-bb95c40bd246",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.displayName);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar',avatar,avatar.name);

                axios.post('https://api.chatengine.io/users/',
                formdata,
                {headers: {"private-key": "ef723093-f6c0-4e16-8919-a019e077ed04"}}
                )
            })
            .then(()=>setLoading(false))
            .catch((error)=> console.log(error));
        })
    },[user,history])

    const handleLogout = async ()=>{
        await auth.signOut();

        history.push('/');
    }
    
    if(!user || loading) return "loading...";

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                projectID= "25549201-c7a1-4386-8afc-bb95c40bd246"
                height="calc(100vh - 66px)"
                userName={user.email}
                userSecret={user.uid}
                
            />
        </div>
    )
}

export default Chats;