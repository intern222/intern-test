import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function InternshipScreen(props) {
    const dispatch = useDispatch();
    const internshipId = props.match.params.id;
    const internshipDetails = useSelector((state) => state.internshipDetails);
    const { loading, error, internship } = internshipDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        dispatch(detailsInternship(internshipId));
    }, [dispatch, internshipId]);

    const addToCartHandler = () => {
        if (userInfo){
            props.history.push(`/saved/${internshipId}`)
        }
    };
    
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger" >{error}</MessageBox>
            ) : (
                        <div>
                            
                                
                                <div className="col_4">
                                    <div className="avatar-holder-1">
                                        <img className="large" src={internship.image} alt={internship.company}></img>
                                    </div>
                                    
                                        <div className="name">{internship.name}</div>
                                        <div className="location">{internship.location}</div>
                                        
                                        
                                        <h3>
                                            <Link className="intern_link" to={`/institution/${internship.institution._id}`}>
                                            {internship.institution.institution.name}   
                                            </Link>
                                        </h3>
                                        <div className="apply_save">
                                            {internship.status === 'Open' &&  (
                                                <button className="iscreen" onClick={() => window.location.href = `${internship.url}`}> Apply </button>)
                                            }
                                            {internship.status === 'Open' &&  (
                                                <button onClick={addToCartHandler} className="iscreen">Save</button>)   
                                                }
                                        </div>
                                   
                                    
                                    {/*<div className="col-5">
                                    
                                    
                                        <div className="card_body">
                                            <ul>
                                                <li>
                                                
                                                </li>
                                                {
                                                    internship.status === 'Open' &&  (
                                                        <li>
                                                            <button className="iscreen" onClick={() => window.location.href = `${internship.url}`}> Apply </button>
                                                        </li>
                                                    )
                                                }
                                                
                                                {
                                                    internship.status === 'Open' &&  (
                                                        <li>
                                                            <button onClick={addToCartHandler} className="iscreen">Save</button>
                                                        </li>
                                                    ) 
                                                }
                                                <p></p>
                                                {
                                                    !userInfo && (
                                                        <li>
                                                            <MessageBox variant="danger" >
                                                                Sign in to Apply and Save
                                                            </MessageBox>
                                                        </li>
                                                    )
                                                }            
                                            </ul>
                                        </div>
                                            </div>*/}
                                </div>
                                  
                            <div className="intern_containers">
                                <div className="description">
                                    <h4>
                                    {internship.description}
                                    </h4>
                                </div>

                                <div className="feactures">
                                    <div className="work_functions"> Position:</div>
                                    <div className="candidates">  {internship.candidates} Candidates</div>
                                </div>
                            </div>
                                
                        </div>
                )}
        </div>
)}