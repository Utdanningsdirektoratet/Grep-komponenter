import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    router: connectRouter(history),
  }),
  {},
  compose(applyMiddleware(routerMiddleware(history))),
);

const Scaffold = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    </Provider>
  );
};

export default Scaffold;
