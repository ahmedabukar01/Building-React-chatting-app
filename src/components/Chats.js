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
    
    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }

        const getFile = async (url) =>{
            const response = await fetch(url);
            const data = response.blob();

            return new File([data], 'userPhoto.jpg', {type:'image/jpeg'});
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
        })
    },[user,history])

    const handleLogout = async ()=>{
        await auth.signOut();

        history.push('/');
    }
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
                projectId= "25549201-c7a1-4386-8afc-bb95c40bd246"
                height="calc(100vh - 66px)"
                userName="."
                userSecret="."
                
            />
        </div>
    )
}

export default Chats;