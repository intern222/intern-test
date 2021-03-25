import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Route } from 'react-router-dom';
import { createInternship, deleteInternship, listInternships } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INTERNSHIP_CREATE_RESET, INTERNSHIP_DELETE_RESET } from '../constants/internshipConstants';
import SearchBox from '../components/SearchBoxInternship.js';
import Moment from 'moment';

export default function InternshipListScreen(props){

    const { 
        pageNumber= 1 ,
    } = useParams();

    const institutionMode = props.match.path.indexOf('/institution')>=0;

    const internshipList = useSelector(state => state.internshipList);
    const {loading, error, internships, page, pages} = internshipList;
    
    const internshipCreate = useSelector(state => state.internshipCreate);
    const {
        loading : loadingCreate, 
        error : errorCreate, 
        success: successCreate, 
        internship: createdInternship,
    } = internshipCreate;

    const internshipDelete = useSelector(state => state.internshipDelete);
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete,
    } = internshipDelete;

    const userSignin = useSelector( (state) => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    
    const dispatch = useDispatch();

    useEffect(() =>{
        if(successCreate){
            dispatch({type: INTERNSHIP_CREATE_RESET});
            props.history.push(`/internship/${createdInternship._id}/edit`);
        }
        if(successDelete){
            dispatch({type: INTERNSHIP_DELETE_RESET});
        }
        dispatch(listInternships({ institution: institutionMode ? userInfo._id : '', pageNumber}));
    }, [
        createdInternship, 
        dispatch, 
        props.history, 
        institutionMode,
        successCreate, 
        successDelete,
        userInfo._id,
        pageNumber,
    ]);

    const deleteHandler = (internship) =>{
        if(window.confirm('Are you sure you want to delete?')){
            dispatch(deleteInternship(internship._id));
        }
    };
    const createHandler = () => {
        dispatch(createInternship());
    };

    return(
        <div>
            <div className="col_12">
                <h1>Estágios</h1>
                <div className="row123">
                <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                ></Route>
                <button 
                    type="button" 
                    className="small10" 
                    onClick={createHandler}
                >
                    Criar Estágio
                </button>
                </div>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <div className="table100" center="true">
                        <table responsive="true">
                            <thead>
                                <tr className="table100-head">
                                    <th>NOME</th>
                                    <th>SETOR</th>
                                    {/*<th>EMPRESA</th>*/}
                                    <th>LOCALIZAÇÃO</th>
                                    <th>TIPO</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {internships.map((internship) => (
                                    <tr key = {internship._id}>
                                        <td><Link className="card-link" to={`/internship/${internship._id}`}>{internship.name}</Link></td>
                                        <td>{internship.category}</td>
                                        {/*<td>{user.institution.name}</td>*/}
                                        <td>{internship.location}</td>
                                        <td>{internship.type}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="small" 
                                                onClick={() => 
                                                    props.history.push(`/internship/${internship._id}/edit`)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                type="button" 
                                                className="small" 
                                                onClick = {() => deleteHandler(internship)}
                                            >
                                                Apagar
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
                            key={x+1} 
                            to={`/internshiplist/pageNumber/${x+1}`}
                            >
                            {x+1}
                            </Link>
                        ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}