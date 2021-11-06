import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        auth.onAuthStateChanged((user) =>{
            setUser(user);
            setLoading(false);
            history.push('/chats');
        })
    },[user,history]);

    const 
}