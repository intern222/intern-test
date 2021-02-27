import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToSaved, removeFromSaved } from '../actions/savedActions';
import MessageBox from '../components/MessageBox';

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
        <div className="row-top">
            <h1>My internships</h1>
            {savedItems.length === 0 ?
                (<div className="box">
                    <MessageBox>
                        0 internships saved.
                            <Link className="mybox" to="/search/name/">
                            <br></br>Save an internship!
                            </Link>
                    </MessageBox>
                </div>

                ) : (
                    <div>
                        {
                            savedItems.map((item) => (
                                <li key={item.internship}>
                                    <div className="row-1">
                                        <div>
                                            <Link to={`/internship/${item.internship}`}>
                                                <img
                                                    className="small"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </Link>
                                        </div>
                                        <div className="min">
                                            <Link to={`/internship/${item.internship}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <button className="small" onClick={() => window.location.href = `${item.url}`} disabled={savedItems.length === 0}> Apply </button>
                                        </div>
                                        <div>
                                            <button className="small" onClick={() => removeFromSavedHandler(item.internship)}> Delete </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );

}