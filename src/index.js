import app from './app';
import routes from './routes';
import reducers from './reducers/index';
import Layout from './components/layout';

export const initialState = {
  title: 'Jeopardy Webinterface',
  config: {},
};

const enhancers = [];

app({ reducers, enhancers, initialState, Layout, routes }).render();
