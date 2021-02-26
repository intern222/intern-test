import React from 'react'
import { Link } from 'react-router-dom';


export default function Internship(props) {
    const {internship} = props;
    var creationDate = new Date(internship.createdAt);
    return (
        <div key={internship._id} className="card">
            <div>
                <Link to={`/internship/${internship._id}`}>
                    <img className="medium" 
                    src={internship.image}
                    alt={internship.name}
                    />
                </Link>
            </div>
            <div className="card-text">
                <span className="date" style={{fontSize:"15px"}}>{creationDate.toDateString()}</span>
                <h2>{internship.name}</h2>
            </div>
            <div className="card-stats">
                <div className="stat">
                    <div className="value">{internship.location}</div>
                    <div className="type">Location</div>
                </div>
                <div className="stat">

                        <Link  className="link" to={`/institution/${internship.institution._id}`}>
                            {internship.institution.institution.name}                
                        </Link>

                    <div className="type">Company</div>
                </div>
                <div className="stat">
                    <div className="value">{internship.type}</div>
                    <div className="type">Type</div>
                </div>
            </div>
        </div>
    )
}