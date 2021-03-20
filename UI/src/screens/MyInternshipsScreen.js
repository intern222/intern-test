import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToSaved, removeFromSaved } from '../actions/savedActions';
import MessageBox from '../components/MessageBox';
import Moment from 'moment';

export default function SavedInternshipsScreen(props) {
    const internshipId = props.match.params.id;

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const dispatch = useDispatch();

    useEffect(() => {
        if (internshipId) {
            dispatch(addToSaved(internshipId));
        }
    }, [dispatch, internshipId]);

    const removeFromSavedHandler = (id) => {
        dispatch(removeFromSaved(id));
    }

    return (
        <div>
            <div div className="row-top">
            <h1>Favoritos</h1>
            </div>
            {savedItems.length === 0 ?
                (<div className="box">
                    <MessageBox>
                        Não tem Favoritos
                            <Link className="mybox" to="/search/name/">
                            <br></br>Procure Estágios aqui!
                            </Link>
                    </MessageBox>
            </div>

                ) : ( 
                        
                            <div>
                                <div className ="container_basic">
                                    {savedItems.map((item) => (
                                    <div key={item.internship}>
                                  
                                        <div className="courses-container">
                                            <Link className="card-link" to={`/internship/${item.internship}`}>
                                                <div className="course">
                                                    <div className="avatar-holder">
                                                        <img className="small" 
                                                            src={item.image}
                                                            alt={item.name}
                                                        />
                                                    </div>

                                                    <div className="course-info">
                                                            <div className="course-type">
                                                                {item.type}
                                                            </div>
                                                        <div className="progress-container">
                                                            <h6>{item.location}</h6>
                                                            <h6>{Moment(item.createdAt).format('DD/MM/YYYY')}</h6>
                                                        </div>
                                                        {
                                                            (item.name).length > 20 
                                                                ? <h4>{item.name}</h4>  
                                                                    : <h2>{item.name}</h2>
                                                        }
                                                        <Link 
                                                            onClick={() => removeFromSavedHandler(item.internship)}><i className="far fa-trash-alt"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                
                            ))
                        }
                        </div>
                        </div>
                    
                )
            }
        </div>
    );

}                                    