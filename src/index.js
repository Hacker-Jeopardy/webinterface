import App from './app';
import routes from './routes';
import reducers from './reducers/index';
import Layout from './components/layout';
import persistState from 'redux-localstorage';

export const initialState = {
  title: 'Jeopardy Webinterface',
  config: {},
};

const enhancers = {
  persistState: persistState('/config'),
};

App({ reducers, enhancers, initialState, Layout, routes }).render();
