'use strict';

import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from 'redux';
import { createBrowserHistory } from 'history';
import {
  routerReducer,
  routerMiddleware,
  syncHistoryWithStore
} from 'react-router-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

export default (preloadedState) => {
  const rootReducers = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const history = createBrowserHistory();
  const enhancers = applyMiddleware(routerMiddleware(history), thunk);

  const store = createStore(rootReducers, preloadedState, enhancers);
  store.history = syncHistoryWithStore(history, store);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers');
      store.replaceReducer({ ...nextReducer, routing: routerReducer });
    });
  }
  
  return store;
};