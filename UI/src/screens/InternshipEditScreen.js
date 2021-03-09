import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsInternship, updatedInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INTERNSHIP_UPDATE_RESET } from '../constants/internshipConstants';

export default function InternshipEditScreen(props) {
    const internshipId = props.match.params.id;
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [skills, setSkills] = useState('');
    const [payment, setPayment] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [candidates, setCandidates] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const internshipDetails = useSelector(state => state.internshipDetails);
    const { loading, error, internship } = internshipDetails;

    const internshipUpdate = useSelector(state => state.internshipUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = internshipUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/internshiplist');
        }
        if (!internship || (internship._id !== internshipId) || successUpdate) {
            dispatch({ type: INTERNSHIP_UPDATE_RESET });
            dispatch(detailsInternship(internshipId));
        } else {
            setName(internship.name);
            setURL(internship.url);
            setImage(internship.image);
            setCategory(internship.category);
            setSkills(internship.skills);
            setPayment(internship.payment);
            setCompany(internship.company);
            setLocation(internship.location);
            setCandidates(internship.candidates);
            setStatus(internship.status);
            setType(internship.type);
            setDate(internship.date);
            setDescription(internship.description);
        }
    }, [
        internship,
        dispatch,
        internshipId,
        successUpdate,
        props.history
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updatedInternship({
                _id: internshipId,
                name,
                url,
                image,
                category,
                skills,
                payment,
                company,
                location,
                candidates,
                status,
                type,
                date,
                description,
            })
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads/s3', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Internship {internshipId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="url">Website URL</label>
                                    <input
                                        id="url"
                                        type="text"
                                        placeholder="Enter internship url"
                                        value={url}
                                        onChange={(e) => setURL(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input
                                        id="image"
                                        type="text"
                                        placeholder="Enter image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="imageFile">Image File</label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        label="Choose Image"
                                        onChange={uploadFileHandler}
                                    ></input>
                                    {loadingUpload && <LoadingBox></LoadingBox>}
                                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input
                                        id="category"
                                        type="text"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="skills">Skills</label>
                                    <input
                                        id="skills"
                                        type="text"
                                        placeholder="Enter skills"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="company">Company</label>
                                    <input
                                        id="company"
                                        type="text"
                                        placeholder="Enter company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="location">Location</label>
                                    <input
                                        id="location"
                                        type="text"
                                        placeholder="Enter location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="candidates">Candidates</label>
                                    <input
                                        id="candidates"
                                        type="text"
                                        placeholder="Enter candidates"
                                        value={candidates}
                                        onChange={(e) => setCandidates(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="status">Status</label>
                                    <input
                                        id="status"
                                        type="text"
                                        placeholder="Enter status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="type">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="Part-time">Part-time</option>
                                        <option value="Full-time">Full-time</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="type">Salary</label>
                                    <select
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                    >
                                        <option value="Paid">Paid</option>
                                        <option value="Unpaid">Unpaid</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        placeholder="Enter date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        rows="3"
                                        type="textarea"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label>
                                        <button className="primary" type="submit">
                                            Update
                            </button>
                                    </label>
                                </div>
                            </>
                        )}
            </form>
        </div>
    );
}