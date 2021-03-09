import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Moment from 'moment';

export default function Internship(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const {internship} = props;
    return (
        
        <div className="courses-container">
            <Link className="card-link" to={`/internship/${internship._id}`}>
                <div className="course">
                    <div className="avatar-holder">
                        <img className="small" 
                        src={internship.image}
                        alt={internship.name}
                        />
                    </div>

                    <div className="course-info">
                        <div className="course-type">
                            {internship.type}
                        </div>
                        <div className="progress-container">
                            <h6>{internship.location}</h6>
                            <h6>{Moment(internship.createdAt).format('DD/MM/YYYY')}</h6>
                        </div>
                        <h5>{internship.company}</h5>
                        {
                            (internship.name).length > 15 
                                ? <h4>{internship.name}</h4>  
                                    : <h2>{internship.name}</h2>
                        }
                        <Link 
                            to={`/saved/${internship._id}`} title="Save"><i className="far fa-bookmark"></i>
                        </Link>
                        {
                            userInfo 
                            ? 
                                <Link 
                                    to={`/saved/${internship._id}`} title="Save"><i className="far fa-bookmark"></i>
                                </Link>
                            : 
                                <Link 
                                    onClick={() => window.alert("Sign In to save!")} title="Save"><i className="far fa-bookmark"></i>
                                </Link>
                        }
                    </div>
                </div>
            </Link>
        </div>

    )
}