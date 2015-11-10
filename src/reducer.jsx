import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function connect(state, entry) {
    // TODO?!
    return state.set('server', {
        host: entry.host,
        port: entry.port
    });
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'CONNECT':
            return connect(state, action.entry);
    }
    return state;
}