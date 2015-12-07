import {Map, fromJS} from 'immutable';

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return state.merge(
                fromJS(action.state)
            );

        case 'CONNECT':
        case 'RECONNECT':
        case 'CONNECTED':
        case 'DISCONNECTED':
            return state.mergeDeep(fromJS({
                server: action.server
            }));
    }

    return state;
}