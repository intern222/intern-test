import React from 'react';
import './Footer.css';
import { Button } from './Navbar/Button.js';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className="footer-link-wrapper">
          <div className='footer-link-items'>
            <h2>Sobre Nós</h2>
            <Link to='/contacts'>Contactos</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className='footer-link-items'>
            <h2>Redes Sociais</h2>
            <Link to='/'><i className='fab fa-instagram' /> Instagram</Link>
            <Link to='/'><i className='fab fa-facebook-f' /> Facebook </Link>
            <Link to='/'><i className='fab fa-linkedin' /> Linkedin </Link>
          </div>
        </div>
      </div>
      <medium className='website-rights'>Intern © 2021</medium>
    </div>
  );
}

export default Footer;