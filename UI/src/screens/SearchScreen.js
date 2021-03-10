import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Route } from 'react-router-dom';
import { listInternships } from '../actions/internshipActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Internship from '../components/Internship.js';
import SearchBoxSearchScreen from '../components/SearchBoxSearchScreen.js';

export default function SearchScreen(props) {

  const {
    name = 'all',
    category = 'all',
    type = 'all',
    location = 'all',
    payment = 'all',
    pageNumber = 1,
  } = useParams();

  const dispatch = useDispatch();

  const internshipList = useSelector((state) => state.internshipList);
  const { 
    loading, 
    error, 
    internships, 
    page, 
    pages 
  } = internshipList;

  const internshipCategoryList = useSelector((state) => state.internshipCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
    types,
    locations,
    payments
  } = internshipCategoryList;

  useEffect(() => {
    dispatch(
      listInternships({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        type: type !== 'all' ? type : '',
        location: location !== 'all' ? location : '',
        payment: payment !== 'all' ? payment : '',
      })
    );
  }, [ dispatch, payment, location, type, category, name, pageNumber ]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterType = filter.type || type;
    const filterLocation = filter.location || location;
    const filterPayment = filter.payment || payment;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}/type/${filterType}/location/${filterLocation}/payment/${filterPayment}/pageNumber/${filterPage}`;
  };


  return (
    <div>
      <div className="row top">
        <div className="col_1">
          <h1>Search</h1>
          {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <ol>
            <div className="filter_information">
              <Route 
                render={({ history }) => (
                  <SearchBoxSearchScreen history={history}></SearchBoxSearchScreen>
                )}
              ></Route>
              <div className="select">
                <select
                  value={category}
                  onChange={(c) => {
                    props.history.push(getFilterUrl({ category: c.target.value }));
                  }}
                >
                  <option value='all' className={'all' === category ? 'active' : ''}>
                    Any Department
                  </option>
                  {categories.map((c) => (
                    <option
                      className={c === category ? 'active' : ''}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>
                <div className="select">
                  <select
                    value={type}
                    onChange={(t) => {
                      props.history.push(getFilterUrl({ type: t.target.value }));
                    }}
                  >
                    <option value='all' className={'all' === type ? 'active' : ''}>
                      Any Type
                    </option>
                    {types.map((t) => (
                      <option
                        className={t === type ? 'active' : ''}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select">
                  <select
                    value={location}
                    onChange={(l) => {
                      props.history.push(getFilterUrl({ location: l.target.value }));
                    }}
                  >
                    <option value='all' className={'all' === location ? 'active' : ''}>
                      Any Location
                    </option>
                    {locations.map((l) => (
                      <option
                        className={l === location ? 'active' : ''}
                      >
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select">
                  <select
                    value={payment}
                    onChange={(p) => {
                      props.history.push(getFilterUrl({ payment: p.target.value }));
                    }}
                  >
                    <option value='all' className={'all' === payment ? 'active' : ''}>
                      Any Salary
                    </option>
                    {payments.map((p) => (
                      <option
                        className={p === payment ? 'active' : ''}
                      >
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
          </ol>
        )}
        
        </div>
      
        <div className="col_2">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {internships.length === 0 && (
                <MessageBox>No Internship Found</MessageBox>
              )}
              <div className="row center">
              {loading ? (
              <LoadingBox></LoadingBox>
              ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
              ) : (
              <h6 className="results">{internships.length} Results</h6>
              )}
                {internships.map((internship) => (
                  <Internship key={internship._id} internship={internship}></Internship>
                ))}
              
              <div className="row center pagination">
                {
                  [...Array(pages).keys()].map(x => (
                    <Link
                      className={x + 1 === page ? 'active' : ''}
                      key={x+1} 
                      to={getFilterUrl({page: x+1})}
                    >
                      {x+1}
                    </Link>
                  ))
                }
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

