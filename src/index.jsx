import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {
    setState, mergeServer, setBuzzorder,
    onReconnect, onConnected, onDisconnected,
    eventReady, clearEvent,
    logMessage, logError, logException
} from './action_creators';
import App from 'components/App';
import {SelectServer} from 'components/SelectServer';
import {AdminBoard} from 'components/AdminBoard';
import {PlayerBoard} from 'components/PlayerBoard';

const store = createStore(reducer);

const initServerConfig = () => {
    let host = localStorage.getItem('server.host');
    let port = localStorage.getItem('server.port');

    host = (host == null) ? 'localhost' : host;
    port = (port == null) ? 4242 : parseInt(port);

    store.dispatch(
        setState({
            server: {
                host: host,
                port: port
            }
        })
    );
};
initServerConfig();

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
        if((serverState == 'connecting' || serverState == 'disconnected') && wsConnection == null) {
            let host = storeState.getIn(['server', 'host']);
            let port = storeState.getIn(['server', 'port']);
            let url = 'ws://' + host + ':' + port;

            // save config
            localStorage.setItem('server.host', host);
            localStorage.setItem('server.port', port);

            let ws = new WebSocket(url, ['protocolOne', 'protocolTwo']);
            ws.onmessage = e => {
                console.log(e);
                let msg = JSON.parse(e.data);

                if (msg.state) {
                    console.log(msg);
                    store.dispatch(setState({
                        game: msg
                    }));
                } else if (msg.buzzorder) {
                    console.log(msg);
                    store.dispatch(setBuzzorder(msg.buzzorder));
                } else if (msg.error) {
                    console.dir(msg);
                    switch(msg.error) {
                        case 'invalid_json':
                            store.dispatch(logException('Invalid json sent. See console.'));
                            break;

                        default:
                            store.dispatch(logError(msg.error + ': ' + msg.message));
                            break;
                    }
                } else if(msg.connection) {
                    store.dispatch(logMessage('Connecting "' + msg.device + '" ' + msg.connection));
                } else {
                    // TODO
                    console.dir(msg);
                    store.dispatch(logException('Unknown message. See console.'));
                }
            };

            ws.onopen = e => {
                console.log(e);
                let wsOld = wsConnection;

                wsConnection = ws;

                if(wsOld != null) {
                    wsOld.close();
                }

                store.dispatch(onConnected());
                store.dispatch(eventReady());
            };

            ws.onerror = e => {
                console.error(e);
            };
            ws.onclose = e => {
                console.log(e);
                console.log(wsConnection);

                if(wsConnection == ws || wsConnection == null) {
                    wsConnection = null;
                    store.dispatch(onDisconnected());

                    setTimeout(() => {
                        store.dispatch(onReconnect());
                    }, 1000);
                }
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