import {Map, fromJS} from 'immutable';

export default function(state = Map(), action) {
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
            // TODO append error
            console.error(action.error);
            return state;

        default:
            console.warn('unkown action type: ' + action.type);
            console.dir(action);
            break;
    }

    return state;
}