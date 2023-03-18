import React, { FormEvent, useState, useReducer, useEffect, } from 'react';
import { User } from '../Interfaces/User.ts';
import { AuthAction } from '../Interfaces/AuthAction.ts';
import { LoginPayLoad } from '../Interfaces/LoginPayLoad.ts';
import '../UI/style.css';

const initialState:User = {
    validating:false,
    token:null,
    name:"Juan",
    username:"admin",
    password:"12345",
    logged:false
}

const authReducer = (state : User, action:AuthAction) : User => {
    switch(action.type) {

        case 'logout':
            return {
                password:'',
                username:'',
                name:'',
                token:'ABC123',
                validating:false,
                logged:false
            };

        case 'login':
            const {password,username} = action.payload
            return {
                password,
                name:'Juan',
                username,
                validating:true,
                token:'ABC123',
                logged:true
            }

        default: 
            return state;
    }
}

function Login(){
    
    const[state,dispatch] = useReducer(authReducer,initialState);
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[submited,setSubmited] = useState(false);

     const login = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload : LoginPayLoad = {
            name:"Juan",
            username:'admin',
            password: '12345',
        };
        setSubmited(true);
        dispatch({type: 'login',payload});
    }
    
    const logout = () => {
        dispatch({type: 'logout'});
    }

    const handleReload = () => {
    window.location.reload();
    }

    useEffect(()=> {
        setTimeout(logout,3000);
    },[]);

    return(
        <div className='login'>
            <form onSubmit={login}>
                <h1>Login form</h1>
                <div className='user'>
                    <label>Username</label>
                    <input 
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>

                <div className='password'>
                    <label>Password</label>
                    <input 
                    type="text"
                    name="password"
                    value={password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className='buttons'>
                    <input className='btn-login' type="submit" value="Login"/>
                    <button onClick={logout}>Log out</button>
                </div>
            </form>
            {submited && state.validating && state.username==username && state.password == password &&<h4>Welcome: {state.name} your username is: {username}</h4>  }
        </div>
    );
}

export default Login;