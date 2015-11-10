import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './action_creators';
import App from 'components/App';
import {SelectServerContainer} from 'components/SelectServer';
import Admin from 'components/Admin';
import Scoreboard from 'components/Scoreboard';

const store = createStore(reducer);
store.dispatch(
    setState({
        server: {
            host: '127.0.0.1',
            port: 4211
        }
    })
);

const routes = <Route component={App}>
    <Route path='/' component={SelectServerContainer} />
    <Route path='/admin' component={Admin} />
    <Route path='/scoreboard' component={Scoreboard} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);