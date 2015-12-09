import {Map, fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    server: {},
    game: {},
    log: []
});

function addToLog(state, error) {
    let log = state.get('log');

    return state.set('log',
        log.push(fromJS(error))
    );
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_STATE':
            return state.merge(
                fromJS(action.state)
            );

        case 'SERVER':
            return state.mergeDeep(fromJS({
                server: action.server
            }));

        case 'EVENT':
            return state.set('event', fromJS(action.event));
        case 'CLEAR_EVENT':
            return state.remove('event');

        case 'ERROR':
            return addToLog(state, action.error);

        default:
            console.warn('unkown action type: ' + action.type);
            console.dir(action);
            break;
    }

    return state;
}