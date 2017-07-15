import {Meteor} from 'meteor/meteor';
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import {Router, Switch, Route, Redirect} from 'react-router-dom';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound'
import Login from './../ui/Login';

const browserHistory = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPage = ['/dashboard'];

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => {
                return Meteor.userId() ? <Redirect to="/dashboard" /> : <Login />
            }} />
            <Route path="/signup" render={() => {
                return Meteor.userId() ? <Redirect to="/dashboard" /> : <Signup />
            }} />
            <Route path="/dashboard" render={() => {
                return Meteor.userId() ? <Dashboard to="/dashboard" /> : <Redirect to="/"/>
            }} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPage.includes(pathname);

    if(isAuthenticated && isUnauthenticatedPage) {
        browserHistory.push('/dashboard');
    } else if(!isAuthenticated && isAuthenticatedPage){
        browserHistory.push('/');
    }
};