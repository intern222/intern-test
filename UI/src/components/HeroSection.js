import React from 'react';
import './HeroSection.css';
import '../App.css';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBoxHero.js';

function HeroSection () {
    return (
        <div className='hero-container'>
            <h1>O TEU FUTURO COMEÇA AGORA</h1>
            <p>
                <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                ></Route>
            </p>
        </div>
    )
}

export default HeroSection;