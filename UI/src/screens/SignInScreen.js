import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : `/profile`;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return(
        <div className="signinContainer">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>    
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <input 
                        className="un" 
                        type="email" 
                        placeholder="Email" 
                        align="center"
                        required 
                        onChange={ (e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input 
                        className="pass" 
                        type="password" 
                        align="center" 
                        placeholder="Password"
                        required 
                        onChange={ (e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="signinButton" type="submit">Sign In</button>                    
                </div>
                <div>
                    <label/>
                    <div>
                        New customer? <Link className="linkCreateAccount" to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>  
                </div>
            </form>
        </div>
    ); 
}