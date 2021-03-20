import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, signout, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [institutionName, setInstitutionName] = useState('');
    const [institutionLogo, setInstitutionLogo] = useState('');
    const [institutionDescription, setInstitutionDescription] = useState('');

    const userSignin = useSelector( state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdateProfile = useSelector( state => state.userUpdateProfile);
    const {
        success: successUpdate, 
        error: errorUpdate, 
        loading : loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else{
            setName(user.name);
            setEmail(user.email);
            if(user.institution){
                setInstitutionName(user.institution.name);
                setInstitutionLogo(user.institution.logo);
                setInstitutionDescription(user.institution.description);
            }
        }
    }, [dispatch, userInfo._id, user]);

    const signoutHandler = () => {
        dispatch(signout());
    };

    const submitHandler = (e) =>{
        window.location.reload();
        e.preventDefault();
        dispatch(
            updateUserProfile({ 
                userId: user._id, 
                name, 
                email, 
                institutionName, 
                institutionLogo,
                institutionDescription,
            })
        );
    }

    return(
        <div className="signinContainer">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Perfil do Utilizador</h1>
                </div>
                {
                    loading? (
                        <LoadingBox></LoadingBox>
                    ) : error? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                    <>  
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                        <MessageBox variant="success">Profile Updated Successfully</MessageBox>
                    )}
                        <div>
                            <div style={{paddingLeft:"60px"}}>
                                <h3 style={{ margin: "5px" }} htmlFor="categoria">Nome</h3>
                                <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: tamanho máximo de 25 caracteres</h5>
                            </div>
                            <input
                                className="un" 
                                type="text" 
                                placeholder="Name" 
                                align="center"
                                maxlength="25"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input> 
                        </div>
                        <div>
                            <div style={{paddingLeft:"60px"}}>
                                <h3 style={{ margin: "5px" }} htmlFor="categoria">Email</h3>
                            </div>
                            <input
                                className="un" 
                                type="email" 
                                placeholder="Email" 
                                align="center"
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input> 
                        </div>
                        {/*<div>
                            <input
                                className="pass" 
                                type="password" 
                                placeholder="Password"
                                align="center" 
                                required 
                                onChange={(e) => setPassword(e.target.value)}
                            ></input> 
                        </div>*/}
                        {/*<div>
                            <input
                                className="pass" 
                                type="password" 
                                placeholder="Confirm Password"
                                align="center" 
                                required 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></input> 
                        </div>*/}
                            {user.isInstitution && (
                                <>
                                    <h2 className="institutionTitle">Instituição</h2>
                                    <div>
                                        <div style={{paddingLeft:"60px"}}>
                                            <h3 style={{ margin: "5px" }} htmlFor="categoria">Nome</h3>
                                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: tamanho máximo de 25 caracteres</h5>
                                        </div>
                                        <input
                                            className="un" 
                                            type="text"
                                            placeholder="Nome da Instituição"
                                            align="center"
                                            maxlength="25"
                                            required 
                                            value={institutionName}
                                            onChange={(e) => setInstitutionName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <div style={{paddingLeft:"60px"}}>
                                            <h3 style={{ margin: "5px" }} htmlFor="categoria">URL do Logo</h3>
                                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: se tiver problemas envie-nos um email</h5>
                                        </div>
                                        <input
                                            className="un" 
                                            type="text"
                                            placeholder="URL do Logo da Instituição"
                                            align="center"
                                            required 
                                            value={institutionLogo}
                                            onChange={(e) => setInstitutionLogo(e.target.value)}
                                        ></input>
                                    </div>
                                    {/*<div>
                                        <input
                                            className="un" 
                                            rows="3"
                                            type="textarea"
                                            placeholder="Institution Description"
                                            align="center"
                                            required
                                            value={institutionDescription}
                                            onChange={(e) => setInstitutionDescription(e.target.value)}
                                        ></input>
                                    </div>*/}
                                </>
                            )}
                        <div>
                            <label/>
                            <button className="signinButton" type="submit">
                                Atualizar
                            </button>
                        </div>
                        <div>
                            <button className="signinButton" to="/" onClick={signoutHandler}>
                                Sign Out
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
    
}