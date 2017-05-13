'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { 
  Router,
  Route,
  Redirect
} from 'react-router-dom';

import App from './App';

export default function Root({store}){
  return (
    <Provider store={store}>
      <Router history={store.history}>
        <div>
          <Route path="/" component={App} />
          <Redirect from="*" to="/" />
        </div>
      </Router>
    </Provider>
  );
}