import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Contacts() {
    return(
        <div className="contactContainer">
            <form className="form">
                <div>
                    <h1>Contactos</h1>    
                </div>
                <div style={{width:"94%"}}>
                    <h3 style={{margin:"5px"}}>Tem alguma dúvida? Envie email para:</h3>
                    <h4 className="emailContact" style={{ fontWeight: "lighter", paddingLeft:"15px", marginTop:"20px"}}>diogomartins.intern@gmail.com</h4>
                    <h4 className="emailContact" style={{ fontWeight: "lighter", paddingLeft:"15px", marginTop:"-10px"}}>afonsofernandes.intern@gmail.com</h4>
                </div>
                <div>
                    <h4 style={{paddingBottom:"10px"}}>Caso saiba de alguma posição que exista e não estamos a anunciar, não hexite em enviar-nos um email.</h4>
                </div>
            </form>
        </div>
    ); 
}