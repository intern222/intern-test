import React from 'react';
import './HeroSection.css';
import { Button } from './Navbar/Button';
import '../App.css';
import { Link } from 'react-router-dom';

function HeroSection () {
    return (
        <div className='hero-container'>
            <img src='/images/fundo_intern.png'></img>
            <h1>YOUR FUTURE STARTS HERE</h1>
            <p>Start to look and Follow your dreams!</p>
        </div>
    )
}


export default HeroSection;