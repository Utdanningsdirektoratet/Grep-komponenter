import React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, combineReducers } from 'redux';

// Use the legacy store, in order to not add redux-toolkit only for scaffolds.
const store = createStore(combineReducers({ router: {} }));

const scaffold = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default scaffold;
