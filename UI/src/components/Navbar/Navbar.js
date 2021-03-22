import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../SearchBox.js';
import { signout } from '../../actions/userActions.js';

function Navbar() {

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [click, setClick] = useState(false);

    const dispatch = useDispatch();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const signoutHandler = () => {
        dispatch(signout());
    };



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
                            Início <i class="fas fa-home"></i>
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
                        userInfo && userInfo.isInstitution && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/internshiplist/institution"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Estágios <i class="fas fa-edit"></i>
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
                                    Estágios <i class="fas fa-edit"></i>
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
                                    Utilizadores <i class="fas fa-hand-middle-finger"></i>
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo ? (
                            (userInfo.isInstitution || userInfo.isAdmin) ? (
                                <li
                                    className='nav-item'
                                    
                                >
                                    <Link
                                        to="/prf"
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
                                    to="/" 
                                    className='nav-links-mobile'
                                    onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            )
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
                </ul>
            </nav>
        </>
    );
}

export default Navbar;