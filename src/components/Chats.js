import React from 'react'
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

const Chats = () =>{
    const history = useHistory();

    const handleLogout = async ()=>{
        await auth.signOut();

        history.push('/');
    }
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                ProjectId="1d0b9a90-4126-4f6c-a369-c8927ae6928d"
                userName="."
                userSecret="."
            />
        </div>
    )
}

export default Chats;