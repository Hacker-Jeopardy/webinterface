import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState, onReconnect, onConnected, onDisconnected} from './action_creators';
import App from 'components/App';
import {SelectServer} from 'components/SelectServer';
import {AdminBoard} from 'components/AdminBoard';
import {PlayerBoard} from 'components/PlayerBoard';

const store = createStore(reducer);
store.dispatch(
    setState({
        server: {
            host: '127.0.0.1',
            port: 4242
        }
    })
);

// TODO
//let ws;
let serverState = null;
store.subscribe(() => {
    let storeState = store.getState();
    let oldState = serverState;
    serverState = storeState.getIn(['server', 'state']);

    // TODO send events in state to server

    if (serverState !== oldState) {
        if(serverState == 'connecting' || serverState == 'disconnected') {
            let host = storeState.getIn(['server', 'host']);
            let port = storeState.getIn(['server', 'port']);
            let url = 'ws://' + host + ':' + port;

            let ws = new WebSocket(url, ['protocolOne', 'protocolTwo']);
            ws.onmessage = e => {
                console.log(e);
                let msg = JSON.parse(e.data);

                if (msg.state) {
                    console.log(msg);
                    store.dispatch(setState({
                        game: msg
                    }));
                } else if (msg.error) {
                    // TODO
                    console.warn(msg);
                } else {
                    console.warn(msg);
                }
            };
            //ws.onData = e => console.log;

            ws.onopen = e => {
                console.log(e);

                let msg = JSON.stringify({
                    event: 'ready'
                });
                ws.send(msg);

                store.dispatch(onConnected());
            };

            ws.onerror = e => {
                console.error(e);
            };
            ws.onclose = e => {
                console.log(e);
                store.dispatch(onDisconnected());

                setTimeout(() => {
                    store.dispatch(onReconnect());
                }, 100);
            };
        }
    }
});

const routes = (
    <Route component={App}>
        <Route path='/' component={SelectServer} />
        <Route path='/admin' component={AdminBoard} />
        <Route path='/player' component={PlayerBoard} />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.body
);