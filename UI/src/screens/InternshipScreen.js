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
                                            {(internship.status === 'Open' && userInfo !== null)
                                                ? 
                                                <button className="iscreen" onClick={() => window.location.href = `${internship.url}`}> Candidatar<i style={{marginLeft:"5px"}} class="fas fa-share-square"></i></button>
                                                :   
                                                <button onClick={() => window.alert("Sign In para candidatar!")} className="iscreen">Candidatar<i style={{marginLeft:"5px", fontSize:"12px"}} class="fas fa-share-square"></i></button>
                                            }
                                            {
                                                (internship.status === 'Open' && userInfo !== null) 
                                                ? 
                                                    <button onClick={addToCartHandler} className="iscreen">Salvar</button> 
                                                :   
                                                    <button onClick={() => window.alert("Sign In para guardar!")} className="iscreen">Guardar</button>
                                            }
                                        </div>
                                </div>
                                  
                            <div className="intern_containers">
                                <div className="description">
                                    <h3>Description</h3>
                                    <h4>
                                        {internship.description}
                                    </h4>
                                </div>

                                <div className="feactures">
                                    <h3 className="work_functions">
                                        Skills
                                    </h3>
                                    <h4 className="candidates">  
                                        {internship.skills} 
                                    </h4>

                                    <h3 className="work_functions">
                                        Salary
                                    </h3>
                                    <h4 className="candidates">  
                                        {internship.payment} 
                                    </h4>
                                </div>
                            </div>
                                
                        </div>
                )}
        </div>
)}