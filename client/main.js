import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes';

Tracker.autorun(() => {
    //Keep track of authentication status
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});