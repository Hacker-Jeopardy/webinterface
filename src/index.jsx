import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './action_creators';
import App from 'components/App';
import {SelectServer} from 'components/SelectServer';
import Admin from 'components/Admin';
import {Scoreboard} from 'components/Scoreboard';

const store = createStore(reducer);
store.dispatch(
    setState({
        server: {
            host: '127.0.0.1',
            port: 4211
        },
        game: {
            state: 'scoreboard',
            scoreboard: {
                name: 'Sample round',
                points: [100, 200, 300, 400, 500],
                categories: [
                    {
                        name: 'Test Group 1',
                        winner: [
                            'uuid_0',
                            'uuid_1',
                            false,
                            null,
                            null
                        ]
                    },
                    {
                        name: 'Test Group 2',
                        winner: [
                            null,
                            false,
                            'uuid_0',
                            'uuid_1',
                            null
                        ]
                    }
                ]
            },
            players: {
                uuid_0: {
                    name: 'Sample Player',
                    score: 42,
                    active: true,
                    buzzed: null,
                    connected: true
                }
            },
            answer: {
                type: 'text',
                data: 'Sample answer text.',
                score: 100,
                double_jeopardy: false
            }
        }
    })
);

const routes = <Route component={App}>
    <Route path='/' component={SelectServer} />
    <Route path='/admin' component={Admin} />
    <Route path='/scoreboard' component={Scoreboard} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);