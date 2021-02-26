import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants.js';


export default function SearchScreenUsers(props) {

  const {
    pageNumber = 1,
  } = useParams();

  const institutionMode = props.match.path.indexOf('/institution') >= 0;

  const userList = useSelector(state => state.userList);
  const { loading, error, users, page, pages } = userList;

  const { name = 'all' } = useParams();

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = userDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(
      listUsers({
        institution: institutionMode ? userInfo._id : '',
        pageNumber,
        name: name !== 'all' ? name : ''
      })
    );
  }, [
    dispatch, 
    props.history,
    userInfo._id,
    successDelete, 
    pageNumber, 
    name, 
    institutionMode,
  ]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  }

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterName = filter.name || name;
    return `/searchuser/name/${filterName}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <div className="row">
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <div>{users.length} Results</div>
            )}
      </div>
      <div className="row top">
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
                <>
                  <div className="table100" center>
                    <table responsive>
                      <thead>
                        <tr className="table100-head">
                          <th>ID</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>IS INSTITUTION</th>
                          <th>IS ADMIN</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          users.map((user) => (
                            <tr key={user._id}>
                              <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.isInstitution ? 'YES' : 'NO'}</td>
                              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                              <td>
                                <button
                                  type="button"
                                  className="small"
                                  onClick={() => deleteHandler(user)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="row center pagination">
                    {
                      [...Array(pages).keys()].map(x => (
                        <Link
                          className={x + 1 === page ? 'active' : ''}
                          key={x + 1}
                          to={getFilterUrl({ page: x + 1 })}
                        >
                          {x + 1}
                        </Link>
                      ))
                    }
                  </div>
                </>
              )}
        </div>
      </div>
    </div>
  );
}