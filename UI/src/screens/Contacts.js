import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Contacts() {
    return(
        <div className="signinContainer">
            <form className="form">
                <div>
                    <h1>Contactos</h1>    
                </div>
                <div style={{width:"100%"}}>
                    <h3 style={{margin:"5px"}}>Tem alguma dúvida? Envie email para:</h3>
                    <h4 style={{ fontWeight: "lighter", paddingLeft:"20px"}}>diogomartins26@tecnico.ulisboa.pt</h4>
                    <h4 style={{ fontWeight: "lighter", paddingLeft:"20px"}}>afonso.oliveira.fernandes@tecnico.ulisboa.pt</h4>
                </div>
                <div>
                    <h4 style={{paddingBottom:"10px"}}>Caso saiba de alguma posição que exista e não estamos a anunciar, não exite em enviar-nos um email.</h4>
                </div>
            </form>
        </div>
    ); 
}