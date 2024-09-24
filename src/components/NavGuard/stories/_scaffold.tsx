import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter, connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerMiddleware } from 'connected-react-router';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    router: connectRouter(history),
  }),
  {},
  compose(applyMiddleware(routerMiddleware(history))),
);

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};
