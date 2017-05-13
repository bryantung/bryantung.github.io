'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './utils/configureStore';

const rootEl = document.getElementById('app');
const store = configureStore();

renderApp(rootEl);

if (module.hot) {
  module.hot.accept('./components/Root', () => renderApp(rootEl));
}

function renderApp(element) {
  const Root = require('./components/Root').default;
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    element
  );
}