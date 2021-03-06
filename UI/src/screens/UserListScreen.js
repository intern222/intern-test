import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Route } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import SearchBox from '../components/SearchBoxUser.js';

export default function UserListScreen(props) {

    const { 
        pageNumber= 1 ,
    } = useParams();

    const userList = useSelector(state => state.userList);
    const {loading, error, users, page, pages} = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete
    } = userDelete;

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(listUsers({pageNumber}));
        dispatch({type: USER_DETAILS_RESET})
    }, [dispatch, successDelete, pageNumber]);

    const deleteHandler= (user) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(user._id));
        }
    }

    return (
        <div>
            <div className="col_12">
                <h1>Utilizadores</h1>
                <div className="row123">
                    <Route
                        render={({ history }) => (
                            <SearchBox history={history}></SearchBox>
                        )}
                    ></Route>
                </div>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete &&<MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant="danger"> {error}</MessageBox>)
                :
                (
                    <>
                        <div className="table100" center="true">
                            <table responsive="true">
                                <thead>
                                    <tr className="table100-head">
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
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isInstitution ? 'YES':'NO'}</td>
                                                <td>{user.isAdmin ? 'YES':'NO'}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className="small" 
                                                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="small" 
                                                        onClick={() => deleteHandler(user)}
                                                    >
                                                        Apagar
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
                                key={x+1} 
                                to={`/userlist/pageNumber/${x+1}`}
                                >
                                {x+1}
                                </Link>
                            ))
                            }
                        </div>
                    </>
                    )
                }
        </div>
    )
}