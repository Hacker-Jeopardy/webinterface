import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState, onReconnect, onConnected, onDisconnected, clearEvent, logError, logException} from './action_creators';
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
let serverState = null;
let event = null;
let wsConnection = null;
store.subscribe(() => {
    let storeState = store.getState();
    let oldState = serverState;
    let oldEvent = event;
    serverState = storeState.getIn(['server', 'state']);
    event = storeState.get('event');

    if(event != oldEvent && event) {
        let eventJS = event.toJS();
        console.log(eventJS);

        if(wsConnection != null) {
            wsConnection.send(JSON.stringify(eventJS));
            store.dispatch(clearEvent());
        }
        else {
            store.dispatch(logError('No websocket connection.'));
        }
    }

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
                    console.dir(msg);
                    switch(msg.error) {
                        case 'invalid_json':
                            store.dispatch(logException('Invalid json sent. See console.'));
                            break;

                        case 'jeopardy_exception':
                            store.dispatch(logError(msg.message));
                            break;

                        case 'exception':
                            store.dispatch(logError(msg.message));
                            break;

                        default:
                            store.dispatch(logException('Unknown error. See console.'));
                            break;
                    }
                } else {
                    // TODO
                    console.dir(msg);
                    store.dispatch(logException('Unknown message. See console.'));
                }
            };

            ws.onopen = e => {
                console.log(e);

                if(wsConnection != null)
                    wsConnection.close();

                wsConnection = ws;

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

                if(wsConnection == ws)
                    wsConnection = null;

                setTimeout(() => {
                    store.dispatch(onReconnect());
                }, 1000);
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