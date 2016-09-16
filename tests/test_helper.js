import React from 'react';
import chai from 'chai';
import Immutable from 'immutable';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import reducers from '../src/reducers';

export const expect = chai.expect;
chai.use(chaiEnzyme());

export function renderComponent(Component, props = {}, state = {}, logger = () => {}) {
  const loggerMiddleware = ({ getState }) => {
    return (next) => (action) => {
      logger(action, getState);
      return next(action);
    }
  };
  const store = createStore(combineReducers({ ...reducers }), Immutable.fromJS(state), applyMiddleware(loggerMiddleware));

  return mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export const setValue = (input, value) => {
  input.simulate('change', { target: { value } });
};
