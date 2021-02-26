import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteInternship, listInternships } from '../actions/internshipActions.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INTERNSHIP_DELETE_RESET } from '../constants/internshipConstants';


export default function SearchScreen(props) {

  const {
    pageNumber = 1,
  } = useParams();

  const institutionMode = props.match.path.indexOf('/institution') >= 0;

  const internshipList = useSelector(state => state.internshipList);
  const { loading, error, internships, page, pages } = internshipList;

  const { name = 'all' } = useParams();

  const internshipDelete = useSelector(state => state.internshipDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = internshipDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: INTERNSHIP_DELETE_RESET });
    }
    dispatch(
      listInternships({
        institution: institutionMode ? userInfo._id : '',
        pageNumber,
        name: name !== 'all' ? name : ''
      })
    );
  }, [
    dispatch,
    props.history,
    institutionMode,
    successDelete,
    userInfo._id,
    pageNumber,
    name
  ]);

  const deleteHandler = (internship) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteInternship(internship._id));
    }
  };

  const getFilterUrl = (filter) =>{
    const filterPage = filter.page || pageNumber;
    const filterName= filter.name || name;
    return `/searchinternship/name/${filterName}/pageNumber/${filterPage}`;
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
              <div>{internships.length} Results</div>
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
                          <th>CATEGORY</th>
                          <th>COMPANY</th>
                          <th>LOCATION</th>
                          <th>TYPE</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {internships.map((internship) => (
                          <tr key={internship._id}>
                            <td>{internship._id}</td>
                            <td>{internship.name}</td>
                            <td>{internship.category}</td>
                            <td>{internship.company}</td>
                            <td>{internship.location}</td>
                            <td>{internship.type}</td>
                            <td>
                              <button
                                type="button"
                                className="small"
                                onClick={() =>
                                  props.history.push(`/internship/${internship._id}/edit`)}
                              >
                                Edit
                                            </button>
                              <button
                                type="button"
                                className="small"
                                onClick={() => deleteHandler(internship)}
                              >
                                Delete
                                            </button>
                            </td>
                          </tr>
                        ))}
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