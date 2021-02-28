import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { register } from '../actions/userActions';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm password are not match');
        } else{
            dispatch(register(name, email, password));
        }
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
                    <h1>Create Account</h1>    
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <input 
                        className="un" 
                        type="text" 
                        placeholder="Name" 
                        align="center"
                        required 
                        onChange={ (e) => setName(e.target.value)}
                    ></input>
                </div>
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
                        placeholder="Password"
                        align="center" 
                        required 
                        onChange={ (e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input 
                        className="pass" 
                        type="password" 
                        placeholder="Confirm Password"
                        align="center" 
                        required 
                        onChange={ (e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="signinButton" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? <Link className="linkCreateAccount" to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>  
                </div>
            </form>
        </div>
    ); 
}