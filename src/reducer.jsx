import {Map, fromJS} from 'immutable';

function connect(state, server) {
    // TODO?!
    return state.set('server', {
        host: server.host,
        port: server.port
    });
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return state.merge(
                fromJS(action.state)
            );

        case 'CONNECT':
            return connect(state, action.server);
    }

    return state;
}