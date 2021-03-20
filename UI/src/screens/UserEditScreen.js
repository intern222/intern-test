import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isInstitution, setIsInstitution] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [institutionName, setInstitutionName] = useState('');
  const [institutionLogo, setInstitutionLogo] = useState('');
  const [institutionDescription, setInstitutionDescription] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsInstitution(user.isInstitution);
      setIsAdmin(user.isAdmin);
      if (user.institution) {
        setInstitutionName(user.institution.name);
        setInstitutionLogo(user.institution.logo);
        setInstitutionDescription(user.institution.description);
      }
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isInstitution,
        isAdmin,
        institutionName,
        institutionLogo,
        institutionDescription,
      })
    );
  };
  return (
    <div className="signinContainer">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: "5px" }} htmlFor="name">Nome</h3>
              <input
                style={{ margin: "0", width: "95%" }}
                className="un"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: "5px" }} htmlFor="email">Email</h3>
              <input
                style={{ margin: "0", width: "95%" }}
                className="un"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: "5px" }} htmlFor="empresa">É Empresa ?</h3>
              <input
                style={{ margin: "0", width: "95%" }}
                className="un"
                id="isInstitution"
                type="checkbox"
                checked={isInstitution}
                onChange={(e) => setIsInstitution(e.target.checked)}
              ></input>
            </div>
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: "5px" }} htmlFor="admin">É Adminstrador ?</h3>
              <input
                style={{ margin: "0", width: "95%" }}
                className="un"
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            {user.isInstitution && (
              <>
                <h2 className="institutionTitle">Instituição</h2>
                <div>
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
              <p></p>
              <button type="submit" className="signinButton">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}