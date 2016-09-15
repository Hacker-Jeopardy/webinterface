import { expect } from './test_helper';
import app from '../src/app';
import routes from '../src/routes';
import reducers from '../src/reducers/index';
import Layout from '../src/components/layout';

describe('app', () => {
  let component;
  const initialState = {};
  const loggerOptions = {
    logger: {
      ...console,
      log: () => {},
    },
  };

  beforeEach(() => {
    component = app({ reducers, initialState, Layout, routes, loggerOptions });
  });

  it('returns a store object', () => {
    expect(component.store).to.be.a('object');
  });
  it('returns a history object', () => {
    expect(component.history).to.be.a('object');
  });
  it('returns a render function', () => {
    expect(component.render).to.be.a('function');
  });
});
