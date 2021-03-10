import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';
import SearchBox from '../SearchBox.js';
import { Button } from './Button';

function Navbar() {

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    Intern
                </Link>
                <div className="center search">
                    <Route
                        render={({ history }) => (
                            <SearchBox history={history}></SearchBox>
                        )}
                    ></Route>
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link 
                            to='/' 
                            className='nav-links' 
                            onClick={closeMobileMenu}
                        >
                            Home
                        </Link>
                    </li>
                    {
                        userInfo && /*(!(userInfo.isAdmin)==true) && (!(userInfo.isCompany)==true) && */(
                            <li 
                                className='nav-item'
                                
                            >
                                <Link
                                    to='/saved'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Favoritos {savedItems.length > 0 ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
                                    
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo ? (
                            <li
                                className='nav-item'
                                
                            >
                                <Link
                                    to="/profile"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    {userInfo.name} <i class="fas fa-user-circle"></i>
                                </Link>
                            </li>
                        ) :
                        (
                            <li
                                className='nav-item'
                            >
                            <Link
                              to='/signin'
                              className='nav-links-mobile'
                              onClick={closeMobileMenu}
                              
                            >
                              Sign in
                            </Link>
                          </li>
                            
                        )
                    }
                    {
                        userInfo && userInfo.isInstitution && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/internshiplist/institution"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Internships 
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/internshiplist"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Internships 
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/userlist"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Users 
                                </Link>
                            </li>
                        )
                    }
                    
                </ul>
            </nav>
        </>
    );
}

export default Navbar;