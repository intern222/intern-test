import React, { useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import AdminRoute from './components/AdminRoute.js';
import HomeScreen from './screens/HomeScreen.js';
import InternshipListScreen from './screens/InternshipListScreen.js';
import InternshipScreen from './screens/InternshipScreen.js';
import SavedInternshipsScreen from './screens/MyInternshipsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SignInScreen from './screens/SignInScreen.js';
import InternshipEditScreen from './screens/InternshipEditScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import Navbar from './components/Navbar/Navbar.js';
import InstitutionRoute from './components/InstitutionRoute.js';
import InstitutionScreen from './screens/InstitutionScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import { useDispatch } from 'react-redux';
import { listInternshipCategories } from './actions/internshipActions.js';
import SearchScreenInternships from './screens/SearchScreenInternships.js';
import SearchScreenUsers from './screens/SearchScreenUsers.js';
import Contacts from './screens/Contacts.js';

function App(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listInternshipCategories());
    }, [dispatch]);

    return(
        <BrowserRouter>
            <div className = "grid-container">
                <Navbar/>
                <main>
                    <Route path="/contacts" component={Contacts}></Route>
                    <Route path="/institution/:id" component={InstitutionScreen}></Route>
                    <Route path="/saved/:id?" component={SavedInternshipsScreen}></Route>
                    <Route path="/internship/:id" component={InternshipScreen} exact></Route>
                    <Route path="/internship/:id/edit" component={InternshipEditScreen} exact></Route>
                    <Route 
                        path="/searchuser/name/:name?" 
                        component={SearchScreenUsers} npm
                        exact
                    ></Route>
                    <Route 
                        path="/searchuser/name/:name/pageNumber/:pageNumber" 
                        component={SearchScreenUsers} 
                        exact
                    ></Route>
                    <Route 
                        path="/searchinternship/name/:name?" 
                        component={SearchScreenInternships} 
                        exact
                    ></Route>
                    <Route 
                        path="/searchinternship/name/:name/pageNumber/:pageNumber" 
                        component={SearchScreenInternships} 
                        exact
                    ></Route>
                    <Route 
                        path="/search/name/:name?" 
                        component={SearchScreen} 
                        exact
                    ></Route>
                    <Route 
                        path="/search/category/:category" 
                        component={SearchScreen} 
                        exact
                    ></Route>
                    <Route 
                        path="/search/category/:category/name/:name/type/:type/location/:location/payment/:payment/pageNumber/:pageNumber" 
                        component={SearchScreen} 
                        exact
                    ></Route>
                    <Route 
                        path="/signin" 
                        component={SignInScreen}
                    ></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <PrivateRoute 
                        path="/profile" 
                        component={ProfileScreen}
                    ></PrivateRoute>
                    <AdminRoute 
                        path="/internshiplist" 
                        component={InternshipListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute 
                        path="/internshiplist/pageNumber/:pageNumber" 
                        component={InternshipListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute 
                        path="/userlist" 
                        component={UserListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute 
                        path="/userlist/pageNumber/:pageNumber" 
                        component={UserListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute 
                        path="/user/:id/edit" 
                        component={UserEditScreen}
                    ></AdminRoute>
                    <InstitutionRoute
                        path="/internshiplist/institution" 
                        component={InternshipListScreen}
                    ></InstitutionRoute>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;